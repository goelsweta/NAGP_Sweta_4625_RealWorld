<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="panel panel-login">
          <div class="panel-heading">
            <div class="row">
              <div class="col-xs-6">
                <a v-bind:class="{active: !isNewUser}" v-on:click.prevent="loginClick()">Login</a>
              </div>
              <div class="col-xs-6">
                <a v-bind:class="{active: isNewUser}" v-on:click.prevent="registerClick()">Register</a>
              </div>
            </div>
            <hr>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-lg-12">
                <RegisterComponent v-if="isNewUser"></RegisterComponent>
                <LoginComponent v-else></LoginComponent>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import LoginComponent from '@/components/Login.vue'; // @ is an alias to /src
import RegisterComponent from '@/components/Register.vue'; // @ is an alias to /src

@Component({
  components: {
    LoginComponent,
    RegisterComponent,
  },
})
export default class Login extends Vue {
  private isNewUser: boolean = false;

  private loginClick() {
    this.isNewUser = false;
  }

  private registerClick() {
    this.isNewUser = true;
  }
}
</script>

<style scoped>
body {
  padding-top: 90px;
}

a:hover {
  cursor: pointer;
}

.panel-login {
  border-color: #ccc;
  -webkit-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
}

.panel-login > .panel-heading {
  color: #00415d;
  background-color: #fff;
  border-color: #fff;
  text-align: center;
}

.panel-login > .panel-heading a {
  text-decoration: none;
  color: #666;
  font-weight: bold;
  font-size: 15px;
  -webkit-transition: all 0.1s linear;
  -moz-transition: all 0.1s linear;
  transition: all 0.1s linear;
}

.panel-login > .panel-heading a.active {
  color: #029f5b;
  font-size: 18px;
}

.panel-login > .panel-heading hr {
  margin-top: 10px;
  margin-bottom: 0px;
  clear: both;
  border: 0;
  height: 1px;
  background-image: -webkit-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -moz-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -ms-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
  background-image: -o-linear-gradient(
    left,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0)
  );
}
</style>
