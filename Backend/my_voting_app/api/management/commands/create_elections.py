import json
from datetime import timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from api.models import Election  # Ensure this import matches your actual app name

class Command(BaseCommand):
    help = 'Create multiple elections for testing purposes'

    def handle(self, *args, **kwargs):
        # Define the elections you want to create
        elections = [
            {
                "title": "Student Council Election 2026",
                "description": "Election for the student council 2026.",
                "start_date": timezone.now() + timedelta(days=10),
                "end_date": timezone.now() + timedelta(days=20),
                "status": "upcoming",
            },
            {
                "title": "Science Club Election 2024",
                "description": "Election for the science club 2024.",
                "start_date": timezone.now(),
                "end_date": timezone.now() + timedelta(days=25),
                "status": "active",
            },
            {
                "title": "Sports Team Election 2024",
                "description": "Election for the sports team 2024.",
                "start_date": timezone.now(),
                "end_date": timezone.now() + timedelta(days=30),
                "status": "active",
            },
            # Add more elections as needed
        ]

        for election_data in elections:
            if not Election.objects.filter(title=election_data["title"]).exists():
                election = Election.objects.create(
                    title=election_data["title"],
                    description=election_data["description"],
                    start_date=election_data["start_date"],
                    end_date=election_data["end_date"],
                    status=election_data["status"]
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully created election {election.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"Election {election_data['title']} already exists"))
