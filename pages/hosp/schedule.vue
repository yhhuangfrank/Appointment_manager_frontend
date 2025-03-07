<template>
  <el-row justify="center">
    <el-space wrap>
      <el-card
        v-for="(s, i) in scheduleRuleList"
        :key="i"
        class="box-card"
        style="width: 150px"
      >
        <template #header>
          <div class="card-header">
            <span>{{ s.workDate }} / {{ s.dayOfWeek }}</span>
          </div>
        </template>
        <div v-if="s.status" class="text item">open</div>
        <div v-else class="text item">close</div>
        <div class="text item">docs: {{ s.docCount }}</div>
        <div class="text item">available: {{ s.availableCount }}</div>
      </el-card>
    </el-space>
  </el-row>
  <el-row justify="center">
    <el-pagination
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :pager-count="limit"
      :total="total"
    />
  </el-row>
  <el-descriptions title="Hosp Info">
    <el-descriptions-item label="code">{{ hosCode }}</el-descriptions-item>
    <el-descriptions-item label="name">{{ hosName }}</el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import hospApi from "~/apis/hospApi";

const route = useRoute();
const { hosCode } = route.query;
const hosName = ref("");
const currentPage = ref(1);
const limit = 7;
const schedule = reactive({
  scheduleRuleList: [],
  total: 0,
});
const { scheduleRuleList, total } = toRefs(schedule);

async function handleCurrentChange(page: number) {
  currentPage.value = page;
  const { data } = await hospApi.getBookingScheduleRule(
    currentPage.value,
    limit,
    hosCode as string
  );
  Object.assign(schedule, data);
}

onMounted(async () => {
  const { data } = await hospApi.getBookingScheduleRule(
    currentPage.value,
    limit,
    hosCode as string
  );
  hosName.value = data.hosName;
  Object.assign(schedule, data);
});
</script>
