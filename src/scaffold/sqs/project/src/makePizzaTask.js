// src/makePizzaTask.js
const BaseTask = require('../core/strategy/sqs/baseTask');
const { SQS } = require('../core/decorator/sqs');
const Pizzeria = require('./pizzeria');

@SQS()
class MakePizzaTask extends BaseTask {
    onEntry() {
        this.logger.info("Entering MakePizzaTask...");
    }

    execute(...args) {
        // Inicializa a pizzaria para receber o pedido
        const pizzeria = new Pizzeria();
        const flavor = args[0]?.flavor;
        const slices = args[0]?.slices;

        // Faz o pedido da pizza com os argumentos fornecidos
        const pizza = pizzeria.order(flavor, slices);

        this.logger.info(`Done a pizza flavor ${pizza.flavor} with ${pizza.totalSlices} slices.`);
    }
}

module.exports = MakePizzaTask;
