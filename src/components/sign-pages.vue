<template>
  <ul class="nav header-navbar-rht align-items-center">
    <li class="nav-item">
      <div>
        <a
            href="#"
            id="dark-mode-toggle"
            ref="darkModeToggle"
            class="dark-mode-toggle"
            @click="enableDarkMode"
        >
          <i class="fa-solid fa-moon"></i>
        </a>
        <a
            href="#"
            id="light-mode-toggle"
            class="dark-mode-toggle"
            ref="lightModeToggle"
            @click="disableDarkMode"
        >
          <i class="fa-solid fa-sun"></i>
        </a>
      </div>
    </li>
    <li class="nav-item" v-if="!user">
      <router-link class="nav-link login-three-head button" to="/">
        <span>Login</span>
      </router-link>
    </li>
    <li class="nav-item" v-if="!user">
      <router-link class="nav-link signin-three-head" to="/register">Register</router-link>
    </li>
    <li class="nav-item" v-else>
      <span class="nav-link">{{ user.fullname }}</span>
      <button @click="confirmLogout" class="nav-link">Logout</button>
    </li>
  </ul>
</template>
<script>
import {ref, onMounted} from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";

export default {
  setup() {
    const store = useStore();
    const darkModeToggle = ref(null);
    const lightModeToggle = ref(null);
    const user = ref(store.state.userInfo);

    function confirmLogout() {
      Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, log me out"
      }).then((result) => {
        if (result.isConfirmed) {
          logout();
        }
      });
    }

    function logout() {
      user.value = null;
      localStorage.removeItem("token");
    }

    function enableDarkMode() {
      document.documentElement.setAttribute("class", "light dark");
      darkModeToggle.value.classList.remove("activate");
      lightModeToggle.value.classList.add("activate");
      localStorage.setItem("darkMode", "enabled");
    }

    function disableDarkMode() {
      document.documentElement.setAttribute("class", "light");
      lightModeToggle.value.classList.remove("activate");
      darkModeToggle.value.classList.add("activate");
      localStorage.removeItem("darkMode");
    }

    // async function fetchUserInfo() {
    //   const token = localStorage.getItem("token");
    //   if (!token) return;
    //
    //   try {
    //     const response = await baseApi.get("/users/myInfo", {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     if (response.data.code === 1000) {
    //       user.value = response.data.result;
    //       console.log(user.value);
    //       store.commit("setUserInfo", user.value);
    //     }
    //   } catch (error) {
    //     console.error("Lỗi khi lấy thông tin người dùng:", error);
    //   }
    // }

    onMounted(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "enabled") {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });

    return {
      darkModeToggle,
      lightModeToggle,
      enableDarkMode,
      disableDarkMode,
      user,
      confirmLogout,
    };
  },
};
</script>

