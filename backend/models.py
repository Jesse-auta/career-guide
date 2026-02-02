from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone

db = SQLAlchemy()

class User(db.model):
    id = db.column(db.Integer, primary_key=True)
    email = db.column(db.String, nullable=False, unique=True)
    

