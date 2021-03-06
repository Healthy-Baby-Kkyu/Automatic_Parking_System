from django.db.models import query
from django.http.response import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework import serializers
from rest_framework.serializers import Serializer
from rest_framework.response import Response
from rest_framework import status
from .models import User, Cars, ParkingSlot, Reservation
from .serializers import UserSerializer, CarsSerializer, ParkingSlotSerializer, ReservationSerializer
import json
import uuid
from datetime import datetime, timedelta
# Create your views here.
# ----------------------------------------------------------------------------
# 로그인 화면에서 id, pw 받아와 유효성 검증
class CheckLogin(generics.ListAPIView):      
    def post(self, request):
        data = json.loads(request.body)
        id = data['user_id']
        pw = data['password']
       # 유효성 검증
        queryset = User.objects.filter(user_id=id)  # user_id에 위에서 얻어온 id값이 들어가야 함
        if queryset:
            # id, pw 모두 일치
            if queryset.values()[0].get('password') == pw:
                return JsonResponse({'message' : 'success', 'data' : queryset.values()[0]}, status = 200)
        # id 존재하지 않음
        return JsonResponse({'message' : 'not exist'}, status= 200)
    

# 회원가입 정보를 받아와 신규 회원 추가 
class CreateNewUser(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        if User.objects.filter(user_id = data['user_id']).exists():
            return JsonResponse({'message' : 'duplicate'}, status = 200)
        user = User()
        car = Cars()
        user.user_name = data['user_name']
        user.user_id = data['user_id']
        user.password = data['password']
        user.birthday = data['birthday']
        user.phone_number = data['phone_number']
        user.point = 0
        user.total_fee = 0
        car.car_number = data['car_number']
        car.user_id = data['user_id']
        car.car_type = data['car_type']
        user.save()
        car.save()
        return JsonResponse({'message' : 'success'}, status= 200)
    

# 새로운 예약 등록
class CreateResv(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation()
        
        a = uuid.uuid4()
        b = str(a.int)[:8]
        # 예약 번호 중복 없을 때까지 생성 반복
        while Reservation.objects.filter(reservation_id=b).exists():
            a = uuid.uuid4()
            b = str(a.int)[:8]
        
        resv.reservation_id = b
        resv.user_id = data['session_id']
        resv.parking_slot_id = data['parking_slot_id']
        resv.reservation_date = data['reservation_date']
        resv.start_date = data['start_date']
        resv.end_date = data['end_date']
        resv.price = data['price']
        resv.state = data['state']
        
        user = User.objects.get(user_id=data['session_id'])
        user.point -= int(data['price'])
        user.total_fee += int(data['price'])
        resv.save()
        user.save()
        return JsonResponse({'data' : resv.reservation_id, 'message' : 'success'}, status = 200)
    
# 개인 예약 내역 조회 (*테스트 가능)
class GetUserResv(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        queryset = Reservation.objects.filter(user_id=data['session_id']).order_by('-reservation_date')
        return JsonResponse({'data' : list(queryset.values())}, status = 200)
    
# 예약 취소
class DeleteResv(generics.UpdateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation.objects.get(reservation_id=data['resvID'])
        resv.state = data['state']
        resv.save()
        
        user = User.objects.get(user_id=resv.user_id)
        user.point += int(data['price'])
        user.total_fee -= int(data['price']) 
        user.save()
        return JsonResponse({'message' : 'success'}, status = 200)
        
# 개인 정보 조회 
class GetUserInfo(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        
        user = User.objects.get(user_id=id)
        car = Cars.objects.get(user_id=id)
        result = {
            'user_id' : user.user_id,
            'password' : user.password,
            'birthday' : user.birthday,
            'phone_number' : user.phone_number,
            'point' : user.point,
            'total_fee' : user.total_fee,
            'car_type' : car.car_type,
            'car_number' : car.car_number                       
        }
        return JsonResponse({'data' : result}, status=200)
    
# 개인 정보 수정
class UpdateUserInfo(generics.RetrieveUpdateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        
        user = User.objects.get(user_id=id)
        car = Cars.objects.get(user_id=id)
        
        user.password = data['password']
        user.birthday = data['birthday']
        user.phone_number = data['phone_number']
        car.car_type = data['car_type']
        car.car_number = data['car_number']
        
        user.save()
        car.save()
        
        return JsonResponse({'message' : 'success'}, status=200)
        

# 개인 보유 포인트 조회 ?   
class GetUserPoint(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        
        point = User.objects.get(user_id=id).point
        return JsonResponse({'data': point, 'message' : 'success'}, status=200)

# 포인트 충전
class ChargeUserPoint(generics.RetrieveUpdateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        point = data['point']
        
        user = User.objects.get(user_id=id)
        user.point = point
        user.save()
        
        return JsonResponse({'data' : user.point, 'message' : 'success'}, status=200)

# 예약 시작/끝 시간 기준 주차 슬롯의 예약 내역 조회
class alreadyReserved(generics.ListAPIView):
    def post(self, request):
        data = json.loads(request.body)
        start_date = data['start_date']
        end_date = data['end_date']
        
        start_time = datetime.strptime(start_date, '%Y-%m-%d %H:%M') + timedelta(hours=9)
        end_time = datetime.strptime(end_date, '%Y-%m-%d %H:%M') + timedelta(hours=9)

        print('start_date', start_time)
        print('end_date', end_time)
        result = []
        queryset_resv1 = Reservation.objects.filter(start_date__lte = start_time, end_date__gte = start_time).order_by('parking_slot_id')
        queryset_resv2 = Reservation.objects.filter(start_date__lte = start_time, end_date__gte = end_time ).order_by('parking_slot_id')
        queryset_resv3 = Reservation.objects.filter(start_date__lte = end_time, end_date__gte = end_time).order_by('parking_slot_id')

        parking_slot = ParkingSlot.objects.all().order_by('parking_slot_id').values()
        result_parking_slot = list(parking_slot)
        
        result.append(queryset_resv1.values())
        result.append(queryset_resv2.values())
        result.append(queryset_resv3.values())

        for i in range(0, 3):
            index = 0
            for resv in result[i]:
                print(resv.get('reservation_id'))
                while index < len(result_parking_slot):
                    if resv.get('parking_slot_id') != result_parking_slot[index].get('parking_slot_id'):
                        pass
                    else:
                        if result_parking_slot[index].get('slot_state') == '1':
                            result_parking_slot[index]['slot_state'] = '2'
                            break
                    index += 1

        return JsonResponse({'parking_slot' : result_parking_slot}, status=200)  

                        
    
    