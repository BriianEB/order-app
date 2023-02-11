from db import db


class Meal(db.Model):
    __tablename__ = 'meals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    description = db.Column(db.String(64))
    price = db.Column(db.Float)

    def to_dict(self):
        meal = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
        }

        orders = []
        orders_objs = self.orders.all()
        if orders_objs:
            orders = [order.id for order in orders_objs]

        meal.update({'orders': orders})

        return meal
