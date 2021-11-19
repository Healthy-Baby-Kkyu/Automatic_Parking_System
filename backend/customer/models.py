from django.db import models

# Create your models here.
class Cars(models.Model):                                                
    car_number = models.CharField(primary_key=True, max_length=10)       
    user_id = models.CharField(max_length=20)                            
    car_type = models.CharField(max_length=20)                           
                                                                         
    class Meta:                                                          
        managed = False                                                  
        db_table = 'cars'                                                
                                                                         
                                                                         
class User(models.Model):                                                
    user_id = models.CharField(primary_key=True, max_length=20)          
    user_name = models.CharField(max_length=45)                          
    password = models.CharField(max_length=30)                           
    birthday = models.DateField(blank=True, null=True)                   
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    point = models.IntegerField(blank=True, null=True)                   
    total_fee = models.IntegerField(blank=True, null=True)               
                                                                         
    class Meta:                                                          
        managed = False                                                  
        db_table = 'user'                 

class ParkingSlot(models.Model):
    parking_slot_id = models.CharField(primary_key=True, max_length=20)
    floor = models.CharField(max_length=5)
    section = models.CharField(max_length=5)
    number = models.CharField(max_length=5)
    slot_state = models.CharField(max_length=5)

    class Meta:
        managed = False
        db_table = 'parking_slot'                                          
                                                                            
                                                                            
class Reservation(models.Model):                                            
    reservation_id = models.IntegerField(primary_key=True)                  
    user_id = models.CharField(max_length=20)                               
    parking_slot_id = models.CharField(max_length=20)                       
    reservation_date = models.DateField()                                   
    start_date = models.DateTimeField()                                     
    end_date = models.DateTimeField()                                       
    price = models.IntegerField()                                           
    state = models.CharField(max_length=30)                                 
                                                                            
    class Meta:                                                             
        managed = False                                                     
        db_table = 'reservation'                                                                           