from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Election, Ballot, Candidate, Choice, Vote

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_verified']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            is_verified=False  # Default value or validate this based on your logic
        )
        return user

class ElectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Election
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'status']

class BallotSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ballot
        fields = ['id', 'election', 'title']

class CandidateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ['id', 'name', 'description', 'election']

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'ballot', 'candidate', 'choice_text']

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ['id', 'voter', 'choice']

class ChoiceResultSerializer(serializers.Serializer):
    choice_id = serializers.IntegerField()
    choice_text = serializers.CharField(max_length=200)
    candidate_name = serializers.CharField(max_length=100)
    vote_count = serializers.IntegerField()

class BallotResultSerializer(serializers.Serializer):
    ballot_id = serializers.IntegerField()
    ballot_title = serializers.CharField(max_length=200)
    choices = ChoiceResultSerializer(many=True)

class ElectionResultSerializer(serializers.Serializer):
    election_id = serializers.IntegerField()
    election_title = serializers.CharField(max_length=200)
    election_description = serializers.CharField(max_length=200, allow_blank=True, allow_null=True)
    start_date = serializers.DateTimeField()
    end_date = serializers.DateTimeField()
    status = serializers.CharField(max_length=50)
    ballots = BallotResultSerializer(many=True)