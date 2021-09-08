<template>
  <div class="app-container">
    <h1>Carbon Sequester Proof Web App</h1>
    <div id="nav">
      <router-link to="/">Submit Proof</router-link> |
      <router-link to="/howto">How To</router-link>
    </div>
    <router-view />
  </div>
</template>

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
