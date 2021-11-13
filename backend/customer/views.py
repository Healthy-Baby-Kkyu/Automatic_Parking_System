from django.shortcuts import render
from rest_framework import generics
from rest_framework.serializers import Serializer
from rest_framework.parsers import JSONParser


from .models import User, Cars, ParkingSlot, Reservation
from .serializers import UserSerializer, CarsSerializer, ParkingSlotSerializer, ReservationSerializer


class CurrentUser():
    id = ''
    pw = ''
    name = ''
    
    def __init__(self, id, pw, name):
        self.id = id
        self.pw = pw
        self.name = name      

# Create your views here.
class Send(generics.ListCreateAPIView):
    queryset = User.objects.filter(user_id='ddd')
    serializer_class = UserSerializer

    
    