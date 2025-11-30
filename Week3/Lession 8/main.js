const app = Vue.createApp({
  data() {
    return {
      cartCount: 0,
      itemName: 'Socks',
      brand: 'Vue Shop',
      selectedImage: 'socks_blue.jpg',
      specifications: ['50% cotton', '30% wool', '20% polyester'],
      sizes: ['Small', 'Medium', 'Large'],
      selectedSize: '',
      variants: [
        { id: 201, color: 'blue', image: 'socks_blue.jpg', inStock: true },
        { id: 202, color: 'green', image: 'socks_green.jpg', inStock: false }
      ],
      selectedVariantIndex: 0
    };
  },
  computed: {
    currentVariant() {
      return this.variants[this.selectedVariantIndex];
    },
    isAvailable() {
      return this.currentVariant.inStock;
    }
  },
  methods: {
    incrementCart() {
      if (this.isAvailable) {
        this.cartCount++;
      }
    },
    removeFromCart() {
      if (this.cartCount > 0) {
        this.cartCount--;
      }
    },
    changeImage(imagePath) {
      const index = this.variants.findIndex(variant => variant.image === imagePath);
      if (index !== -1) {
        this.selectedVariantIndex = index;
        this.selectedImage = imagePath;
      }
    },
    selectSize(event) {
      this.selectedSize = event.target.value;
    }
  }
});
