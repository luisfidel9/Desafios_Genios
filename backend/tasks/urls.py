from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TarefaViewSet, CadastroView

router = DefaultRouter()
router.register(r'tarefas', TarefaViewSet, basename='tarefa')

urlpatterns = [
    path('', include(router.urls)),

    path('cadastro/', CadastroView.as_view(), name='cadastro'),
]