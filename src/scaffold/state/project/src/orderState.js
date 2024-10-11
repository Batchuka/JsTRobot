// src\scaffold\state\project\src\orderState.js
const Pizzeria = require('./pizzeria');

class OrderState {
    onEntry() {
        console.log("I'll get the number of the pizzeria...");
        this.pizzeria = new Pizzeria();
    }

    execute() {
        // Retorna um objeto Pizza que é singleton
        this.pizzeria.order();
    }

    onExit() {
        // Nenhuma ação no final deste estado
    }

    onError(e) {
        console.error(e);
    }
}

module.exports = OrderState;
