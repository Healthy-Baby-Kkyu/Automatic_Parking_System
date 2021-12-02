from django.shortcuts import render
from rest_framework import generics
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from django.http.response import HttpResponse, JsonResponse
from customer.serializers import UserSerializer, ReservationSerializer, CarsSerializer, ParkingSlotSerializer
from customer.models import User, Cars, ParkingSlot, Reservation
import json
from datetime import date
import datetime

# 전체 고객 정보 조회 (*테스트 가능)
class GetAllCustomerInfo(generics.ListAPIView):
    def get(self, request):
        queryset_user = User.objects.all()
        queryset_car = Cars.objects.all().order_by('user_id')
        return JsonResponse({'user' : list(queryset_user.values()), 'car' : list(queryset_car.values())}, status=200)
    
# 전체 고객 예약 내역 조회 (*테스트 가능)
class GetAllCustomerResv(generics.ListAPIView):
    queryset = Reservation.objects.all().order_by('-reservation_date')
    serializer_class = ReservationSerializer
    
# 관리자 고객 예약 취소
class DeleteResv(generics.RetrieveDestroyAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation.objects.get(reservation_id=data['reservation_id'])
        resv.state = data['state']
        resv.save()
        
        user = User.objects.get(user_id=resv.user_id)
        user.point += int(data['price'])
        user.total_fee -= int(data['price']) 
        user.save()
        return JsonResponse({'message' : 'success'}, status=200)

# 전체 주차 자리 정보 조회
class GetAllParkingSlotInfo(generics.ListAPIView):
    def get(self, request):
        now = datetime.datetime.now()
        now = now + datetime.timedelta(hours=9)

        # start_date가 현재 시간보다 작고, end_date가 현재 시간보다 큰 예약만
        current_resv = Reservation.objects.filter(start_date__lte=now, end_date__gte=now).order_by('parking_slot_id')
        parking_slot = ParkingSlot.objects.all().order_by('parking_slot_id').values()
        result_parking_slot = list(parking_slot)

        index = 0
        for resv in current_resv.values():
            while index < len(result_parking_slot):
                if resv.get('parking_slot_id') != result_parking_slot[index].get('parking_slot_id'):
                    pass
                else:
                    result_parking_slot[index]['slot_state'] = '2'
                    break
                index += 1

        return JsonResponse({'resv' : list(current_resv.values()), 'parking_slot' : result_parking_slot}, status=200)
        
    
# 주차 자리 추가
class CreateNewSlot(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        parking_slot_id = data['parking_slot_id']
        print('parking_slot_id', parking_slot_id)
        slot = ParkingSlot.objects.get(parking_slot_id=parking_slot_id)
        
        slot.slot_state = data['slot_state']
        slot.save()
        return JsonResponse({'message' : 'success'}, status=200)

class SendStatistics(generics.ListAPIView):
    def get(self, request):
        queryset_users = User.objects.all()
        total_users = len(queryset_users)
        
        today = date.today()

        queryset_monthly = Reservation.objects.filter(reservation_date__month=today.month)
        monthly_visitors = len(queryset_monthly)
        #print('queryset_monthly', queryset_monthly)
        
        queryset_daily = Reservation.objects.filter(reservation_date=today)
        daily_visitors = len(queryset_daily)
        #print('queryset_daily', queryset_daily)

        weekly_visitors = []
        weekly_canceler = []
        for i in range(6, -1, -1):
            queryset_weekly = Reservation.objects.filter(reservation_date = today - datetime.timedelta(days=i))
            queryset_canceler = Reservation.objects.filter(reservation_date = today - datetime.timedelta(days=i), state='-1')
            weekly_visitors.append(len(queryset_weekly))
            weekly_canceler.append(len(queryset_canceler))
        print('weekly_visitors', weekly_visitors)
        print('weekly_canceler', weekly_canceler)

        queryset_slot = ParkingSlot.objects.all()
        all_slot_count = len(queryset_slot)

        now = datetime.datetime.now()
        now = now + datetime.timedelta(hours=9)

        # start_date가 현재 시간보다 작고, end_date가 현재 시간보다 큰 예약만
        current_resv = Reservation.objects.filter(start_date__lte=now, end_date__gte=now)
        current_slot_count = len(current_resv)
        slot_rate = current_slot_count / all_slot_count * 100
        #print('today', today)
        
        resv_time = []
        resv_slot = []
        for j in range(0,24,3):
            count_resv = 0
            for k in range(0,3):
                if j == 0:
                    queryset_resv = Reservation.objects.filter(start_date__contains = str(today) + ' 0'+str(j+k)+':3')
                    count_resv += len(queryset_resv)
                    queryset_resv = Reservation.objects.filter(start_date__contains = str(today) + ' 0'+str(j+k)+':0')
                elif j < 7:
                    queryset_resv = Reservation.objects.filter(start_date__contains = str(today) + ' 0'+str(j+k)+':')
                else:
                    queryset_resv = Reservation.objects.filter(start_date__contains = str(today) + ' ' + str(j+k)+':')
                count_resv += len(queryset_resv)
            resv_time.append(count_resv)
            resv_slot.append(count_resv / all_slot_count * 100)

        #print('resv_time', resv_time)
        #print('resv_slot', resv_slot)

        result = {
            'total_users' : total_users,
            'monthly_visitors' : monthly_visitors,
            'daily_visitors' : daily_visitors,
            'weekly_visitors' : weekly_visitors,
            'weekly_canceler' : weekly_canceler,
            'resv_time' : resv_time,
            'resv_slot' : resv_slot,
            'slot_rate' : slot_rate,
        }

        return JsonResponse({'data' : result}, status=200)

class checkCar(generics.ListAPIView):
    def post(self, request):
        data = json.loads(request.body)
        queryset_car = Cars.objects.filter(car_number = data['car_number']) 
        now = datetime.datetime.today()
        now = now + datetime.timedelta(hours=9)

        if queryset_car.count() == 0:
            result = False
            # print('queryset_car', queryset_car)
            return JsonResponse({'data' : result}, status=200)
        else:
            user = queryset_car.values()[0].get('user_id')
            # print('user', user)
            queryset_resv = Reservation.objects.filter(user_id = user, start_date__lte = now, end_date__gte = now)
            # print('qureyset_resv', queryset_resv)
            if queryset_resv.count == 0:
                result = False
                # print('queryset_resv', queryset_resv)
                return JsonResponse({'data' : result}, status=200)
            else:
                result = True
                # print('queryset_resv', queryset_resv)
                return JsonResponse({'data' : result}, status=200)