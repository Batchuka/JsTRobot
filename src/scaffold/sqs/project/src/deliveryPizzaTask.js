// src/deliveryPizzaTask.js
const BaseTask = require('../core/strategy/sqs/baseTask');
const { SQS } = require('../core/decorator/sqs');

@SQS()
class DeliveryPizzaTask extends BaseTask {
    onEntry() {
        this.logger.info("Entering DeliveryPizzaTask...");
    }

    execute(...args) {
        // Recebe os detalhes da pizza do pedido
        const flavor = args[0]?.flavor;
        const slices = args[0]?.slices;

        this.logger.info(`Received order for a ${flavor} pizza with ${slices} slices.`);
    }
}

module.exports = DeliveryPizzaTask;
