from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.core.serializers import serialize
from . import models

# Create your views here.
def index(request):
    return HttpResponse("Hello World!")

def testJson(request):
    return JsonResponse({
        "Hello": "World!"
    })

def get_countries(request):
    return JsonResponse(
            serialize("json", models.Country.objects.all()),
        safe=False, content_type='application/json')

def get_categories(request):
    if request.method == "GET":

        return JsonResponse(
            serialize("json", models.Index.objects.all(), use_natural_foreign_keys=True),
            safe=False)

def get_migrations(request):
    if request.method == "GET":
        country_name = request.GET["country"]
        year = request.GET["year"]

        queryset = models.MigrationDataPoint.objects.filter(origin__name=country_name, year=year)


        return JsonResponse(
            serialize("json", queryset, use_natural_foreign_keys=True),
            safe=False)

def get_indexes(request):
    if request.method == "GET":
        country = request.GET["country"]
        year = request.GET["year"]

        queryset = models.IndexDataPoint.objects.filter(
            country__name=country, year=year)

        return JsonResponse(
            serialize("json", queryset, use_natural_foreign_keys=True),
            safe=False)
