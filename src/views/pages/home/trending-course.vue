<template>
  <!-- Trending Course -->
  <section class="section trend-course">
    <div class="container">
      <div class="section-header aos" data-aos="fade-up">
        <div class="section-sub-head">
          <span>What’s New</span>
          <h2>TRENDING COURSES</h2>
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
      <Carousel :settings="settings" :breakpoints="breakpoints">
        <Slide
          v-for="item in trendingcourse"
          :key="item.id"
          class="owl-carousel trending-course owl-theme"
        >
          <div class="course-box trend-box">
            <div class="product trend-product">
              <div class="product-img">
                <router-link :to="{ path: '/course/course-details', query: { id: item.id } }">
                  <img
                    class="img-fluid"
                    alt=""
                    :src="'data:image/jpeg;base64,' + item.coverImage"/>
                </router-link>
                <!-- <div class="price">
                  <h3>
                    {{ null }} <span>{{ null }}</span>
                  </h3>
                </div> -->
              </div>
              <div class="product-content">
                <div class="course-group d-flex">
                  <div class="course-group-img d-flex">
                    <!-- <router-link to="/instructor/instructor-profile"
                      ><img
                        :src="require(`@/assets/img/user/${item.img1}`)"
                        alt=""
                        class="img-fluid"
                    /></router-link> -->
                    <div class="course-name">
                      <h4>
                        <router-link to="/instructor/instructor-profile">{{ item.fullNameIntructor }}</router-link>
                      </h4>
                      <p>Intructor</p>
                    </div>
                  </div>
                  <div
                    class="course-share d-flex align-items-center justify-content-center"
                  >
                    <a href="javascript:void(0);"><i class="fa-regular fa-heart"></i></a>
                  </div>
                </div>
                <h3 class="title text-start">
                  <router-link :to="{ path: '/course/course-details', query: { id: item.id } }">{{ item.title }}</router-link>
                </h3>
                <div class="course-info d-flex align-items-center">
                  <div class="rating-img d-flex align-items-center">
                    <img src="@/assets/img/icon/icon-01.svg" alt="" class="img-fluid" />
                    <p>+{{ item.numberSection }} Section</p>
                  </div>
                  <div class="course-view d-flex align-items-center">
                    <img src="@/assets/img/icon/icon-02.svg" alt="" class="img-fluid" />
                    <p>{{ null }}</p>
                  </div>
                </div>
                <div class="rating d-flex align-items-center">
                  <div class="rating m-0">	
                    <!-- <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star filled me-1"></i>
                    <i class="fas fa-star me-1"></i> -->
                    <span class="d-inline-block average-rating"><span>+ {{ item.numberUserPayment }}</span> Student payment</span>
                  </div>
                  <div class="all-btn all-category d-flex align-items-center">
                    <router-link to="/pages/checkout" class="btn btn-primary">BUY NOW</router-link>
                  </div>
                </div>                
              </div>
            </div>
          </div>
        </Slide>
        <template #addons>
          <Pagination />
        </template>
      </Carousel>
      <feature-instructors></feature-instructors>
    </div>
  </section>
  <!-- /Trending Course -->

  <leading-companies></leading-companies>
</template>
<script>
import AOS from "aos";
import "aos/dist/aos.css";
import { Carousel, Pagination, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import axios from "axios";
const API_URL = 'http://localhost:8080';
export default {
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      trendingcourse: [],
    };
  },
  setup() {
    return {
      // carousel settings
      settings: {
        itemsToShow: 1,
        snapAlign: "center",
      },

      breakpoints: {
        // 700px and up
        700: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 3,
          snapAlign: "start",
        },
      },
    };
  },
  created(){
    this.getBestSale()
  },
  methods: {
    getBestSale(){
      axios.get(API_URL + "/getCoursBestSale")
      .then(course => {
        this.trendingcourse = course.data
        console.log("Truy xuất khóa học bán chạy thành công", course)
      })
      .catch(error => {
        console.log("Truy xuất khóa học bán chạy thất bại", error)
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      AOS.init();
    });
  },
};
</script>
