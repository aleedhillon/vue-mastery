Vue.config.productionTip = false;
var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        des: 'These are good socks for winter',
        image: './assets/socks-green.jpg',
        click: 'http://127.0.0.1:5500/index.html',
        inven: 20,
        details: [
            '80% Cotten',
            '20% Polyester',
            'Not Gender Neutral'
        ],
        variants: [
            {
                id: 2234,
                color: 'Green',
                image: './assets/socks-green.jpg'
            },
            {
                id: 2235,
                color: 'Blue',
                image: './assets/socks-blue.jpg'
            }
        ],
        sizes: [
            'Small',
            'Medium',
            'Large',
            'Extra Large',
            'Extra Extra Large'
        ],
        onSale: true,
        cart: 0,
        interval: null,
        spinButton: 'red',
        stopButton: 'disabledButton'
    },
    methods: {
        addToCart() {
            this.cart++;
        },
        removeFromCart(){
            if(this.cart > 0){
                this.cart--;
            }
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
            this.stopButton = 'disabledButton';
        },
        updateProduct(image){
            this.image = image;
        },
    }
});