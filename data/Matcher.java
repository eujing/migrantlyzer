import java.io.*;
import java.util.*;
import java.nio.charset.StandardCharsets;
import org.apache.commons.csv.*;
import org.apache.commons.io.*;
import com.almworks.sqlite4java.*;

public class Matcher {

	private ArrayList<ArrayList<String>> countries;
	private ArrayList<Float> longitude;
	private ArrayList<Float> latitude;
	private ArrayList<ArrayList<ArrayList<Integer>>> migrants;
	private ArrayList<ArrayList<Float>> data;
	private ArrayList<ArrayList<Integer>> ranks;

	private static final String[] YEARS = {"1990", "1995", "2000", "2005", "2010", "2015"};

	private static final boolean[] INDEX_DIR = {
		false, false, true,  false, false,
		true,  true,  true,  true,  true,
		true,  false, true
	};

	private static final int[][] INDEX_CONSTANTS = {
		{ 1, 23, 23, 23, 23, 23, 23},
		{ 2, 31, 31, 31, 31, 31, 31},
		{ 3,  1,  2,  3,  4,  5,  6},
		{ 4, 25, 25, 26, 27, 28, 29},
		{ 5,  8,  8,  8,  8,  8,  8},
		{ 6, 15, 15, 15, 15, 15, 15},
		{ 7,  9, 10, 11, 12, 13, 14},
		{ 8, 16, 17, 18, 19, 20, 21},
		{ 9, 22, 22, 22, 22, 22, 22},
		{10,  0,  0,  0,  0,  0,  0},
		{11, 24, 24, 24, 24, 24, 24},
		{12, 30, 30, 30, 30, 30, 30},
		{13,  7,  7,  7,  7,  7,  7}
	};

	private static final int STABILITY_INDEX = 24;
	private static final int STABILITY_BASE = 350;

	private static final int[] ROUND_INDEXES = {1, 2, 3, 4, 5, 6};
	private static final int[] TRUNCATE_INDEXES = {15, 16, 17, 18, 19, 20, 21, 30};

