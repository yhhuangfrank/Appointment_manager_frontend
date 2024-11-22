<template>
  <el-page-header
    icon=""
    title="Home"
    v-on:back="goHome"
    class="p-3 bg-body-tertiary"
  >
    <template #extra>
      <div class="flex items-center">
        <el-button
          v-if="isLogined"
          type="primary"
          class="ml-2"
          @click="logOutHandler"
        >
          LogOut
        </el-button>
        <el-button
          v-else
          type="primary"
          class="ml-2"
          id="loginBtn"
          @click="logInFormVisible = true"
        >
          Register / LogIn
        </el-button>
      </div>
    </template>
  </el-page-header>

  <el-dialog
    v-model="logInFormVisible"
    title="User Register / LogIn"
    width="500"
  >
    <el-form :model="userInfo">
      <el-form-item label="Email">
        <el-input
          placeholder="xxx@mail.com"
          v-model="userInfo.email"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="logInFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="loginHandler"> Login </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import userApi from "~/apis/userInfo";
import Cookies from "js-cookie";

function goHome() {
  window.location.href = "/";
}

let logInFormVisible = ref(false);
let isLogined = ref(false);
const userInfo = reactive({
  email: "",
});

async function loginHandler() {
  logInFormVisible.value = false;

  if (!isValidEmail(userInfo.email)) {
    ElMessage({
      message: "Email is invalid!",
      type: "error",
    });
    return;
  }
  try {
    const res = await userApi.login(userInfo);
    setCookies(res.data.name, res.data.token);
    isLogined.value = true;
  } catch (e: any) {
    ElMessage({
      message: `Login failed!, ${e.message}`,
      type: "error",
    });
  }
}

function logOutHandler() {
  Cookies.remove("name", { domain: "localhost" });
  Cookies.remove("token", { domain: "localhost" });
  window.location.href = "/";
}

function setCookies(name: string, token: string) {
  Cookies.set("name", name, { domain: "localhost" });
  Cookies.set("token", token, { domain: "localhost" });
  window.location.reload();
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

onMounted(() => {
  const token = Cookies.get("token");
  if (!token) {
    isLogined.value = false;
  } else {
    isLogined.value = true;
  }
});
</script>
