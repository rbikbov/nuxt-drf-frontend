<template>
  <v-layout justify-center
            align-center>
    <v-flex xs12
            sm10
            md8
            lg6
            xl6>
      <h3>Смена пароля</h3>
      <password-change-form :redirect="{ name: 'auth-info' }"
                            @success="successChange" />
      <br>
      <p>Не помните старый пароль?
        <nuxt-link :to="{ name: 'auth-password-reset' }">Восстановить!</nuxt-link>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import PasswordChangeForm from '~/components/auth/PasswordChangeForm.vue';

export default {
  name: 'auth-password-change',
  middleware: 'auth',
  // data: () => ({
  // }),
  methods: {
    successChange() {
      global.console.log('successChange');
    }
  },
  components: { PasswordChangeForm }
}
</script>
