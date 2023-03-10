<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="file">
        <img src="../assets/addAvatar.png" />
        <p>Choose image</p>
      </label>
      <input v-show="false" type="file" id="file" @change="handleChange" />
      <button>upload</button>
    </form>
    <router-link :to="{name: 'about', params: {id: urlId} }">{{ link }}</router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from "vuex";

export default defineComponent({
  name: 'ImageForm',
  setup() {
    const store = useStore();

    const link = ref("");
    const image = ref<string>("");
    const host = location.href + "image/";
    const urlId = String(Math.floor(Math.random() * 10000000));
    const url = host + urlId;

    const convertToBase64 = (file: Blob) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        }

        fileReader.onerror = (error) => {
          reject(error);
        }
      })
    }
    
    const handleChange = async (e: Event) => {
      const event = (e.target) as HTMLInputElement;
      if (!event.files) return;
      const file = event.files[0];
      const base64 = await convertToBase64(file) as string;
      image.value = base64;
    }

    

    const handleSubmit =  () => {
      const req = new XMLHttpRequest();

      store.commit("setLinkValidity", true);

      req.open("POST", "http://localhost:8081/api/image");
      req.setRequestHeader("Content-Type", "application/json");
      // req.send(JSON.stringify({ image: image.value, urlId }));

      req.addEventListener("load", () => {
        link.value = url;
        // router.push(`/image/${urlId}`)
      });

      req.addEventListener("progress", (e) => {
        // console.log((e.loaded / e.total) * 100)
      })
    }


    return {
      image, 
      handleSubmit, 
      handleChange, 
      link, 
      urlId
    }
  }
});
</script>


<style scoped lang="scss">
form {
  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 50px;
    height: 50px;
  }
}
</style>
