<template>
  <v-card class="elevation-24">
    <v-card-text>
      <h6 v-if="error"
          class="error--text">{{ error }}</h6>
      <form @keyup.enter="submit">
        <v-flex>
          <v-radio-group v-model="type"
                         label="Войти с помощью"
                         class="ma-0 pa-0">
            <v-radio label="Username"
                     value="username" />
            <v-radio label="Email"
                     value="email" />
          </v-radio-group>
        </v-flex>
        <v-text-field v-model="usernameOrEmail"
                      :name="type"
                      :label="type === 'email' ? 'Эл. почта' : 'Имя пользователя'"
                      required
                      v-validate="{ rules: { required: true, email: type === 'email' } }"
                      :error-messages="errors.collect(type)" />
        <v-text-field v-model="password"
                      name="password"
                      label="Пароль"
                      type="password"
                      required
                      v-validate="'required|min:8'"
                      :error-messages="errors.collect('password')" />
        <v-btn @click.native="submit"
               :disabled="errors.any()">Войти</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import getProperty from '../../utils/getProperty';

export default {
  props: ['redirect'],
  data: () => ({
    type: 'email',
    usernameOrEmail: '',
    password: '',
    error: '',
  }),
  methods: {
    async submit() {
      if (!await this.$validator.validateAll()) return;
      const fields = {
        [this.type]: this.usernameOrEmail,
        password: this.password,
      }
      try {
        await this.$store.dispatch('auth/login', { fields, endpoint: '/auth/login/' });
        this.$router.push(this.redirect)
      } catch (error) {
        [this.error] = getProperty(error, 'response.data.non_field_errors') || [error.toString()];
      }
    }
  }
}
</script>
