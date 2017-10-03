<template>
  <v-card class="elevation-24">
    <v-card-text>
      <form @keyup.enter="submit">
        <v-text-field v-model="new_password1"
                      v-validate="'required|min:8|max:128'"
                      :error-messages="errors.collect('new_password1')"
                      name="new_password1"
                      label="Новый пароль"
                      hint="Ваш пароль не может состоять только из цифр."
                      :counter="new_password1.length"
                      min="8"
                      max="128"
                      :append-icon="pw1 ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => (pw1 = !pw1)"
                      :type="pw1 ? 'password' : 'text'"
                      required />
        <v-text-field v-model="new_password2"
                      v-validate="'required|confirmed:new_password1'"
                      :error-messages="errors.collect('new_password2')"
                      name="new_password2"
                      label="Повторите новый пароль"
                      hint="Введите повторно Ваш пароль."
                      :append-icon="pw2 ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => (pw2 = !pw2)"
                      :type="pw2 ? 'password' : 'text'"
                      required />
        <v-text-field v-model="old_password"
                      v-validate="'required|min:8|max:128'"
                      :error-messages="errors.collect('old_password')"
                      name="old_password"
                      label="Текущий пароль"
                      hint="Введите Ваш действующий пароль."
                      :append-icon="old ? 'visibility_off' : 'visibility'"
                      :append-icon-cb="() => (old = !old)"
                      :type="old ? 'password' : 'text'"
                      required />
        <v-btn @click.native="submit"
               :disabled="errors.any()">Сменить пароль</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import getProperty from '~/utils/getProperty'; // eslint-disable-line

export default {
  props: ['redirect'],
  data: () => ({
    new_password1: '',
    new_password2: '',
    old_password: '',
    pw1: true,
    pw2: true,
    old: true,
  }),
  methods: {
    resetData() {
      Object.assign(this.$data, this.$options.data());
    },
    async submit() {
      if (!await this.$validator.validateAll()) return;
      const fields = { ...this.$data };
      try {
        await this.$store.dispatch('auth/passwordChange', { fields });
        this.$emit('success');
        this.resetData();
      } catch (error) {
        const backendErrors = getProperty(error, 'response.data');
        if (backendErrors) this.showBackendErrors(backendErrors);
      }
    },
    showBackendErrors(obj) {
      this.errors.clear();
      Object.keys(obj).forEach(field => {
        obj[field].forEach(msg => {
          if (field === 'non_field_errors') {
            field = 'new_password2';
          }
          this.errors.add(field, msg);
        })
      });
    }
  },
}
</script>
