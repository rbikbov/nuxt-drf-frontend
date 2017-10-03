<template>
  <v-btn @click.native="logout">
    Выйти
  </v-btn>
</template>

<script>
export default {
  props: ['redirect'],
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => this.$router.replace(this.redirect))
    }
  }
}
</script>
