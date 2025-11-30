const app = Vue.createApp({
  data() {
    return {
      cart: [],
      premium: true,
      reviews: [],
      showReviews: false 
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id)
    },
    removeFromCart(id) {
      const index = this.cart.indexOf(id)
      if (index > -1) {
        this.cart.splice(index, 1)
      }
    },
    addReview(review) {
      this.reviews.push(review)
    },
    toggleReviews() {
      this.showReviews = !this.showReviews
    }
  }
})
