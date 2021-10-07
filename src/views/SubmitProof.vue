<template>
  <div class="submit-proof-container">
    <div class="form-container">
      <h1>{{ $t('submit-proof-of-biochar-carbon-capture') }}</h1>
      <form class="form" @submit="handleSubmit">
        <div class="stage" v-show="stage === 0">
          <h2>{{ $t('basic-information') }}</h2>
          <label>
            {{ $t('name') }}:
            <input type="text" v-model="formData.name" />
          </label>

          <label>
            {{ $t('phone-number') }}:
            <input type="tel" v-model="formData.phoneNumber" />
          </label>
          <label>
            {{ $t('charcoal-produce-(kg)') }}:
            <input type="int" v-model="formData.charcoal" />
          </label>
          <!-- <label>
            Payment Method:
            <select v-model="formData.paymentMethod">
              <option value="" disabled></option>
              <option value="gcash" selected="selected">GCash</option>
              <option value="globe">Globe</option>
            </select>
          </label> -->
        </div>
        <div class="stage" v-show="stage === 1">
          <h2>{{ $t('before-pictures') }}</h2>
          <input
            type="file"
            @change="handleBeforePhotos"
            accept="image/jpeg"
            multiple
            ref="beforePhotos"
          />
        </div>
        <div class="stage" v-show="stage === 2">
          <h2>Upload "During Photos" (select 1 or more photos)</h2>
          <input
            type="file"
            @change="handleDuringPhotos"
            accept="image/jpeg"
            multiple
            ref="duringPhotos"
          />
        </div>
        <div class="stage" v-show="stage === 3">
          <h2>Upload "After Photos" (select 1 or more photos)</h2>
          <input
            type="file"
            @change="handleAfterPhotos"
            accept="image/jpeg"
            multiple
            ref="afterPhotos"
          />
        </div>
        <div class="stage" v-show="stage === 4">
          <h2>Add Photo Descriptions</h2>
          <div>
            <h3>Before Photos</h3>
            <div
              v-for="photo of formData.beforePhotos"
              :key="photo.name"
              class="photo-list"
            >
              <div class="left">
                <img class="preview-image" :src="photo.src" />
                Upload: {{ photoUploadProgress[photo.name] }}%
              </div>
              <div class="right">
                <label>
                  <textarea
                    v-model="formData.photoDescriptions[photo.name]"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <div>Photo Description</div>
                </label>
              </div>
            </div>
          </div>
          <div class="divider-line"></div>
          <div>
            <h3>During Photos</h3>
            <div
              v-for="photo of formData.duringPhotos"
              :key="photo.name"
              class="photo-list"
            >
              <div class="left">
                <img class="preview-image" :src="photo.src" />
                Upload: {{ photoUploadProgress[photo.name] }}%
              </div>
              <div class="right">
                <label>
                  <textarea
                    v-model="formData.photoDescriptions[photo.name]"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <div>Photo Description</div>
                </label>
              </div>
            </div>
          </div>
          <div class="divider-line"></div>
          <div>
            <h3>After Photos</h3>
            <div
              v-for="photo of formData.afterPhotos"
              :key="photo.name"
              class="photo-list"
            >
              <div class="left">
                <img class="preview-image" :src="photo.src" />
                Upload: {{ photoUploadProgress[photo.name] }}%
              </div>
              <div class="right">
                <label>
                  <textarea
                    v-model="formData.photoDescriptions[photo.name]"
                    cols="30"
                    rows="10"
                  ></textarea>
                  <div>Photo Description</div>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="next-button"
            :disabled="submitButtonDisabled"
          >
            SUBMIT
          </button>
        </div>
        <div v-show="stage === 5">
          <h3>CONGRATULATIONS</h3>
          <p>You've successfully submitted proof of Biochar Carbon Capture</p>
          <p>Your Reference ID: {{ formData.referenceId }}</p>
          <p>
            Would you like to submit additional proofs?
            <button type="button" class="next-button" @click="handleReset">
              Click Here
            </button>
          </p>
        </div>
      </form>
      <button
        @click="handleNextButtonClick"
        :disabled="nextButtonDisabled"
        v-show="stage < 4"
        class="next-button"
      >
        NEXT
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import FirebaseService from '@/FirebaseService';
import moment from 'moment';

