from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from models import defaultStory, CompletedStory, db
from flask import request
from flask_cors import CORS
import random
from datetime import datetime
import pytz

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000'])
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.sqlite3'

migrate = Migrate(app, db)

db.init_app(app)

@app.route('/')
def index():
    return "Hello, World!"

@app.get('/default_stories')
def get_default_stories():
    default_stories = defaultStory.query.all()
    return [story.to_dict() for story in default_stories]

@app.get('/default_stories/<int:id>')
def get_default_story(id):
    story = defaultStory.query.get(id)
    return story.to_dict()

@app.get('/stories')
def get_completed_stories():
    completed_stories = CompletedStory.query.all()
    return [story.to_dict() for story in completed_stories]

@app.post('/default_stories')
def create_default_story():
    data = request.get_json()

    if 'content' not in data:
        return {"error": "Missing content in request data"}, 400

    try:
        story = defaultStory(content=data['content'])
        db.session.add(story)
        db.session.commit()
    except Exception as e:
        return {"error": str(e)}, 500

    return story.to_dict(), 201

@app.post('/stories')
def create_completed_story():

    data = request.get_json()

    required_fields = ["singular_noun", "plural_noun", "past_tense_verb", "adjective1", "adjective2"]

    if not all(field in data for field in required_fields):
        return {"error": "Missing one or more required fields in request data"}, 400

    try:
        default_stories = defaultStory.query.all()
        print('retrieved default stories!')
        if not default_stories:
            return {"error": "No default stories available"}, 404

        default_story = random.choice(default_stories)

        print(f"default_story.template: {default_story.content}")
        print(f"data: {data}")

        content = default_story.content.format(**data)
        print('got the content')

        utc_now = datetime.utcnow()
        utc_now = utc_now.replace(tzinfo=pytz.utc)

        est_tz = pytz.timezone('US/Eastern')
        est_now = utc_now.astimezone(est_tz)

        print(est_now)

        story = CompletedStory(
            content=content,
            created_at=est_now
        )

        db.session.add(story)
        db.session.commit()
    except Exception as e:
        print(f"Exception: {e}")
        return {"error": str(e)}, 500

    return story.to_dict(), 201


if __name__ == '__main__':
    app.run(port=5555, debug=True)