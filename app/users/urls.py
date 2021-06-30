from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from . import views

app_name = 'users'

urlpatterns = [
    path('user-list/', views.UserAPIView.as_view()),
    #path("user-list/", views.user_list),
    path('user-detail/<int:pk>/', views.UserDetails.as_view()),
    #path("user-detail/<int:pk>/", views.user_detail),
    path('login/', views.ObtainTokenPairWithUsernameView.as_view(), name='token_create'), 
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.CustomUserCreate.as_view(), name="create_user"),
]