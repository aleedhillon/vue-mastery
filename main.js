Vue.config.productionTip = false;
var eventBus = new Vue();
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        },
        cart: {
            type: Array,
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

                <product-sizes :sizes="sizes"></product-sizes>

                <div v-for="(variant, index) in variants"
                     :key="variant.id"
                     @mouseover="updateProduct(index)"
                     class="color-box" 
                     :style="styleObject(variant.color)">
                </div>

                <!-- <p v-for="thing in things" :style="{ color: thing }">{{ thing }}</p> -->

                <div class="cart-buttons">
                    <!-- v-on:click and @click are the same -->
                    <button class="left-button" v-on:click="addToCart" 
                            :disabled="outOfStock"
                            :class="[ outOfStock ? 'disabledButton' : '']"     
                            >
                            Add to Cart
                    </button>
                    <button class="red right-button" @click="removeFromCart">Remove from Cart</button>
                </div>
                <br>
                <product-tabs :reviews="reviews"></product-tabs>
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
                    onSale: true,
                    addedToCart: 0
                },
                {
                    id: 2235,
                    color: 'blue',
                    image: './assets/socks-blue.jpg',
                    quantity: 5,
                    onSale: true,
                    addedToCart: 0
                }
            ],
            sizes: [
                'Small',
                'Medium',
                'Large',
                'Extra Large',
                'Extra Extra Large'
            ],
            interval: null,
            spinButton: 'red',
            stopButton: 'disabledButton',
            anotherStyle: {
                color: 'yellow'
            },
            reviews : []
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
                this.$emit('add-to-cart', this.currentVariant.id);
                this.variants[this.selectedVariant].addedToCart++;
                this.variants[this.selectedVariant].quantity--;
            }
        },
        removeFromCart() {
            if (this.cart.length > 0 && this.currentVariant.addedToCart > 0) {
                this.$emit('remove-from-cart', this.currentVariant.id);
                this.variants[this.selectedVariant].addedToCart--;
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
        }
    },

    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview);
        })
    }

});

Vue.component('product-sizes', {
    props: {
        sizes: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <h4 class="h4">Avaible Sizes</h4>
            <ul class="small-list">
                <li class="green" v-for="size in sizes">{{ size }}</li>
            </ul>
        </div>
    `
});

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

Vue.component('product-review', {
    template: `
        <form action="" class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length">
                <b>Please correct the following errors.</b>
                <ul>
                    <li class="text-red" v-for="error in errors">{{ error }}</li>
                </ul>
            </p>
            <p>
                <label for="name">Name:</label>
                <input type="text" name="name" id="name" v-model="name">
            </p>
            <p>
                <label for="review">Review:</label>
                <textarea name="review" id="review" v-model="review"></textarea>
            </p>
            <p>
                <label for="rating">Rating:</label>
                <select name="rating" id="rating" v-model.number="rating">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </p>
            <p>Would you recommend this product?</p>
            <label>
            Yes
            <input type="radio" value="Yes" v-model="recommend"/>
            </label>
            <label>
            No
            <input type="radio" value="No" v-model="recommend"/>
            </label>
            <p>
                <input type="submit" value="submit">
            </p>
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            recommend: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            this.errors = [];
            if ( this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend
                };
                eventBus.$emit('review-submitted', productReview);

                this.name = null,
                this.review = null,
                this.rating = null,
                this.recommend = null
            } else {
                if(!this.name) this.errors.push('Name is required');
                if(!this.review) this.errors.push('Review is required');
                if(!this.rating) this.errors.push('Rating is required');
                if(!this.recommend) this.errors.push('Recommend is required');
            }
        }
    }
});

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <span :class="{ activeTab: selectedTab === tab }"
                  class="tab"
                  v-for="(tab, index) in tabs"
                  :key="index"
                  @click="selectedTab = tab">
                {{ tab }}
            </span>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="reviews.length === 0">No reviews yet.</p>
                <div v-else v-for="review in reviews">
                    <p>Name: {{ review.name }}</p>
                    <p>Review: {{ review.review }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>Recommend: {{ review.recommend }}</p>
                    <hr>
                </div>
            </div>
            <br>
            <product-review v-show="selectedTab === 'Make a Review' "></product-review>
        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
});

var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: []
    },
    methods: {
        addToCart(id) {
            this.cart.push(id);
        },
        removeFromCart(id) {
            let index = this.cart.indexOf(id);
            if (this.cart[index] === id) {
                this.cart.splice(index, 1);
            }
        }
    }
});