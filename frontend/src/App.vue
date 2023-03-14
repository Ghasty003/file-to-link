<template>
  <div>
    <nav>
      <router-link to="/">
        <h1>Image|Pdf to Link Converter.</h1>
        <div>
          <span>
            <img src="./assets/image-.gif" alt="">
            <img src="./assets/export.gif" alt="">
            <img src="./assets/file.gif" alt="">
          </span>
        </div>

        <main v-show="offline">
          You're offline. Kindly check your internet connection.
        </main>

      </router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const offline = ref(false);

onMounted(() => {
  if (!navigator.onLine) {
    offline.value = true;
  }
  
});

</script>



<style lang="scss">
body {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background: rgba(222, 214, 214, 0.8);
}
</style>

<style scoped lang="scss">
nav {
  margin-left: 30px;
}

a {
  text-decoration: none;
  color: black;
}

main {
  background: dodgerblue;
  color: white;
  width: fit-content;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  left: 50%;
  transform: translate(-50%, 20px);
}

nav div {
  width: 300px;
  display: flex;
  justify-content: start;
  align-items: center;
}

span {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
}

img {
  width: 40px;
  border-radius: 3px;
}
</style>