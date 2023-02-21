const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

class GoodsItem {
    _price;
    _title;
    constructor({title, price}) {
        this._title = title;
        this._price = price;
    }
    render() {
        return `<div class="goods-wrap"><div class="goods-item"><h3>${this._title}</h3><p>${this._price}</p></div></div>`;
    }
}

class GoodsList {
    constructor() {
        this._goods = [];
    }
    fetchGoods() {
        this._goods = [...goods];
    }
    render(elem='.goods-list') {
        const wrapper = document.querySelector(elem);
        wrapper.innerHTML = this._goods.map(el => {
            const item = new GoodsItem({...el});
            return  item.render();
        }).join('');
    }

    totalPrice() {
        return this._goods.reduce((a, item) => a + item.price, 0)
    }
}

const supplies = new GoodsList;
supplies.fetchGoods();
supplies.render();
console.log(supplies.totalPrice());