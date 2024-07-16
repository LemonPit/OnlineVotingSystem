import random
from django.core.management.base import BaseCommand
from api.models import Election, Ballot, Candidate  # Ensure this import matches your actual app name

class Command(BaseCommand):
    help = 'Create random candidates for each ballot in each election'

    def handle(self, *args, **kwargs):
        names = [
            'John Doe', 'Jane Smith', 'Alice Johnson', 'Bob Brown', 'Charlie Davis',
            'Emily Wilson', 'Frank Thompson', 'Grace Martinez', 'Hank Lee', 'Ivy Kim'
        ]
        descriptions = [
            'A passionate individual with a vision for the future.',
            'Experienced and dedicated to making a change.',
            'Committed to representing the community.',
            'Bringing fresh ideas and a new perspective.',
            'Focused on transparency and accountability.',
            'Driven by a desire to serve and improve the lives of others.',
            'A strong leader with a proven track record.',
            'Eager to work hard and deliver results.',
            'Determined to create a positive impact.',
            'Advocating for innovation and progress.'
        ]

        elections = Election.objects.all()

        for election in elections:
            ballots = Ballot.objects.filter(election=election)
            for ballot in ballots:
                # Create 3 random candidates for each ballot
                for _ in range(3):
                    name = random.choice(names)
                    description = random.choice(descriptions)
                    if not Candidate.objects.filter(election=election, ballot=ballot, name=name).exists():
                        Candidate.objects.create(
                            election=election,
                            ballot=ballot,
                            name=name,
                            description=description
                        )
                        self.stdout.write(self.style.SUCCESS(f"Successfully created candidate {name} for {ballot.title} in election {election.title}"))
                    else:
                        self.stdout.write(self.style.WARNING(f"Candidate {name} already exists for {ballot.title} in election {election.title}"))
