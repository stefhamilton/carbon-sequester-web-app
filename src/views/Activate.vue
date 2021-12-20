<template>
  <div class="submit-proof-container">
    <div class="form-container">
      <h1>{{ $t('activate') }}</h1>
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
        </div>
        <div class="stage" v-show="stage === 0">
          <h2>{{ $t('activate') }}</h2>
          <input
            type="file"
            @change="handleActivationPhotos"
            accept="image/jpeg"
            multiple
            ref="activationPhotos"
          />
        </div>

        <div class="stage" v-show="stage === 1">
          <h2>{{ $t('add-photo-descriptions') }}</h2>
          <div>
            <h3>{{ $t('before-photos') }}</h3>
            <div
              v-for="photo of formData.activationPhotos"
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
                  <div>{{ $t('photo-description-1') }}</div>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="next-button"
            :disabled="submitButtonDisabled"
          >
            {{ $t('submit') }}
          </button>
        </div>

        <div v-show="stage === 2">
          <h3>{{ $t('congratulations') }}</h3>
          <p>{{ $t('successfully-submitted') }}</p>
          <p>{{ $t('your-reference') }} {{ formData.referenceId }}</p>
          <p>
            {{ $t('additional-proofs') }}
          </p>
          <button type="button" class="next-button" @click="handleReset">
            {{ $t('click-here') }}
          </button>
        </div>
      </form>
      <button
        @click="handleNextButtonClick"
        :disabled="nextButtonDisabled"
        v-show="stage < 1"
        class="next-button"
      >
        {{ $t('next') }}
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import FirebaseService from '@/FirebaseService';
import moment from 'moment';

export default {
  name: 'Activate',
  components: {},
  data() {
    return {
      stage: 0,
      nextButtonDisabled: false,
      formData: {
        name: '',
        phoneNumber: '',
        paymentMethod: '',
        activationPhotos: [],
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
    handleNextButtonClick: async function() {
      // print('next button pressed');
      console.log(this.stage);

      if (this.stage === 0) {
        if (!this.formData.name) {
          alert('Name field is missing');
          return;
        }

        if (!this.formData.phoneNumber) {
          alert('Phone Number field is missing');
          return;
        }
        if (this.formData.activationPhotos.length === 0) {
          this.nextButtonDisabled = true;
          alert('At least 1 before photo is required');
          return;
        }


        // START UPLOADING PHOTOS
        const photoUploadPromises = [];
        this.formData.referenceId = uuid();

        for (const photo of this.formData.activationPhotos) {
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

        try {
          const resultPromises = await Promise.all(photoUploadPromises);

          this.submitButtonDisabled = false;

          for (const result of resultPromises) {
            this.photoUploadResults[result.name] = result.downloadUrl;
          }
        } catch (error) {
          // nothing
        }

        this.stage++;
      } else if (this.stage === 1) {
        for (const photo of this.formData.activationPhotos) {
          if (!photo.type.includes('image/jpeg')) {
            alert('All files must be type JPEG');
            return;
          }
        }


        this.stage++;

      }
    },
    setPhotoUploadProgress(name, progress) {
      this.photoUploadProgress[name] = progress;
    },
    handleActivationPhotos() {
      this.formData.activationPhotos = this.$refs.activationPhotos.files;

      if (this.formData.activationPhotos.length === 0) {
        this.nextButtonDisabled = true;
        return;
      }

      if (this.formData.activationPhotos.length > 0) {
        this.nextButtonDisabled = false;
      }
    },

    handleSubmit: async function(event) {
      event.preventDefault();

      const activationPhotos = [];

      this.formData.activationPhotos.forEach((photo) => {
        activationPhotos.push({
          url: this.photoUploadResults[photo.name],
          name: photo.name,
          description: this.formData.photoDescriptions[photo.name],
          storagePath: `${this.formData.referenceId}/${photo.name}`,
        });
      });

      const activate = {
        referenceId: this.formData.referenceId,
        status: 'unevaluated',
        name: this.formData.name,
        phoneNumber: this.formData.phoneNumber,
        paymentMethod: this.formData.paymentMethod,
        activationPhotos: activationPhotos,

        timestamp: moment()
          .utc()
          .unix(),
      };

      try {
        await FirebaseService.createDocument('activate', activate);

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
        activationPhotos: [],
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
