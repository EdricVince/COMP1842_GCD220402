<template>
  <div class="ui container">
    <h2 class="ui header">Vocabulary List</h2>
    <router-link to="/words/new" class="ui green button">+ Add Word</router-link>

    <table class="ui celled table">
      <thead>
        <tr>
          <th>Vietnamese</th>
          <th>Italian</th>
          <th>English</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="word in words" :key="word._id">
          <td>{{ word.vietnamese }}</td>
          <td>{{ word.italian }}</td>
          <td>{{ word.english }}</td>
          <td>
            <router-link :to="`/words/${word._id}/edit`" class="ui blue button mini">Edit</router-link>
            <button class="ui red button mini" @click="deleteWord(word._id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from '../api';

export default {
  name: 'Show',
  data() {
    return {
      words: []
    };
  },
  mounted() {
    api.get('/').then(res => {
      this.words = res.data;
    });
  },
  methods: {
    deleteWord(id) {
      if (confirm('Delete this word?')) {
        api.delete(`/${id}`).then(() => {
          this.words = this.words.filter(w => w._id !== id);
        });
      }
    }
  }
};
</script>