	public static void main(String args[]) {
		try {
			new Matcher();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public Matcher() throws Exception{
		loadCountries();
		loadLocations();
		loadMigrants();
		loadRaw();
		modifyRaw();
		writeData();
	}

	private void loadCountries() throws Exception {
		System.out.println("\nLoading country name map");
		countries = new ArrayList<>();

		File file = new File("./name_map.txt");
		Scanner sc = new Scanner(new FileInputStream(file));
		while (sc.hasNext()) {
			StringTokenizer st = new StringTokenizer(sc.nextLine(), ";");
			ArrayList<String> a = new ArrayList<>();
			a.add(st.nextToken());
			while (st.hasMoreTokens()) {
				a.add(st.nextToken());
			}
			countries.add(a);
		}
		System.out.println(countries.size() + " countries loaded");
	}

	private void loadLocations() throws Exception {
		longitude = new ArrayList<>();
		latitude = new ArrayList<>();

		File file = new File ("./locations.csv");
		CSVParser parser = CSVParser.parse(file, StandardCharsets.US_ASCII, CSVFormat.DEFAULT);
		List<CSVRecord> list = parser.getRecords();

		for (int i = 0; i < countries.size(); i++) {
			longitude.add(360f);
			latitude.add(360f);
		}

		for (int i = 0; i < list.size(); i++) {
			String country = toAscii(list.get(i).get(1).trim());
			float lat = Float.parseFloat(list.get(i).get(2));
			float lon = Float.parseFloat(list.get(i).get(3));
			int index = getCountryIndex(country);
			longitude.set(index, lon);
			latitude.set(index, lat);
		}
	}

	private void loadMigrants() throws Exception {
		migrants = new ArrayList<>();

		File file = new File("./migrants");
		File[] files = file.listFiles();
		System.out.println();
		for (File f : files) {
			if (!f.getName().endsWith(".csv")) continue;
			System.out.println("Loading file: " + f.getName());

			migrants.add(new ArrayList<>());
			for (int i = 0; i < countries.size(); i++) {
				migrants.get(migrants.size()-1).add(new ArrayList<>());
				for (int j = 0; j < countries.size(); j++) {
					migrants.get(migrants.size()-1).get(i).add(0);
				}
			}

			CSVParser parser = CSVParser.parse(f, StandardCharsets.US_ASCII, CSVFormat.DEFAULT);
			List<CSVRecord> list = parser.getRecords();

			ArrayList<Integer> mapping = new ArrayList();
			for (int i = 1; i < list.get(0).size(); i++) {
				String country = toAscii(list.get(0).get(i).trim());
				int index = getCountryIndex(country);
				mapping.add(index);
			}

			for (int i = 1; i < list.size(); i++) {
				CSVRecord record = list.get(i);
				for (int j = 1; j < list.get(i).size(); j++) {
					int value = 0;
					try {
						value = Integer.parseInt(list.get(i).get(j));
					} catch (Exception e) {}
					int index_from = mapping.get(i-1);
					int index_to = mapping.get(j-1);
					migrants.get(migrants.size()-1).get(index_from).set(index_to, value);
				}
			}
		}
	}

	private void loadRaw() throws Exception {
		System.out.println();
		data = new ArrayList<>();

		File file = new File ("./raw");
		File[] files = file.listFiles();
		for (File f : files) {
			if (!f.getName().endsWith(".csv")) continue;
			data.add(new ArrayList<>());
			System.out.println("Loading file #" + (data.size()-1) + ": " + f.getName());
			CSVParser parser = CSVParser.parse(f, StandardCharsets.US_ASCII, CSVFormat.DEFAULT);
			List<CSVRecord> list = parser.getRecords();
			for (int i = 0; i < countries.size(); i++) {
				data.get(data.size()-1).add(0f);
			}
			for (int i = 1; i < list.size(); i++) {
				CSVRecord record = list.get(i);
				String country = toAscii(record.get(0).trim());
				float value = 0;
				try {
					value = Float.parseFloat(record.get(1));
				} catch (Exception e){}

				int index = getCountryIndex(country);
				data.get(data.size()-1).set(index, value);
			}
		}

		ranks = new ArrayList<>();
		for (int i = 0; i < data.size(); i++) {
			int ind = -1;
			for (int j = 0; j < INDEX_DIR.length; j++) {
				for (int k = 1; k < INDEX_CONSTANTS[j].length; k++) {
					if (i == INDEX_CONSTANTS[j][k]) ind = j;
				}
			}
			if (ind == -1) throw new Exception("Unable to ascertain rank dir");
			boolean dir = INDEX_DIR[ind];

			ArrayList<Datum> a = new ArrayList<>();
			for (int j = 0; j < countries.size()-1; j++) {
				if (data.get(i).get(j) != 0 ) {
					a.add(new Datum(j, data.get(i).get(j)));
				} else {
					a.add(new Datum(j, dir ? 0f : Float.MAX_VALUE));
				}
			}

			Collections.sort(a, new Comparator<Datum>() {
				public int compare(Datum d1, Datum d2) {
					if (dir) return ((Float)d2.value).compareTo(d1.value);
					else return ((Float)d1.value).compareTo(d2.value);
				}
			});

			ranks.add(new ArrayList());
			for (int j = 0; j < countries.size()-1; j++) {
				ranks.get(i).add(0);
			}

			int pos = 1;
			float prev = Float.NaN;
			for (int j = 0; j < countries.size()-1; j++) {
				Datum d = a.get(j);
				if (d.value != prev) {
					prev = d.value;
					pos = j+1;
				}
				ranks.get(i).set(d.index, pos);
			}
		}
	}

	private class Datum {

		int index;
		float value;

		Datum(int index, float value) {
			this.index = index;
			this.value = value;
		}
	}

	private int getCountryIndex(String country) throws Exception {
		for (int i = 0; i < countries.size(); i++) {
			for (int j = 0; j < countries.get(i).size(); j++) {
				if (countries.get(i).get(j).equals(country)) return i;
			}
		}
		throw new Exception ("Cannot find " + country);
	}

	static String toAscii(String s) {
		StringBuilder out = new StringBuilder();
		for (int i = 0; i < s.length(); i++) {
  			final char ch = s.charAt(i);
 			if (ch <= 127) out.append(ch);
		}
		return out.toString();
	}

	private void modifyRaw() {
		for (int i = 0; i < countries.size(); i++) {
			int value = Math.round(data.get(STABILITY_INDEX).get(i)*100) + STABILITY_BASE;
			data.get(STABILITY_INDEX).set(i, value/100f);
		}
		for (int i = 0; i < ROUND_INDEXES.length; i++) {
			for (int j = 0; j < countries.size(); j++) {
				int value = Math.round(data.get(ROUND_INDEXES[i]).get(j));
				data.get(ROUND_INDEXES[i]).set(j, (float)value);
			}
		}
		for (int i = 0; i < TRUNCATE_INDEXES.length; i++) {
			for (int j = 0; j < countries.size(); j++) {
				int value = Math.round(data.get(TRUNCATE_INDEXES[i]).get(j)*100);
				data.get(TRUNCATE_INDEXES[i]).set(j, value/100f);
			}
		}
	}

	private void writeData() throws Exception {
		FileUtils.deleteQuietly(new File("./db_raw.sqlite3"));
		FileUtils.copyFile(new File("./db_empty.sqlite3"), new File("./db_raw.sqlite3"));
		File file = new File ("./db_raw.sqlite3");
		SQLiteConnection db = new SQLiteConnection(file);
		db.open();

		System.out.println("\nWriting data to " + file.getName());
		System.out.println("\nPopulating country");
		int count = 0;
		for (int i = 0; i < countries.size()-1; i++) {
			db.exec("INSERT INTO migrantlyzer_app_country VALUES("
					+ i + ", \"" + countries.get(i).get(0)
					+ "\", " + longitude.get(i) + ", "
					+ latitude.get(i) + ")");
			count++;
		}
		System.out.println(count + " countries added");

		System.out.println("\nCalculating index max");
		count = 0;
		for (int i = 0; i < INDEX_DIR.length; i++) {
			float max = 0;
			for (int j = 0; j < YEARS.length; j++) {
				int index = INDEX_CONSTANTS[i][j+1];
				for (int k = 0; k < data.get(index).size(); k++) {
					if (data.get(index).get(k) > max) {
						max = data.get(index).get(k);
					}
				}
			}
			db.exec("UPDATE migrantlyzer_app_index SET max_value=" + max
					+" WHERE id=" + INDEX_CONSTANTS[i][0]);
			count++;
		}
		System.out.println(count + " indexes updated");

		count = 0;
		System.out.println();
		for (int i = 0; i < YEARS.length; i++) {
			System.out.println("Populating migration data for " + YEARS[i]);
			for (int j = 0; j < countries.size()-1; j++) {
				for (int k = 0; k < countries.size()-1; k++) {
					int value = migrants.get(i).get(j).get(k);
					if (value != 0) {
						db.exec("INSERT INTO migrantlyzer_app_migrationdatapoint VALUES("
								+ count + ", " + YEARS[i] + ", "
								+ value + ", " + k + ", " + j + ")");
						count++;
					}
				}
			}
		}
		System.out.println(count + " migration entries added");

		count = 0;
		System.out.println();
		for (int i = 0; i < YEARS.length; i++) {
			System.out.println("Populating index data for " + YEARS[i]);
			for (int j = 0; j < INDEX_DIR.length; j++) {
				int src = INDEX_CONSTANTS[j][i+1];
				int ind = INDEX_CONSTANTS[j][0];
				for (int k = 0; k < countries.size()-1; k++) {
					float value = data.get(src).get(k);
					int rank = ranks.get(src).get(k);
					db.exec("INSERT INTO migrantlyzer_app_indexdatapoint VALUES("
							+ count + ", " + value + ", " + YEARS[i] + ", "
							+ rank + ", " + k + ", " + ind + ")");
					count++;
				}
			}
		}
		System.out.println(count + " index data entries added");

		db.dispose();
	}
}
