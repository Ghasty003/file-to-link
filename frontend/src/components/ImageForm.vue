<template>
  <div>
    <form ref="form" @submit.prevent="handleSubmit">
      <label for="file">
        <img src="../assets/addAvatar.png" />
        <p><span v-if="!mobile">Drag & Drop or</span> Choose image/pdf</p>
      </label>

      <input accept=".jpg, .jpeg, .png, .pdf"  v-show="false" type="file" id="file" @change="handleChange" />

      <span v-show="error">{{ error }}</span>

      <p class="loading" v-if="loading"></p>

      <img class="preview" v-show="showImage" :src="image" alt="">
      <embed class="preview" v-show="showEmbed" :src="image" />
      
      <button v-show="image">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
        </svg>
        upload
      </button>

      <div class="link" v-show="link">
        <h3>Your upload link:</h3>
        <router-link :to="{name: 'about', params: {id: urlId} }">{{ link }}</router-link>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'ImageForm',
  setup() {
    const link = ref("");
    const image = ref<string>("");
    const error = ref("");
    const showImage = ref(false);
    const showEmbed = ref(false);
    const form = ref<HTMLFormElement>(null!);
    const mobile = ref(false);
    const loading = ref(false);


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

      if (base64.startsWith("data:image")) {
        showImage.value = true;
        return;
      }

      showEmbed.value = true;
      
      error.value = "";
    }


    const handleSubmit =  () => {
      showImage.value = false;
      showEmbed.value = false;
      loading.value = true;

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
        loading.value = false;
      });

      req.addEventListener("progress", (e) => {
        loading.value = true;
        // console.log((e.loaded / e.total) * 100)
      })
    }

    document.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    document.addEventListener("drop", (e) => {
      e.preventDefault();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 700) {
        mobile.value = true;
        return;
      }

      mobile.value = false;
    });

    onMounted(() => {

      if (window.innerWidth <= 700) {
        mobile.value = true;
      }


      form.value.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      form.value.addEventListener("drop", async (e) => {
        e.preventDefault();
        error.value = "";
        
        const base64 = await convertToBase64(e.dataTransfer.files[0]) as string;
        if (base64.startsWith("data:video")) {
          error.value = "Only Images & Pdfs are allowed";
          return;
        }

        image.value = base64;

        if (base64.startsWith("data:application/pdf")) {
          showEmbed.value = true;
          return;
        }

        showImage.value = true;
      });
    });
    
    return {
      image, 
      handleSubmit, 
      handleChange, 
      link, 
      urlId,
      error,
      showImage,
      form,
      showEmbed,
      mobile,
      loading
    }
  }
});
</script>


<style scoped lang="scss">
form {
  background: dodgerblue;
  width: 400px;
  height: 250px;
  border-radius: 10px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 100px);
  color: white;
  border: 3px dashed white;

  @media (max-width: 430px) {
    width: 320px;
  }

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
    
  .preview {
    position: relative;
    left: 50%;
    transform: translate(-50%, 20px);
    object-fit: cover;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border: 0;
  }

  button {
    border: none;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    background: tomato;
    color: white;
    text-transform: capitalize;
    cursor: pointer;
    padding: 5px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 1px 1px 1px rgb(59, 58, 58);
    transition: all 1s;

    &:active {
      transform: translateX(-50%) scale(.8);
    }

    svg {
      width: 24px;
    }
  }

  > span {
    color: crimson;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
  }

  .link {
    text-align: center;
    transform: translateY(30px);
  }

  a {
    font-size: 14px;
    text-align: center;
  }
}

.loading {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 5px solid white;
  border-top-color: red;
  position: relative;
  left: 50%;
  transform: translate(-50%, 30px);

  @media (prefers-reduced-motion: no-preference) {
    animation: .5s spin linear infinite;
  }
}


@keyframes spin {
  to {
    transform: translate(-50%, 30px) rotate(360deg);
  }
}
</style>
