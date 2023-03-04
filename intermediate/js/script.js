const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}/catalogData.json`;
const GET_GOODS_BASKET_ITEMS = `${BASE_URL}/getBasket.json`;

const app = new Vue({
    el: '#root',
    data: {
        goods: [],
        searchLine: '',
        isVisibleCart: false,
    },
    methods: {
        makeGETRequest(url, callback) {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();

            xhr.onload = function () {
                if (xhr.readyState === 4) {
                    callback(JSON.parse(xhr.response));
                }
            }
        },
        toggleCart() {
            this.isVisibleCart = !this.isVisibleCart;
        }
    },
    mounted() {
        this.makeGETRequest(GET_GOODS_ITEMS, (goods) => {
            this.goods = goods;
        });
    },
    computed: {
        calculatePrice() {
            return this.goods.reduce((a, {price}) => a + price, 0)
        },
        filteredGoods() {
            return this.goods.filter((item) => {
                const query = new RegExp(this.searchLine, 'i');
                return query.test(item.product_name);
            })
        }
    }
});





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

// const supplies = new GoodsList;
// supplies.fetchGoods();
// supplies.render();
// console.log(supplies.totalPrice());