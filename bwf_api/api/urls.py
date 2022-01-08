from django.conf.urls import url, include
from api import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'groups', views.GroupView)
router.register(r'events', views.EventView)
router.register(r'bets', views.BetView)
router.register(r'members', views.MemberView)
router.register(r'comments', views.CommentViewset)
router.register(r'users', views.UserViewSet)
router.register(r'profile', views.UserProfileViewset)


urlpatterns = [
    url(r'^', include(router.urls)),
    url('authenticate/', views.CustomObtainAuthToken.as_view())
]