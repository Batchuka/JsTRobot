// src\core\strategy\sqs\index.js

const BaseTask = require('./baseTask');
const SQSManager = require('./manager');
const SQSMessage = require('./messageBuilder').SQSMessage;
const SQSMessageBuilder = require('./messageBuilder').SQSMessageBuilder;
const SQSRegistry = require('./sqsRegistry');
const SQSStrategy = require('./strategy');

module.exports = {
    BaseTask,
    SQSManager,
    SQSMessage,
    SQSMessageBuilder,
    SQSRegistry,
    SQSStrategy,
};
