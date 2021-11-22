from django.shortcuts import render
from rest_framework import generics
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from django.http.response import HttpResponse, JsonResponse
from customer.serializers import UserSerializer, ReservationSerializer, CarsSerializer, ParkingSlotSerializer
from customer.models import User, Cars, ParkingSlot, Reservation
import json
import datetime

# 전체 고객 정보 조회 (*테스트 가능)
class GetAllCustomerInfo(generics.ListAPIView):
    def get(self, request):
        queryset_user = User.objects.all()
        queryset_car = Cars.objects.all()
        return JsonResponse({'user' : list(queryset_user.values()), 'car' : list(queryset_car.values())}, status=200)
    
# 전체 고객 예약 내역 조회 (*테스트 가능)
class GetAllCustomerResv(generics.ListAPIView):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer
    
# 관리자 고객 예약 취소
class DeleteResv(generics.RetrieveDestroyAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation.objects.get(reservation_id=data['resvID'])
        resv.state = data['state']
        resv.save()
        return JsonResponse({'message' : 'success'}, status=200)

# 전체 주차 자리 정보 조회
class GetAllParkingSlotInfo(generics.ListAPIView):
    queryset = ParkingSlot.objects.all()
    serializer_class = ParkingSlotSerializer
    
# 주차 자리 추가
class CreateNewSlot(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        parking_slot_id = data['parking_slot_id']
        slot = ParkingSlot.objects.get(parking_slot_id=parking_slot_id)
        slot.slot_state = data['slot_state']
        slot.save()
        return JsonResponse({'message' : 'success'}, status=200)

class SendStatistics(generics.ListAPIView):
    def get(self, request):
        queryset_users = User.objects.all()
        total_users = len(queryset_users)
        
        today = datetime.datetime.today()

        queryset_monthly = Reservation.objects.filter(reservation_date__month=today.month)
        monthly_visitors = len(queryset_monthly)
        print('queryset_monthly', queryset_monthly)
        
        queryset_daily = Reservation.objects.filter(reservation_date=today)
        daily_visitors = len(queryset_daily)
        print('queryset_daily', queryset_daily)

        weekly_visitors = []
        weekly_canceler = []
        for i in range(0, 7):
            queryset_weekly = Reservation.objects.filter(reservation_date = today - datetime.timedelta(days=i))
            queryset_canceler = Reservation.objects.filter(reservation_date = today - datetime.timedelta(days=i), state='-1')
            weekly_visitors.append(len(queryset_weekly))
            weekly_canceler.append(len(queryset_canceler))
        print('weekly_visitors', weekly_visitors)
        print('weekly_canceler', weekly_canceler)

        resv_time = []
        resv_slot = []
        for j in range(0,24,3):
            count_resv = 0
            count_slot = 0
            for k in range(0,3):
                queryset_resv = Reservation.objects.filter(start_date__date = today, start_date__hour = j)
                queryset_slot = Reservation.objects.filter(start_date__date = today, start_date__hour = j, state='1')
                count_resv += len(queryset_resv)
                count_slot += len(queryset_slot)
            resv_time.append(count_resv)
            resv_slot.append(count_slot)

        # print('resv_time', resv_time)
        # print('resv_slot', resv_slot)

        result = {
            'total_users' : total_users,
            'monthly_visitors' : monthly_visitors,
            'daily_visitors' : daily_visitors,
            'weekly_visitors' : weekly_visitors,
            'weekly_canceler' : weekly_canceler,
            'resv_time' : resv_time,
            'resv_slot' : resv_slot,
        }

        return JsonResponse({'data' : result}, status=200)