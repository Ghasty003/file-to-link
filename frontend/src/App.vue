<template>
  <div>
    <nav>
      <h1>Image to Link Converter.</h1>
      <div>
        <span>
          <img src="./assets/image-.gif" alt="">
          <img src="./assets/export.gif" alt="">
          <img src="./assets/file.gif" alt="">
        </span>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style lang="scss">
body {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>

<style scoped>
nav {
  margin-left: 30px;
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
}
</style>