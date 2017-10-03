<template>
  <v-container fluid>
    <v-layout align-center
              justify-center>
      <v-flex xs10>
        <v-card v-if="settings">
          <v-card-text>
            <v-layout row
                      wrap>
              <v-flex xs12>
                <span>Тема</span>
                <v-radio-group v-model="settings.dark"
                               @change="changeSetting">
                  <v-radio label="Темная"
                           :value="true" />
                  <v-radio label="Светлая"
                           :value="false" />
                </v-radio-group>
              </v-flex>
              <v-flex xs12
                      md6>
                <span>Меню навигации</span>
                <v-switch label="Под хедером"
                          v-model="settings.firstDrawerClipped"
                          @change="changeSetting"
                          :disabled="settings.firstDrawerMini"
                          primary />
                <v-switch label="Мини"
                          class="pa-0"
                          v-model="settings.firstDrawerMini"
                          @change="changeSetting"
                          primary />
                <v-switch label="Справа"
                          class="pa-0"
                          v-model="settings.firstDrawerRight"
                          @change="changeSetting"
                          primary />
              </v-flex>
              <v-flex xs12
                      md6>
                <span>Чат</span>
                <v-switch label="Справа"
                          v-model="settings.secondDrawerRight"
                          @change="changeSetting"
                          primary />
              </v-flex>
              <v-flex xs12
                      md6>
                <span>Хедер</span>
                <v-switch label="Зафиксированный"
                          v-model="settings.headerFixed"
                          disabled
                          @change="changeSetting"
                          primary />
              </v-flex>
              <v-flex xs12
                      md6>
                <span>Футер</span>
                <v-switch label="Зафиксированный"
                          v-model="settings.footerFixed"
                          @change="changeSetting"
                          primary />
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'settings',
  data: () => ({
    settings: this.storeSettings,
  }),
  computed: {
    storeSettings() {
      return this.$store.state.settings;
    }
  },
  methods: {
    changeSetting() {
      this.settings.firstDrawerClipped = this.settings.firstDrawerMini || this.settings.firstDrawerClipped;
      this.$store.dispatch('settings/updateSettings', this.settings);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.settings = { ...this.storeSettings };
    })
  },
}
</script>
