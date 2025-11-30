<template>
  <div class="ui container">
    <h2 class="ui header">➕ Add New Word</h2>
    <word-form @submit="handleAdd" />
  </div>
</template>

<script>
import WordForm from '@/components/WordForm.vue'
import api from '@/api.js'

export default {
  components: { WordForm },
  methods: {
    async handleAdd(word) {
      try {
        const res = await api.post('/words', word)
        this.$flashMessage.success({
          message: '✅ Word added successfully!',
          time: 3000
        })
        this.$router.push({
          name: 'words',
          params: { newWord: res.data }
        })
      } catch (err) {
        this.$flashMessage.error({
          message: '❌ Failed to add word: ' + (err.response?.data?.error || err.message),
          time: 4000
        })
      }
    }
  }
}
</script>