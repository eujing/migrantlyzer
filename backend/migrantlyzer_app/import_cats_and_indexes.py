from .models import Category, Index

DATA = {
    "Environmental": [
        {"name": "Annual Mean Air Pollution Index, PM10", "source": "World Health Organization PM10 values"},
        {"name": "World Risk Index", "source": "World Health Organization PM10 values"}],
    "Economic": [
        {"name": "GDP, per capita", "source": "World Bank"},
        {"name": "Unemployment, % of total labor force", "source": "World Bank"}],
    "Social": [
        {"name": "Intentional Homicides, per 100,000 people", "source": "World Bank"},
        {"name": "Human Freedom Index, HFI", "source": "Cato Institute"},
        {"name": "Human Development Index, HDI", "source": "UN Development Program"},
        {"name": "Life Expectancy, years", "source": "World Bank"},
        {"name": "PISA Rankings", "source": "OECD"}],
    
    "Political": [
        {"name": "Democracy Index", "source": "Global Democracy Ranking"},
        {"name": "Political Stability", "source": ""},
        {"name": "Deaths from Conflict, per 100,000 people", "source": "World Bank"}],
    "Others": [
        {"name": "Happy Planet Index", "source": "Happy Planet Index"}
        ]
}

def import_data():
    for cat_name, indexes in DATA.items():
        print(cat_name)
        cat = Category(name=cat_name)
        cat.save()

        for index in indexes:
            print("\t{}".format(index["name"]))
            cat.index_set.create(
                name=index["name"], source=index["source"])

def clear_data():
    Category.objects.all().delete()
