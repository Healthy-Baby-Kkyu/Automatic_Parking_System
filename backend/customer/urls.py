from django.urls import path
from . import views

urlpatterns = [
    path('createResv/', views.CreateNewUser.as_view()),
    path('getPersonalResv/', views.GetUserResv.as_view()),
    path('cancelResv/', views.DeleteResv.as_view()),
    path('getPersonalInfo/', views.GetUserInfo.as_view()),
    path('EditPersonalInfo/', views.UpdateUserInfo.as_view()),
    path('getPersonalPoint/', views.GetUserPoint.as_view()),
    path('chargePoint/', views.ChargeUserPoint.as_view()),
]