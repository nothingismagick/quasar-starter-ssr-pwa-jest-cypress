// Configuration for your app

module.exports = function (ctx) {
  return {
    preFetch: true,
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'feathers-auth',
      'vuelidate',
      'apollo'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons',
      'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      vueCompiler: true,
      gzip: true,
      analyze: true,
      // extractCSS: false,
      env: {
        API_BASE_URL: ctx.dev
          ? JSON.stringify('http://localhost:3030')
          : JSON.stringify('http://api.example.com')
      },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader'
        })
        cfg.module.rules.push({
          test: /\.(graphql|gql)$/,
          loader: 'graphql-tag/loader',
          exclude: /(node_modules)/
        })
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules|quasar)/,
          options: {
            cache: true,
            fix: true
          }
        })
      }
    },
    devServer: {
      https: false,
      port: 8001,
      open: true // opens browser window automatically
    },
    // framework: 'all' --- includes everything; for dev only!
    framework: {
      components: [
        'QLayout',
        'QLayoutHeader',
        'QLayoutDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QInput',
        'QCheckbox',
        'QList',
        'QListHeader',
        'QItem',
        'QItemMain',
        'QItemSide',
        'QScrollArea',
        'QNoSsr',
        'QFab',
        'QFabAction',
        'QSelect',
        'QField',
        'QTooltip',
        'QJumbotron',
        'QAlert'
      ],
      directives: [
        'Ripple'
      ],
      // Quasar plugins
      plugins: [
        'Notify',
        'Meta',
        'AddressbarColor'
      ],
      iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons',
      i18n: 'en-us' // Quasar language
    },
    // animations: 'all' --- includes all animations
    animations: ['fadeIn', 'fadeOut'],
    ssr: {
      pwa: {
        runtimeCaching: [
          {
            urlPattern: '/statics',
            handler: 'networkFirst'
          },
          {
            urlPattern: /\/dashboard\/.*/,
            handler: 'networkFirst'
          }
        ]
      }
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        name: 'Quasar SSR & PWA',
        // short_name: 'Quasar-PWA',
        description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: ''
      }
    }
  }
}
