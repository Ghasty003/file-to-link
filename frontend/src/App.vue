<template>
  <HomeView />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HomeView from './views/HomeView.vue'

export default defineComponent({
  components: {
    HomeView
  },
  setup() {
    console.log("Hello world")
  },
})
</script>