export default {
  name: 'App',
  components: {},
  data() {
    return {
      stage: 0,
      nextButtonDisabled: false,
      formData: {
        name: '',
        phoneNumber: '',
        paymentMethod: '',
        beforePhotos: [],
        duringPhotos: [],
        afterPhotos: [],
        referenceId: '',
        photoDescriptions: {},
      },
      submitButtonDisabled: true,
      localization: {
        en: {},
        hil: {},
      },
      photoUploadProgress: {},
      photoUploadResults: {},
    };
  },
  methods: {
    async handleNextButtonClick() {
      if (this.stage === 0) {
        if (!this.formData.name) {
          alert('Name field is misssing');
          return;
        }

        if (!this.formData.phoneNumber) {
          alert('Phone Number field is misssing');
          return;
        }

        this.stage++;
      } else if (this.stage === 1) {
        if (this.formData.beforePhotos.length === 0) {
          this.nextButtonDisabled = true;
          alert('At least 1 before photo is required');
          return;
        }

        for (const photo of this.formData.beforePhotos) {
          if (!photo.type.includes('image/jpeg')) {
            alert('All files must be type JPEG');
            return;
          }
        }

        this.stage++;
      } else if (this.stage === 2) {
        if (this.formData.duringPhotos.length === 0) {
          this.nextButtonDisabled = true;
          alert('At least 1 during photo is required');
          return;
        }

        for (const photo of this.formData.duringPhotos) {
          if (!photo.type.includes('image/jpeg')) {
            alert('All files must be type JPEG');
            return;
          }
        }

        this.stage++;
      } else if (this.stage === 3) {
        if (this.formData.afterPhotos.length === 0) {
          this.nextButtonDisabled = true;
          alert('At least 1 after photo is required');
          return;
        }

        for (const photo of this.formData.afterPhotos) {
          if (!photo.type.includes('image/jpeg')) {
            alert('All files must be type JPEG');
            return;
          }
        }

        // START UPLOADING PHOTOS
        const photoUploadPromises = [];
        this.formData.referenceId = uuid();

        for (const photo of this.formData.beforePhotos) {
          photo.src = URL.createObjectURL(photo);

          this.photoUploadProgress[photo.name] = 0;
          this.formData.photoDescriptions[photo.name] = '';

          photoUploadPromises.push(
            FirebaseService.uploadFile(
              photo,
              `${this.formData.referenceId}/${photo.name}`,
              this.setPhotoUploadProgress
            )
          );
        }

        for (const photo of this.formData.duringPhotos) {
          photo.src = URL.createObjectURL(photo);

          this.photoUploadProgress[photo.name] = 0;
          this.formData.photoDescriptions[photo.name] = '';

          photoUploadPromises.push(
            FirebaseService.uploadFile(
              photo,
              `${this.formData.referenceId}/${photo.name}`,
              this.setPhotoUploadProgress
            )
          );
        }

        for (const photo of this.formData.afterPhotos) {
          photo.src = URL.createObjectURL(photo);

          this.photoUploadProgress[photo.name] = 0;
          this.formData.photoDescriptions[photo.name] = '';

          photoUploadPromises.push(
            FirebaseService.uploadFile(
              photo,
              `${this.formData.referenceId}/${photo.name}`,
              this.setPhotoUploadProgress
            )
          );
        }

        this.stage++;

        try {
          const resultPromises = await Promise.all(photoUploadPromises);

          this.submitButtonDisabled = false;

          for (const result of resultPromises) {
            this.photoUploadResults[result.name] = result.downloadUrl;
          }
        } catch (error) {
          // nothing
        }
      }
    },
    setPhotoUploadProgress(name, progress) {
      this.photoUploadProgress[name] = progress;
    },
    handleBeforePhotos() {
      this.formData.beforePhotos = this.$refs.beforePhotos.files;

      if (this.formData.beforePhotos.length === 0) {
        this.nextButtonDisabled = true;
        return;
      }

      if (this.formData.beforePhotos.length > 0) {
        this.nextButtonDisabled = false;
      }
    },
    handleDuringPhotos() {
      this.formData.duringPhotos = this.$refs.duringPhotos.files;

      if (this.formData.duringPhotos.length === 0) {
        this.nextButtonDisabled = true;
        return;
      }

      if (this.formData.duringPhotos.length > 0) {
        this.nextButtonDisabled = false;
      }
    },
    handleAfterPhotos() {
      this.formData.afterPhotos = this.$refs.afterPhotos.files;

      if (this.formData.afterPhotos.length === 0) {
        this.nextButtonDisabled = true;
        return;
      }

      if (this.formData.afterPhotos.length > 0) {
        this.nextButtonDisabled = false;
      }
    },
    async handleSubmit(event) {
      event.preventDefault();

      const beforePhotos = [];
      const duringPhotos = [];
      const afterPhotos = [];

      this.formData.beforePhotos.forEach((photo) => {
        beforePhotos.push({
          url: this.photoUploadResults[photo.name],
          name: photo.name,
          description: this.formData.photoDescriptions[photo.name],
          storagePath: `${this.formData.referenceId}/${photo.name}`,
        });
      });
      this.formData.duringPhotos.forEach((photo) => {
        duringPhotos.push({
          url: this.photoUploadResults[photo.name],
          name: photo.name,
          description: this.formData.photoDescriptions[photo.name],
          storagePath: `${this.formData.referenceId}/${photo.name}`,
        });
      });
      this.formData.afterPhotos.forEach((photo) => {
        afterPhotos.push({
          url: this.photoUploadResults[photo.name],
          name: photo.name,
          description: this.formData.photoDescriptions[photo.name],
          storagePath: `${this.formData.referenceId}/${photo.name}`,
        });
      });

      const proof = {
        referenceId: this.formData.referenceId,
        name: this.formData.name,
        phoneNumber: this.formData.phoneNumber,
        paymentMethod: this.formData.paymentMethod,
        beforePhotos,
        duringPhotos,
        afterPhotos,
        timestamp: moment()
          .utc()
          .unix(),
      };

      try {
        await FirebaseService.createDocument('proofs', proof);

        this.stage++;
      } catch (error) {
        alert(error.message);
      }
    },
    handleReset() {
      this.stage = 0;
      this.nextButtonDisabled = false;
      this.formData = {
        name: '',
        phoneNumber: '',
        paymentMethod: '',
        beforePhotos: [],
        duringPhotos: [],
        afterPhotos: [],
      };
      this.submitButtonDisabled = true;
    },
  },
};
</script>

<style lang="scss">
.submit-proof-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    text-align: center;
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;

      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }

  .how-to {
    // width: 30rem;

    .how-to-list {
      // width: 20rem;
    }
  }

  .divider-line {
    width: 100%;
    height: 0.15rem;
    background: gray;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      text-align: center;
    }

    .form {
      display: flex;
      flex-direction: column;

      label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .photo-list {
        display: flex;
        justify-content: space-between;

        .left,
        .right label {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .left {
          margin-right: 1rem;
        }

        .preview-image {
          width: 15rem;
        }
      }
    }
  }

  .next-button {
    background-color: #4caf50;
    border: none;
    color: #fff;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-right: 1rem;
    cursor: pointer;
  }

  .next-button:hover {
    opacity: 0.75;
  }

  .next-button:disabled {
    cursor: no-drop;
    opacity: 0.5;
  }
}
</style>
