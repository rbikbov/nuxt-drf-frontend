<template>
  <v-card class="elevation-24">
    <v-card-text>
      <form @keyup.enter="submit">
        <v-text-field v-model="email"
                      v-validate="'required|email'"
                      :error-messages="errors.collect('email')"
                      label="Эл. почта"
                      name="email"
                      type="email"
                      required />
        <v-btn @click.native="submit"
               :disabled="errors.any()">Восстановить пароль</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import getProperty from '~/utils/getProperty'; // eslint-disable-line

export default {
  props: ['redirect'],
  data: () => ({
    email: '',
  }),
  methods: {
    async submit() {
      if (!await this.$validator.validateAll()) return;
      const fields = { ...this.$data };
      try {
        await this.$store.dispatch('auth/passwordReset', { fields });
        this.$emit('success');
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
