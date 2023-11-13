<template>
    <div class="keys">
        <p v-for="key in sortedListOfKeys" :key="key.title" @click="handleSort(key)" :class="{ rotate: key.isAscOrder, active: key.title === activeKey }">
            {{ key.title }}
            <ArrowUpIcon v-if="key.isAscOrder !== undefined" />
        </p>
    </div>
</template>
  
<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ComputedRef } from 'vue';
import type { KeyProps } from '@/types';

import ArrowUpIcon from '@/components/icons/ArrowUpIcon.vue';

const emits = defineEmits();

const activeKey = ref('');

const ListOfKeysToDisplay = ref<KeyProps[]>([
    { title: 'edited', order: 4, isAscOrder: true },
    { title: 'height', order: 2, isAscOrder: true },
    { title: 'name', order: 1, isAscOrder: true },
    { title: 'homeworld', order: 6 },
    { title: 'created', order: 5, isAscOrder: true },
    { title: 'mass', order: 3, isAscOrder: true },
]);

const sortedListOfKeys: ComputedRef<KeyProps[]> = computed(() =>
    ListOfKeysToDisplay.value.sort((a, b) => (a.order || 0) - (b.order || 0))
);

function handleSort(key: KeyProps): void {
    const selectedKey = ListOfKeysToDisplay.value.find((item) => item.title === key.title);

    if (selectedKey && selectedKey.isAscOrder !== undefined) {
        selectedKey.isAscOrder = !selectedKey.isAscOrder;
        activeKey.value = key.title;
        emits('sort', key.title);
    }
}
</script>
  
<style lang="scss" scoped>
.keys {
    overflow: hidden;
    padding: 1em 4px 1em 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);


    p {
        position: relative;
        text-align: center;

        &:not(:last-child):hover {
            color: #fff;
            cursor: pointer;

            & svg {
                opacity: 1;
            }
        }

        & svg {
            opacity: 0;
            transition: all 150ms ease-in-out;
            position: absolute;
            width: 16px;
            height: 16px;
            top: 55%;
            transform: translateY(-50%);
        }

        &.rotate {
            & svg {
                transform: translateY(-50%) rotate(180deg);
            }
        }

        &.active {
            color: #fff;

            & svg {
                opacity: 1;
            }
        }
    }
}
</style>
  