from rest_framework import serializers
from .models import Tarefa
from django.contrib.auth.models import User


class TarefaSerializer(serializers.ModelSerializer):
    criada_em = serializers.DateTimeField(format='%d/%m/%Y %H:%M:%S', read_only=True)
    
    # Campo para incluir o nome de usuário na leitura (opcional, mas útil)
    username = serializers.CharField(source='usuario.username', read_only=True) 

    class Meta:
        model = Tarefa
        fields = ['id', 'titulo', 'descricao', 'concluida', 'criada_em', 'usuario', 'username']
        read_only_fields = ['usuario', 'criada_em']


class CadastroSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) 

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user