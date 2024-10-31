<template>
  <!-- Feature Instructors -->
  <div class="feature-instructors">
    <div class="section-header aos" data-aos="fade-up">
      <div class="section-sub-head feature-head text-center">
        <h2>Featured Instructor</h2>
        <div class="section-text aos" data-aos="fade-up">
          <p class="mb-0">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan
            bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.
          </p>
        </div>
      </div>
    </div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide
        v-for="item in intructors"
        :key="item.id"
        class="owl-carousel instructors-course owl-theme"
      >
        <div class="instructors-widget">
          <div class="instructors-img">
            <router-link to="/instructor/instructor-list">
              <img
                class="img-fluid"
                alt=""
                :src="'data:image/jpeg;base64,' + item.avatarUrl"
                style="width: 300px; aspect-ratio: 1/1; object-fit: cover;"/>
            </router-link>
          </div>
          <div class="instructors-content text-center">
            <h5>
              <router-link to="/instructor/instructor-profile">{{ item.fullname }}</router-link>
            </h5>
            <p>Intructor</p>
            <div class="student-count d-flex justify-content-center">
              <span>{{ item.numberUserPayment }} Student folow</span>
            </div>
          </div>
        </div>
      </Slide>
      <template #addons>
        <Pagination />
      </template>
    </Carousel>
  </div>
  <!-- /Feature Instructors -->
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
      intructors: [],
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
        575: {
          itemsToShow: 1,
          snapAlign: "center",
        },
        767: {
          itemsToShow: 2,
          snapAlign: "center",
        },
        991: {
          itemsToShow: 3,
          snapAlign: "center",
        },
        // 1024 and up
        1024: {
          itemsToShow: 4,
          snapAlign: "start",
        },
      },
    };
  },
  created(){
    this.getTopIntructor()
  },
  methods: {
    getTopIntructor(){
      axios.get(API_URL + "/getTopIntructor")
      .then(intructor => {
        this.intructors = intructor.data
        console.log("Truy xuất top giảng viên thành công", intructor)
      })
      .catch(error => {
        console.log("Truy xuất giảng viên thất bại", error)
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
