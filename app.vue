<template>
  <div class="common-layout">
    <el-container style="min-height: 100vh">
      <el-header style="padding: 0">
        <NuxtLayout name="header" />
      </el-header>
      <el-main class="mx-auto">
        <el-form
          :model="searchObj"
          label-width="auto"
          style="max-width: 600px; display: flex"
        >
          <el-form-item>
            <el-input placeholder="name" v-model="searchObj.hosName" />
          </el-form-item>
          <el-button type="primary" @click="searchHos">
            <el-icon>
              <ElIconSearch />
            </el-icon>
          </el-button>
        </el-form>
        <div style="display: flex">
          <el-button
            v-for="lvl in levels"
            :type="searchObj.level === lvl ? 'primary' : ''"
            circle
            class="mx-2"
            @click="levelChangeHandler(lvl)"
          >
            {{ lvl }}
          </el-button>
        </div>
      </el-main>
      <el-footer style="padding: 0" class="bg-body-tertiary text-center">
        <NuxtLayout name="footer" />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

const searchObj = reactive({ hosName: "", level: "Lv1" });
const levels = reactive(["Lv1", "Lv2"]);

function searchHos() {
  console.log("search...");
}

function levelChangeHandler(level: string) {
  searchObj.level = level;
}
</script>
<style scoped></style>
