<template lang="pug">
div
    span route: {{ name }}
    img(src="/svg/logo.svg")
</template>

<script lang="ts">
export default defineComponent({
    setup() {
        const { name }: any = useRoute()
        return {
            name
        }
    }
})
</script>