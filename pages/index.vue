<template>
  <div style="display: flex" class="justify-content-center">
    <el-autocomplete
      v-model="hosName"
      :fetch-suggestions="querySearchAsync"
      :trigger-on-focus="false"
      clearable
      class="inline-input w-50"
      placeholder="Please Input Name"
      @select="handleSelect"
    />
    <el-button type="primary" @click="searchHandler">
      <el-icon>
        <ElIconSearch />
      </el-icon>
    </el-button>
  </div>
  <div
    v-if="data.commons"
    style="display: flex"
    class="justify-content-center my-2"
  >
    <el-button
      v-for="(c, idx) in data.commons"
      :type="currentIdx === idx ? 'primary' : ''"
      circle
      class="mx-2"
      @click="levelChangeHandler(c.id, idx)"
    >
      {{ c.name }}
    </el-button>
  </div>
  <div v-if="data.list" class="row my-2 justify-content-center">
    <el-card
      style="max-width: 360px; cursor: pointer"
      v-for="(h, idx) in data.list"
      :key="idx"
      class="m-2"
      @click="clickCardHandler(h.id)"
    >
      <template #header>
        <div class="card-header">
          <span>HosName: {{ h.hosName }}</span>
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
import type { Hospital } from "~/types/Hospital";
import type { Common } from "~/types/Common";

interface Data {
  list: Hospital[];
  totalPages: number;
  commons: Common[];
}

const searchObj = reactive({ hosName: "", dictCode: 0 });
let { hosName, dictCode } = toRefs(searchObj);
let page = ref(1);
let limit = ref(2);
let currentIdx = ref(0);
let loadingInstance = ElLoading.service({
  fullscreen: true,
  text: "Loading...",
});
const data: Data = reactive({
  list: [],
  totalPages: 0,
  commons: [],
});

const { data: resData, error } = await useAsyncData(
  "hospList",
  async () => {
    const query =
      currentIdx.value === 0 ? { hosName: hosName.value } : searchObj;
    const [hospRes, commonRes] = await Promise.all([
      hospApi.getPageList(page.value, limit.value, query),
      commonApi.findChildrenData(1),
    ]);

    const obj: Data = {
      list: hospRes.data.content,
      totalPages: hospRes.data.totalPages,
      commons: [{ id: -1, name: "All" }, ...commonRes.data],
    };
    data.list = obj.list;
    data.commons = obj.commons;
    data.totalPages = obj.totalPages;
    return obj;
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
} else if (resData.value) {
  data.list = resData.value.list;
  data.commons = resData.value.commons;
  data.totalPages = resData.value.totalPages;
}

async function searchHandler() {
  const query = currentIdx.value === 0 ? { hosName: hosName.value } : searchObj;
  const res = await hospApi.getPageList(page.value, limit.value, query);
  data.list = [];
  res.data.content.forEach((d: any) => data.list.push(d));
}

function levelChangeHandler(code: number, idx: number) {
  dictCode.value = code;
  currentIdx.value = idx;
}

function clickCardHandler(id: string) {}

function querySearchAsync(queryString: string, cb: (arg: any) => void) {
  if (!queryString) return;
  hospApi.getByHosName(queryString).then((res) => {
    cb(
      res.data.map((h: Hospital) => {
        return { value: h.hosName };
      })
    );
  });
}
function handleSelect(item: Record<string, any>) {
  hosName.value = item.value;
  searchHandler();
}

onBeforeMount(() => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: "Loading...",
  });
});

onMounted(async () => {
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
