<template>
  <section class="section new-course">
    <div class="container">
      <div class="section-header aos" data-aos="fade-up">
        <div class="section-sub-head">
          <span>Các khóa học</span>
          <h2>Khóa học nổi bật</h2>
        </div>
        <div class="all-btn all-category d-flex align-items-center">
          <router-link to="/course/course-list" class="btn btn-primary">Tất cả khóa học</router-link>
        </div>
      </div>
      <div class="section-text aos" data-aos="fade-up">
        <p class="mb-0">
          Khám phá các khóa học đa dạng và chất lượng
        </p>
      </div>
      <div class="course-feature">
        <div class="row">
          <div
            v-for="course in courses"
            :key="course.id"
            class="col-lg-4 col-md-6 d-flex"
          >
            <div class="course-box d-flex aos" data-aos="fade-up">
              <div class="product">
                <div class="product-img">
                  <router-link :to="`/course/course-details/${course.id}`">
                    <!-- Luôn sử dụng hình ảnh mặc định -->
                    <img src="/vue/image/dongkhanh.png" alt="Image">
                  </router-link>
                  <div class="price">
                    <h3>
                      {{ course.price ? `${course.price.toLocaleString()} VNĐ` : 'Miễn phí' }}
                      <span v-if="course.originalPrice">
                        <del>{{ course.originalPrice.toLocaleString() }} VNĐ</del>
                      </span>
                    </h3>
                  </div>
                </div>
                <div class="product-content">
                  <div class="course-group d-flex">
                    <div class="course-group-img d-flex">
                      <router-link :to="`/instructor/instructor-profile/${course.userId}`">
                        <img src="@/assets/img/user/user1.jpg" alt="" class="img-fluid" />
                      </router-link>
                      <div class="course-name">
                        <h4>
                          <router-link :to="`/instructor/instructor-profile/${course.userId}`">
                            {{ course.instructorName }}
                          </router-link>
                        </h4>
                        <p>Giảng viên</p>
                      </div>
                    </div>
                    <div class="course-share d-flex align-items-center justify-content-center">
                      <a href="javascript:void(0);"><i class="fa-regular fa-heart"></i></a>
                    </div>
                  </div>
                  <h3 class="title instructor-text">
                    <router-link :to="`/course/course-details/${course.id}`">
                      {{ course.title }}
                    </router-link>
                  </h3>
                  <div class="course-info d-flex align-items-center">
                    <div class="rating-img d-flex align-items-center">
                      <img src="@/assets/img/icon/icon-01.svg" alt="" />
                      <p>{{ course.numberOfLessons }}+ Bài học</p>
                    </div>
                    <div class="course-view d-flex align-items-center">
                      <img src="@/assets/img/icon/icon-02.svg" alt="" />
                      <p>{{ course.duration }}</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div class="rating m-0">
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star filled me-1"></i>
                      <i class="fas fa-star me-1"></i>
                      <span class="d-inline-block average-rating">
                        <span>{{ course.rating }}</span> ({{ course.numberOfRatings }})
                      </span>
                    </div>
                    <div class="all-btn all-category d-flex align-items-center">
                      <router-link to="/pages/checkout" class="btn btn-primary">Đăng ký ngay</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import AOS from "aos";
import "aos/dist/aos.css";
import axios from 'axios';

export default {
  data() {
    return {
      courses: [], // Khởi tạo mảng courses rỗng
    };
  },
  mounted() {
    this.fetchCourses(); // Gọi hàm lấy dữ liệu khi component được tạo
    AOS.init(); // Khởi tạo AOS cho hiệu ứng cuộn
  },
  methods: {
    async fetchCourses() {
      try {
        const response = await axios.get('http://localhost:8081/api/courses');
        this.courses = response.data; // Lưu dữ liệu vào mảng courses
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu khóa học:', error);
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
      }
    },
  },
};
</script>
