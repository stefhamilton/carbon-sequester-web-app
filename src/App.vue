<i18n>
{
  "en": {
    "app-name":"Carbon Capture Evidence Web App",
    "how-to-create-biochar":"How To Create Biochar"
  },
  "hil":{
    "app-name":"Ilonggo app name",
    "how-to-create-biochar":"How To Create Biochar Ilonggo"
    
  }
}
</i18n>

<template>
  <div class="app-container">
    <!-- <p>message: {{ $t('hello') }}</p> -->
    <label for="locale">Language / Locale:</label>
    <select v-model="$i18n.locale">
      <option value="en">English / en</option>
      <option value="hil">Ilonggo / hil</option>
    </select>
    <h1>{{ $t('app-name') }}</h1>
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
