<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <AddComment v-if="isUserLoggedIn"></AddComment>
      </div>
      <div class="col-md-8">
        <div
          class="widget-area no-padding blank"
          v-for="(comment,index) in commentsList"
          :key="index"
          :comment="comment"
        >
          <div class="status-upload">
            <p v-text="comment.body"/>
            <div class="comment-footer">
              <a class="author-image" href="javascript:void(0);">
                <img v-bind:src="comment.author.image">
              </a>
              <a class="username" href="javascript:void(0);" v-text="comment.author.username"></a>
              <span
                class="created-date"
                v-bind:text="getDate(comment.createdAt)"
                v-text="getDate(comment.createdAt)"
              ></span>
              <a class="delete-icon" href="javascript:void(0);" v-if="isUserLoggedIn && comment.author.username == username">
                <i class="glyphicon glyphicon-trash" v-on:click="deleteComment(comment.id)"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import comments from "@/store/modules/comments";
import AddComment from "@/components/AddComment.vue";
import { Comment } from "@/store/models";
import users from "@/store/modules/users";

@Component({
  name: "CommentList",
  components: {
    AddComment,
  },
})
export default class CommentList extends Vue {
  get isUserLoggedIn() {
    return users.isUserLoggedIn;
  }

  get username() {
    return users.username;
  }

  get commentsList() {
    return comments.commentList;
  }
  private created() {
    comments.fetchCommentList(this.$route.params.slug);
  }

  private deleteComment(id: number) {
    comments.deleteComment({
      slug: this.$route.params.slug,
      id: id
    });
  }

  private getDate(date: string) {
    return new Date(date).toDateString();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  background: #fafafa;
}
.delete-icon {
  margin: 10px;
  float: right;
}

.delete-icon i {
  font-size: small;
  color: black;
}
.author-image {
  height: 25px;
  width: 25px;
  margin: 10px;
}
.author-image img {
  height: 25px;
  border-radius: 50px;
}
.widget-area.blank {
  background: none repeat scroll 0 0 rgba(0, 0, 0, 0);
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none;
  -o-box-shadow: none;
  box-shadow: none;
}
.username {
  margin: 5px;
}

.created-date {
  margin: 5px;
}

body .no-padding {
  padding: 0;
}

.widget-area {
  background-color: #fff;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  -webkit-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -ms-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  -o-box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.05);
  float: left;
  margin-top: 30px;
  padding: 25px 30px;
  position: relative;
  width: 100%;
}

.status-upload {
  background: none repeat scroll 0 0 #f5f5f5;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  float: left;
  width: 100%;
}

.status-upload form {
  float: left;
  width: 100%;
}

.status-upload form textarea {
  background: none repeat scroll 0 0 #fff;
  border: medium none;
  -webkit-border-radius: 4px 4px 0 0;
  -moz-border-radius: 4px 4px 0 0;
  -ms-border-radius: 4px 4px 0 0;
  -o-border-radius: 4px 4px 0 0;
  border-radius: 4px 4px 0 0;
  color: #777777;
  float: left;
  font-family: Lato;
  font-size: 14px;
  height: 142px;
  letter-spacing: 0.3px;
  padding: 20px;
  width: 100%;
  resize: vertical;
  outline: none;
  border: 1px solid #f2f2f2;
}

.status-upload p {
  padding: 15px;
  background-color: #fff;
  border: 1px solid #f2f2f2;
}

.status-upload ul {
  float: left;
  list-style: none outside none;
  margin: 0;
  padding: 0 0 0 15px;
  width: auto;
}

.status-upload ul > li {
  float: left;
}

.status-upload ul > li > a {
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #777777;
  float: left;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  margin: 10px 0 10px 10px;
  text-align: center;
  -webkit-transition: all 0.4s ease 0s;
  -moz-transition: all 0.4s ease 0s;
  -ms-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
  width: 30px;
  cursor: pointer;
}

.status-upload ul > li > a:hover {
  background: none repeat scroll 0 0 #606060;
  color: #fff;
}

.status-upload form button {
  border: medium none;
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  -ms-border-radius: 4px;
  -o-border-radius: 4px;
  border-radius: 4px;
  color: #fff;
  float: right;
  font-family: Lato;
  font-size: 14px;
  letter-spacing: 0.3px;
  margin-right: 9px;
  margin-top: 9px;
  padding: 6px 15px;
}

.dropdown > a > span.green:before {
  border-left-color: #2dcb73;
}

.status-upload form button > i {
  margin-right: 7px;
}
</style>
