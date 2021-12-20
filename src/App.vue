<i18n>
{
  "en": {
    "app-name":"Carbon Capture Evidence Web App",
    "how-to-create-biochar":"How To Create Biochar",
    "activate": "Activate",
    "submit-evidence": "Submit Evidence",
    "name": "Name",
    "phone-number": "Phone Number",
    "basic-information": "Basic Information",
    "charcoal-produce-(kg)": "Charcoal Produce (kg)",
    "submit-proof-of-biochar-carbon-capture": "Submit Proof of Biochar Carbon Capture",
    "before-pictures": "Upload Before Photos (select 1 or more photos)",
    "view-youtube": "View Youtube",
    "on-how-to-make-biochar": "on how to make biochar",
    "take-before-picture(s)-of-agriculture-waste-(see below)": "Take before picture(s) of agriculture waste (see below)",
    "make-biochar-take-during-picture(s)-(see below)": "Make biochar - take during picture(s) (see below)",
    "take-after-picture(s)-that-shows-the-full-biochar-(see below)": "Take after picture(s) that shows the full biochar (see below)",
    "take-after-picture-that-shows-agriculture-waste-is-gone.-(see example)": "Take after picture that shows agriculture waste is gone. (see example)",
    "the-goal": "The goal is to submit evidence that shows the biochar produced corresponds to new carbon capture that would have otherwise decompomposed. To maximize income, make sure to have pictures and explanations that support your claim.",
    "tips-roll": "TIP: Have all photos already saved to your phone's camera roll",
    "ready-to-start": "Ready to start making money while also reducing carbon released into the atmosphere?",
    "get-started": "Get Started ->",
    "how-to": "How to",
    "evaluate": "Evaluate",
    "username-is-missing": "Username is Missing",
    "password-is-missing": "Password is Missing",
    "next": "NEXT",
    "during-photos": "Upload During Photos (select 1 or more photos)",
    "after-photos": "Upload After Photos (select 1 or more photos)",
    "add-photo-descriptions": "Add Photo Descriptions",
    "before-photos": "Before Photos",
    "photo-description-1": "Photo Description",
    "photo-description-2": "Photo Description",
    "photo-description-3": "Photo Description",
    "during-photos-1": "During Photos",
    "after-photos-1": "After Photos",
    "submit": "SUBMIT",
    "congratulations": "CONGRATULATIONS",
    "successfully-submitted": "You've successfully submitted proof of Biochar Carbon Capture",
    "your-reference": "Your Reference ID:",
    "additional-proofs": "Would you like to submit additional proofs?",
    "click-here": "Click Here",
    "here": "HERE"
    
    




    
  },
  "hil":{
    "app-name":"Aplikasyong Ebidensya sa Pagkuha ng Karbon",
    "how-to-create-biochar":"Paano gumawa ng biochar",
    "submit-evidence": "Magsumite ng ebidensya",
    "name": "Pangalan",
    "phone-number": "Numero ng Telepono",
    "basic-information": "Pangunahing Impormasyon",
    "charcoal-produce-(kg)": "Mga Uling na nagawa (kilo)",
    "submit-proof-of-biochar-carbon-capture": "Magsumite ng Katunayan ng Biochar Carbon Capture",
    "before-pictures": "Magsumite ng Before na larawan (pumili ng 1 o marami pang iba)",
    "view-youtube": "Tignan sa Youtube ang",
    "on-how-to-make-biochar": "kung paano gumawa ng Biochar",
    "take-before-picture(s)-of-agriculture-waste-(see below)": "Kuhanin bago ang larawan (mga) basura sa agrikultura (tignan sa ibaba)",
    "make-biochar-take-during-picture(s)-(see below)": "Pag gawa ng Biochar - Larawan habang ginagawa ang biochar",
    "take-after-picture(s)-that-shows-the-full-biochar-(see below)": "Nakuhang larawan ng buong biochar pagkatapos magawa",
    "take-after-picture-that-shows-agriculture-waste-is-gone.-(see example)": "Nakuhang larawan na nag papakita na ang basura sa agrikultura ay wala na. (tignan ang halimbawa)",
    "the-goal": "Ang layunin ay upang magsumite ng katibayan na nagpapakita ng ginawa ng biochar na tumutugma sa bagong carbon capture na maaaring mabulok. Upang ma-maximize ang kita, tiyaking mayroong mga larawan at paliwanag na sumusuporta sa iyong paghahabol.",
    "tips-roll": "TIP: i-save lahat ng mga larawan sa camera roll ng iyong telepono",
    "ready-to-start": "Handa nang magsimulang kumita ng pera habang binabawasan din ang carbon na inilabas sa kapaligiran?",
    "get-started": "Magsimula ->",
    "how-to": "Paano",
    "next": "SUSUNOD",
    "during-photos": "Magsumite ng During na larawan (pumili ng 1 o marami pang iba)",
    "after-photos": "Magsumite ng After na larawan (pumili ng 1 o marami pang iba)",
    "add-photo-descriptions": "Magdagdag ng Mga Paglalarawan ng Larawan",
    "before-photos": "Larawan bago gawin",
    "photo-description-1": "Paglalarawan ng Larawan",
    "photo-description-2": "Paglalarawan ng Larawan",
    "photo-description-3": "Paglalarawan ng Larawan",
    "during-photos-1": "Larawan na ginagawa pa lamang",
    "after-photos-1": "Larawan na tapos na gawin",
    "submit": "ISUMITE",
    "congratulations": "BINABATI KITA",
    "successfully-submitted": "Matagumpay kang nagsumite ng katibayan ng Biochar Carbon Capture",
    "your-reference": "Ang iyong Reference ID:",
    "additional-proofs": "Nais mo bang magsumite ng karagdagang mga patunay?",
     "click-here": "Pindutin dito",
     "here": "DITO"
  }
}
</i18n>

<template>
  <div class="app-container">
    <!-- <p>message: {{ $t('hello') }}</p> -->
    <label for="locale">Language / Locale:</label>
    <select v-model="$i18n.locale">
      <option value="en">English / en</option>
      <option value="hil">Tagalog / Tag</option>
    </select>
    <h1>{{ $t('app-name') }}</h1>
    <div id="nav">
      <router-link to="/activate">{{ $t('activate') }}</router-link> |
      <router-link to="/">{{ $t('submit-evidence') }}</router-link> |
      <router-link to="/howto">{{ $t('how-to') }}</router-link> |
      <router-link to="/evaluate">{{ $t('evaluate') }}</router-link>
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
