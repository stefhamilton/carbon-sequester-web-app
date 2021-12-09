<template>
  <div v-if="!user && !isLoading">
    <div>Please Login</div>
    <form @submit="handleLogin">
      <label>
        <input type="email" v-model="username" required />
      </label>
      <label>
        <input type="password" v-model="password" required />
      </label>
      <button>Login</button>
    </form>
  </div>
  <div v-if="user && !isLoading">
    <div class="user-auth">
      <div>Welcome, {{ user.email }}</div>
      <button type="button" @click="handleLogout()">Logout</button>
    </div>
    <div v-if="stage === 'list'" class="proof-list">
      <h3>Proof List</h3>
      <table>
        <thead>
          <th>Name</th>
          <th>Status</th>
          <th>Phone Number</th>
          <th>Local Date Time</th>
          <th></th>
        </thead>
        <tbody>
          <tr v-for="proof of proofs" :key="proof.id">
            <td>{{ proof.name }}</td>
            <td>{{ proof.status }}</td>
            <td>{{ proof.phoneNumber }}</td>
            <td>
              {{ dayjs.unix(proof.timestamp).format('MMM D, YYYY h:mma') }}
            </td>
            <td>
              <button @click="handleEvaluateProofClick(proof.id)">
                EVALUATE
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="isLoadingContent" class="spinner-box">
        <loading-spinner></loading-spinner>
      </div>
    </div>
    <form v-if="stage === 'evaluate'">
      <button type="button" @click="handleBackToProofList()">
        Back to Proof List
      </button>
      <h2>Evaluate Proof</h2>
      <h3>Before Photos</h3>
      <div
        v-for="beforePhoto of selectedProof.beforePhotos"
        :key="beforePhoto.url"
        class="image-box"
      >
        <img src="" :id="beforePhoto.url" class="proof-image" />
        <evaluate-image :photo="beforePhoto"></evaluate-image>
      </div>
      <div v-if="isLoadingContent" class="spinner-box">
        <loading-spinner></loading-spinner>
      </div>
      <h3>During Photos</h3>
      <div
        v-for="duringPhoto of selectedProof.duringPhotos"
        :key="duringPhoto.url"
        class="image-box"
      >
        <img src="" :id="duringPhoto.url" class="proof-image" />
        <evaluate-image :photo="duringPhoto"></evaluate-image>
      </div>
      <div v-if="isLoadingContent" class="spinner-box">
        <loading-spinner></loading-spinner>
      </div>
      <h3>After Photos</h3>
      <div
        v-for="afterPhoto of selectedProof.afterPhotos"
        :key="afterPhoto.url"
        class="image-box"
      >
        <img src="" :id="afterPhoto.url" class="proof-image" />
        <evaluate-image :photo="afterPhoto"></evaluate-image>
      </div>
      <div v-if="isLoadingContent" class="spinner-box">
        <loading-spinner></loading-spinner>
      </div>
    </form>
  </div>
</template>

<script>
import FirebaseService from '../FirebaseService';
import dayjs from 'dayjs';
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const axios = require('axios').default;
import ExifReader from 'exifreader';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import EvaluateImage from '../components/EvaluateImage.vue';

