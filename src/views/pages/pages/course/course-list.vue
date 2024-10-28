<template>
  <page-header></page-header>
  <coursegrid-breadcrumb></coursegrid-breadcrumb>
  <!-- Course -->
  <section class="course-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-9">
          <course-filter></course-filter>
          <div class="row">
            <div class="col-lg-12 col-md-12 d-flex" v-for="course in courses" :key="course.id">
              <div class="course-box course-design list-course d-flex">
                <div class="product">
                  <div class="product-img">
                    <router-link :to="`/course/${course.id}`">
                      <img v-if="course.coverImage" :src="require(`@/assets/img/course-list/${course.coverImage}`)" alt="Img" class="img-fluid" />
                    </router-link>
                    <div class="price">
                      <h3>${{course.price}}</h3>
                    </div>
                  </div>
                  <div class="product-content">
                    <div class="head-course-title">
                      <h3 class="title">
                        <router-link :to="`/course/${course.id}`">{{ course.title }}</router-link>
                      </h3>
                      <div class="all-btn all-category d-flex align-items-center">
                        <router-link to="/pages/checkout" class="btn btn-primary">BUY NOW</router-link>
                      </div>
                    </div>
                    <div class="course-info border-bottom-0 pb-0 d-flex align-items-center">
                      <div class="rating-img d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-01.svg" alt="Img" />
                        <p>{{ course.level }}</p>
                      </div>
                      <div class="course-view d-flex align-items-center">
                        <img src="@/assets/img/icon/icon-02.svg" alt="Img" />
                        <p>9hr 30min</p>
                      </div>
                    </div>
                    <div class="rating">
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star filled"></i>
                      <i class="fas fa-star"></i>
                      <span class="d-inline-block average-rating"><span>4.0</span> (15)</span>
                    </div>
                    <div class="course-group d-flex mb-0">
                      <div class="course-group-img d-flex">
                        <router-link to="/instructor/instructor-profile">
                          <img src="@/assets/img/user/user1.jpg" alt="Img" class="img-fluid" />
                        </router-link>
                        <div class="course-name">
                          <h4>
                            <router-link to="/instructor/instructor-profile">Rolands R</router-link>
                          </h4>
                          <p>Instructor</p>
                        </div>
                      </div>
                      <div class="course-share d-flex align-items-center justify-content-center">
                        <a @click.prevent="toggleFavorites(course)" >
                          <i :class="course.isFavorite ? 'fa-solid fa-heart' : 'fa-regular fa-heart'"></i> 
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <pagination></pagination>
        </div>
        <course-sidebar></course-sidebar>
      </div>
    </div>
  </section>
  <!-- /Course -->

  <layouts1></layouts1>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      courses: []
    };
  },
  mounted() {
    this.fetchCourses(); // Fetch courses when the component is mounted
  },
  methods: {
    fetchCourses() {
      axios
        .get("http://localhost:8080/identity/api/v1/courses/getCourses")
        .then((response) => {
          console.log(response.data);
          if (Array.isArray(response.data)) {
            this.courses = response.data.map(course => ({
              ...course,
              isFavorite: false // Initialize isFavorite to false for each course
            }));
          } else {
            console.error("Data is not an array:", response.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching courses:", error);
        });
    },
    toggleFavorites(course) {
      const userId = "08ee16fa-4b8d-437c-b452-b28a4ed934a0";
      const wishlistData = {
        userId: userId,
        courseId: course.id
      };

      axios
        .post('http://localhost:8080/identity/api/v1/wishlist/addWishlist', wishlistData)
        .then((response) => {
          if (response && response.data && response.data.code === 9898) {
            course.isFavorite = !course.isFavorite; // Toggle the favorite status
            console.log("Course added to wishlist successfully:", response.data);
          } else {
            console.error("Unexpected response format:", response);
          }
        })
        .catch((error) => {
          console.error('Error adding to wishlist:', error);
        });
    }
  },
};
</script>
