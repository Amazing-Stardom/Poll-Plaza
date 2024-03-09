from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('polls/', include('polls.urls')),  # Include polls.urls for the root path
    path('admin/', admin.site.urls),
]
