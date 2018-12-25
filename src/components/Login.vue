<template>
  <form>
    <ul v-if="errors" class="error-messages">
      <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
    </ul>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Email" v-model="user.email">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="user.password">
    </div>

    <div class="form-group">
      <div class="row">
        <div class="col-sm-6 col-sm-offset-3">
          <input type="button" class="form-control btn btn-login" value="Log In" v-on:click="login">
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import users from "@/store/modules/users";

@Component
export default class LoginComponent extends Vue {
  private user = {
    email: "",
    password: ""
  };
  private errors: any = [];
  private login() {
    users
      .login({
        email: this.user.email,
        password: this.user.password
      })
      .then(
        (response: any) => {
          window.localStorage.setItem("token", response.user.token);
          this.$router.push("/articles");
        },
        (error: any) => {
          alert("error");
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

.btn-login {
  background-color: #59b2e0;
  outline: none;
  color: #fff;
  font-size: 14px;
  height: auto;
  font-weight: normal;
  padding: 14px 0;
  text-transform: uppercase;
  border-color: #59b2e6;
}

.btn-login:hover,
.btn-login:focus {
  color: #fff;
  background-color: #53a3cd;
  border-color: #53a3cd;
}
</style>
