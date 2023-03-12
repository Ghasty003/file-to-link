<template>
  <div>
    <nav>
      <h1>Image|Pdf to Link Converter.</h1>
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


<style lang="scss">
body {
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  background: rgba(222, 214, 214, 0.8);
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
  border-radius: 3px;
}
</style>