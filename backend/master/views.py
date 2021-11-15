from django.shortcuts import render
from rest_framework import generics
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from customer.serializers import UserSerializer, ReservationSerializer, CarsSerializer, ParkingSlotSerializer
from customer.models import User, Cars, ParkingSlot, Reservation

# 전체 고객 정보 조회 (*테스트 가능)
class GetAllCustomerInfo(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
# 전체 고객 예약 내역 조회 (*테스트 가능)
class GetAllCustomerResv(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    
# 관리자 고객 예약 취소
class DeleteResv(generics.RetrieveDestroyAPIView):
    queryset = ''
    
# 전체 주차 자리 정보 조회 (*테스트 가능)
class GetAllParkingSlotInfo(generics.ListAPIView):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer
    
# 주차 자리 추가
class CreateNewSlot(generics.CreateAPIView):
    queryset = ''
