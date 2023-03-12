<template>
  <div>
    <p class="loading" v-if="loading"></p>
    <img v-if="image" :src="imageUrl" alt="image">
    <embed v-else :src="imageUrl" type="">
    <button @click="handleDownload">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

      Download File
    </button>
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
    const image = ref(false);
    const loading = ref(false);

    onBeforeMount(() => {
      const req = new XMLHttpRequest();
      loading.value = true;

      req.open("GET", `https://file-to-link-e6pc.onrender.com/api/image/${url}`);

      req.addEventListener("load", () => {
        if (req.status !== 200) {
          router.push("/");
          return;
        }

        loading.value = false;

        // store.commit("setLinkValidity", true);
        imageUrl.value = JSON.parse(req.response)[0].image;
        if (imageUrl.value.startsWith("data:image")) {
          image.value = true;
        }
      });

      req.addEventListener("progress", () => {
        loading.value = true;
      })

      req.send();
    });

    const handleDownload = () => {
      const aTag = Object.assign(document.createElement("a"), {
      href: imageUrl.value, 
      style: "display:none", 
      download: "download"
      });

      document.body.appendChild(aTag);
      aTag.click();
      document.body.removeChild(aTag);
    }

    return {
      url,
      imageUrl,
      handleDownload,
      image,
      loading
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
    box-shadow: 1px 1px 1px rgb(36, 35, 35);
    transition: all 1s;

    &:active {
      transform: scale(.8);
    }
  }

  .arrow {
    width: 30px;
    height: 30px;
  }
}

img, embed {
  width: 400px;
  height: 400px;

  @media (max-width: 400px) {
    width: 320px;
    height: 320px;
  }
}

svg {
  width: 30px;
}

.loading {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 5px solid white;
  border-top-color: red;
  position: relative;
  transform: translateY(30px);

  @media (prefers-reduced-motion: no-preference) {
    animation: .5s spin linear infinite;
  }
}


@keyframes spin {
  to {
    transform: translateY(30px) rotate(360deg);
  }
}
</style>