from django.urls import path
from . import views

urlpatterns = [
    path('getCustomerInfos/', views.GetAllCustomerInfo.as_view()),
    path('getCustomerResv/', views.GetAllCustomerResv.as_view()),
    path('cancelResv/', views.DeleteResv.as_view()),
    path('getMonitoring/', views.GetAllParkingSlotInfo.as_view()),
    path('addSlot/', views.CreateNewSlot.as_view()),
    path('statistics/', views.SendStatistics.as_view()),
]