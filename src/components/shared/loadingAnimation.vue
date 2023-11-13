<template>
    <div class="loading">
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'LoadingAnimation',
};
</script>

<style lang="scss" scoped>
.loading {

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    display: flex;
    justify-content: center;

    div {
        width: 1rem;
        height: 1rem;
        margin: 2rem 0.3rem;
        background: rgb(200, 200, 200);
        border-radius: 50%;
        animation: 0.9s bounce infinite alternate;

        &:nth-child(2) {
            animation-delay: 0.3s;
        }

        &:nth-child(3) {
            animation-delay: 0.6s;
        }
    }
}

@keyframes bounce {
    to {
        opacity: 0.3;
        transform: translate3d(0, -1rem, 0);
    }
}
</style>