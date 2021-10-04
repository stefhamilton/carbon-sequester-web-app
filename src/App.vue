<i18n>
{
  "en": {
    "hello": "hello world!"
  },
  "ja": {
    "hello": "こんにちは、世界！"
  }
}
</i18n>

<template>
  <div class="app-container">
    <p>message: {{ $t('hello') }}</p>
    <label for="locale">locale</label>
    <select v-model="$i18n.locale">
      <option>en</option>
      <option>ja</option>
    </select>
    <h1>Carbon Capture Evidence Web App</h1>
    <div id="nav">
      <router-link to="/">Submit Evidence</router-link> |
      <router-link to="/howto">How To</router-link> |
      <router-link to="/faq">FAQ</router-link>
    </div>
    <router-view />
  </div>
  <div>
    <img
      src="@/assets/green_vertical.svg"
      height="250"
      display="block"
      margin-left="auto"
      margin-right="auto"
    />
  </div>
</template>

<script>
export default {
  name: 'app',
  // data() {
  //   this.$i18n.locale = 'en';
  //   return {
  //     locale: 'en',
  //   };
  // },
  // watch: {
  //   locale(val) {
  //     this.$i18n.locale = val;
  //   },
  // },
};
</script>

<style lang="scss">
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
