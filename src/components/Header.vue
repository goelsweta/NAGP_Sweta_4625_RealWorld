<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">Real World</router-link>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="nav navbar-nav navbar-right" v-if="username">
          <li class="nav-item active">
            <router-link class="nav-link" to="/articles">Articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'article-edit' }">New Article</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/profile" v-text="username"></router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item active">
            <router-link class="nav-link" to="/articles">Articles</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import users from "@/store/modules/users";

@Component
export default class Header extends Vue {
  get username() {
    return users.username;
  }
}
</script>

<style scoped></style>
