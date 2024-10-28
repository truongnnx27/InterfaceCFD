<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="form.username" required minlength="3" />
        <span v-if="form.username.length < 3 && form.username.length > 0">Username must be at least 3 characters long.</span>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="form.password" required minlength="3" />
        <span v-if="form.password.length < 3 && form.password.length > 0">Password must be at least 3 characters long.</span>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="form.email" required />
      </div>
      <div>
        <label for="fullname">Full Name:</label>
        <input type="text" v-model="form.fullname" required />
      </div>
      <div>
        <label for="birthday">Birthday:</label>
        <input type="date" v-model="form.birthday" required />
      </div>
      <div>
        <label for="gender">Gender:</label>
        <select v-model="form.gender" required>
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </div>
      <div>
        <label for="phone">Phone Number:</label>
        <input type="text" v-model="form.phone" required />
      </div>
      <div>
        <label for="avatar">Upload Avatar:</label>
        <input type="file" @change="onFileChange" />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import baseApi from "@/axios";
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        email: '',
        fullname: '',
        birthday: '',
        gender: '',
        phone: '',
        avatar: null
      }
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      this.form.avatar = file;
    },
    async submitForm() {
      try {
        const formData = new FormData();
        formData.append('img', this.form.avatar);

        const uploadResponse = await baseApi.post('/api/s3/upload/image', formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        const urlImg = uploadResponse.data.urlImg;

        const userData = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          fullname: this.form.fullname,
          birthday: this.form.birthday,
          gender: this.form.gender,
          phone: this.form.phone,
          avatarUrl: urlImg
        };

        const userResponse = await baseApi.post('http://localhost:8080/users', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const userResult = userResponse.data;

        console.log(userResult);

        if (userResult.code === 1000) {
          alert('User created successfully!');
          this.router.push('/home');
        } else {
          alert('Failed to create user.');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('An error occurred while creating the user.');
      }
    }
  }
};
</script>

<style scoped>
</style>
