from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()
#This script generates users for testing
class Command(BaseCommand):
    help = 'Create multiple users for testing purposes'

    def handle(self, *args, **kwargs):
        users = [
            {"username": "user1", "email": "user7@example.com", "password": "password123"},
            {"username": "user2", "email": "user8@example.com", "password": "password123"},
            {"username": "user3", "email": "user9@example.com", "password": "password123"},
            {"username": "user4", "email": "user10@example.com", "password": "password123"},
            {"username": "user5", "email": "user11@example.com", "password": "password123"},
            {"username": "user6", "email": "user12@example.com", "password": "password123"},
            # Add more users as needed
        ]

        for user_data in users:
            if not User.objects.filter(username=user_data["username"]).exists():
                user = User.objects.create_user(username=user_data["username"], email=user_data["email"], password=user_data["password"])
                self.stdout.write(self.style.SUCCESS(f"Successfully created user {user.username}"))
            else:
                self.stdout.write(self.style.WARNING(f"User {user_data['username']} already exists"))
