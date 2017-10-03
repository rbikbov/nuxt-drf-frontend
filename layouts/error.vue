<template>
  <base-layout>
    <v-layout column
              justify-center
              align-center>
      <h1>{{ error.status }}</h1>
      <h2>{{ error.statusText }}</h2>
    </v-layout>
  </base-layout>
</template>

<script>
import baseLayout from '~/layouts/baseLayout.vue';

export default {
  name: 'error-layout',
  components: { baseLayout },
  props: ['error'],
}
</script>