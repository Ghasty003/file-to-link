<template>
  <form>
    <label for="file">
      <img src="../assets/addAvatar.png" alt="image">
      <p>Choose image</p>
    </label>
    <input v-show="false" type="file" id="file" />
  </form>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
