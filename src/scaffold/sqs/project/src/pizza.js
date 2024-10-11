// src\scaffold\state\project\src\pizza.js
class Pizza {
    constructor(flavor = null, slices = 0) {
        this.flavor = flavor;
        this.totalSlices = slices;
        this.slicesEaten = 0;
    }

    eatSlice() {
        this.slicesEaten += 1;
    }

    isSatisfied() {
        return this.slicesEaten >= this.totalSlices;
    }

    toString() {
        return `Pizza: ${this.flavor}, Total slices: ${this.totalSlices}, Slices eaten: ${this.slicesEaten}`;
    }
}

module.exports = Pizza;
