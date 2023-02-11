from flask import Blueprint, request

from db import db
from models import Meal, Order


orders = Blueprint('orders', __name__)

@orders.route('/orders')
def index():
    orders = Order.query.all()

    return [order.to_dict() for order in orders]

@orders.route('/orders', methods=['POST'])
def create():
    order = request.get_json()

    if not order:
        return 'error'

    o_order = Order(name=order['name'], street=order['street'], postal_code=order['postal_code'], city=order['city'])
    meals = [Meal.query.get(meal) for meal in order['meals']]

    for meal in meals:
        o_order.meals.append(meal)

    db.session.add(o_order)
    db.session.commit()
    db.session.refresh(o_order)

    return o_order.to_dict()

@orders.route('/orders/<id>')
def show(id):
    order = Order.query.get(int(id))

    return order.to_dict()
