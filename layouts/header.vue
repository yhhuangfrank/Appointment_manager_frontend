<template>
  <el-page-header
    icon=""
    title="Home"
    v-on:back="goHome"
    class="p-3 bg-body-tertiary"
  >
    <template #extra>
      <div class="flex items-center">
        <el-button>Register</el-button>
        <el-button type="primary" class="ml-2">Log Out</el-button>
      </div>
    </template>
  </el-page-header>
</template>

<script lang="ts" setup>
function goHome() {
  window.location.href = "/";
}
</script>
