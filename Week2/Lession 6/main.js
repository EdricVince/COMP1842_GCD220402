const app = Vue.createApp({
  data() {
    return {
      product: 'Vinh Socks Shop',
      image: './socks_green.jpg',
      inStock: true,
      onSale: true,
      cart: 0,
      details: ['50% cotton', '30% wool', '20% polyester'],
      sizes: ['small', 'medium', 'large'],
      variants: [
        { id: 201, color: 'green', image: './socks_green.jpg' },
        { id: 202, color: 'blue', image: './socks_blue.jpg' }
      ]
    };
  },
  methods: {
    addToCart() {
      this.cart++;
    },
    removeFromCart() {
      if (this.cart > 0) {
        this.cart--;
      }
    },
    updateImage(variantImage) {
      this.image = variantImage;
    }
  }
});
