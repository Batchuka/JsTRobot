// src\scaffold\state\project\src\pizzeria.js
const Pizza = require('./pizza');

class Pizzeria {
    order() {
        const flavor = prompt("What flavor of pizza would you like?");
        const slices = parseInt(prompt("How many slices should the pizza have? (Enter a number): "), 10);
        return new Pizza(flavor, slices);
    }
}

module.exports = Pizzeria;
