from rest_framework import serializers
from .models import Cars, User, ParkingSlot, Reservation

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'user_id',
            'user_name',
            'password',
            'birthday',
            'phone_number',
            'point',
            'total_fee',
        )

class CarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cars
        fields = (
            'car_number',
            'user_id',
            'car_type',
        )

class ParkingSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParkingSlot
        fields = (
            'parking_slot_id',
            'floor',
            'section',
            'number',
            'slot_state',
        )

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            'reservation_id',
            'user_id',
            'parking_slot_id',
            'reservation_date',
            'start_date',
            'end_date',
            'price',
            'state',
        )