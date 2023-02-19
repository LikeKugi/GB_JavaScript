const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];
const renderGoodsItem = (title='supply', price=0) => {
    return `<div class="goods-wrap"><div class="goods-item"><h3>${title}</h3><p>${price}</p></div></div>`;
};
const renderGoodsList = (list=[{title:'supply', price:0}]) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    document.querySelector('.goods-list').innerHTML = goodsList.join('');
}
renderGoodsList(goods);