// src/core/strategy/index.js

class Strategy {
    execute() {
        throw new Error('execute() must be implemented');
    }
}

class ConcreteStrategyA extends Strategy {
    execute() {
        console.log('Executing Strategy A');
    }
}

module.exports = {
    Strategy,
    ConcreteStrategyA,
};
