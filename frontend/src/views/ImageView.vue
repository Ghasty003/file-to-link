<template>
  <div class="about">
    <h1>{{ url}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const url = useRoute().params.id;

    return {
      url
    }
  },
})
</script>
