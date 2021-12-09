<template>
  <div class="evaluate-image-container">
    <div v-if="photo.isLoaded">
      <div>
        <strong>Device Make:</strong>
        {{ photo.deviceMake ? photo.deviceMake : '' }}
      </div>
      <div>
        <strong>Device Model:</strong>
        {{ photo.deviceModel ? photo.deviceModel : '' }}
      </div>
      <div>
        <strong>Device Software:</strong>
        {{ photo.deviceSoftware ? photo.deviceSoftware : '' }}
      </div>
      <div v-if="photo.gpsLatitude && photo.gpsLongitude">
        <strong>GPS (latitude, longitude):</strong>
        {{
          photo.gpsLatitude && photo.gpsLongitude
            ? `${photo.gpsLatitude}, ${photo.gpsLongitude} `
            : ''
        }}
        <a :href="photo.googleMapsUrl" target="_blank">Google Maps</a>
      </div>
      <div v-if="!photo.gpsLatitude || !photo.gpsLongitude">
        <strong>GPS INFO NOT FOUND</strong>
      </div>
      <div v-if="photo.gpsAltitude">
        <strong>GPS Altitude:</strong>
        {{ photo.gpsAltitude ? photo.gpsAltitude : '' }} feet
      </div>
      <div>
        <strong>Local Date Time:</strong>
        {{ photo.imageDateTime ? photo.imageDateTime : '' }}
      </div>
      <div>
        <strong>Dimensions (width x height):</strong>
        {{ photo.imageWidth ? photo.imageWidth : '' }} x
        {{ photo.imageHeight ? photo.imageHeight : '' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'evaluate-image',
  props: {
    photo: Object,
  },
};
</script>

<style lang="scss" scoped>
.evaluate-image-container {
}
</style>
