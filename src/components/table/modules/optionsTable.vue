<template>
    <div class="options">
        <CustomButton :disabled="data.records[data.currentRecords]?.previous === null || data.loading"
            :handleClick="() => emits('changePage', 'PREV')">Prev
            page</CustomButton>
        <Box >
            {{ data.currentRecords + 1 }}
        </Box>
        <CustomButton :disabled="data.records[data.currentRecords]?.next === null || data.loading"
            :handleClick="() => emits('changePage', 'NEXT')">Next page
        </CustomButton>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import Box from '@/components/shared/box.vue'
import CustomButton from "@/components/shared/customButton.vue"

import type { dataProps } from '@/types';

const props = defineProps({
    data: Object as () => dataProps,
});

const emits = defineEmits();

const data = ref(props.data ?? { previous: null, next: null});

</script>

<style lang="scss" scoped>
.options {
    padding: 1em;
    width: 80%;
    margin: 3em auto 0 auto;

    display: grid;
    grid-template-columns: 150px 40px 150px;
    gap: .5em;
    justify-content: center;
    text-align: center;

    @media screen and (max-width:1024px) {
        margin: 1em auto 0 auto;
    }
}
</style>