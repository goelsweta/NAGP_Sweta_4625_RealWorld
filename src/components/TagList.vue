<template>
  <div class="col-md-3 tags">
    <div class="tag-list">
      <p>Popular Tags</p>
      <div class="tag-list-inner">
        <a
          href="javascript:void(0);"
          v-for="(tag,index) in tagList"
          :key="index"
          v-text="tag"
          v-on:click="tagClicked(tag)"
        ></a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import tags from "@/store/modules/tags";
import { TagsResponse } from "@/store/models";

@Component
export default class TagList extends Vue {
  private tagList: any[] = [];

  private created() {
    tags.fetchTagList().then((response: any) => {
      this.tagList = response.tags;
    });
  }

  private tagClicked(tag: any) {
    this.$emit('clicked', tag);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tags {
  margin: 65px 40px;
  padding: 5px 10px 10px;
  background-color: #f3f3f3;
  height: 100%;
}

.tag-list {
  width: 100%;
  padding-bottom: 25px;
}

.tag-list-inner {
  float: left;
  width: 100%;
  padding-top: 10px;
}

.tag-list-inner a {
  display: inline-block;
  padding: 0.1em 0.6em;
  background: #818a91;
  font-size: small;
  margin: 5px;
  color: #fff;
  text-decoration: none;
  border-radius: 10rem;
}

p {
  font-size: 15px;
  font-weight: 500;
}
</style>
