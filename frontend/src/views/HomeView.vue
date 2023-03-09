<template>
  <div class="home">
    <ImageForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ImageForm from '@/components/ImageForm.vue'

export default {
  name: 'HomeView',
  components: {
    ImageForm
  }
}
</script>
