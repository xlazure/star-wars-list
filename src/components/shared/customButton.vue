<template>
    <button :disabled="disabled" @click="handleClick">
        <slot />
    </button>
</template>

<script lang="ts" setup>
const { disabled, handleClick } = defineProps(['disabled', 'handleClick'])
</script>

<style lang="scss" scoped>
button {
    transition: all 200ms ease-in-out;
    border: 2px solid #FFE81F;
    padding: .5em 2em;
    outline: none;
    background-color: transparent;
    color: #fff;
    border-radius: 8px;
    &:not(&:disabled):hover {
        cursor: pointer;
        background-color: rgba(195, 195, 195, 0.093);

    }
    &:disabled {
        filter: grayscale(1);
        opacity: 0.5;
    }

}
</style>