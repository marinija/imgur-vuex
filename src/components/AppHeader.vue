<template>
  <div class="ui secondary pointing menu">
    <router-link to="/" class="active item"> Image Storage </router-link>
    <div class="right menu">
      <div v-if="isLoggedIn" class="horizontal">
        <router-link to="/favorites" class="item">Favorites</router-link>
        <router-link to="/" class="item">Galleries</router-link>
        <router-link to="/upload" class="item">Upload</router-link>
        <img
          :src="userAvatarImg.avatar"
          :alt="userAvatarImg.avatar_name"
          title="User info"
          class="avatar"
        />
        <router-link to="/" class="item" @click="logout">Logout</router-link>
      </div>
      <a href="#" class="ui item" @click="login" v-else>Login</a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",
  computed: mapGetters(["isLoggedIn", "userAvatarImg"]),
  methods: mapActions(["login", "logout", "userAvatar"]),
  created() {
    this.userAvatar();
  },
};
</script>

<style scoped>
.horizontal {
  display: flex;
}
.right .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 3px;
}
</style>