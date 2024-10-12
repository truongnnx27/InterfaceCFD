<template>
  <page-header></page-header>
  <!-- New Course -->
  <section class="page-content course-sec" style="margin-top: 30px;">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-12">
          <div class="add-course-header">
            <h2>Add New Course</h2>
            <div class="add-course-btns">
              <ul class="nav">
                <li>
                  <router-link to="/instructor/instructor-dashboard" class="btn btn-black"
                    >Back to Course</router-link
                  >
                </li>
                <li>
                  <a href="javascript:void(0);" class="btn btn-success-dark" @click="saveCourse">Save</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <!-- Course Wizard -->
            <div class="widget-set">
              <div class="widget-setcount">
                <ul id="progressbar" v-show="currentStep === 1">
                  <li class="progress-active">
                    <p><span></span> Basic Information</p>
                  </li>
                  <li>
                    <p><span></span> Courses Media</p>
                  </li>
                  <li>
                    <p><span></span> Curriculum</p>
                  </li>
                  <li>
                    <p><span></span> Settings</p>
                  </li>
                </ul>
                <ul id="progressbar" v-show="currentStep === 2">
                  <li>
                    <p><span></span> Basic Information</p>
                  </li>
                  <li class="progress-active">
                    <p><span></span> Courses Media</p>
                  </li>
                  <li>
                    <p><span></span> Curriculum</p>
                  </li>
                  <li>
                    <p><span></span> Settings</p>
                  </li>
                </ul>
                <ul id="progressbar" v-show="currentStep === 3">
                  <li>
                    <p><span></span> Basic Information</p>
                  </li>
                  <li>
                    <p><span></span> Courses Media</p>
                  </li>
                  <li class="progress-active">
                    <p><span></span> Curriculum</p>
                  </li>
                  <li>
                    <p><span></span> Settings</p>
                  </li>
                </ul>
                <ul id="progressbar" v-show="currentStep === 4">
                  <li>
                    <p><span></span> Basic Information</p>
                  </li>
                  <li>
                    <p><span></span> Courses Media</p>
                  </li>
                  <li>
                    <p><span></span> Curriculum</p>
                  </li>
                  <li class="progress-active">
                    <p><span></span> Settings</p>
                  </li>
                </ul>
              </div>
              <div class="widget-content multistep-form">
                <div id="first" v-if="currentStep === 1">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Basic Information</h4>
                    </div>
                    <div class="add-course-form">
                      <form @submit.prevent="saveCourse">
                        <div class="form-group">
                          <label class="add-course-label">Course Title</label>
                          <input
                              type="text"
                              class="form-control"
                              placeholder="Course Title"
                              v-model="courseInfo.title"
                          />
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Category</label>
                          <vue-select ref="categorySelect" :options="Category" placeholder="Category 01" v-model="courseInfo.category" />
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Level</label>
                          <vue-select ref="levelSelect" :options="Level" placeholder="Level 01" v-model="courseInfo.level" />
                        </div>
                        <div class="form-group">
                          <label class="add-course-label">Courses Price</label>
                          <input
                              type="text"
                              class="form-control"
                              placeholder="10.00"
                              v-model="courseInfo.price"
                          />
                        </div>
                        <div class="form-group mb-0">
                          <label class="add-course-label">Course Description</label>
                          <div id="editor">
                            <ckeditor
                                :editor="editor"
                                v-model="courseInfo.description"
                                :config="editorConfig"
                            ></ckeditor>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div class="widget-btn">
                      <a class="btn btn-black">Back</a>
                      <a
                        class="btn btn-info-light next_btn"
                        @click="nextStep"
                        :disabled="currentStep === totalSteps"
                        >Continue</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 2">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Courses Media</h4>
                    </div>
                    <div class="add-course-form">
                      <form @submit.prevent="saveCourse">
                        <div class="input-block">
                          <label class="add-course-label">Course cover image</label>
                          <div class="relative-form">
                            <span>{{ courseInfo.coverImage ? courseInfo.coverImage.name : "No File Selected" }}</span>
                            <label class="relative-file-upload">
                              Upload File <input type="file" @change="handleFileUpload" />
                            </label>
                          </div>
                        </div>
                        <div class="input-block">
                          <div class="add-image-box">
                            <a href="javascript:void(0);">
                              <i class="far fa-image"></i>
                            </a>
                          </div>
                        </div>
