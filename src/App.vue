<template>
  <div id="app">
    <div class="ui menu inverted">
      <router-link class="item" to="/words">Words</router-link>
      <router-link class="item" to="/words/new">Add</router-link>
      <router-link class="item" to="/test">Quiz</router-link>
    </div>

    <div class="ui container" style="margin-top: 2rem">
      <flash-message />
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppRoot'
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f4f4f4;
}
</style>
