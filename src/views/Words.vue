<template>
  <div class="ui container">
    <h2 class="ui header">📘 My Word List</h2>
    <router-link to="/words/new" class="ui green button">Add New Entry</router-link>

    <table class="ui celled table" v-if="words.length">
      <thead>
        <tr>
          <th>VN</th>
          <th>IT</th>
          <th>EN</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word._id">
          <td>{{ word.vietnamese }}</td>
          <td>{{ word.italian }}</td>
          <td>{{ word.english }}</td>
          <td>
            <router-link
              :to="'/words/' + word._id + '/edit'"
              class="ui tiny blue button"
            >Edit</router-link>
            <router-link
              :to="'/words/' + word._id"
              class="ui tiny grey button"
            >View</router-link>
            <button class="ui tiny red button" @click="deleteWord(word._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-else class="ui message">No words available yet.</div>
  </div>
</template>

<script>
import api from '@/api.js'

export default {
  data() {
    return {
      words: []
    }
  },
  async created() {
    try {
      const res = await api.get('/words')
      this.words = res.data

      const newWord = this.$route.params.newWord
      if (newWord) {
        this.words.unshift(newWord)
        this.$router.replace({ name: 'words', params: {} }) // clean URL
      }
    } catch (err) {
      console.error('Failed to load words:', err)
    }
  },
  methods: {
    async deleteWord(id) {
      if (confirm('Delete this word?')) {
        try {
          await api.delete(`/words/${id}`);
          this.words = this.words.filter(w => w._id !== id);
          this.$flashMessage.success({ message: 'Deleted successfully!', time: 3000 });
        } catch (err) {
          this.$flashMessage.error({ message: 'Failed to delete: ' + err.message, time: 4000 });
        }
      }
    }
  }
}
</script>