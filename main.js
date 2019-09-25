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
        interval: null,
        spinButton: 'red',
        stopButton: ''
    },
    methods: {
        addToCart() {
            this.cart++;
        },
        rotateImg(){
            this.spinButton = '';
            this.stopButton = 'red';
            clearInterval(this.interval);
            var self = this;
             this.interval = setInterval(function(){
                let img = self.$refs.img;
                let degree = parseInt(img.getAttribute('class').substring(6));
                if (degree === 360) {
                    degree = 90;
                    img.setAttribute('class', `rotate${degree}`);
                } else {
                    degree += 90;
                    img.setAttribute('class', `rotate${degree}`);
                }
            }, 500);
        },
        stopRotate(){
            clearInterval(this.interval);
            this.spinButton = 'red';
            this.stopButton = '';
        }
    }
});