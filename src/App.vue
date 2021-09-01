<template>
  <div class="app-container">
    <h1>Carbon Sequester Proof Web App</h1>
    <div class="how-to">
      <h4>How to create biochar:</h4>
      <ol class="how-to-list">
        <li>
          View youtube
          <a
            href="https://www.youtube.com/results?search_query=how+to+create+biochar"
            >video</a
          >
          on how to make biochar
        </li>
        <li>Take before picture of agriculture waste (see example)</li>
        <li>Make biochar - take a picture during (see example)</li>
        <li>Take after picture that shows the full biochar (see example)</li>
        <li>Take before picture of agriculture waste (see example)</li>
        <li>
          Take after picture that shows agriculture waste is gone. (see example)
        </li>
      </ol>
      <p>
        Adding multiple photos of each stage (before, during, after) with
        descriptions will maximize your $ payment $
      </p>
      <p>TIP: Have all photos already saved to your phone's camera roll</p>
    </div>
    <div class="form-container">
      <h1>Submit Proof of Biochar Carbon Capture</h1>
      <form class="form">
        <div class="stage" v-show="stage === 0">
          <h2>Basic Information</h2>
          <label>
            Name:
            <input type="text" required v-model="formData.name" />
          </label>
          <label>
            Phone Number:
            <input type="tel" required v-model="formData.phoneNumber" />
          </label>
          <label>
            Payment Method:
            <select v-model="formData.paymentMethod">
              <option value="" disabled></option>
              <option value="gcash">GCash</option>
              <option value="globe">Globe</option>
            </select>
          </label>
        </div>
        <div class="stage" v-show="stage === 1">
          <h2>Upload "Before Photos" (minimum of 1)</h2>
          <input
            type="file"
            @change="handleBeforePhotos"
            accept="image/jpeg"
            multiple
            ref="beforePhotos"
          />
        </div>
        <div class="stage" v-show="stage === 2">
          <h2>Upload "During Photos" (minimum of 1)</h2>
          <input
            type="file"
            @change="handleDuringPhotos"
            accept="image/jpeg"
            multiple
            ref="duringPhotos"
          />
        </div>
        <div class="stage" v-show="stage === 3">
          <h2>Upload "After Photos" (minimum of 1)</h2>
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
                <img src="" />
                Upload: X%
              </div>
              <div class="right">
                <label>
                  Photo Description:
                  <textarea cols="30" rows="10"></textarea>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3>During Photos</h3>
            <div
              v-for="photo of formData.duringPhotos"
              :key="photo.name"
              class="photo-list"
            >
              <div class="left">
                <img src="" />
                Upload: X%
              </div>
              <div class="right">
                <label>
                  Photo Description:
                  <textarea cols="30" rows="10"></textarea>
                </label>
              </div>
            </div>
          </div>
          <div>
            <h3>After Photos</h3>
            <div
              v-for="photo of formData.afterPhotos"
              :key="photo.name"
              class="photo-list"
            >
              <div class="left">
                <img src="" />
                Upload: X%
              </div>
              <div class="right">
                <label>
                  Photo Description:
                  <textarea cols="30" rows="10"></textarea>
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            :disabled="submitButtonDisabled"
            @submit="handleSubmit"
          >
            SUBMIT
          </button>
        </div>
        <div v-show="stage === 5">
          <h3>CONGRATULATIONS</h3>
          <p>You've successfully submitted proof of Biochar Carbon Capture</p>
          <p>Your Reference ID: X</p>
          <p>
            Would you like to submit additional proofs?
            <button type="button" @click="handleReset">Click Here</button>
          </p>
        </div>
      </form>
      <button
        @click="handleNextButtonClick"
        :disabled="nextButtonDisabled"
        v-show="stage < 4"
      >
        NEXT
      </button>
    </div>
  </div>
</template>

<script>
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
      },
      submitButtonDisabled: true,
      localization: {
        en: {},
        hil: {},
      },
    };
  },
  methods: {
    handleNextButtonClick() {
      if (this.stage === 0) {
        if (!this.formData.name) {
          alert('Name field is misssing');
          return;
        }

        if (!this.formData.phoneNumber) {
          alert('Phone Number field is misssing');
          return;
        }

        if (!this.formData.paymentMethod) {
          alert('Payment Method field is misssing');
          return;
        }
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
      } else if (this.stage === 4) {
        // TOOD: start uploading files, once all uploads complete, enable SUBMIT button

        this.nextButtonDisabled = true;
      }

      this.stage++;
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
    handleSubmit() {
      // TODO: send to server
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
.app-container {
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

  .how-to {
    // width: 30rem;

    .how-to-list {
      // width: 20rem;
    }
  }

  .form-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      text-align: center;
    }

    .form {
      width: 25rem;
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
      }
    }
  }
}
</style>
