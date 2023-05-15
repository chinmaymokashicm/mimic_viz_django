from django.urls import path
from . import views

app_name = 'backend'

urlpatterns = [
    path('api/patients/<int:subject_id>/', views.get_patients_by_subject_id, name='patients_by_subject_id'),
    path('api/events/<int:subject_id>/', views.get_events_by_subject_id, name='events_by_subject_id'),
    # path('api/admissions/<int:subject_id>/<str:module>/<str:table>/', views.get_admissions, name='admissions'),
    path('api/admissions/<int:subject_id>/<str:module>/<str:table>/<int:hadm_id>/', views.get_admissions, name='admissions_with_hadm_id'),
    path('api/admissions/<int:subject_id>/<str:module>/<str:table>/', views.get_admissions, name='admissions_without_hadm_id'),
]


# 10015860