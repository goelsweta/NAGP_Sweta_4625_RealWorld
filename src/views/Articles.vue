<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10 col-md-8">
        <div class="comment-tabs">
          <ul class="nav nav-tabs" role="tablist">
            <li v-bind:class="{active: !isGlobalFeed && tag == ''}" v-if="isUserLoggedIn">
              <a href="javascript:void(0);" v-on:click="toggleList(false)">
                <h4 class="reviews text-capitalize">Your Feed</h4>
              </a>
            </li>
            <li v-bind:class="{active:isGlobalFeed && tag == ''}">
              <a href="javascript:void(0);" v-on:click="toggleList(true)">
                <h4 class="reviews text-capitalize">Global Feed</h4>
              </a>
            </li>
            <li v-bind:class="{active : tag != ''}" v-if="tag!=''">
              <a href="javascript:void(0);">
                <h4 class="reviews text-capitalize">#{{ tag }}</h4>
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <ArticleList :type="type" :tag="tag"></ArticleList>
          </div>
        </div>
      </div>
      <TagList @clicked="onTagClicked"></TagList>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import ArticleList from "@/components/ArticleList.vue"; // @ is an alias to /src
import TagList from "@/components/TagList.vue"; // @ is an alias to /src
import users from "@/store/modules/users";
import { FeedType } from "@/shared/enums/feed-type-enum";

@Component({
  components: {
    ArticleList,
    TagList
  }
})
export default class Articles extends Vue {
  private isGlobalFeed: boolean = false;
  private type: FeedType = FeedType.User;
  private tag: string = "";

  get isUserLoggedIn() {
    return users.isUserLoggedIn;
  }

  private mounted() {
    this.isGlobalFeed = this.isUserLoggedIn ? false : true;
  }

  private onTagClicked(value: any) {
    this.tag = value;
    this.type = FeedType.Tag;
  }
  private toggleList(isGlobalFeed: boolean) {
    this.tag = "";
    this.isGlobalFeed = isGlobalFeed;
    this.type = isGlobalFeed ? FeedType.All : FeedType.User;
  }
}
</script>

<style>
.reviews {
  color: #555;
  font-weight: bold;
  margin: 10px auto 20px;
}

.notes {
  color: #999;
  font-size: 12px;
}

.media-body {
  position: relative;
}

.media-date {
  position: absolute;
  right: 25px;
  top: 25px;
}

.media-date li {
  padding: 0;
}

.media-date li:first-child:before {
  content: "";
}

.media-date li:before {
  content: ".";
  margin-left: -2px;
  margin-right: 2px;
}

.media-comment {
  margin-bottom: 20px;
}

.media-replied {
  margin: 0 0 20px 50px;
}

.media-replied .media-heading {
  padding-left: 6px;
}

.btn-circle {
  font-weight: bold;
  font-size: 12px;
  padding: 6px 15px;
  border-radius: 20px;
}

.btn-circle span {
  padding-right: 6px;
}

.embed-responsive {
  margin-bottom: 20px;
}

.tab-content {
  padding: 15px;
  border: 1px solid #ddd;
  border-top: 0;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
}

.custom-input-file {
  overflow: hidden;
  position: relative;
  width: 120px;
  height: 120px;
  background: #eee
    url("https://s3.amazonaws.com/uifaces/faces/twitter/walterstephanie/128.jpg");
  background-size: 120px;
  border-radius: 120px;
}

input[type="file"] {
  z-index: 999;
  line-height: 0;
  font-size: 0;
  position: absolute;
  opacity: 0;
  filter: alpha(opacity=0);
  -ms-filter: "alpha(opacity=0)";
  margin: 0;
  padding: 0;
  left: 0;
}

.uploadPhoto {
  position: absolute;
  top: 25%;
  left: 25%;
  display: none;
  width: 50%;
  height: 50%;
  color: #fff;
  text-align: center;
  line-height: 60px;
  text-transform: uppercase;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  cursor: pointer;
}

.custom-input-file:hover .uploadPhoto {
  display: block;
}
</style>
