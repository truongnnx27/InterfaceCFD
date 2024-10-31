<template>
    <layouts-login></layouts-login>

    <!-- Course Lesson -->
    <section class="page-content course-sec course-lesson">
      <div class="container" style="margin-top: 30px;">
        <div class="row">
          <div class="col-lg-4">
            <!-- Course Lesson -->
            <div class="lesson-group" v-for="(section, index) in sections" :key="index">
              <div class="course-card">
                <h6 class="cou-title">
                  <a
                    class="collapsed"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    @click="viewSectionToggle(section.id)"
                    >{{ section.title }} <span>{{ section.lectures.length }} Lessons</span>
                  </a>
                </h6>
                <div class="card-collapse" v-if="viewSection[section.id]">
                  <div class="progress-stip">
                    <div
                      class="progress-bar bg-success progress-bar-striped active-stip"
                    ></div>
                  </div>
                  <!-- <div class="student-percent lesson-percent">
                    <p>10hrs<span>50%</span></p>
                  </div> -->
                  <ul>
                    <li v-for="(lecture, index) in section.lectures" :key="index">
                      <p class="play-intro">{{ lecture.title }}</p>
                      <div>
                        <img src="@/assets/img/icon/play-icon.svg" alt="" />
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!-- /Course Lesson -->
          </div>
          <div class="col-lg-8">
            <!-- Introduction -->
            <div class="student-widget lesson-introduction">
              <div class="lesson-widget-group">
                <h4 class="tittle">Introduction</h4>
                <div class="introduct-video">
                  <a
                    href="https://www.youtube.com/embed/1trvO6dqQUI"
                    class="video-thumbnail"
                    data-fancybox=""
                  >
                    <div class="play-icon">
                      <i class="fa-solid fa-play"></i>
                    </div>
                    <img class="" src="@/assets/img/video-img-01.jpg" alt="" />
                  </a>
                </div>
              </div>
            </div>
            <!-- /Introduction -->

            <!-- Show list comment -->
            <div class="card" style="width: 100%; margin-top: 10px; padding: 20px;">
            <!-- Post comment -->
              <div class="instructor-wrap" style="border: none; margin: 0 0 20px 0;">
                <div class="comment-sec" style="margin: 0; display: flex; align-items: start; width: 100%; flex-wrap: nowrap;">
                  <div class="abt-instructor-img" style="flex: 0 0 50px;">
                    <router-link to="/instructor/instructor-profile">
                      <img src="@/assets/img/user/user1.jpg"
                        alt="img"
                        class="img-fluid"/>
                    </router-link>
                  </div>
                  <form style="flex-grow: 1;">
                    <div class="form-group" style="margin-bottom: 10px;">
                      <textarea rows="4"
                        class="form-control"
                        placeholder="Your Comments"
                        style="width: 100%;"
                        v-model="postComment"></textarea>
                    </div>
                    <button class="submit-btn" type="button"
                      style="height: 30px; padding: 0;"
                      @click="postCommentInLesson(postComment)">Submit</button>
                  </form>
                </div>
              </div>
              <!-- Post comment -->
              <!-- List comment -->
              <ul style="max-width: 100%;">
                <li style="margin: 20px 0; width: 100%;"
                    v-for="(commentParent, index) in comments" :key="index"
                    v-show="commentParent.parentId == null">
                  <div class="instructor-wrap hoverComment"
                    style="border: none; margin: 0 0 10px 0; width: 100%; display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
                    <div class="abt-instructor-img" style="flex: 0 0 50px;">
                      <router-link to="/instructor/instructor-profile">
                        <img src="@/assets/img/user/user1.jpg"
                          alt="img"
                          class="img-fluid"/>
                      </router-link>
                    </div>
                    <div style="margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
                      <div class="instructor-detail" style="width: 100%;">
                        <h5>
                          <router-link to="/instructor/instructor-profile">{{ commentParent.fullName }}</router-link>
                        </h5>
                        <p style="font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word;"
                          v-if="!viewEditComment[commentParent.id]">
                          {{ commentParent.commentText }} 
                        </p>
                        <!-- Edit comment -->
                        <div class="comment-sec" style="display: flex"
                            v-if="viewEditComment[commentParent.id]">
                          <form style="flex-grow: 1; margin: 10px 0 20px 0;">
                            <div class="form-group" style="margin-bottom: 10px;">
                              <textarea rows="4"
                                class="form-control"
                                placeholder="Your Comments"
                                style="width: 100%;"
                                v-model="editCommentText[commentParent.id]"></textarea>
                            </div>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;"> 
                              <button class="submit-btn" type="button"
                              style="height: 30px; padding: 0;"
                              @click="putComment(commentParent, editCommentText[commentParent.id], commentParent.idUserComment)">Edit</button>
                              <button class="submit-btn" type="button"
                              style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                              @click="viewEditCommentToggle(commentParent.id)">Cancel</button>
                            </div>
                          </form>
                        </div>
                        <!-- Edit comment -->

                        <!-- Post reply -->
                        <a href="javascript:;" style="font-size: 14px;"
                            @click="viewPostReplyToggle(commentParent.id)"
                            class="rev-info"
                            v-if="!viewEditComment[commentParent.id]">
                          <i class="feather-corner-up-left"></i>Reply
                        </a>
                        <div class="comment-sec" style="display: flex"
                            v-if="viewPostReply[commentParent.id]">
                          <form style="flex-grow: 1; margin: 10px 0 20px 0;">
                            <div class="form-group" style="margin-bottom: 10px;">
                              <textarea rows="4"
                                class="form-control"
                                placeholder="Your Comments"
                                style="width: 100%;"
                                v-model="replyText[commentParent.id]"></textarea>
                            </div>
                            <div style="display: flex; gap: 10px; flex-wrap: wrap;"> 
                              <button class="submit-btn" type="button"
                              style="height: 30px; padding: 0;"
                              @click="postReplyInLesson(replyText[commentParent.id], commentParent.id)">Reply</button>
                              <button class="submit-btn" type="button"
                              style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                              @click="viewPostReplyToggle(commentParent.id)">Cancel</button>
                            </div>
                          </form>
                        </div>
                        <!-- Post reply -->
                      </div>
                      <div class="hoverMenu">
                        <a href="javascript:;"
                          class="listenComment"
                        v-if="commentParent.idUserComment === user.id">
                          <svg xmlns="http://www.w3.org/2000/svg" 
                          width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                          </svg>
                        </a>
                        <div class="popupStyle">
                          <a href="javascript:;"
                            @click="viewEditCommentToggle(commentParent.id, commentParent.commentText)">
                            <p>Edit</p>
                          </a>
                          <a href="javascript:;"
                            @click="deleteComment(commentParent.id, commentParent.idUserComment)">
                            <p>Delete</p>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- List reply -->
                  <ul style="margin: 15px 0 0 35px;">
                    <li style="margin: 10px 0 0 0;"
                        v-for="(commentChild, index) in getReplyOfComment(commentParent.id)" :key="index"
                        v-show="index < (buttonNumberShowComment[commentParent.id] ? getReplyOfComment(commentParent.id).length : 2)">
                      <div class="instructor-wrap hoverReply" 
                          style="margin: 0; border: none; width: 100%; display: flex; align-items: flex-start; justify-content: start; flex-wrap: nowrap;">
                          <div class="abt-instructor-img" style="flex: 0 0 40px;">
                            <router-link to="/instructor/instructor-profile">
                              <img src="@/assets/img/user/user1.jpg"
                                style="width: 40px; height: 40px;"
                                alt="img"
                                class="img-fluid"/>
                            </router-link>
                          </div>
                          <div style="margin: 0; display: flex; justify-content: space-between; flex-wrap: nowrap; flex-grow: 1;">
                            <div class="instructor-detail" style="width: 100%;">
                              <h5>
                                <router-link to="/instructor/instructor-profile">{{ commentChild.fullName }}</router-link>
                              </h5>
                              <p style="color: gray;">@{{ commentChild.nameUserReply }}</p>
                              <p style="font-size: 16px; margin: 5px 0 0 0; white-space: normal; overflow-wrap: break-word; word-break: break-word; padding-right: 20px;"
                                  v-if="!viewEditComment[commentChild.id]">
                                {{ commentChild.commentText }} 
                              </p>
                              <!-- Edit reply -->
                              <div class="comment-sec" style="display: flex"
                                  v-if="viewEditComment[commentChild.id]">
                                <form style="flex-grow: 1; margin: 10px 0 20px 0;">
                                  <div class="form-group" style="margin-bottom: 10px;">
                                    <textarea rows="4"
                                      class="form-control"
                                      placeholder="Your Comments"
                                      style="width: 100%;"
                                      v-model="editCommentText[commentChild.id]"></textarea>
                                  </div>
                                  <div style="display: flex; gap: 10px; flex-wrap: wrap;"> 
                                    <button class="submit-btn" type="button"
                                    style="height: 30px; padding: 0;"
                                    @click="putComment(commentChild, editCommentText[commentChild.id], commentChild.idUserComment)">Edit</button>
                                    <button class="submit-btn" type="button"
                                    style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                    @click="viewEditCommentToggle(commentChild.id)">Cancel</button>
                                  </div>
                                </form>
                              </div>
                              <!-- Edit reply -->
                              <!-- Post reply to reply-->
                              <a href="javascript:;" style="font-size: 14px;"
                                  @click="viewPostReplyToggle(commentChild.id)"
                                  class="rev-info"
                                  v-if="!viewEditComment[commentChild.id]">
                                <i class="feather-corner-up-left"></i>Reply
                              </a>
                              <div class="comment-sec" style="display: flex"
                                  v-if="viewPostReply[commentChild.id]">
                                <form style="flex-grow: 1; margin: 10px 0 20px 0;">
                                  <div class="form-group" style="margin-bottom: 10px;">
                                    <textarea rows="4"
                                      class="form-control"
                                      placeholder="Your Comments"
                                      style="width: 100%;"
                                      v-model="replyText[commentChild.id]"></textarea>
                                  </div>
                                  <div style="display: flex; gap: 10px; flex-wrap: wrap;"> 
                                    <button class="submit-btn" type="button"
                                    style="height: 30px; padding: 0;"
                                    @click="postReplyInLesson(replyText[commentChild.id], commentChild.id)">Reply</button>
                                    <button class="submit-btn" type="button"
                                    style="height: 30px; padding: 0; border: none; background-clip: border-box;"
                                    @click="viewPostReplyToggle(commentChild.id)">Cancel</button>
                                  </div>
                                </form>
                              </div>
                              <!-- Post reply to reply-->
                            </div>
                            <div class="hoverMenu">
                              <a href="javascript:;"
                                class="listenReply"
                                v-if="commentChild.idUserComment === user.id">
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                                </svg>
                              </a>
                              <div class="popupStyle">
                                <a href="javascript:;" 
                                  @click="viewEditCommentToggle(commentChild.id, commentChild.commentText)">
                                  <p>Edit</p>
                                </a>
                                <a href="javascript:;"
                                  @click="deleteComment(commentChild.id, commentChild.idUserComment)">
                                  <p>Delete</p>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                    </li>
                  </ul>
                  <div style="display: flex; justify-content: center; margin-top: 10px">
                    <a href="javascript:;" 
                      @click="buttonNumberShowCommentToggle(commentParent.id)"
                      v-if="getReplyOfComment(commentParent.id).length > 2">
                      {{ buttonNumberShowComment[commentParent.id] ? 'Ẩn bớt' : 'Xem thêm'}}
                    </a>
                  </div>
                  <!-- List reply -->
                </li>
              </ul>
              <!-- List comment -->
            </div>
            <!-- Show list comment -->
          </div>
        </div>
      </div>
    </section>
    <!-- /Course Lesson -->
