from django.urls import path
from . import views

urlpatterns = [
    path('', views.Send.as_view()),
]