# OnlineVotingSystem

#Backend setup
#Step 1
While inside the backend folder
cd backend
Create a virtual environment using python for the backend
python -m venv venv

Start the virtual environment
venv\Scripts\activate

#Step 2
While in the virtual environment install Django and DJango rest framework and the cors headers
pip install django djangorestframework django-cors-headers

#Step 3
Now Run
cd my_voting_app
Inside of MY_VOTING_APP
Migrate and Create Superuser
Run both of these commands
python manage.py makemigrations
python manage.py migrate
(This second command will ask you to create the superuser, just pick a name, email and password)
python manage.py createsuperuser

#Step 4
Test the django server
python manage.py runserver
(Navigate to http://localhost:8000/api)
(Navigate to http://localhost:8000/admin/api to access the admin UI for SQLlite)
