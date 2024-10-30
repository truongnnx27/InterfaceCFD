<template>
  <!-- Feature Course -->
  <section class="section new-course">
    <div class="container">
      <div class="section-header aos" data-aos="fade-up">
        <div class="section-sub-head">
          <span>What’s New</span>
          <h2>New Courses</h2>
        </div>
        <div class="all-btn all-category d-flex align-items-center">
          <router-link to="/course/course-list" class="btn btn-primary">All Courses</router-link>
        </div>
      </div>
      <div class="section-text aos" data-aos="fade-up">
        <p class="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan
          bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.
        </p>
      </div>
      <div class="course-feature">
        <div class="row">
          <!-- Course info item -->
          <div class="col-lg-4 col-md-6 d-flex"
              v-for="(course, index) in newCourses" :key="index">
            <div class="course-box d-flex aos" data-aos="fade-up">
              <div class="product">
                <div class="product-img">
                  <router-link to="/course/course-details">
                    <img class="img-fluid" alt="" src="@/assets/img/course/course-06.jpg" />
                  </router-link>
                  <div class="price combo">
                    <h3>FREE</h3>
                  </div>
                </div>
                <div class="product-content">
                  <div class="course-group d-flex">
                    <div class="course-group-img d-flex">
                      <router-link to="/instructor/instructor-profile"><img src="@/assets/img/user/user6.jpg" alt=""
                          class="img-fluid" /></router-link>
                      <div class="course-name">
                        <h4>
                          <router-link to="/instructor/instructor-profile">{{ course.instructor.fullname }}</router-link>
                        </h4>
                        <p>Instructor</p>
                      </div>
                    </div>
                    <div class="course-share d-flex align-items-center justify-content-center">
                      <a href="javascript:void(0);"><i class="fa-regular fa-heart"></i></a>
                    </div>
                  </div>
                  <h3 class="title instructor-text">
                    <router-link :to="{ path: '/course/course-details', query: { id: course.id } }">{{ course.title }}</router-link>
                  </h3>
                  <div class="course-info d-flex align-items-center">
                    <div class="rating-img d-flex align-items-center">
                      <img src="@/assets/img/icon/icon-01.svg" alt="" />
                      <p>7+ Lesson</p>
                    </div>
                    <div class="course-view d-flex align-items-center">
                      <img src="@/assets/img/icon/icon-02.svg" alt="" />
                      <p>7hr 30min</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="rating m-0">
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star me-1"></i>
                      <span class="d-inline-block average-rating"><span>4.6</span> (15)</span>
                    </div>
                    <div class="all-btn all-category d-flex align-items-center">
                      <router-link to="/pages/checkout" class="btn btn-primary">BUY NOW</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Course info item -->
        </div>
      </div>
    </div>
  </section>
  <!-- /Feature Course -->

  <!-- Master Skill -->
  <section class="section master-skill">
    <div class="container">
      <div class="row">
        <div class="col-lg-7 col-md-12">
          <div class="section-header aos" data-aos="fade-up">
            <div class="section-sub-head">
              <span>What’s New</span>
              <h2>Master the skills to drive your career</h2>
            </div>
          </div>
          <div class="section-text aos" data-aos="fade-up">
            <p>
              Get certified, master modern tech skills, and level up your career — whether
              you’re starting out or a seasoned pro. 95% of eLearning learners report our
              hands-on content directly helped their careers.
            </p>
          </div>
          <div class="career-group aos" data-aos="fade-up">
            <div class="row">
              <div class="col-lg-6 col-md-6 d-flex">
                <div class="certified-group blur-border d-flex">
                  <div class="get-certified d-flex align-items-center">
                    <div class="blur-box">
                      <div class="certified-img">
                        <img src="@/assets/img/icon/icon-1.svg" alt="" class="img-fluid" />
                      </div>
                    </div>
                    <p>Stay motivated with engaging instructors</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 d-flex">
                <div class="certified-group blur-border d-flex">
                  <div class="get-certified d-flex align-items-center">
                    <div class="blur-box">
                      <div class="certified-img">
                        <img src="@/assets/img/icon/icon-2.svg" alt="" class="img-fluid" />
                      </div>
                    </div>
                    <p>Keep up with in the latest in cloud</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 d-flex">
                <div class="certified-group blur-border d-flex">
                  <div class="get-certified d-flex align-items-center">
                    <div class="blur-box">
                      <div class="certified-img">
                        <img src="@/assets/img/icon/icon-3.svg" alt="" class="img-fluid" />
                      </div>
                    </div>
                    <p>Get certified with 100+ certification courses</p>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-6 d-flex">
                <div class="certified-group blur-border d-flex">
                  <div class="get-certified d-flex align-items-center">
                    <div class="blur-box">
                      <div class="certified-img">
                        <img src="@/assets/img/icon/icon-4.svg" alt="" class="img-fluid" />
                      </div>
                    </div>
                    <p>Build skills your way, from labs to courses</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-12 d-flex align-items-end">
          <div class="career-img aos" data-aos="fade-up">
            <img src="@/assets/img/join.png" alt="" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- /Master Skill -->
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
const API_URL = 'http://localhost:8080';
export default {
  data() {
    return {
      newCourses:[]
    };
  },
  methods: {
    getNewCourses(){
      axios.get(API_URL + "/getNewCourse")
      .then(courses => {
        this.newCourses = courses.data
        console.log("Truy xuất khóa học mới thành công")
      })
      .catch(error => {
        console.log("Truy xuất khóa học mới thất bại", error)
      })
    }
  },
  mounted() {
    this.getNewCourses()
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
