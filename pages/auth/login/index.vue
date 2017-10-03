<template>
  <v-layout align-center
            justify-center>
    <v-flex xs12
            sm10
            md8
            lg6
            xl6>
      <h3>Войти</h3>
      <login-form :redirect="{ name: 'index' }" />
      <br>
      <p>У Вас нет аккаунта?
        <nuxt-link :to="{ name: 'auth-registration' }">Зарегистрироваться!</nuxt-link>
      </p>
      <br>
      <p>Забыли пароль?
        <nuxt-link :to="{ name: 'auth-password-reset' }">Восстановить!</nuxt-link>
      </p>
    </v-flex>
  </v-layout>
</template>

<script>
import LoginForm from '~/components/auth/LoginForm.vue'

export default {
  name: 'auth-login',
  middleware: 'no-auth',
  components: { LoginForm },
}
</script>
