<template>
  <h2>Your favorite gallery {{ userName }}</h2>
  <hr />
  <template v-for="photos in allFavoriteImages" :key="photos.id">
    <template v-for="image in photos.images" :key="image.id">
      <video controls class="videos">
        <source :src="image.mp4" type="video/mp4" />
      </video>
    </template>
  </template>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Favorites",
  computed: mapGetters(["allFavoriteImages", "userName"]),
  methods: mapActions(["getFavoriteImages"]),
  created() {
    this.getFavoriteImages();
  },
};
</script>

<style scoped>
.videos {
  max-height: 300px;
  margin-right: 2rem;
}
</style>