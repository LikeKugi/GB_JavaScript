const SIZE = [];
const STUFF = [];
const TOPPINGS = [];

class FoodProduct {
    #name;
    #price;
    #calories;
    constructor([name, price, calories]) {
        this.#name = name;
        this.#price = price;
        this.#calories = calories;
    }
    get price() {
        return this.#price;
    }
    get calories() {
        return this.#calories;
    }
    get name() {
        return this.#name;
    }
    str() {
        return `${this.name}: ${this.price}; ${this.calories}`
    }
}

for (let sized of [['small', 50, 20], ['big', 100, 40]]) {
    SIZE.push(new FoodProduct([...sized]));
}
for (let stuff of [['cheese', 10, 20], ['salad', 20, 5], ['potato', 15, 10]]) {
    STUFF.push(new FoodProduct([...stuff]));
}
for (let topping of [['spices', 15, 0], ['mayo', 20, 5]]) {
    TOPPINGS.push(new FoodProduct([...topping]));
}


class Hamburger {
    #size;
    #calories;
    #price;
    #stuffings;
    #toppings;

    constructor() {
        this.#size = '';
        this.#calories = 0;
        this.#price = 0;
        this.#stuffings = [];
        this.#toppings = [];
    }
    get price() {
        return this.#price;
    }
    get calories() {
        return this.#calories;
    }
    get size() {
        return this.#size;
    }
    get stuffing() {
        return this.#stuffings.map(el => el.name);
    }
    get toppings() {
        return this.#toppings.map(el => el.name);
    }
    setSize(item) {
        this.#size = item.name;
        this.#addings(item);
    }
    addStuffing(item) {
        this.#stuffings.push(item);
        this.#addings(item);
    }
    removeStuffing(item) {
        const index = this.#stuffings.indexOf(item);
        this.#stuffings = this.#stuffings.splice(index, 1);
        this.#removing(item);
    }
    addTopping(item) {
        this.#toppings.push(item);
        this.#addings(item);
    }
    removeTopping(item) {
        const index = this.#toppings.indexOf(item);
        this.#toppings = this.#toppings.splice(index, 1);
        this.#removing(item);
    }

    #addings(item) {
        this.#calories += item.calories;
        this.#price += item.price;
    }
    #removing(item) {
        this.#price -= item.price;
        this.#calories -= item.calories;
    }

}