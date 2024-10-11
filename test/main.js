// tests/main.js
const { Robot, logExecution } = require('../src/core');

// Instanciando um robô para teste
const myRobot = new Robot('JsBot');

// Exemplo de decorador em uso
class Example {
    @logExecution
    static performAction(action) {
        myRobot.execute(action);
    }
}

// Testando a lógica do robô
Example.performAction('andar para frente');
