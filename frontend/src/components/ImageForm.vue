<template>
  <div>
    <form>
      <label for="file">
        <img src="../assets/addAvatar.png" alt="image">
        <p>Choose image</p>
      </label>
      <input v-show="false" type="file" id="file" />
    </form>
    <p>Image link</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ImageForm',
  props: {
    msg: String,
  },
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
