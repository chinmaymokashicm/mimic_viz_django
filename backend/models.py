from django.db import models

# Create your models here.
class Patient(models.Model):
    subject_id = models.IntegerField()
    gender = models.CharField(max_length=1)
    anchor_age = models.IntegerField()
    anchor_year = models.IntegerField()
    anchor_year_group = models.CharField(max_length=255)
    dod = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        db_table = "patients"
    
class Event(models.Model):
    subject_id = models.IntegerField()
    hadm_ids = models.JSONField()
    hadm = models.JSONField()
    
    class Meta:
        db_table = "events"
    
class Admission(models.Model):
    module = models.CharField(max_length=255)
    table = models.CharField(max_length=255)
    subject_id = models.IntegerField()
    data = models.JSONField()
    
    class Meta:
        db_table = "admissions"