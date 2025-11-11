from rest_framework import viewsets, permissions
from .models import Tarefa
from .serializers import TarefaSerializer, CadastroSerializer
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .permissions import IsOwnerOrReadOnly



class TarefaViewSet(viewsets.ModelViewSet):
    serializer_class = TarefaSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def get_queryset(self):
        return Tarefa.objects.all()

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)



class CadastroView(APIView):
    permission_classes = [AllowAny] 

    def post(self, request):
        serializer = CadastroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Usuário criado com sucesso! Faça o login."}, status=status.HTTP_201_CREATED)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
