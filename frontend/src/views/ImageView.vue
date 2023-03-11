<template>
  <div>
    <img :src="imageUrl" alt="image">
    <button @click="handleDownload"><img class="arrow" src="../assets/down-arrow.png" alt=""> Download image</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();

    const url = useRoute().params.id;
    const imageUrl = ref("");

    onBeforeMount(() => {
      const req = new XMLHttpRequest();

      req.open("GET", `http://localhost:8081/api/image/${url}`);

      req.addEventListener("load", () => {
        if (req.status !== 200) {
          router.push("/");
        }

        // store.commit("setLinkValidity", true);
        imageUrl.value = JSON.parse(req.response)[0].image;
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


<style scoped lang="scss">
div {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 40px;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: crimson;
    border: none;
    border-radius: 10px;
    color: white;
    padding: 4px 8px;
    cursor: pointer;
    margin-top: 20px;
  }

  .arrow {
    width: 30px;
    height: 30px;
  }
}
img {
  width: 400px;
  height: 400px;
}
</style>