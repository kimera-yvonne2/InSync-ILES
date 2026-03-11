from django.db import models

class students(models.Model):
    name= models.CharField(max_length=100)
    reg_number=models.CharField(max_length=50)
    email=models.EmailField()
    course=models.CharField(max_length=100)
    year_of_study=models.IntegerField()
    phone_number=models.CharField(max_length=10)

# Create your models here.
