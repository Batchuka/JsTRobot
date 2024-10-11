// src\core\feature\table.js
class Item {
    constructor(data) {
        Object.assign(this, data);
    }

    get(key) {
        return this[key];
    }

    set(key, value) {
        this[key] = value;
    }

    update(data) {
        Object.assign(this, data);
    }
}

class Table {
    constructor(columns) {
        this.columns = columns;
        this.items = [];
    }

    addItem(data) {
        if (this.items.find(item => item.get(this.columns[0]) === data[this.columns[0]])) {
            throw new Error(`An item with the same ${this.columns[0]} already exists.`);
        }
        const item = new Item(data);
        this.items.push(item);
    }

    getItem(id) {
        return this.items.find(item => item.get(this.columns[0]) === id);
    }

    updateItem(id, data) {
        const item = this.getItem(id);
        if (item) {
            item.update(data);
        } else {
            throw new Error(`Item with ${this.columns[0]} '${id}' not found.`);
        }
    }
}

module.exports = Table;
