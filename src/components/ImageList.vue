<template>
  <div>
    <div v-if="isLoggedIn" class="image-container">
      <h2>Your Gallery</h2>
      <div v-for="image in allImages" :key="image.id" class="images">
        <img :src="image.link" :alt="image.description" />
        <div class="d-flex icons">
          <i class="edit icon"></i>
          <i
            class="trash alternate icon"
            @click.once="deleteImageAct(image.deletehash)"
          ></i>
        </div>
      </div>
    </div>
    <h2 v-else>Log in to get started</h2>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ImageList",
  computed: mapGetters(["allImages", "isLoggedIn"]),
  methods: {
    ...mapActions(["fetchImages", "deleteImage"]),
    deleteImageAct(imageHash) {
      this.deleteImage(imageHash);
    },
  },
  created() {
    this.fetchImages();
  },
};
</script>

<style scoped>
.image-container {
  column-count: 4;
  column-gap: 0;
}

.images {
  position: relative;
}

.image-container .icons {
  position: absolute;
  bottom: 30px;
  display: flex;
  align-items: center;
  left: 40%;
  font-size: 20px;
  visibility: hidden;
}

.icons .edit,
.icons .trash {
  margin-right: 10px;
  cursor: pointer;
}
img {
  max-width: 100%;
  padding: 5px;
  border: 1px solid transparent;
}

img:hover {
  border: 1px solid green;
}

img:hover + .icons {
  visibility: visible;
}

.icons:hover {
  visibility: visible;
}
</style>