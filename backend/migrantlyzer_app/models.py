from django.db import models

# Create your models here.
class Country(models.Model):
    name = models.CharField(max_length=100)
    longitude = models.FloatField()
    latitude = models.FloatField()

class Category(models.Model):
    name = models.CharField(max_length=100)

class Index(models.Model):
    name = models.CharField(max_length=100)
    source = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

class IndexDataPoint(models.Model):
    value = models.FloatField()
    year = models.IntegerField()
    rank = models.IntegerField()
    index = models.ForeignKey(Index, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)

class MigrationDataPoint(models.Model):
    year = models.IntegerField()
    count = models.IntegerField()
    origin = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="origin_migration_set")
    destination = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="destination_migration_set")

