<template>
  <div class="common-layout">
    <el-container style="min-height: 100vh">
      <el-header style="padding: 0">
        <NuxtLayout name="header" />
      </el-header>
      <el-main class="mx-auto" style="min-width: 80vw">
        <NuxtPage />
      </el-main>
      <el-footer style="padding: 0" class="bg-body-tertiary text-center">
        <NuxtLayout name="footer" />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup></script>
<style scoped></style>
