<template>
  <form class="ui form segment" @submit.prevent="submitForm">
    <div class="field">
      <label>🇻🇳 Vietnamese</label>
      <input
        type="text"
        v-model="word.vietnamese"
        required
        placeholder="Enter Vietnamese word..."
      />
    </div>

    <div class="field">
      <label>🇮🇹 Italian</label>
      <input
        type="text"
        v-model="word.italian"
        required
        placeholder="Enter Italian word..."
      />
    </div>

    <div class="field">
      <label>🇬🇧 English</label>
      <input
        type="text"
        v-model="word.english"
        required
        placeholder="Enter English word..."
      />
    </div>

    <button class="ui primary button" type="submit">
      💾 Save Vocabulary
    </button>
  </form>
</template>

<script>
export default {
  props: {
    initial: {
      type: Object,
      default: () => ({
        vietnamese: '',
        italian: '',
        english: ''
      })
    }
  },
  data() {
    return {
      // Deep copy to avoid mutating props, ensures fresh updates
      word: JSON.parse(JSON.stringify(this.initial))
    }
  },
  methods: {
    submitForm() {
      this.$emit('submit', this.word)
    }
  }
}
</script>

<style scoped>
form {
  max-width: 500px;
  margin: 0 auto;
}
</style>
