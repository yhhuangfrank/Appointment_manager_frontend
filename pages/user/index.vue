<template>
  <el-row justify="center">
    <el-col :span="12">
      <el-form :model="userInfo" label-width="auto" style="max-width: 600px">
        <el-form-item label="Name">
          <el-input v-model="userInfo.name" />
        </el-form-item>
        <el-form-item label="NickName">
          <el-input v-model="userInfo.nickName" />
        </el-form-item>
        <el-form-item label="Email">
          <el-input v-model="userInfo.email" />
        </el-form-item>
        <el-form-item label="Auth No.">
          <el-input v-model="userInfo.authNo" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Save</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { UserInfo } from "~/types/UserInfo";
import userApi from "~/apis/userInfo";

const userInfo: UserInfo = reactive({});

async function onSubmit() {
  await userApi.saveUserAuth({
    name: userInfo.name,
    authNo: userInfo.authNo,
  });
  window.location.reload();
}

onMounted(async () => {
  const res = await userApi.getUserInfo();
  Object.assign(userInfo, res.data);
});
</script>

<style scoped></style>
