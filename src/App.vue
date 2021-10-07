<i18n>
{
  "en": {
    "app-name":"Carbon Capture Evidence Web App",
    "how-to-create-biochar":"How To Create Biochar",
    "submit-evidence": "Submit Evidence",
    "name": "Name",
    "phone-number": "Phone Number",
    "basic-information": "Basic Information",
    "charcoal-produce-(kg)": "Charcoal Produce (kg)",
    "submit-proof-of-biochar-carbon-capture": "Submit Proof of Biochar Carbon Capture",
    "before-pictures": "Upload Before Photos (select 1 or more photos)"
  },
  "hil":{
    "app-name":"Aplikasyong Ebidensya sa Pagkuha ng Karbon",
    "how-to-create-biochar":"How To Create Biochar Ilonggo",
    "submit-evidence": "Magsumite ng ebidensya",
    "name": "Pangalan",
    "phone-number": "Numero ng Telepono",
    "basic-information": "Pangunahing Impormasyon",
    "charcoal-produce-(kg)": "Mga Uling na nagawa (kilo)",
    "submit-proof-of-biochar-carbon-capture": "Magsumite ng Katunayan ng Biochar Carbon Capture",
    "before-pictures": "Magsumite ng dasjdhak (pumili ng 1 o marami pang iba)"
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
      <router-link to="/">{{ $t('submit-evidence') }}</router-link> |
      <router-link to="/howto">How To</router-link> 
      <!-- <router-link to="/faq">FAQ</router-link> -->
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
