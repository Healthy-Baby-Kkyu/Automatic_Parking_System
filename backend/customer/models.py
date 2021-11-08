from django.db import models

# Create your models here.
class Customer(models.Model):
    user_id = models.CharField(max_length=100, unique=True)
    user_name = models.TextField()
    password = models.TextField()
    birthday = models.DateTimeField()
    phone_number = models.IntegerField()
    point = models.IntegerField()
    total_fee = models.IntegerField()

    def __str__(self):
        return [self.id ,self.name, self.descript]