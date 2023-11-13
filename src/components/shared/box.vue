<template>
    <div class="box" :class="computedClasses">
        <slot />
    </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'CustomBox',
    props: {
        customClasses: {
            type: [String, Array],
            default: '',
        },
    },
    computed: {
        computedClasses() {
            return typeof this.customClasses === 'string'
                ? this.customClasses.split(' ')
                : this.customClasses;
        },
    },
});
</script>
  
<style lang="scss" scoped>
.box {
    border: 2px solid #FFE81F;
    border-radius: 8px;

    @media screen and (max-width: 1024px) {
        padding: .5em;;
        border: 2px solid #FFE81F;
    }
}
</style>
  