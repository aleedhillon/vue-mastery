Vue.config.productionTip = false;
Vue.component('product-details', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <h4 class="h4">Details</h4>
            <ul class="small-list">
                <li class="green" v-for="detail in details">{{ detail }}</li>
            </ul>
        </div>
    `
});
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    template: `
        <div class="product">
            <div class="product-image">
                <img ref="img" class="rotate0" v-bind:src="image" alt="No image yet">
                <div class="buttons">
                    <button v-bind:class="spinButton" v-on:click="rotateImg()">Spin</button>
                    <button v-bind:class="stopButton" v-on:click="stopRotate()">Stop</button>
                </div>
            </div>
            
            <div class="product-info">
                <h2>{{ title }}</h2>
                <p :class="{ strike: outOfStock }">In Stock</p>
                <!-- <p v-else-if="inven <= 10 && inven > 0">Almost Sold Out</p>
                <p v-else>Out of Stock</p> -->
                <p v-if="sale">On Sale</p>
                <p v-else>Sale will start soon</p>
                <p>Shipping: {{ shipping }}</p>

                <product-details :details="details"></product-details>

                <h4 class="h4">Avaible Sizes</h4>
                <ul class="small-list">
                    <li class="green" v-for="size in sizes">{{ size }}</li>
                </ul>

                <div v-for="(variant, index) in variants"
                     :key="variant.id"
                     @mouseover="updateProduct(index)"
                     class="color-box" 
                     :style="styleObject(variant.color)">
                </div>

                <!-- <p v-for="thing in things" :style="{ color: thing }">{{ thing }}</p> -->

                <div class="cart-buttons">
                    <!-- v-on:click and @click are the same -->
                    <button v-on:click="addToCart" 
                            :disabled="outOfStock"
                            :class="[ outOfStock ? 'disabledButton' : '']"     
                            >
                            Add to Cart
                    </button>
                    <br>
                    <button class="red" @click="removeFromCart">Remove from Cart</button>
                    <div class="cart">
                        <p class="text-red"><strong>Cart({{ cart }})</strong></p>
                    </div>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            details: [
                '80% Cotten',
                '20% Polyester',
                'Not Gender Neutral'
            ],
            variants: [
                {
                    id: 2234,
                    color: 'green',
                    image: './assets/socks-green.jpg',
                    quantity: 10,
                    onSale: true
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/socks-blue.jpg',
                    quantity: 0,
                    onSale: true
                }
            ],
            sizes: [
                'Small',
                'Medium',
                'Large',
                'Extra Large',
                'Extra Extra Large'
            ],
            cart: 0,
            interval: null,
            spinButton: 'red',
            stopButton: 'disabledButton',
            anotherStyle: {
                color: 'yellow'
            }
        }
    },
    computed: {
        title() {
            return `${this.brand} ${this.product}`;
        },
        image() {
            return this.currentVariant.image;
        },
        outOfStock() {
            return !this.variantQuanity;
        },
        inStock() {
            return this.variantQuanity;
        },
        onSale() {
            return this.currentVariant.onSale;
        },
        sale() {
            return this.onSale && this.inStock;
        },
        currentVariant() {
            return this.variants[this.selectedVariant];
        },
        variantQuanity() {
            return this.currentVariant.quantity;
        },
        productOnSale() {
            return this.onSale ? this.title : '';
        },
        shipping() {
            return this.premium ? 'Free' : 2.99;
        }
    },
    methods: {
        addToCart() {
            if (this.inStock) {
                this.cart++;
                this.variants[this.selectedVariant].quantity--;
            }
        },
        removeFromCart() {
            if (this.cart > 0) {
                this.cart--;
                this.variants[this.selectedVariant].quantity++;
            }
        },
        rotateImg() {
            this.spinButton = '';
            this.stopButton = 'red';
            clearInterval(this.interval);
            var self = this;
            this.interval = setInterval(function () {
                let img = self.$refs.img;
                let degree = parseInt(img.getAttribute('class').substring(6));
                if (degree === 360) {
                    degree = 90;
                    img.setAttribute('class', `rotate${degree}`);
                } else {
                    degree += 90;
                    img.setAttribute('class', `rotate${degree}`);
                }
            }, 1000);
        },
        stopRotate() {
            clearInterval(this.interval);
            this.spinButton = 'red';
            this.stopButton = 'disabledButton';
        },
        updateProduct(index) {
            this.selectedVariant = index;
        },
        styleObject(color) {
            return {
                backgroundColor: color
            };
        },
    }

});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        name: 'Ali'
    }
});