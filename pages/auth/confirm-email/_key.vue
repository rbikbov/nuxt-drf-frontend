<template>
  <v-layout justify-center
            align-center
            column>
    <template v-if="status === 'success'">
      <h3>Аккаунт успешно подтвержден.</h3>
      <p>
        Теперь Вы можете
        <router-link :to="{ name: 'auth-login' }">авторизоваться</router-link>.
      </p>
    </template>

    <template v-else-if="status === 'fail'">
      <h3>Аккаунт не подтвержден.</h3>
      <p>Проверьте, что текущая ссылка соответствует ссылке в письме.</p>
      <p>Ошибка: Неверные данные.</p>
    </template>
  </v-layout>
</template>

<script>
export default {
  name: 'auth-verify-email',
  middleware: 'no-auth',
  async asyncData({ app, params }) {
    let status;
    try {
      await app.$axios.post('/auth/registration/verify-email/', params);
      status = 'success';
    } catch (error) {
      status = 'fail';
    }
    return { status };
  },
}
</script>
