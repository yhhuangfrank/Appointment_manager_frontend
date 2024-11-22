<template>
  <el-row justify="center" v-loading="loading">
    <el-space fill wrap direction="vertical" alignment="center">
      <el-descriptions
        class="margin-top mb-5"
        label-width="150px"
        title="Detail"
        :column="1"
        size="default"
        border
      >
        <el-descriptions-item width="200px" align="center">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <ElIconOfficeBuilding />
              </el-icon>
              Name
            </div>
          </template>
          {{ hosp.hosName }}
        </el-descriptions-item>
        <el-descriptions-item width="200px" align="center">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <ElIconLocation />
              </el-icon>
              Address
            </div>
          </template>
          {{ hosp.address }}
        </el-descriptions-item>
        <el-descriptions-item width="200px" align="center">
          <template #label>
            <div class="cell-item">
              <el-icon>
                <ElIconMedal />
              </el-icon>
              Level
            </div>
          </template>
          {{ hosp.level }}
        </el-descriptions-item>
      </el-descriptions>
      <div style="display: flex; justify-content: center">
        <el-button type="info" @click="schedule" style="max-width: 240px">
          Make a reservation
        </el-button>
      </div>
    </el-space>
  </el-row>
</template>

<script lang="ts" setup>
import hospApi from "~/apis/hospApi";
import type { Hospital } from "~/types/Hospital";
import Cookies from "js-cookie";

let loading = ref(true);
const hosp: Hospital = reactive({
  id: "",
  hosName: "",
  hosCode: "",
  address: "",
  level: "",
  status: 0,
});
const route = useRoute();
const id = route.params.id as string;
const emit = defineEmits(["login"]);

function schedule() {
  const token = Cookies.get("token");
  if (!token) {
    emit("login");
  }
}

onBeforeMount(async () => {
  try {
    const res = await hospApi.getById(id);
    Object.assign(hosp, res.data);
  } catch (e: any) {
    ElMessage({
      message: "get detail fail...",
      type: "error",
      duration: 6000,
    });
  }
});

onMounted(async () => {
  loading.value = false;
});
</script>

<style scoped>
.el-icon {
  margin-right: 4px;
}
</style>
