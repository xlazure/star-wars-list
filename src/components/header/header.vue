<template>
    <header>
        <Box custom-classes="wrapper">
            <div>
                <h1>Star wars app</h1>
            </div>

            <div class="search" v-if="route.path === '/'">
                <input class="search-input" type="text" v-model="query" placeholder="Search by name">
                <button v-if="query?.length > 0" @click="handleResetQuery" class="search-clear">X</button>
            </div>

            <div class="return" v-else>
                <RouterLink to="/">
                    <button>Return</button>
                </RouterLink>
            </div>

        </Box>
    </header>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { inject, type Ref } from 'vue';

import Box from '@/components/shared/box.vue';

const query = inject('query') as Ref<string>;
const route = useRoute();

const handleResetQuery = () => {
    query.value = "";
}




</script>

<style lang="scss" scoped>
header {
    margin: 2em auto 0 auto;
    width: 80%;

    .wrapper {
        padding: 1em 2em;

        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        @media screen and (max-width: 1024px) {
            justify-content: center;
            gap: 1em;
        }

        .search {
            max-width: 250px;
            width: 100%;
            position: relative;

            &-input {
                border-radius: 5px;
                padding: .5em;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.605);
                border: none;
                outline: none;

                &::placeholder {
                    font-weight: 700;
                }
            }

            &-clear {
                right: .5em;
                top: 50%;
                transform: translate(-50%, -50%);
                position: absolute;
                border: none;
                background-color: transparent;

                &:hover {
                    cursor: pointer;
                }
            }

            @media screen and (max-width: 1024px) {
                max-width: 400px;
            }
        }

        .return {
            & button {
                padding: 1em;
                width: 120px;
                text-transform: uppercase;
                background-color: transparent;
                font-weight: 700;
                color: #FFE81F;
                border-radius: 5px;
            }
        }
    }

    h1 {
        margin-top: -30px;
        font-family: 'StarWarsFont', sans-serif;
        color: #FFE81F;
        text-transform: uppercase;
        // font-size: 50px;
        font-size: clamp(2rem, 1.7404rem + 1.1538vw, 3.125rem);
    }

    @media screen and (max-width: 1024px) {
        width: 100%;
        margin: 1em auto 0 auto;
    }

}
</style>