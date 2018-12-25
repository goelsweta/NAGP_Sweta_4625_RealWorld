<template>
  <form>
    <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>
    <div class="form-group">
      <input
        type="text"
        tabindex="1"
        class="form-control"
        placeholder="Username"
        v-model="user.username"
      >
    </div>
    <div class="form-group">
      <input
        type="email"
        tabindex="2"
        class="form-control"
        placeholder="Email Address"
        v-model="user.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        tabindex="3"
        class="form-control"
        placeholder="Password"
        v-model="user.password"
      >
    </div>
    <div class="form-group">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <input
            type="button"
            tabindex="4"
            class="form-control btn btn-register"
            value="Register"
            v-on:click="registerUser"
          >
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import users from "@/store/modules/users";
import axios from "axios";

@Component
export default class RegisterComponent extends Vue {
  private user = {
    username: "",
    email: "",
    password: ""
  };
  private errors: any = [];

  private registerUser() {
    users.register(this.user).then(
      (response: any) => {
        window.localStorage.setItem("token", response.user.token);
        this.$router.push("/articles");
      },
      (error: any) => {
        // this.errors = error.response.data.errors;
      }
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input[type="text"],
input[type="email"],
input[type="password"] {
  height: 45px;
  border: 1px solid #ddd;
  font-size: 16px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}

input:hover,
input:focus {
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border-color: #ccc;
}

.btn-register {
  background-color: #1cb94e;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #1cb94a;
}

.btn-register:hover,
.btn-register:focus {
  color: #fff;
  background-color: #1ca347;
  border-color: #1ca347;
}
</style>
