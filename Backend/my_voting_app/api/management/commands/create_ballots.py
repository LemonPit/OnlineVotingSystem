from django.core.management.base import BaseCommand
from api.models import Election, Ballot  # Ensure this import matches your actual app name

class Command(BaseCommand):
    help = 'Create President and Vice President ballots for each election'

    def handle(self, *args, **kwargs):
        # Retrieve all elections
        elections = Election.objects.all()

        for election in elections:
            # Create President ballot if it doesn't exist
            if not Ballot.objects.filter(election=election, title='President').exists():
                Ballot.objects.create(
                    election=election,
                    title='President'
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully created President ballot for election {election.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"President ballot already exists for election {election.title}"))

            # Create Vice President ballot if it doesn't exist
            if not Ballot.objects.filter(election=election, title='Vice President').exists():
                Ballot.objects.create(
                    election=election,
                    title='Vice President'
                )
                self.stdout.write(self.style.SUCCESS(f"Successfully created Vice President ballot for election {election.title}"))
            else:
                self.stdout.write(self.style.WARNING(f"Vice President ballot already exists for election {election.title}"))
