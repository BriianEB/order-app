from flask import Blueprint, request

from db import db
from models import Meal


meals = Blueprint('meals', __name__)

@meals.route('/meals')
def index():
    meals = Meal.query.all()

    return [meal.to_dict() for meal in meals]

@meals.route('/meals', methods=['POST'])
def create():
    meal = request.get_json()

    if not meal:
        return 'error'

    o_meal = Meal(name=meal['name'], description=meal['description'], price=meal['price'])
    db.session.add(o_meal)
    db.session.commit()
    db.session.refresh(o_meal)

    return o_meal.to_dict()

@meals.route('/meals/<id>')
def show(id):
    meal = Meal.query.get(int(id))

    return meal.to_dict()
