<template>
  <v-dialog v-model="dialog"
            persistent
            width="100%">
    <v-card class="elevation-24 text-xs-center">
      <v-card-text class="headline">Успешная регистрация</v-card-text>
      <v-card-text>
        <div class="subheading">
          На указанную Вами почту {{ email }} было отправлено письмо для подтверждения.
          <br> Пожалуйста, подтвердите Ваш аккаунт с помощью ссылки в письме и возвращайтесь к нам.
        </div>
        <div>
          <a class="title"
             v-if="provider"
             :href="provider.href">{{ provider.name }}</a>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="green--text darken-1"
               flat="flat"
               @click.native="closeCallback">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'emailSendedInfo',
  data: () => ({
    dialog: true
  }),
  props: {
    closeCallback: {
      type: Function,
      default() {
        this.$emit('close');
      }
    },
    email: {
      type: String
    },
    provider: {
      type: Object
    }
  }
}
</script>
