module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt.js + Django REST Framework',
    // bodyAttrs: {
    // id: 'body'
    // },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js + Django REST Framework'
      },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      config.node = { fs: 'empty' };
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    },
    vendor: ['vee-validate', 'vuetify'],
    extractCSS: true
  },
  plugins: ['~/plugins/veeValidate', '~/plugins/vuetify.js'],
  modules: [
    // '@nuxtjs/auth',
    [
      '~/modules/@nuxtjs/auth',
      {
        /* auth options */
      }
    ],
    // ...Axios module should be included AFTER @nuxtjs/auth
    // '@nuxtjs/axios'
    [
      '~/modules/@nuxtjs/axios',
      {
        credentials: false,
        // redirectError: '/auth/login',
        redirectError: {
          401: '/auth/login',
          403: '/auth/login'
        },
        requestInterceptor: (config, { store }) => {
          if (store.state.auth.token) {
            config.headers.common.authorization = `Token ${store.state.auth
              .token}`;
          }
          return config;
        },
        responseInterceptor: (response, ctx) => {
          // global.console.log(ctx);
          return response;
        }
      }
    ]
  ],
  env: {
    API_URL: process.env.API_URL || 'http://localhost:8000/api/v1',
    API_URL_BROWSER:
      process.env.API_URL_BROWSER || 'http://localhost:8000/api/v1',
    WS_URL: process.env.WS_URL || 'localhost:8000'
  },
  /*
  ** Router configuration
  */
  router: {
    // base: '/',
    mode: 'history',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior: require('./utils/vue-router/scrollBehavior'),
    // Run the middleware/user-agent.js on every pages
    middleware: ['user-agent']
    //   extendRoutes(routes, resolve) {
    //     routes.push({
    //       name: 'custom',
    //       path: '*',
    //       component: resolve(__dirname, 'pages/wizard.vue')
    //     });
    //   }
  },
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter: require('./utils/transition/beforeEnter')
  },
  // transition (to, from) {
  //   if (!from) return 'slide-left'
  //   return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  // }
  render: {
    bundleRenderer: {
      cache: require('lru-cache')({
        max: 1000,
        maxAge: 1000 * 60 * 15
      })
    }
  }
};
