from django.db import models
from django.contrib.auth.models import User



14)
    cv=models.FileField(upload_to="cvs")
    date_craeted=models.DateTimeField(auto_now_add=True)

class academic_supervisor(models.Model):
     name=models.CharField(max_length=100)
     user_id=models.AutoField(primary_key=True)
     email=models.EmailField()
     phone=models.CharField(max_length=13)
     department=models.CharField(max_length=50)
     office_location=models.CharField(max_length=100)
     specialization= models.CharField()
     student=models.ForeignKey(Students, null=True,on_delete=models.SET_NULL)

# Create your models here.
