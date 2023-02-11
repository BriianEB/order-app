from db import db


order_meal_rel = db.Table('order_meal_rel',
    db.Column('order_id', db.Integer, db.ForeignKey('orders.id')),
    db.Column('meal_id', db.Integer, db.ForeignKey('meals.id'))
)

class Order(db.Model):
    __tablename__ = 'orders'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True)
    street = db.Column(db.String(64), unique=True)
    postal_code = db.Column(db.String(5), unique=True)
    city = db.Column(db.String(64), unique=True)

    meals = db.relationship('Meal',
        secondary=order_meal_rel,
        backref=db.backref('orders', lazy='dynamic'),
        lazy='dynamic'
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'street': self.street,
            'postal_code': self.postal_code,
            'city': self.city,
            'meals': [meal.id for meal in self.meals.all()]
        }
