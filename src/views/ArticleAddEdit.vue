<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <div class="form_main">
          <div class="form">
            <form>
              <input
                type="text"
                required
                placeholder="Article Title"
                value
                v-model="article.title"
                class="txt"
              >
              <input
                type="text"
                required
                placeholder="What's this article about?"
                value
                v-model="article.description"
                class="txt"
              >
              
              <textarea
                placeholder="Write your article(in markdown)"
                rows="8"
                v-model="article.body"
                type="text"
                class="txt txt_3"
              ></textarea>
              <input
                type="text"
                required
                placeholder="Enter Tags"
                v-model="tag"
                class="txt tag-input"
                v-on:keypress.enter="addTag"
              >
              <div class="tag-list">
                <span v-for="(t,index) in article.tagList" :key="index">
                  <i class="glyphicon glyphicon-remove" v-on:click="removeTag($event, t)"></i>
                  {{ t }}
                </span>
              </div>
              <input
                type="button"
                value="Publish Article"
                v-on:click="publishArticle"
                class="txt2 pull-right"
              >
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang='ts'>
import { Component, Vue, Prop } from "vue-property-decorator";
import { Article } from "@/store/models";
import articles from "@/store/modules/articles";

@Component
export default class ArticleAddEdit extends Vue {
  private tagList: string[] = [];
  private article = {
    title: "",
    body: "",
    tagList: this.tagList,
    description: ""
  };
  private model: Article;
  private tag: string = "";

  private beforeCreate() {
    const slug = this.$route.params.slug;
    if (slug && slug !== "") {
      articles.getArticle(slug).then((response: any) => {
        this.article = response.article;
      });
    } else {
      this.article.tagList = this.tagList;
    }
  }

  private addTag(event: any) {
    event.stopPropagation();
    if (this.article.tagList && this.article.tagList.indexOf(this.tag) === -1) {
      this.article.tagList.push(this.tag);
      this.tag = "";
    }
  }

  private removeTag(event: any, tag: string) {
    event.stopPropagation();
    if (this.article.tagList) {
      this.article.tagList.splice(this.article.tagList.indexOf(tag), 1);
    }
    this.tag = this.tag;
  }

  private publishArticle() {
    if (this.$route.params.slug) {
      articles.editArticle(this.article).then((response: any) => {
        this.$router.push({
          name: "article",
          params: { slug: this.$route.params.slug }
        });
      });
    } else {
      articles.publishArticle(this.article).then((response: any) => {
        this.$router.push({
          name: "article",
          params: { slug: response.article.slug }
        });
      });
    }
  }

  private showHide(show: boolean) {
    const element = document.getElementById("overlay") as HTMLDivElement;
    element.style.display = show ? "block" : "none";
  }
}
</script>

<style scoped>
.tag-list {
  float: left;
  width: 70%;
  padding-top: 10px;
}

.tag-list span {
  display: inline-block;
  padding: 0.1em 0.6em;
  background: #818a91;
  font-size: small;
  margin: 5px;
  color: #fff;
  text-decoration: none;
  border-radius: 10rem;
}

.form_main {
  width: 100%;
}

.form_main h4 {
  font-family: roboto;
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 15px;
  margin-top: 20px;
  text-transform: uppercase;
}

.heading {
  border-bottom: 1px solid #fcab0e;
  padding-bottom: 9px;
  position: relative;
}

.heading span {
  background: #9e6600 none repeat scroll 0 0;
  bottom: -2px;
  height: 3px;
  left: 0;
  position: absolute;
  width: 75px;
}

.form {
  border-radius: 7px;
  padding: 6px;
}

.txt[type="text"] {
  border: 1px solid #ccc;
  margin: 10px 0;
  padding: 10px 0 10px 5px;
  width: 100%;
  border-radius: 7px;
}

.txt_3[type="text"] {
  margin: 10px 0 0;
  padding: 10px 0 10px 5px;
  width: 100%;
}

.txt2[type="button"] {
  background: #5cb85c none repeat scroll 0 0;
  border: 1px solid #5cb85c;
  border-radius: 7px;
  color: #fff;
  font-size: 20px;
  font-style: normal;
  line-height: 35px;
  margin: 10px 0;
  padding: 5px 10px;
  width: auto;
}
</style>
