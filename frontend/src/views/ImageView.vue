<template>
  <div class="about">
    <h1>{{ url}}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue';
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const url = useRoute().params.id;

    onBeforeMount(() => {
      const req = new XMLHttpRequest();

      req.open("GET", `http://localhost:8081/api/image/${url}`);

      req.addEventListener("load", () => {
        console.log(req.response)
      })

      req.send();
    })

    return {
      url
    }
  },
})
</script>
