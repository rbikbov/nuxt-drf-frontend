<template>
  <v-card class="elevation-24">
    <v-container grid-list-md>
      <form @keyup.enter="submit">
        <v-layout row
                  wrap>
          <v-flex xs12>
            <v-text-field v-model="avatar_url"
                          box
                          label="Ссылка на аватар"
                          name="avatar"
                          prepend-icon="link"
                          hint="Например: https://vk.com/images/camera_200.png" />
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model.trim="username"
                          v-validate="{rules: {required: true, max: 150, regex: /^[\w.@+-]+$/, unique: 'username' }}"
                          :error-messages="errors.collect('username')"
                          box
                          label="Имя пользователя"
                          name="username"
                          prepend-icon="perm_identity"
                          required
                          hint="Только буквы, цифры и символы @/./+/-/_."
                          max="150"
                          :counter="150" />
          </v-flex>
          <v-flex xs12
                  sm6>
            <v-text-field v-model="first_name"
                          v-validate="'max:30'"
                          :error-messages="errors.collect('first_name')"
                          box
                          label="First Name"
                          name="first_name"
                          data-vv-as="имя"
                          :counter="30" />
          </v-flex>
          <v-flex xs12
                  sm6>
            <v-text-field v-model="last_name"
                          v-validate="'max:30'"
                          :error-messages="errors.collect('last_name')"
                          box
                          label="Last Name"
                          name="last_name"
                          :counter="30" />
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="bio"
                          v-validate="'max:1000'"
                          multi-line
                          box
                          :error-messages="errors.collect('bio')"
                          label="О себе"
                          name="bio"
                          :counter="1000" />
          </v-flex>
          <v-flex xs12>
            <v-text-field v-model="location"
                          v-validate="'max:30'"
                          :error-messages="errors.collect('location')"
                          prepend-icon="location_city"
                          box
                          label="Город"
                          name="location"
                          :counter="30" />
          </v-flex>
          <v-flex xs12>
            <v-menu lazy
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-left="40"
                    max-width="290px">
              <v-text-field slot="activator"
                            v-model="date_of_birth"
                            v-validate="''"
                            :error-messages="errors.collect('date_of_birth')"
                            box
                            label="Дата рождения"
                            name="date_of_birth"
                            prepend-icon="event"
                            readonly />
              <v-date-picker v-model="date_of_birth"
                             :first-day-of-week="1"
                             locale="ru"
                             autosave
                             scrollable />
            </v-menu>
          </v-flex>
          <!-- <v-flex xs12> -->
          <!-- <v-spacer /> -->
          <v-btn @click.native="submit"
                 :disabled="errors.any() || !formChanged">Сохранить</v-btn>
          <v-btn @click.native="cancel">Отмена</v-btn>
          <!-- </v-flex> -->
        </v-layout>
      </form>
    </v-container>
  </v-card>
</template>

<script>
import getProperty from '~/utils/getProperty'; // eslint-disable-line
import { checkExist } from '~/api/auth'; // eslint-disable-line 

export default {
  props: ['redirect', 'user'],
  data: () => ({
    menu: false,
    avatar_url: '',
    username: '',
    first_name: '',
    last_name: '',
    bio: '',
    location: '',
    date_of_birth: '',
  }),
  computed: {
    formChanged() {
      return Object.keys(this.$props.user).some(field =>
        this.$props.user[field] !== this.$data[field]
      );
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
      this.$router.back();
    },
    async submit() {
      if (!await this.$validator.validateAll()) return;
      try {
        await this.$store.dispatch('auth/editUser', {
          fields: { ...this.$data }
        })
        this.$emit('success');
        this.$router.push(this.$props.redirect);
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
            field = 'password2';
          }
          this.errors.add(field, msg);
        })
      });
    },
    setUserData() {
      Object.assign(this.$data, { ...this.$props.user });
    }
  },
  created() {
    this.$validator.extend('unique', {
      validate: async (input, field) => {
        if (input === this.user[field]) {
          return true;
        }
        const { data } = await this.$axios(checkExist({ [field]: input }));
        return data.valid || { data };
      },
      getMessage: (field, params, { message }) => message
    });

    this.setUserData();
  },
}
</script>
