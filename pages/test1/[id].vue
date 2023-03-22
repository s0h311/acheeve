<template>
    <p>{{ getId() }}</p>
</template>

<script lang="ts">
export default {
    data() {
        return {
            id: 1
        }
    },
    methods: {
        getId() {
            const route = useRoute()
            return route.params.id
        }
    }

}
</script>

