/**
 * THIS FILE IS GENERATED AUTOMATICALLY.
 * DO NOT EDIT.
 **/

const
  fs = require('fs'),
  path = require('path'),
  LRU = require('lru-cache'),
  { createBundleRenderer } = require('vue-server-renderer')

const
  resolve = file => path.join(__dirname, file),
  template = fs.readFileSync(resolve('template.html'), 'utf-8'),
  bundle = require('./vue-ssr-server-bundle.json'),
  clientManifest = require('./vue-ssr-client-manifest.json')

const settings = {
  "pwa": {
    "runtimeCaching": [
      {
        "urlPattern": "/statics",
        "handler": "networkFirst"
      },
      {
        "urlPattern": {},
        "handler": "networkFirst"
      }
    ]
  },
  "componentCache": {
    "max": 1000,
    "maxAge": 900000
  },
  "debug": false
}

if (process.env.DEBUG) {
  settings.debug = true
}

const rendererOptions = {
  template,
  clientManifest,
  // for component caching
  cache: LRU(settings.componentCache),
  basedir: __dirname,
  // recommended for performance
  runInNewContext: false
}

// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
let renderer = createBundleRenderer(bundle, rendererOptions)

module.exports.renderToString = function ({ req, res }, cb) {
  const ctx = {
    url: req.url,
    req,
    res
  }

  renderer.renderToString(ctx, (err, html) => {
    if (err) { cb(err, html) }
    else { cb(err, ctx.$getMetaHTML(html)) }
  })

}

module.exports.resolveWWW = function (file) {
  return resolve('www/' + file)
}

module.exports.mergeRendererOptions = function (opts) {
  renderer = createBundleRenderer(
    bundle,
    Object.assign(rendererOptions, opts)
  )
}

module.exports.settings = settings
