<template>
  <v-layout justify-center
            align-center>
    <v-flex xs12
            sm10
            md8
            lg6
            xl6>
      <h3>Регистрация</h3>
      <registration-form :redirect="{ name: 'auth-info' }"
                         @success="successReg" />
      <br>
      <p>Вы уже зарегистрированы?
        <nuxt-link :to="{ name: 'auth-login' }">Войти!</nuxt-link>
      </p>
    </v-flex>
    <verify-email-dialog v-if="dialog"
                         :email="email"
                         :provider="provider"
                         @close="$router.push({ name: 'auth-login' })" />
  </v-layout>
</template>

<script>
import RegistrationForm from '~/components/auth/RegistrationForm.vue';
import VerifyEmailDialog from '~/components/auth/VerifyEmailDialog.vue';
import mailProviders from '~/utils/mailProviders'; //eslint-disable-line

export default {
  name: 'auth-registration',
  middleware: 'no-auth',
  data: () => ({
    email: '',
    dialog: false,
  }),
  methods: {
    successReg(email) {
      this.email = email;
      this.dialog = true;
    }
  },
  computed: {
    provider() {
      return mailProviders(this.email);
    }
  },
  components: { RegistrationForm, VerifyEmailDialog }
}
</script>
