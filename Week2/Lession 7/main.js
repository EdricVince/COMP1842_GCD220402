const app = Vue.createApp({
  data() {
    return {
      product: 'Socks',
      brand: 'Vinh Sock Shop',
      cart: 0,
      selectedVariant: 0,
      selectedSize: '',
      sizes: ['Small', 'Medium', 'Large'],
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 201, color: 'green', image: './socks_green.jpg' },
        { id: 202, color: 'blue', image: './socks_blue.jpg' }
      ]
    }
  },
  methods: {
    selectVariant(index) {
      this.selectedVariant = index;
    },
    addToCart() {
      console.log('Add to Cart is disabled.');
    },
    removeFromCart() {
      console.log('Remove Item is disabled.');
    },
    selectSize(event) {
      this.selectedSize = event.target.value;
    }
  },
  computed: {
    image() {
      return this.variants[this.selectedVariant].image;
    }
  }
});
