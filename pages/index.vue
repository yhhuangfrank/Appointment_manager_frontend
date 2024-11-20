<template>
  <el-form
    :model="searchObj"
    label-width="auto"
    style="display: flex"
    class="justify-content-center"
  >
    <el-form-item>
      <el-input placeholder="name" v-model="hosName" />
    </el-form-item>
    <el-button type="primary" @click="searchHandler">
      <el-icon>
        <ElIconSearch />
      </el-icon>
    </el-button>
  </el-form>
  <div style="display: flex" class="justify-content-center">
    <el-button
      v-for="(c, idx) in data?.commons"
      :type="currentIdx === idx ? 'primary' : ''"
      circle
      class="mx-2"
      @click="levelChangeHandler(c.id, idx)"
    >
      {{ c.name }}
    </el-button>
  </div>
  <div v-show="data" class="container row my-2 justify-content-center">
    <el-card
      style="max-width: 360px"
      v-for="(h, idx) in data?.list"
      :key="idx"
      class="m-2"
    >
      <template #header>
        <div class="card-header">
          <span>{{ h.hosName }}</span>
        </div>
      </template>
      <p>Level: {{ h.level }}</p>
      <p>Address: {{ h.address }}</p>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import hospApi from "~/apis/hospApi";
import commonApi from "~/apis/commonApi";
import { ElLoading } from "element-plus";

const searchObj = reactive({ hosName: "", dictCode: 0 });
let { hosName, dictCode } = toRefs(searchObj);
let page = ref(1);
let limit = ref(2);
let currentIdx = ref(0);
let loadingInstance = ElLoading.service({
  fullscreen: true,
  text: "Loading...",
});

const { data, error } = await useAsyncData(
  "hospList",
  async () => {
    const query =
      currentIdx.value === 0 ? { hosName: hosName.value } : searchObj;
    const [hospRes, commonRes] = await Promise.all([
      hospApi.getPageList(page.value, limit.value, query),
      commonApi.findChildrenData(1),
    ]);

    return {
      list: hospRes.data.content,
      totalPages: hospRes.data.totalPages,
      commons: [{ id: -1, name: "All" }, ...commonRes.data],
    };
  },
  {
    watch: [page, dictCode],
  }
);

if (error.value) {
  ElMessage({
    message: JSON.stringify(error.value.toJSON()),
    type: "error",
    duration: 5000,
  });
}

async function searchHandler() {
  const res = await hospApi.getPageList(page.value, limit.value, searchObj);
  if (data.value) {
    for (let i = 0; i < data.value.list.length; i++) {
      data.value.list.pop();
    }
  }
  res.data.content.forEach((d: any) => data.value?.list.push(d));
}

function levelChangeHandler(code: number, idx: number) {
  dictCode.value = code;
  currentIdx.value = idx;
}

onBeforeMount(() => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "Loading...",
  });
});

onMounted(() => {
  loadingInstance.close();
});

onBeforeUpdate(() => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "Loading...",
  });
});

onUpdated(() => {
  if (loadingInstance) {
    loadingInstance.close();
  }
});
</script>
