<template>
  <div class="ui container">
    <h3>Word Details</h3>
    <div v-if="word" class="ui segment">
      <p><strong>Vietnamese:</strong> {{ word.vietnamese }}</p>
      <p><strong>Italian:</strong> {{ word.italian }}</p>
      <p><strong>English:</strong> {{ word.english }}</p>
      <router-link :to="`/words/${word._id}/edit`" class="ui blue button">Edit</router-link>
      <button class="ui red button" @click="deleteWord">Delete</button>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import api from '@/api.js';

export default {
  data() { return { word: null }; },
  async created() {
    try {
      const res = await api.get(`/words/${this.$route.params.id}`);
      this.word = res.data;
    } catch (err) {
      console.error('Failed to load word:', err);
    }
  },
  methods: {
    async deleteWord() {
      if (confirm('Delete this word?')) {
        try {
          await api.delete(`/words/${this.$route.params.id}`);
          this.$flashMessage.success({ message: 'Deleted!', time: 3000 });
          this.$router.push('/words');
        } catch (err) {
          this.$flashMessage.error({ message: 'Delete failed: ' + err.message, time: 4000 });
        }
      }
    }
  }
};
</script>