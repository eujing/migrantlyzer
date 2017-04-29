import java.io.*;
import java.util.*;
import java.nio.charset.StandardCharsets;
import org.apache.commons.csv.*;

public class Matcher {

	private ArrayList<ArrayList<String> > countries;
	private ArrayList<ArrayList<ArrayList<Integer> > > migrants;
	private ArrayList<String> years;
	private ArrayList<ArrayList<Double> > data;
	private ArrayList<String> titles;

	public static void main(String args[]) {
		try {
			new Matcher();
		} catch(Exception e) {
			e.printStackTrace();
		}
	}

	public Matcher() throws Exception{
		loadCountries();
		loadMigrants();
		loadRaw();
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

	private void loadMigrants() throws Exception {
		migrants = new ArrayList<>();
		years = new ArrayList<>();

		File file = new File("./migrants");
		File[] files = file.listFiles();
		System.out.println();
		for (File f : files) {
			if (!f.getName().endsWith(".csv")) continue;
			System.out.println("Loading file: " + f.getName());
			years.add(f.getName().substring(0,4));

			migrants.add(new ArrayList<>());
			for (int i = 0; i < countries.size(); i++) {
				migrants.get(years.size()-1).add(new ArrayList<>());
				for (int j = 0; j < countries.size(); j++) {
					migrants.get(years.size()-1).get(i).add(0);
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
					migrants.get(years.size()-1).get(index_from).set(index_to, value);
				}
			}
		}
	}

	private void loadRaw() throws Exception {
		System.out.println();
		data = new ArrayList<>();
		for (int i = 0; i < countries.size(); i++) {
			data.add(new ArrayList<>());
		}
		titles = new ArrayList<>();

		File file = new File ("./raw");
		File[] files = file.listFiles();
		for (File f : files) {
			if (!f.getName().endsWith(".csv")) continue;
			System.out.println("Loading file: " + f.getName());
			CSVParser parser = CSVParser.parse(f, StandardCharsets.US_ASCII, CSVFormat.DEFAULT);
			List<CSVRecord> list = parser.getRecords();
			titles.add(list.get(0).get(1));
			for (int i = 0; i < countries.size(); i++) {
				data.get(i).add(0d);
			}
			for (int i = 1; i < list.size(); i++) {
				CSVRecord record = list.get(i);
				String country = toAscii(record.get(0).trim());
				double value = 0;
				try {
					value = Double.parseDouble(record.get(1));
				} catch (Exception e){}

				int index = getCountryIndex(country);
				data.get(index).set(titles.size()-1, value);
			}
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
}
