<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue"; // @ is an alias to /src
import Footer from "@/components/Footer.vue";
import loader from "@/shared/loader";

@Component({
  components: {
    Header,
    Footer
  }
})
export default class App extends Vue {
  private created() {
    const element = document.getElementById("overlay") as HTMLDivElement;
    element.style.display = "none";
  }
}
</script>


