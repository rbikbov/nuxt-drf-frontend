<template>
  <base-layout>
    <nuxt />
  </base-layout>
</template>

<script>
import baseLayout from '~/layouts/baseLayout.vue';

export default {
  name: 'default-layout',
  components: { baseLayout }
}
</script>
