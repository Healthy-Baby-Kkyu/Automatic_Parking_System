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
                return JsonResponse({'message' : '로그인 성공', 'data' : queryset.values()[0]}, status = 200)
        # id 존재하지 않음
        return JsonResponse({'message' : '아이디 혹은 비밀번호가 올바르지 않습니다'}, status= 200)
    

# 회원가입 정보를 받아와 신규 회원 추가 
class CreateNewUser(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        if User.objects.filter(user_id = data['user_id']).exists():
            return JsonResponse({'message' : '사용할 수 없는 아이디입니다.'}, status = 200)
        user = User()
        car = Cars()
        user.user_name = data['user_name']
        user.user_id = data['user_id']
        user.password = data['password']
        user.birthday = data['birthday']
        print(user.birthday)
        user.phone_number = data['phone_number']
        user.point = 0
        user.total_fee = 0
        car.car_number = data['car_number']
        car.user_id = data['user_id']
        car.car_type = data['car_type']
        user.save()
        car.save()
        return JsonResponse({'message' : '회원가입 성공'}, status= 200)
    

# 새로운 예약 등록
class CreateResv(generics.CreateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation()
        a = uuid.uuid4()
        b = list(a.int)
        resv.reservation_id = b[:10]
        print(resv.user_id)
        resv.user_id = data['session_id']
        resv.parking_slot_id = data['parking_slot_id']
        resv.reservation_date = data['reservation_date']
        resv.start_date = data['start_date']
        resv.end_date = data['end_date']
        resv.price = data['price']
        resv.state = data['state']
        resv.save()
        return JsonResponse({'message' : '예약에 성공하였습니다.'}, status = 200)
    
# 개인 예약 내역 조회 (*테스트 가능)
class GetUserResv(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        queryset = Reservation.objects.filter(user_id=data['session_id'])
        return JsonResponse({'data' : queryset.values()[0]}, status = 200)
    
# 예약 취소
class DeleteResv(generics.UpdateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        resv = Reservation.objects.get(reservation_id=data['resvID'])
        resv.state = data['state']
        resv.save()
        return JsonResponse({'message' : '예약을 취소하였습니다.'}, status = 200)
        
# 개인 정보 조회 
class GetUserInfo(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        
        user = User.objects.get(user_id=id)
        car = Cars.objects.get(user_id=id)
        result = {
            'user_id' : user.user_id,
            'birthday' : user.birthday,
            'phone_number' : user.phone_number,
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
        
        return JsonResponse({'message' : '정보가 성공적으로 수정되었습니다!'}, status=200)
        

# 개인 보유 포인트 조회 ?   
class GetUserPoint(generics.RetrieveAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        
        point = User.objects.get(user_id=id).point
        return JsonResponse({'data': point, 'message' : '사용자 보유 포인트 조회 성공'}, status=200)

# 포인트 충전
class ChargeUserPoint(generics.RetrieveUpdateAPIView):
    def post(self, request):
        data = json.loads(request.body)
        id = data['session_id']
        point = data['point']
        
        user = User.objects.get(user_id=id)
        user.point = point
        user.save()
        
        return JsonResponse({'data' : user.point, 'message' : '포인트가 성공적으로 충전되었습니다!'}, status=200)






    
    