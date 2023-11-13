<template>
  <Box customClasses="table">
    <LoadingAnimation v-if="data.loading" />
    <div v-else class="table__container">
      <ColumnHeader @sort="sortBy" />
      <ul>
        <Row v-for="(item, index) in filteredRecords" :item="item" :key="index" />
      </ul>
    </div>
  </Box>
  <Options :data="data" @changePage="(action) => handleChangePage(action)" />
</template>

<script setup lang="ts">
import { computed, onMounted, reactive } from 'vue';
import LoadingAnimation from "@/components/shared/loadingAnimation.vue";
import Box from '@/components/shared/box.vue';
import Row from './modules/rowTable.vue';
import ColumnHeader from './modules/headersTable.vue';
import Options from './modules/optionsTable.vue';
import { useFetch } from '@/scripts';
import type { dataProps } from '@/types';
import { inject } from 'vue';

const query = inject('query') as any;

const data = reactive<dataProps>({
  currentRecords: 0,
  loading: true,
  records: [],
  sortBy: '',
  sortOrder: 'asc',
});

function handleChangePage(type: string) {
  const currentData = data.records[data.currentRecords];
  switch (type) {
    case 'NEXT': {
      if (currentData.next === null) return;

      if (data.records[data.currentRecords + 1]) {
        data.currentRecords = data.currentRecords + 1;
      } else {
        getRecords(currentData.next)
          .then(() => (data.currentRecords = data.currentRecords + 1));
      }
      break;
    }
    case 'PREV': {
      if (data.currentRecords === 0 || currentData.previous === null) return;

      data.currentRecords = data.currentRecords - 1;
      break;
    }
    default: {
      break;
    }
  }
}

async function getRecords(url: string) {
  const options = {
    headers: {
      accept: 'application/json',
    },
  };

  data.loading = true;

  await useFetch(url, options)
    .then(({ records, loading }: { records: any; loading: boolean }) => {
      data.records.push(records);
      data.loading = loading;
    })
    .catch(({ error }) => {
      throw new Error(error);
    });
}

onMounted(() => {
  if (!data.records[data.currentRecords]) {
    getRecords('https://swapi.dev/api/people/?page=1');
  }
});

const filteredRecords = computed(() => {
  if (data.records) {
    const key = data.sortBy;
    const order = data.sortOrder === 'asc' ? 1 : -1;
    const numbers: string[] = ['height', 'mass'];

    const filtered = data.records[data.currentRecords].results.filter((item: any) => {
      return item.name.toLowerCase().includes(query.value.toLowerCase());
    });

    if (data.sortBy) {
      const sorted = filtered.sort((a: any, b: any) => {
        const valueA = a[key];
        const valueB = b[key];

        if (numbers.includes(key)) {
          return (Number(valueA) - Number(valueB)) * order;
        } else if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * order;
        } else {
          return (valueA - valueB) * order;
        }
      });
      return sorted;
    }

    return filtered
  }
  return [];
});

function sortBy(key: string) {
  data.sortOrder = data.sortOrder === 'asc' ? 'desc' : 'asc';
  data.sortBy = key;
}
</script>

<style lang="scss" scoped>
.table {
  position: relative;
  overflow: hidden;
  margin: 3em auto 0 auto;
  width: 80%;
  height: 460px;

  &__container {
    ul {
      overflow-y: auto;
      height: 400px;

      &::-webkit-scrollbar {
        width: 4px;
      }

      &::-webkit-scrollbar-track {
        border-radius: 15px;
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: rgb(34, 32, 32);
        outline: 1px solid slategrey;
        border-radius: 15px;
      }
    }

    @media screen and (max-width: 1024px) {
      min-width: 100vh;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    margin: 2em auto 0 auto;
    overflow-x: auto;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 15px;
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: rgb(34, 32, 32);
      outline: 1px solid slategrey;
      border-radius: 15px;
    }
  }
}
</style>
