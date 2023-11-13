<template>
    <div class="item" >
      <p>{{ item.name }}</p>
      <p>{{ item.height }}</p>
      <p>{{ item.mass }}</p>
      <p>{{ convertDate(item.created) }}</p>
      <p>{{ convertDate(item.edited) }}</p>
      <p class="item__button" @click="showPlanet">Planet</p>
  
      <Teleport to="body">
        <Modal :show="showModal" @close="showModal = false">
          <template #body>
            <LoadingAnimation v-if="isLoading" />
            <div v-else>
              <h2>Planet: {{ planetData?.name }}</h2>
              <h3>Diameter: {{ planetData?.diameter }}</h3>
              <h3>Climate: {{ planetData?.climate }}</h3>
              <h3>Population: {{ planetData?.population }}</h3>
            </div>
          </template>
        </Modal>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  import Modal from '@/components/popup/popupComponent.vue'
  import { ref } from 'vue';
  import LoadingAnimation from "@/components/shared/loadingAnimation.vue";
  
  import { useFetch } from '@/scripts'
  import type {PlanetDataProps} from '@/types'
  
  const { item } = defineProps(['item'])
  const emits = defineEmits();
  

  
  const showModal = ref<boolean>(false)
  const planetData = ref<PlanetDataProps | null>(null);
  const isLoading = ref<boolean>(true)
  
  const convertDate = (value: string): string => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`
  }
  
  const showPlanet = async (): Promise<void> => {
    planetData.value = null
    showModal.value = true;
    isLoading.value = true;
  
    try {
      const { records, loading }: { records: PlanetDataProps, loading: boolean } = await useFetch(item.homeworld, {});
      planetData.value = records
      isLoading.value = loading;
    } catch (error:any) {
      throw new Error(error);
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .item {
    background-color: rgba(10, 10, 31, 0.5);
    padding: 1em 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  
    p {
      text-align: center;
    }
  
    &:hover {
      background-color: rgba(195, 195, 195, 0.093);
    }
  
    &__button {
      cursor: pointer;
  
      &:hover {
        color: yellow;
  
        &::after {
          content: " <";
        }
  
        &::before {
          content: "> ";
        }
      }
    }
  }
  </style>
  