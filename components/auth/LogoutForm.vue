<template>
  <v-btn @click.native="logout">
    Выйти
  </v-btn>
</template>

<script>
export default {
  props: ['redirect'],
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout');
      this.$router.push(this.redirect);
    }
  }
}
</script>
