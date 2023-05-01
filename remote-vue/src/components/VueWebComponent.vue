<template>
    <div>
        <h1>{{ msg }}</h1>
        <button type="button" @click="count++">count is: {{ count }}</button>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
    name: "Vue Web Component",
    props: {
        msg: {
            type: String,
            required: true,
        },
    },
    setup: () => {
        const count = ref(0);
        return { count };
    },
});
</script>

<style lang="postcss">
button {
    padding: 1rem;
    background: #30285A;
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    box-shadow: 0.25em 0.25em 0.25em #0000002b;
}

h1 {
    color: white;
}
</style>
