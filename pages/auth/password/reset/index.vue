<template>
  <v-layout justify-center
            align-center>
    <v-flex xs12
            sm10
            md8
            lg6
            xl6>
      <h3>Сброс пароля</h3>
      <password-reset-form :redirect="{ name: 'auth-info' }"
                           @success="successReset" />
      <br>
      <p>Вспомнили пароль?
        <nuxt-link :to="{ name: 'auth-login' }">Войти!</nuxt-link>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import PasswordResetForm from '~/components/auth/PasswordResetForm.vue';

export default {
  name: 'auth-password-reset',
  // middleware: 'auth',
  // data: () => ({
  // }),
  methods: {
    successReset() {
      global.console.log('successReset');
    }
  },
  components: { PasswordResetForm }
}
</script>
