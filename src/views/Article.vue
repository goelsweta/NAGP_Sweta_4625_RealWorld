<template>
  <div>
    <div class="article-details">
      <span class="title" v-text="article.title"></span>
      <div class="comment-footer">
        <a class="author-image" href="javascript:void(0);">
          <img v-bind:src="article.author.image">
        </a>
        <a class="username" href="javascript:void(0);" v-text="article.author.username"></a>
        <span class="created-date" v-text="getDate(article.createdAt)"></span>
        <button
          v-if="isUserLoggedIn && username == article.author.username"
          class="edit-icon"
          v-on:click="editArticle(article)"
        >
          <i class="glyphicon glyphicon-edit"></i>Edit Article
        </button>
        <button
          v-if="isUserLoggedIn && username == article.author.username"
          class="delete-icon"
          v-on:click="deleteArticle(article)"
        >
          <i class="glyphicon glyphicon-trash"></i>Delete Article
        </button>
        <button
          v-if="isUserLoggedIn && username != article.author.username"
          class="favourite-icon"
          v-on:click="favoriteArticle(article)"
        >
          <i class="glyphicon glyphicon-heart-empty"></i>
          {{ article.favorited ? 'Unfavourite Article' : 'Favourite Article' }}
        </button>
      </div>
    </div>
    <div></div>
    <CommentList></CommentList>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";
import CommentList from "@/components/CommentList.vue"; // @ is an alias to /src
import { Route } from "vue-router";
import articles from "@/store/modules/articles";
import users from "@/store/modules/users";

@Component({
  components: {
    CommentList
  }
})
export default class Article extends Vue {
  get isUserLoggedIn() {
    return users.isUserLoggedIn;
  }

  get username() {
    return users.username;
  }
  get article() {
    return articles.getArticleBySlug;
  }

  private beforeCreate() {
    const element = document.getElementById("overlay") as HTMLDivElement;
    element.style.display = "block";
    articles.getArticle(this.$route.params.slug);
  }

  private created() {
    this.showHide(false);
  }

  private editArticle(article: any) {
    this.$router.push({
      name: "article-edit",
      params: { slug: article.slug }
    });
  }

  private deleteArticle(article: any) {
    articles.deleteArticle(article).then(() => {
      this.$router.push("/articles");
    });
  }

  private favoriteArticle(article: any) {
    this.showHide(true);
    article.favorited
      ? articles.unfavoriteArticle(article.slug).then(() => {
          this.showHide(false);
        })
      : articles.favoriteArticle(article.slug).then(() => {
          this.showHide(false);
        });
  }

  private getDate(date: string) {
    return new Date(date).toDateString();
  }

  private showHide(show: boolean) {
    const element = document.getElementById("overlay") as HTMLDivElement;
    element.style.display = show ? "block" : "none";
  }
}
</script>

<style scoped>
.article-details {
  background-color: #333;
  display: block;
  padding: 15px 120px;
}
.comment-footer {
  margin: 30px;
  margin-bottom: 10px !important;
}
.title {
  font-size: xx-large;
  margin: 20px;
  padding: 15px;
  color: white;
  font-weight: bold;
}
.delete-icon {
  margin: 10px;
  background-color: transparent;
  color: #b85c5c;
  border: 1px solid #b85c5c;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
}

.delete-icon:hover {
  background-color: #b85c5c;
  color: #ffffff;
}

.edit-icon {
  margin: 10px;
  margin-left: 350px;
  background-color: transparent;
  color: #ccc;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
}

.edit-icon:hover {
  background-color: #ccc;
  color: #fff;
}

.favourite-icon {
  margin: 10px;
  margin-left: 350px;
  background-color: transparent;
  color: #5cb85c;
  border: 1px solid #5cb85c;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 400;
}

.favourite-icon:hover {
  background-color: #5cb85c;
  color: #fff;
}

.author-image {
  height: 25px;
  width: 25px;
  margin: 10px;
}
.author-image img {
  height: 30px;
  border-radius: 50px;
}
.username {
  margin: 10px;
  font-size: x-large;
  font-weight: bold;
  color: #fff;
}
.glyphicon {
  padding: 5px;
}

.created-date {
  margin: 5px;
  font-size: 10px;
  color: #fff;
}
</style>
