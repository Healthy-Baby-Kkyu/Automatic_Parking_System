from django.contrib import admin

# Register your models here.
from .models import User, Cars, Reservation, ParkingSlot

admin.site.register(User)
admin.site.register(Cars)
admin.site.register(Reservation)
admin.site.register(ParkingSlot)