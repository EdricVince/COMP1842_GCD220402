<template>
  <div class="ui container">
    <h2>Update Word</h2>
    <word-form :initial="word" @submit="handleUpdate" v-if="word" />
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import Vue from 'vue'; // Import Vue để dùng Vue.set
import WordForm from '../components/WordForm.vue';
import api from '@/api.js';

export default {
  components: { WordForm },
  data() {
    return {
      word: null
    };
  },
  async created() {
    try {
      const res = await api.get(`/words/${this.$route.params.id}`);
      Vue.set(this, 'word', res.data); // Đảm bảo reactivity khi assign object từ API
    } catch (err) {
      this.$flashMessage.error({ message: 'Failed to load word: ' + err.message, time: 4000 });
    }
  },
  methods: {
    async handleUpdate(updatedWord) {
      console.log('Updated data to submit:', updatedWord); // Log để check data mới trước submit
      try {
        await api.put(`/words/${this.$route.params.id}`, updatedWord);
        this.$flashMessage.success({ message: 'Word updated successfully!', time: 3000 });
        this.$router.push('/words'); // Redirect để refresh list
      } catch (err) {
        this.$flashMessage.error({ message: 'Failed to update: ' + err.message, time: 4000 });
      }
    }
  }
};
</script>