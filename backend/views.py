from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import yaml, atexit, json

from .models import Admission, Patient, Event

from .mongo import Mongo as MongoConnect

# Create your views here.

# def get_patients_by_subject_id(request, subject_id):
#     patients = Patient.objects.filter(subject_id=subject_id)
#     print(patients)
#     # Process the patients data if needed
#     data = list(patients.values())
#     return JsonResponse(data, safe=False)

# def get_events_by_subject_id(request, subject_id):
#     events = Event.objects.filter(subject_id=subject_id)
#     # Process the events data if needed
#     data = list(events.values())
#     return JsonResponse(data, safe=False)

# def get_admissions(request, subject_id, module, table, hadm_id=None):
#     admissions = Admission.objects.filter(
#         subject_id=subject_id,
#         module=module,
#         table=table
#     )
#     if hadm_id is not None:
#         admissions = admissions.filter(hadm_id=hadm_id)
    
#     # Process the admissions data if needed
#     data = list(admissions.values())
#     return JsonResponse(data, safe=False)

mongo_connect = MongoConnect()
mongo_connect.connect()

def get_patients_by_subject_id(request, subject_id):
    # Query the patients collection
    patients = mongo_connect.db.patients.find({'subject_id': subject_id}, {"_id": 0})

    # Process the patients data if needed
    data = list(patients)
    data = json.loads(json.dumps(data, default=str))  # Convert BSON to JSON

    return JsonResponse(data, safe=False)

def get_events_by_subject_id(request, subject_id):
    # Query the events collection
    events = mongo_connect.db.events.find({'subject_id': subject_id}, {"_id": 0})

    # Process the events data if needed
    data = list(events)
    data = json.loads(json.dumps(data, default=str))  # Convert BSON to JSON

    return JsonResponse(data, safe=False)

def get_admissions(request, subject_id, module, table, hadm_id=None):
    query = {
        'subject_id': subject_id,
        'module': module,
        'table': table
    }

    # Add hadm_id to the query if provided
    if hadm_id:
        query['hadm_ids'] = hadm_id

    # Query the admissions collection
    admissions = mongo_connect.db.admissions.find(query, {"_id": 0})

    # Process the admissions data if needed
    data = list(admissions)
    data = json.loads(json.dumps(data, default=str))  # Convert BSON to JSON

    return JsonResponse(data, safe=False)

def cleanup():
    mongo_connect.disconnect()

atexit.register(cleanup)