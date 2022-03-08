import webpack from 'webpack';

export default {
  // target: 'static', // default is 'server'
  ssr: false,
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'base-code',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/style/main.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios.js',
    '@/plugins/utils.js',
    '@/plugins/constant.js',
    '@/plugins/antd',
    '@/plugins/v-mask',
    '@/plugins/filter',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-i18n',
      {
        lazy: true,
        locales: [
          { name: 'English', code: 'en', file: 'en.js' },
          { name: 'Japan', code: 'ja', file: 'ja.js' },
          { name: 'China', code: 'cn', file: 'cn.js' },
        ],
        defaultLocale: 'en',
        langDir: 'languages/',
        vueI18n: {
          fallbackLocale: 'en'
        }
      }
    ],
    '@nuxtjs/bootstrap-vue',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  // axios: {
  //   proxy: true
  // },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash'
      })
    ]
  },

  server: {
    port: 9000, // default: 3000
  },

  env: {
    baseURL: 'http://localhost:3000/',
  }
}
