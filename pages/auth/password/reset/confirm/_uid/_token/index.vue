<template>
  <v-layout justify-center
            align-center>
    <v-flex xs12
            sm10
            md8
            lg6
            xl6>
      <h3>Установить новый пароль</h3>
      <password-reset-confirm-form :redirect="{ name: 'auth-info' }"
                                   :uid="$route.params.uid"
                                   :token="$route.params.token"
                                   @success="successResetConfirm" />
      <!-- <br> -->
      <!-- <p>Не помните старый пароль? -->
      <!-- <nuxt-link :to="{ name: 'auth-password-reset' }">Восстановить!</nuxt-link> -->
      <!-- </p> -->
    </v-flex>
  </v-layout>
</template>

<script>
import PasswordResetConfirmForm from '~/components/auth/PasswordResetConfirmForm.vue';

export default {
  name: 'auth-password-reset-confirm',
  // middleware: 'auth',
  // data: () => ({
  // }),
  methods: {
    successResetConfirm() {
      global.console.log('successResetConfirm');
    }
  },
  components: { PasswordResetConfirmForm }
}
</script>