</template>
<script>
  import * as StompJs from '@stomp/stompjs';
  import SockJS from 'sockjs-client';
  import axios from 'axios';
  const API_URL = 'http://localhost:8080';
  export default {
    data(){
      return {
        lecture: {
          id: 66
        },
        user: {
          id: "quockhanh123"
        },
        comment:{},
        replyText:{},
        editCommentText:{},
        postComment:"",
        comments:[],
        sections: [],
        viewPostReply:{},
        viewEditComment:{},
        viewSection: {},
        buttonNumberShowComment: {},
      };
    },
    created(){
      this.connectSocket()
      this.resetForm()
      this.getCommentInLesson(this.lecture.id)
      this.getSections(31)
    },
    methods:{
      connectSocket(){
        const stompClient = new StompJs.Client({
        webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
        debug: (str) => { console.log(str); }, // Hiển thị thông tin gỡ lỗi nếu cần
        onConnect: (frame) => {
          console.log("Connected to WebSocket server!", frame);
          stompClient.subscribe('/topic/comments', (message) => {
            console.log("Load data comment", JSON.parse(message))
          });
          },
          onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
          }
      });
      stompClient.activate(); // Kích hoạt client STOMP
      },
      beforeDestroy() {
        // Ngắt kết nối khi component bị hủy
        stompClient.deactivate();
      },
      getCommentInLesson(idLecture){
        axios.get(API_URL + `/getCommentLecture/${idLecture}`)
        .then((comment) => {
          this.comments = comment.data
          this.comments = this.comments.reverse()
          console.log("Truy xuất comment của lesson " + this.lecture.id + " thành công")
        })
        .catch((error) => {
          console.log("Truy xuất comment của lesson " + this.lecture.id + " không thành công: " + error)
        })
      },
      getReplyOfComment(commentParentId){
        const replys = [];
          const getRepliesRecursively = (parentId) => {
            let childComments = this.findCommentChild(parentId)
            childComments.forEach(element => {
              replys.push(element)
              getRepliesRecursively(element.id)
            });
          }
        getRepliesRecursively(commentParentId)
        return replys;
      },
      findCommentChild(parentId){
        let commentChilds = []
        commentChilds = this.comments.filter(comment => comment.parentId === parentId)
        if(commentChilds.length > 0){
          return commentChilds
        } else {
          return []
        }
      },
      postCommentInLesson(commentText){
        if(commentText != ''){
          this.comment.commentText = commentText
          this.postComment = ''
          axios.post(API_URL + "/postCommentLecture", this.comment)
          .then(() => {
            console.log("Thêm bình luận thành công")
            this.getCommentInLesson(this.lecture.id)
            this.resetForm()
          })
          .catch((error) => {
            console.log("Thêm bình luận không thành công:", error);
          })
        }
      },
      postReplyInLesson(replyText, parentId){
        if(replyText != ''){
          this.comment.parentId = parentId
          this.comment.commentText = replyText
          this.replyText[parentId] = ''
          axios.post(API_URL + "/postCommentLecture", this.comment)
          .then(() => {
            console.log("Trả lời bình luận thành công")
            this.getCommentInLesson(this.lecture.id)
            this.viewPostReplyToggle(parentId)
            this.resetForm()
          })
          .catch((error) => {
            console.log("Trả lời bình luận không thành công:", error);
          })
        }
      },
      deleteComment(commentId, userComment){
        if(userComment === this.user.id){
          axios.delete(API_URL + `/deleteComment/${commentId}`)
          .then(() => {
            console.log("Xóa bình luận " + commentId +" thành công")
            this.getCommentInLesson(this.lecture.id)
            this.resetForm()
          })
          .catch((error) => {
            console.log("Xóa bình luận " + commentId +" không thành công:", error);
          })
        } else {
          console.log("Không phải quyền người dùng")
        }
      },
      putComment(comment, editCommentText, userComment){
        if(userComment === this.user.id){
          this.comment.commentText = editCommentText
          this.comment.id = comment.id
          this.comment.parentId = comment.parentId
          axios.put(API_URL + `/putComment`, this.comment)
          .then(() => {
            console.log("Chỉnh sửa bình luận " + comment.id + " thành công")
            this.getCommentInLesson(this.lecture.id)
            this.resetForm()
            this.editCommentText[comment.id] = ''
            this.viewEditComment[comment.id] = false
          })
          .catch((error) => {
            console.log("Chỉnh sửa bình luận " + comment.id + " không thành công:", error);
          })
        } else {
          console.log("Không phải quyền người dùng")
        }
      },
      getSections(courseId){
        axios.get(API_URL + `/getSectionInCourse/${courseId}`)
        .then(sections => {
          this.sections = sections.data
          console.log("Tải lên các chương học thành công")
        })
        .catch(error => {
          console.log("Tải lên các chương học thất bại", error)
        })
      },
      viewPostReplyToggle(commentId){
        this.viewPostReply[commentId] = !this.viewPostReply[commentId]
        this.viewEditComment[commentId] = false
      },
      viewEditCommentToggle(commentId, textComment){
        this.viewEditComment[commentId] = !this.viewEditComment[commentId]
        this.editCommentText[commentId] = textComment
        this.viewPostReply[commentId] = false
      },
      viewSectionToggle(sectionId){
        this.viewSection[sectionId] = !this.viewSection[sectionId]
      },
      buttonNumberShowCommentToggle(commentId){
        this.buttonNumberShowComment[commentId] = !this.buttonNumberShowComment[commentId]
      },
      resetForm(){
        this.comment = {
          id: null,
          commentText: "",
          idUserComment: this.user.id,
          lectureId: this.lecture.id,
          courseId: null,
          parentId: null,
          star: 0
        }
      }
    }
  }
</script>

<style>
.listenComment {
  display: none;
}
.hoverComment:hover .listenComment {
  display: block;
}
.listenReply {
  display: none;
}
.hoverReply:hover .listenReply {
  display: block;
}
.hoverMenu{
  height: 50px;
  width: 50px;
  position: relative;
  padding: 0 10px 0 15px;
}
.popupStyle{
  position: absolute;
  right: 20px;
  top: 30px;
  background-color: white;
  box-shadow: 0 0 1px gray;
  border-radius: 10px;
  padding: 5px 0;
  display: none;
}
.popupStyle a > p{
  margin: 0;
  padding: 5px 20px;
}
.hoverMenu:hover > .popupStyle{
  display: block;
}
</style>
