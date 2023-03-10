<template>
  <div class="about">
    <h1>{{ url}}</h1>
    <img :src="imageUrl" alt="image">
    <button @click="handleDownload">Download image</button>
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
        imageUrl.value = JSON.parse(req.response)[0].image
      })

      req.send();
    });

    const handleDownload = () => {
      const aTag = Object.assign(document.createElement("a"), {
      href: imageUrl.value, 
      style: "display:none", 
      download: "image"
      });

      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
    }

    return {
      url,
      imageUrl,
      handleDownload
    }
  },
})
</script>


<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>