// index.js
const HungryState = require('./hungryState');
const OrderState = require('./src/orderState');
const EatingState = require('./eatingState');
const SatisfiedState = require('./src/satisfiedState');
const DeadState = require('./deadState');

module.exports = {
    HungryState,
    OrderState,
    EatingState,
    SatisfiedState,
    DeadState
};
