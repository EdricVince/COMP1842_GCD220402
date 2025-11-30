app.component('product-display', {
  props: {
    premium: {
      type: Boolean,
      required: true
    },
    cartCount: {
      type: Number,
      required: true
    }
  },
  template: `
    <div class="product-display">
      <div class="product-container">

        <div class="product-image">
          <img :src="image" :class="{ 'out-of-stock-img': !inStock }">
        </div>

        <div class="product-info">
          <h1>{{ title }}</h1>

          <div class="cart-inline">
            🛒 Cart: <strong>{{ cartCount }}</strong>
          </div>

          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>

          <p>Shipping: {{ shipping }}</p>

          <ul>
            <li v-for="detail in details" :key="detail">{{ detail }}</li>
          </ul>

          <p><strong>Select Size:</strong></p>
          <select v-model="selectedSize">
            <option disabled value="">Select size</option>
            <option v-for="size in sizes" :key="size">{{ size }}</option>
          </select>
          <p v-if="selectedSize"><em>You selected: {{ selectedSize }}</em></p>

          <p><strong>Available Colors:</strong></p>
          <div class="color-container">
            <div 
              v-for="(variant, index) in variants" 
              :key="variant.id"
              @mouseover="updateVariant(index)"
              class="color-circle"
              :style="{ backgroundColor: variant.color }">
            </div>
          </div>

          <div class="button-group">
            <button 
              class="button" 
              :disabled="!inStock" 
              @click="addToCart">
              Add to Cart
            </button>

            <button 
              class="button" 
              :disabled="!inStock" 
              @click="removeFromCart">
              Remove Item
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      product: 'Socks',
      brand: 'Vue Mastery',
      selectedVariant: 0,
      selectedSize: '',
      sizes: ['Small', 'Medium', 'Large'],
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 201, color: 'green', image: 'socks_green.jpg', quantity: 15 },
        { id: 202, color: 'blue', image: 'socks_blue.jpg', quantity: 0 }
      ]
    }
  },
  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
    },
    removeFromCart() {
      this.$emit('remove-from-cart', this.variants[this.selectedVariant].id)
    },
    updateVariant(index) {
      this.selectedVariant = index
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product
    },
    image() {
      return this.variants[this.selectedVariant].image
    },
    inStock() {
      return this.variants[this.selectedVariant].quantity > 0
    },
    shipping() {
      return '$1.99'
    }
  }
})
