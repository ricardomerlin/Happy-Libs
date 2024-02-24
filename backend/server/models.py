from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy import ForeignKey, MetaData


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy()

class defaultStory (db.Model, SerializerMixin):
    __tablename__ = 'default_story_table'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Story('{self.title}', '{self.created_at}')"
    
class CompletedStory (db.Model, SerializerMixin):
    __tablename__ = 'completed_story_table'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    likes = db.relationship('Likes', backref='completed_story_table')

    def __repr__(self):
        return f"Story('{self.title}', '{self.created_at}')"
    
class Likes (db.Model, SerializerMixin):
    __tablename__ = 'likes_table'
    
    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, ForeignKey('completed_story_table.id'))

    def __repr__(self):
        return f"Likes('{self.story_id}', '{self.created_at}')"
    
