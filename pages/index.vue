<template>
  <v-layout column
            justify-center
            align-center>
    <v-flex xs12
            sm8
            md6>
      <v-card>
        <v-card-title class="headline">Nuxt.js + Django REST Framework</v-card-title>
        <v-card-text>
          <p>Готовый шаблон с регистрацией, подтверждением почты и авторизацией.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn primary
                 flat
                 nuxt
                 to="settings">Перейти к настройкам</v-btn>
        </v-card-actions>
      </v-card>
      <hr class="my-3">
      <blockquote>
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-flex>
  </v-layout>
</template>