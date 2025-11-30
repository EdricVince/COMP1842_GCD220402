<template>
  <div class="ui container">
    <h2 class="ui header">🧠 Vocabulary Quiz</h2>

    <div v-if="loading" class="ui active dimmer">
      <div class="ui loader">Loading words...</div>
    </div>

    <div v-else-if="!words.length" class="ui warning message">
      <div class="header">No words available</div>
      <p>Please add some words first to start the quiz.</p>
    </div>

    <div v-else>
      <VocabTest :words="words" />
    </div>
  </div>
</template>

<script>
import api from '@/api.js'
import VocabTest from '@/components/VocabTest.vue'

export default {
  components: { VocabTest },
  data() {
    return {
      words: [],
      loading: true
    }
  },
  async created() {
    try {
      const res = await api.get('/words')
      this.words = res.data
    } catch (error) {
      this.$flashMessage.error({
        message: '❌ Error loading words: ' + error.message,
        time: 5000
      })
      console.error('❌ Error loading words:', error)
    } finally {
      this.loading = false
    }
  }
}
</script>