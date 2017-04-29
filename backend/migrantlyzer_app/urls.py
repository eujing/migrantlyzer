from django.conf.urls import url

from . import views

urlpatterns = [
    url(r"^$", views.index, name="index"),
    url(r"^testJson$", views.testJson, name="testJson"),
    url(r"^country$", views.get_countries),
    url(r"^category$", views.get_categories),
    url(r"^index$", views.get_indexes),
    url(r"^migration$", views.get_migrations)
]
