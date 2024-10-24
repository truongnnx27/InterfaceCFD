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
                                <div style="margin: 5px;">
          <!-- quiz -->
                                  <template v-if="!lecture.quiz || !lecture.quiz.title">
                                    <a href="javascript:void(0);" class="btn-icon" @click="addQuiz(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                      <i class="fas fa-question-circle" style="font-size: 24px; margin-right: 5px;"></i>
                                      <span>Quiz</span>
                                    </a>
                                  </template>
                                  
                                  <!-- Nếu quiz đã có tiêu đề thì hiển thị tiêu đề kèm nút chỉnh sửa -->
                                  <template v-else>
                                    <div style="display: flex; align-items: center;">
                                      <span style="margin-right: 10px;">Quiz: {{ lecture.quiz.title }}</span>
                                      <!-- Nút chỉnh sửa quiz để cập nhật tiêu đề -->
                                      <a href="javascript:void(0);" class="btn-icon" @click="addQuiz(lecture)" style="border: 1px solid #ccc; padding: 5px;">
                                        <i class="fas fa-edit" style="font-size: 20px;"></i>
                                      </a>
                                    </div>
                                  </template>
                                </div>

                                <template v-if="!lecture.quiz || !lecture.quiz.title">
            <!-- Nút Video -->
                                  <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showVideoInput && !lecture.showQuizInput && !lecture.showAssignmentInput" @click="addVideo(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                    <i class="fas fa-video" style="font-size: 24px; margin-right: 5px;"></i> <span>Video</span>
                                  </a>

          <!-- Nút Assignment -->
                                  <a href="javascript:void(0);" class="btn-icon" v-if="!lecture.showAssignmentInput && !lecture.showQuizInput && !lecture.showVideoInput" @click="addAssignment(lecture)" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center; margin: 5px;">
                                    <i class="fas fa-tasks" style="font-size: 24px; margin-right: 5px;"></i> <span>Assignment</span>
                                  </a>
                                </template>
                              </div>

        <!-- Quiz Input -->
                              <div v-if="lecture.showQuizInput" class="quiz-input" style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                <div class="row mb-3" style="display: flex; align-items: center; margin-bottom: 15px;">
                                  <label style="flex: 0 0 20%; font-weight: bold;">Title Quiz</label>
                                  <div style="flex: 1;">
                                    <input type="text" v-model="lecture.quizTitle" style="width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc;" placeholder="Enter title quiz" />
                                  </div>
                                </div>
                                <div class="row mb-3" style="display: flex; justify-content: flex-start; margin-bottom: 15px;">
                                  <button @click="saveQuiz(lecture)" style="padding: 6px 12px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-right: 10px; font-size: 14px; width: 100px;">
                                    Save Quiz
                                  </button>
                                  <button @click="addQuestionToQuiz(lecture.quiz)" style="padding: 6px 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 150px;">
                                    Add Question
                                  </button>
                                  <button @click="lecture.showQuizInput = false" style="padding: 6px 12px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; width: 100px; margin-left: 10px;">
                                    Cancel
                                  </button>
                                </div>

        <!-- Hiển thị các câu hỏi -->
                                <div v-for="(question, index) in lecture.quiz.questions" :key="question.title" style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px; background-color: white;">
                                  <h5 style="font-weight: bold; color: #333;">{{ question.title }}</h5>

                                  <button @click="editQuestionTitle(question)" style="padding: 5px 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer; font-size: 12px;">
                                    Edit Question
                                  </button>

                                  <button @click="deleteQuestion(lecture, index)" style="padding: 5px 10px; background-color: #dc3545; color: white; border: none; border-radius: 4px; margin-right: 10px; cursor: pointer; font-size: 12px;">
                                    Delete Question
                                  </button>

                                  <button @click="editOptionToQuestion(question)" style="padding: 5px 10px; background-color: #6c757d; color: white; border: none; border-radius: 4px; margin-bottom: 10px; cursor: pointer; font-size: 12px;">
                                    Edit Option
                                  </button>

                                  <div v-for="option in question.options" :key="option.text" style="display: flex; align-items: center; margin-bottom: 5px;">
                                    <input type="checkbox" v-model="option.isCorrect" style="margin-right: 10px;" />
                                    <span>{{ option.text }}</span>
                                  </div>
                                </div>
                              </div>

        <!-- Video Input -->
                              <div v-if="lecture.showVideoInput" class="input-group" style="border: 1px solid #ccc; padding: 10px; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-video" style="margin-right: 10px;"></i>
                                <input type="file" class="form-control form-control-sm" @change="uploadVideo($event, lecture)" style="flex: 1;" />
                              </div>

        <!-- Assignment Input -->
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
import Swal from 'sweetalert2';
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
            showQuizInput: false,
            showAssignmentInput: false,
            quiz: {
              title: ''
            }
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
      if (!lecture.quiz || !lecture.quiz.title) {
        lecture.quiz = {
          title: '',
          questions: []  
        };
        lecture.showQuizInput = true; 
      } else {
        Swal.fire({
          title: `Title Quiz: ${lecture.quiz.title}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Edit',
          cancelButtonText: 'Delete',
          showCloseButton: true,
          focusConfirm: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Người dùng chọn Edit
            lecture.showQuizInput = true;
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Người dùng chọn Delete
            this.deleteQuiz(lecture);  // Gọi hàm xóa quiz
          }
        });
      }
    },
    saveQuiz(lecture) {
      // Lưu lại tiêu đề quiz sau khi người dùng nhập
      lecture.quiz.title = lecture.quizTitle;

      // Xóa đoạn mã kiểm tra lessonId
      lecture.showQuizInput = false;
        },
    deleteQuiz(lecture) {
      // Xóa quiz trong đối tượng lecture
      lecture.quiz = null;
      lecture.showQuizInput = false;
      Swal.fire('Deleted quiz', '', 'success');
    },
    addQuestionToQuiz(quiz) {
      Swal.fire({
        title: "Enter question title:",
        input: "text",
        inputPlaceholder: "Question title",
        showCancelButton: true,
        confirmButtonText: "Save",
        cancelButtonText: "Cancel",
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter a question title!";
          }
          const existingQuestion = quiz.questions.find(q => q.title === value);
          if (existingQuestion) {
            return "This question already exists.";
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Select question type:",
            input: "radio",
            inputOptions: {
              one: '4 option',
              multiple: 'Many option'
            },
            inputValidator: (value) => {
              if (!value) {
                return "You need to choose the question type!";
              }
            }
          }).then((typeResult) => {
            if (typeResult.isConfirmed) {
              let question = {
                title: result.value,
                type: typeResult.value,
                options: []
              };

              // Function to generate HTML for options
              const generateOptionsHTML = (numOptions) => {
                return `
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    ${Array.from({ length: numOptions }, (_, i) => `
                      <div style="display: flex; align-items: center; gap: 10px;">
                        <label for="option${i + 1}" style="flex: 1; font-weight: bold">Option ${i + 1}:</label>
                        <input type="text" id="option${i + 1}" class="swal2-input" style="flex: 3;" placeholder="Option ${i + 1}">
                      </div>
                    `).join('')}
                  </div>
                `;
              };

              const saveQuestion = (numOptions) => {
                Swal.fire({
                  title: 'Edit options',
                  html: generateOptionsHTML(numOptions),
                  focusConfirm: false,
                  confirmButtonText: 'Save question',
                  showCancelButton: true,
                  cancelButtonText: 'Cancel',
                  preConfirm: () => {
                    let isValid = true;
                    let options = [];

                    for (let i = 1; i <= numOptions; i++) {
                      let optionText = document.getElementById(`option${i}`).value.trim();
                      
                      // Validate if the option is empty
                      if (!optionText) {
                        isValid = false;
                        Swal.showValidationMessage(`Option ${i} cannot be empty!`);
                        break;
                      }

                      options.push({
                        text: optionText,
                        isCorrect: false
                      });
                    }

                    if (isValid) {
                      // Save valid options to the question
                      question.options = options;
                      quiz.questions.push(question);
                    }

                    return isValid;
                  }
                });
              };

              if (typeResult.value === 'one') {
                saveQuestion(4); // Default to 4 options for "one correct answer" type
              } else {
                // Input the number of options for "many correct answers" type
                Swal.fire({
                  title: "Enter the number of options:",
                  input: "number",
                  inputPlaceholder: "Number of options",
                  inputValidator: (value) => {
                    if (!value || value <= 0) {
                      return "You need to enter a valid number of options!";
                    }
                    else if(value>10)
                    {
                      return "Option must be less than 10"
                    }
                  }
                }).then((numberResult) => {
                  if (numberResult.isConfirmed) {
                    saveQuestion(parseInt(numberResult.value));
                  }
                });
              }
            }
          });
        }
      });
    },
    editQuestionTitle(question) {
    // Kiểm tra xem question có undefined không
    if (!question) {
      console.error("Unknown question!");
      return;
    }

    Swal.fire({
      title: "Edit question title:",
      input: "text",
      inputPlaceholder: "New title",
      inputValue: question.title, // Hiển thị tiêu đề hiện tại
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to enter a title!";
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Cập nhật tiêu đề của câu hỏi
        question.title = result.value;
        Swal.fire("Saved!", "Question title has been updated.", "success");
      }
    });
    },
    deleteQuestion(lecture, index) {
      // Hiển thị thông báo xác nhận việc xóa
      if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này?")) {
        // Xóa câu hỏi trong mảng 'questions' của lecture tại vị trí index
        lecture.quiz.questions.splice(index, 1);
        Swal.fire('Deleted!', 'The question has been deleted.', 'success');
      }
    },
    editOptionToQuestion(question) {
      let htmlOptions = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${question.options.map((option, index) => `
            <div style="display: flex; align-items: center; gap: 10px;">
              <label for="option${index + 1}" style="flex: 1; font-weight: bold">Option ${index + 1}:</label>
              <input type="text" id="option${index + 1}" class="swal2-input" style="flex: 3;" placeholder="${option.text}">
            </div>
          `).join('')}
        </div>
      `;

      Swal.fire({
        title: 'Edit options',
        html: htmlOptions,
        focusConfirm: false,
        confirmButtonText: 'Save changes',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
        preConfirm: () => {
          // Cập nhật lại nội dung của từng tùy chọn
          question.options.forEach((option, index) => {
            option.text = document.getElementById(`option${index + 1}`).value;
          });
        }
      });
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
