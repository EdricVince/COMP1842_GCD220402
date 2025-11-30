app.component('product-display', {
  template: `
    <div class="product-display">
      <div class="product-container">

        <div class="product-image">
          <img :src="selectedImage" :class="{ 'out-of-stock-img': !isAvailable }" alt="Socks Image">
        </div>

        <div class="product-info">
          <h1>{{ brand }} - {{ itemName }}</h1>

          <p v-if="isAvailable">In Stock</p>
          <p v-else>Out of Stock</p>

          <ul>
            <li v-for="feature in specifications" :key="feature">{{ feature }}</li>
          </ul>

          <p><strong>Available Sizes:</strong></p>
          <select @change="selectSize">
            <option disabled value="">Please select a size</option>
            <option v-for="size in sizes" :key="size" :value="size">{{ size }}</option>
          </select>
          <p v-if="selectedSize"><em>You selected: {{ selectedSize }}</em></p>

          <p><strong>Available Colors:</strong></p>
          <div class="color-container">
            <div 
              v-for="(variant, index) in variants"
              :key="variant.id"
              class="color-circle"
              :style="{ backgroundColor: variant.color }"
              @mouseover="changeImage(variant.image)">
            </div>
          </div>

          <p><strong>Cart total:</strong> {{ cartCount }}</p>

          <div class="button-group">
            <button 
              class="button"
              @click="incrementCart"
              :disabled="!isAvailable">
              Add to Cart
            </button>

            <button 
              class="button"
              @click="removeFromCart"
              :disabled="cartCount === 0">
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
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
