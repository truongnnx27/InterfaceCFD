<template>
  <student-header></student-header> 
  <div class="breadcrumb-bar"></div>
  <div class="page-content">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="showing-list"></div>
          <div class="row">
            <div class="col-lg-12">
              <div class="student-grid-blk">
                <div class="row" v-if="users.length > 0">
                  <div class="col-md-6" v-for="user in users" :key="user.id">
                    <div class="student-list flex-fill">
                      <div class="student-img">
                        <router-link to="/student/student-profile">
                          <img class="img-fluid" :alt="`${user.fullName} avatar`" :src="`/vue/image/${user.profilePicture}`" />
                        </router-link>
                      </div>
                      <div class="student-content">
                        <h5>
                          <router-link to="/student/student-profile">
                            {{ user.fullName }}
                          </router-link>
                        </h5>
                        <h6>{{ getRoleLabel(user.roleId) }}</h6> <div class="student-info">
                          <div class="loc-blk d-flex justify-content-center">
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p v-else>Loading users...</p>
                <!-- <pagination></pagination> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <layouts1></layouts1>
</template>

<script>
import axios from 'axios';
import StudentHeader from '@/views/layouts/student-header.vue'; 

export default {
  components: {
    StudentHeader,
  },
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get('http://localhost:8081/api/users');
        this.users = response.data;
        console.log('Dữ liệu người dùng:', this.users);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    },
    getRoleLabel(roleId) {
      switch (roleId) {
        case 1:
          return 'Admin';
        case 2:
          return 'User';
        case 3:
          return 'Teacher';
        default:
          return 'Unknown';
      }
    }
  },
}; 
</script>
<style scoped>
.student-avatar {
  max-width: 150px; /* Đặt chiều rộng tối đa cho ảnh */
  max-height: 150px; /* Đặt chiều cao tối đa cho ảnh */
  width: 100%; /* Đảm bảo ảnh chiếm toàn bộ chiều rộng của khung cha */
  height: auto; /* Đảm bảo ảnh giữ tỉ lệ khi thay đổi kích thước */
  object-fit: cover; /* Cắt ảnh để vừa khung mà không bị méo */
  border-radius: 50%; /* Tùy chọn: bo góc cho ảnh thành hình tròn */
}

.student-img {
  width: 150px; /* Chiều rộng cố định cho khung */
  height: 150px; /* Chiều cao cố định cho khung */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* Cắt bỏ phần ảnh vượt ra ngoài khung */
}

</style>