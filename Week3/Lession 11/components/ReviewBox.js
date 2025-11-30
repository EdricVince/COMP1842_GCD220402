app.component('review-box', {
  props: {
    reviews: {
      type: Array,
      required: true
    }
  },
  template: `
    <div class="review-box">
      <h3>Customer Reviews</h3>

      <ul v-if="reviews.length">
        <li v-for="(review, index) in reviews" :key="index">
          <strong>{{ review.name }}</strong> rated <strong>{{ review.rating }}/5</strong><br />
          <em>"{{ review.review }}"</em>
        </li>
      </ul>
      <p v-else>No reviews yet. Be the first to write one!</p>

      <form class="review-form" @submit.prevent="onSubmit">
        <label for="name">Name:</label>
        <input id="name" v-model="form.name" />

        <label for="review">Review:</label>
        <textarea id="review" v-model="form.review"></textarea>

        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="form.rating">
          <option disabled value="">Select rating</option>
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>

        <input class="button" type="submit" value="Submit Review" />
      </form>
    </div>
  `,
  data() {
    return {
      form: {
        name: '',
        review: '',
        rating: null
      }
    }
  },
  methods: {
    onSubmit() {
      const { name, review, rating } = this.form
      if (!name || !review || !rating) {
        alert('Please fill out all fields.')
        return
      }
      this.$emit('review-submitted', { name, review, rating })
      this.form.name = ''
      this.form.review = ''
      this.form.rating = null
    }
  }
})
