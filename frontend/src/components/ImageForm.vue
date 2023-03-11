<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <label for="file">
        <img src="../assets/addAvatar.png" />
        <p>Choose image</p>
      </label>

      <input v-show="false" type="file" id="file" @change="handleChange" />

      <span v-show="error">{{ error }}</span>
      
      <button>upload</button>

      <router-link :to="{name: 'about', params: {id: urlId} }">{{ link }}</router-link>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, computed } from 'vue';

export default defineComponent({
  name: 'ImageForm',
  setup() {
    const link = ref("");
    const image = ref<string>("");
    const error = ref("");

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

      if (image.value === "") {
        error.value = "Upload an image.";
        return;
      }
      
      req.open("POST", "http://localhost:8081/api/image");
      req.setRequestHeader("Content-Type", "application/json");
      req.send(JSON.stringify({ image: image.value, urlId }));

      req.addEventListener("load", () => {
        link.value = url;
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
      urlId,
      error
    }
  }
});
</script>


<style scoped lang="scss">
form {
  background: dodgerblue;
  width: 300px;
  height: 200px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 100px);
  color: white;

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(20px);
    cursor: pointer;
  }

  img {
    width: 30px;
    height: 30px;
  }

  button {
    border: none;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    bottom: 40px;
    transform: translateX(-50%);
    background: tomato;
    color: white;
    text-transform: capitalize;
    cursor: pointer;
    padding: 10px 20px
  }

  span {
    color: crimson;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }
}
</style>
