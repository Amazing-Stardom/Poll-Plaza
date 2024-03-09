from django.urls import path

from . import views

app_name = "polls"
urlpatterns = [
    path("", views.IndexView.as_view(), name="index"),
    # path("<int:pk>/", views.DetailView.as_view(), name="detail"),
    # path("<int:pk>/results/", views.ResultsView.as_view(), name="results"),
    # path("<int:question_id>/vote/", views.vote, name="vote"),
    path("create_poll", views.create_poll, name="create_poll"),
    path("fetch_polls", views.fetch_polls, name="fetch_polls"), 
    # path("fetch_tag", views.fetch_tag, name="fetch_tag"),
    # filter_by_tag  
    path("filter_tag", views.filter_tag, name='polls'),
    path("update_choice/<int:pk>", views.update_poll_option, name='update_poll_option'),
    path("fetch_polls/id=<int:pk>/", views.fetch_poll , name='update_poll_option'),
    path("Vote/id=<int:pk>/", views.fetch_poll , name='update_poll_option'),
    #fetch all tags part
    path("fetch_tags/", views.fetch_tags , name='update_poll_option')
]
