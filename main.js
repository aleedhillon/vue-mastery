var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        des: 'These are good socks for winter',
        image: './assets/socks.png',
        click: 'http://127.0.0.1:5500/index.html',
        inven: 0,
        details: [
            '80% Cotten',
            '20% polyester',
            'Not Gender Neutral'
        ],
        variants: [
            {
                id: 2234,
                color: 'green'
            },
            {
                id: 2235,
                color: 'blue'
            }
        ],
        sizes: [
            'small',
            'medium',
            'large',
            'Extra Large',
            'Extra extra Large'
        ],
        onSale: true,
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart++;
        }
    }
});