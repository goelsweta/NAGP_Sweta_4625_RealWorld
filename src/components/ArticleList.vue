<template>
  <div class="tab-pane active">
    <ul class="media-list">
      <li class="media" v-for="(article,index) in articlesList" :key="index">
        <div class="media-body">
          <div class="well well-lg">
            <div class="profile">
              <img class="img-circle" v-bind:src="article.author.image" alt="profile">
              <div class="info">
                <h4 class="media-heading" v-text="article.author.username"></h4>
                <p class="media-comment" v-text="article.createdAt"/>
              </div>
            </div>
            <h4 class="media-heading reviews" v-text="article.title"></h4>
            <p class="media-comment" v-text="article.description"/>
            <div class="article-footer">
              <div class="read-more">
                <router-link
                  :to="{ name:'article' , params:{ slug: article.slug } }"
                  active-class="active"
                >Read more...</router-link>
              </div>
              <div class="tags">
                <a
                  href="javascript:void(0)"
                  v-for="(tag,index) in article.tagList"
                  :key="index"
                  v-text="tag"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import articles from "@/store/modules/articles";
import { Article } from "@/store/models";
import { FeedType } from "@/shared/enums/feed-type-enum";
import users from "@/store/modules/users";
import { Loader } from "@/shared/loader";

@Component({})
export default class ArticleList extends Vue {
  @Prop({ default: FeedType.All }) private type: FeedType;
  @Prop({ default: "" }) private tag: string;

  get articlesList() {
    return articles.articleList;
  }

  @Watch("type")
  onFeedTypeChnage(val: string, oldVal: string) {
    this.showHide(true);
    let Author: string | null = "";
    let Favorited: string | null = "";
    switch (this.type) {
      case FeedType.All:
        Author = "";
        Favorited = "";
        break;
      case FeedType.User:
        Author = users.username;
        Favorited = "";
        break;
      case FeedType.Favorited:
        Favorited = users.username;
        Author = "";
        break;
    }
    articles
      .fetchArticleList({
        author: Author,
        favorited: Favorited,
        limit: 500,
        offset: 0
      })
      .then(() => {
        this.showHide(false);
      });
  }

  @Watch("tag")
  onTagChange(val: string, oldVal: string) {
    this.showHide(true);
    articles
      .fetchArticleList({
        limit: 500,
        offset: 0,
        tag: val
      })
      .then(() => {
        this.showHide(false);
      });
  }

  private created() {
    articles
      .fetchArticleList({
        author: users.username,
        limit: 500,
        offset: 0
      })
      .then(() => {
        this.showHide(false);
      });
  }
  private showHide(show: boolean) {
    const element = document.getElementById("overlay") as HTMLDivElement;
    element.style.display = show ? "block" : "none";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  margin-left: 20px;
  display: inline-block;
}

.info h4 {
  text-transform: none;
}

.info p {
  margin-bottom: 0px;
  font-weight: 400;
}

.img-circle {
  height: 60px;
  width: 60px;
}

.profile {
  display: block;
}
.tags {
  float: right;
  width: 75%;
  padding: 10px;
}

.tags a {
  padding: 0.1em 0.6em;
  background: #818a91;
  font-size: small;
  margin: 5px;
  color: #fff;
  text-decoration: none;
  border-radius: 10rem;
  float: right;
}
.article-footer {
  width: 100%;
  display: inline-block;
}

.article-footer .read-more {
  float: left;
  width: 25%;
  padding: 10px;
}
.well.well-lg {
  margin-bottom: 0;
  padding-bottom: 0;
}
</style>