<!--                        <div class="input-block">-->
<!--                          <input-->
<!--                              type="text"-->
<!--                              class="form-control"-->
<!--                              placeholder="Video URL"-->
<!--                              v-model="courseInfo.videoUrl"-->
<!--                          />-->
<!--                        </div>-->
<!--                        <div class="input-block">-->
<!--                          <div class="add-image-box add-video-box">-->
<!--                            <a href="javascript:void(0);">-->
<!--                              <i class="fas fa-circle-play"></i>-->
<!--                            </a>-->
<!--                          </div>-->
<!--                        </div>-->
                      </form>
                    </div>
                    <div class="widget-btn">
                      <a
                        class="btn btn-black prev_btn"
                        @click="previousStep"
                        :disabled="currentStep === 1"
                        >Previous</a
                      >
                      <a
                        class="btn btn-info-light next_btn"
                        @click="nextStep"
                        :disabled="currentStep === totalSteps"
                        >Continue</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 3">
                  <div class="add-course-info">
                    <div class="add-course-inner-header">
                      <h4>Curriculum</h4>
                    </div>
                    <div class="add-course-section">
                      <a href="javascript:void(0);" class="btn" @click="promptSectionName">Add Section</a>
                      <SectionPopup :showSectionPopup="showSectionPopup" @add-section="addSection" @close-popup="closePopup" />
                      <LecturePopup :showLecturePopup="showLecturePopup" @add-lecture="addLecture" @close-popup="closePopup" />
                    </div>
                    <div class="add-course-form">
                      <div class="curriculum-grid" v-for="(section, index) in sections" :key="index">
                        <div class="curriculum-head" style="display: flex; justify-content: space-between; align-items: center;">
                          <h5 class="section-title" style="color: #333; font-size: 1.5rem; font-weight: bold;">
                            <i class="fas fa-folder" style="margin-right: 10px;"></i> {{ section.title }}
                          </h5>
                          <div class="btn-group" style="float: right;">
                            <a href="javascript:void(0);" class="btn-icon" @click="renameSection(index)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-edit"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn-icon" @click="deleteSection(index)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-trash-alt"></i>
                            </a>
                            <a href="javascript:void(0);" class="btn-icon" @click="promptLectureName(section)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                              <i class="fas fa-plus"></i>
                            </a>
                          </div>
                        </div>
                        <div class="curriculum-info" style="background-color: #f9f9f9; padding: 10px; margin-top: 10px;">
                          <div v-for="(lecture, lectureIndex) in section.lectures" :key="lectureIndex" class="lecture-item" style="margin-bottom: 20px; border: 1px solid #ccc; padding: 10px;">
                            <div class="lecture-head" style="display: flex; justify-content: space-between; align-items: center;">
                              <h6 class="lecture-title" style="color: #333; font-size: 1.2rem; font-weight: bold;">
                                <i class="fas fa-file-alt" style="margin-right: 10px;"></i> {{ lecture.title }}
                              </h6>
                              <div class="btn-group" style="float: right;">
                                <a href="javascript:void(0);" class="btn-icon" @click="renameLecture(section, lecture)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                                  <i class="fas fa-edit"></i>
                                </a>
                                <a href="javascript:void(0);" class="btn-icon" @click="deleteLecture(section, lectureIndex)" style="border: 1px solid #ccc; padding: 10px; margin-left: 5px;">
                                  <i class="fas fa-trash-alt"></i>
                                </a>
                              </div>
                            </div>
                            <div class="lecture-body">
                              <div style="display: flex; justify-content: center; align-items: center;">
                                <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showQuizInput && !lecture.showVideoInput && !lecture.showAssignmentInput" @click="addQuiz(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                  <i class="fas fa-question-circle" style="font-size: 24px; margin-right: 5px;"></i> <span>Quiz</span>
                                </a>
                                <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showQuizInput && !lecture.showVideoInput && !lecture.showAssignmentInput" @click="addVideo(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                  <i class="fas fa-video" style="font-size: 24px; margin-right: 5px;"></i> <span>Video</span>
                                </a>
                                <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showQuizInput && !lecture.showVideoInput && !lecture.showAssignmentInput" @click="addAssignment(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                  <i class="fas fa-tasks" style="font-size: 24px; margin-right: 5px;"></i> <span>Assignment</span>
                                </a>
                              </div>
                              <div v-if="lecture.showQuizInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-question-circle" style="margin-right: 10px;"></i>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter quiz details" style="flex: 1;" />
                              </div>
                              <div v-if="lecture.showVideoInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-video" style="margin-right: 10px;"></i>
                                <input type="file" class="form-control form-control-sm" @change="uploadVideo($event, lecture)" style="flex: 1;" />
                              </div>
                              <div v-if="lecture.showAssignmentInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-tasks" style="margin-right: 10px;"></i>
                                <input type="text" class="form-control form-control-sm" placeholder="Enter assignment details" style="flex: 1;" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="widget-btn">
                      <a
                        class="btn btn-black prev_btn"
                        @click="previousStep"
                        :disabled="currentStep === 2"
                        >Previous</a
                      >
                      <a
                        class="btn btn-info-light next_btn"
                        @click="nextStep"
                        :disabled="currentStep === totalSteps"
                        >Continue</a
                      >
                    </div>
                  </div>
                </div>
                <div class="field-card" v-if="currentStep === 4">
                  <div class="add-course-info">
                    <div class="add-course-msg">
                      <i class="fas fa-circle-check"></i>
                      <h4>The Course Added Succesfully</h4>
                      <p>Admin will be Approve soon.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- /Course Wizard -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /New Course -->

  <layouts1></layouts1>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import LecturePopup from "@/components/LecturePopup.vue";
import SectionPopup from "@/components/SectionPopup.vue";
import axios from "axios";
export default {
  components: {
    LecturePopup,
    SectionPopup
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: "Description",
      editorConfig: {},
      tags: ["jquery", "bootstrap"],
      Category: ["Category 01", "Category 02", "Category 03", "Category 04"],
      Level: ["Level 01", "Level 02", "Level 03", "Level 04"],
      currentStep: 1,
      totalSteps: 5,
      content: "Description",
      sections: [],
      showSectionPopup: false,
      showLecturePopup: false,
      currentSection: null,
      currentLecture: null,
      courseInfo: {
        title: "",
        category: "",
        level: "",
        description: "",
        coverImage: null,
        price: "",
        published: false,
        instructor: [
          {
            id: 1
          }
        ],
        sections: []
      }
    };
  },
  methods: {
    nextStep() {
      if (this.currentStep < this.totalSteps) {
        this.currentStep++;
        console.log(this.currentStep);
      }
    },
    previousStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    promptSectionName() {
      this.showSectionPopup = true;
    },
    promptLectureName(section) {
      this.currentSection = section;
      this.showLecturePopup = true;
    },
    addSection(sectionName) {
      if (sectionName) {
        const existingSection = this.sections.find(section => section.title === sectionName);
        if (existingSection) {
          alert("Section name already exists. Please choose a different name.");
          return;
        }
        if (this.currentSection) {
          this.currentSection.title = sectionName;
        } else {
          this.sections.push({
            title: sectionName,
            lectures: [],
          });
        }
      }
      this.showSectionPopup = false;
      this.currentSection = null;
    },
    addLecture(lectureName) {
      if (lectureName && this.currentSection) {
        const existingLecture = this.currentSection.lectures.find(lecture => lecture.title === lectureName);
        if (existingLecture) {
          alert("Lecture name already exists in this section. Please choose a different name.");
          return;
        }
        if (this.currentLecture) {
          this.currentLecture.title = lectureName;
        } else {
          this.currentSection.lectures.push({
            title: lectureName,
            showVideoInput: false,
          });
        }
      }
      this.showLecturePopup = false;
      this.currentSection = null;
      this.currentLecture = null;
    },
    closePopup() {
      this.showSectionPopup = false;
      this.showLecturePopup = false;
    },
    addQuiz(lecture) {
      lecture.showQuizInput = true;
    },
    addVideo(lecture) {
      lecture.showVideoInput = true;
    },
    addAssignment(lecture) {
      lecture.showAssignmentInput = true;
    },
    renameSection(index) {
      this.currentSection = this.sections[index];
      this.showSectionPopup = true;
    },
    deleteSection(index) {
      if (confirm("Are you sure you want to delete this section?")) {
        this.sections.splice(index, 1);
      }
    },
    renameLecture(section, lecture) {
      this.currentSection = section;
      this.currentLecture = lecture;
      this.showLecturePopup = true;
    },
    deleteLecture(section, lectureIndex) {
      if (confirm("Are you sure you want to delete this lecture?")) {
        section.lectures.splice(lectureIndex, 1);
      }
    },
    saveCourse() {
      this.courseInfo.sections = this.sections;
      console.log(this.courseInfo);

      axios.post("http://localhost:8080/api/v1/courses", this.courseInfo)
        .then(response => {
          console.log(response.data, response.status);
        })
        .catch(error => {
          console.error(error);
        });
    },
    handleFileUpload(event) {
      this.courseInfo.coverImage = event.target.files[0];
    }
    // uploadVideo(event, lecture) {
    //   const file = event.target.files[0];
    //   // Handle video upload logic here
    // }
  },
};
</script>
