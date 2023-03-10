<template>
  <div class="about">
    <h1>{{ url}}</h1>
    <img :src="imageUrl" alt="image">
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const url = useRoute().params.id;
    const imageUrl = ref("");

    onBeforeMount(() => {
      const req = new XMLHttpRequest();

      req.open("GET", `http://localhost:8081/api/image/${url}`);

      req.addEventListener("load", () => {
        console.log(req.response)
        imageUrl.value = JSON.parse(req.response)[0].image
      })

      req.send();
    })

    return {
      url,
      imageUrl
    }
  },
})
</script>