export default {
  data() {
    return {
      isLoading: true,
      isLoadingContent: true,
      user: null,
      username: '',
      password: '',
      proofs: [],
      dayjs,
      stage: 'list',
      selectedProof: null,
    };
  },
  components: { LoadingSpinner, EvaluateImage },
  methods: {
    async handleAuthChanges(user) {
      this.user = user;
      this.isLoading = false;

      if (this.user) {
        try {
          await this.fetchProofsForEvaluation();
        } catch (error) {
          alert(error.message);
        }
      }
    },
    async handleLogin(event) {
      event.preventDefault();

      if (!this.username) {
        alert(this.$t('username-is-missing'));
        return;
      }

      if (!this.password) {
        alert(this.$t('password-is-missing'));
        return;
      }

      try {
        await FirebaseService.auth.signInWithEmailAndPassword(
          this.username,
          this.password
        );
      } catch (error) {
        alert(error.message);
      }
    },
    async handleLogout() {
      await FirebaseService.auth.signOut();
    },
    handleBackToProofList() {
      this.stage = 'list';
    },
    async fetchProofsForEvaluation() {
      try {
        this.isLoadingContent = true;

        const proofs = (
          await FirebaseService.firestore.collection('proofs').get()
        ).docs;

        proofs.forEach((proof) => {
          const proofData = proof.data();
          proofData.id = proof.id;
          this.proofs.push(proofData);
        });
      } catch (error) {
        alert(error.message);
      }

      this.isLoadingContent = false;
    },
    async handleEvaluateProofClick(proofId) {
      this.isLoadingContent = true;
      this.stage = 'evaluate';
      this.selectedProof = this.proofs.find((proof) => {
        return proof.id === proofId;
      });

      try {
        for (const beforePhoto of this.selectedProof.beforePhotos) {
          this.fetchAndProcessPhoto(beforePhoto);
        }
        for (const duringPhoto of this.selectedProof.duringPhotos) {
          this.fetchAndProcessPhoto(duringPhoto);
        }
        for (const afterPhoto of this.selectedProof.afterPhotos) {
          this.fetchAndProcessPhoto(afterPhoto);
        }
      } catch (error) {
        console.error(error.message);
      }

      this.isLoadingContent = false;
    },
    async fetchAndProcessPhoto(photo) {
      const response = await axios.get(photo.url, {
        responseType: 'arraybuffer',
      });
      const imageBuffer = Buffer.from(response.data);
      const base64StringImage = imageBuffer.toString('base64');
      const domImage = document.getElementById(photo.url);
      domImage.src = `data:image/jpeg;base64,${base64StringImage}`;

      const tags = ExifReader.load(imageBuffer);
      const deviceMake = tags['Make']?.description;
      const deviceModel = tags['Model']?.description;
      const deviceSoftware = tags['Software']?.description;
      const gpsLatitude = tags['GPSLatitude']?.description;
      const gpsLatitudeRef = tags['GPSLatitudeRef']?.value[0];
      const gpsLongitude = tags['GPSLongitude']?.description;
      let gpsAltitude =
        tags['GPSAltitude']?.description?.split(' ')[0] * 3.28084;
      gpsAltitude = gpsAltitude ? Math.round(gpsAltitude) : '';
      const gpsLongitudeRef = tags['GPSLongitudeRef']?.value[0];
      const dateTimeOffset = tags['OffsetTime']?.description;
      const imageDateTimeObject = tags['DateTime'];

      const imageDateTime = imageDateTimeObject
        ? dayjs(
            dateTimeOffset
              ? imageDateTimeObject.description + dateTimeOffset
              : imageDateTimeObject.description,
            'YYYY:MM:DD hh:mm:ss'
          )
        : undefined;
      const imageDateTimeLabel = imageDateTime
        ? imageDateTime.format('MMM D, YYYY h:mma')
        : '';
      const imageWidth = tags['Image Width']?.value;
      const imageHeight = tags['Image Height']?.value;

      photo.isLoaded = true;
      photo.deviceMake = deviceMake;
      photo.deviceModel = deviceModel;
      photo.deviceSoftware = deviceSoftware;
      photo.gpsLatitudeRefSign = gpsLatitudeRef === 'N' ? '' : '-';
      photo.gpsLongitudeRefSign = gpsLongitudeRef === 'W' ? '-' : '';
      photo.googleMapsUrl = `https://www.google.com/maps/place/${photo.gpsLatitudeRefSign}${gpsLatitude},${photo.gpsLongitudeRefSign}${gpsLongitude}`;
      photo.gpsLatitude = gpsLatitude ? gpsLatitude + ' ' + gpsLatitudeRef : '';
      photo.gpsLongitude = gpsLongitude
        ? gpsLongitude + ' ' + gpsLongitudeRef
        : '';
      photo.gpsLongitudeRef = gpsLongitudeRef;
      photo.gpsAltitude = gpsAltitude;
      photo.imageDateTime = imageDateTimeLabel;
      photo.imageWidth = imageWidth;
      photo.imageHeight = imageHeight;
    },
  },
  mounted() {
    FirebaseService.subscribeToAuthChanges(this.handleAuthChanges);
  },
};
</script>

<style lang="scss" scoped>
button {
  cursor: pointer;
}

.user-auth {
  display: flex;
  margin-top: 1rem;

  button {
    margin-left: 1rem;
    cursor: pointer;
  }
}

table,
th,
td {
  border: 1px solid black;
}

td {
  padding: 0.5rem;
}

.spinner-box {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.image-box {
  display: flex;
}

.proof-image {
  max-width: 20rem;
  margin-right: 1rem;
}
</style>
