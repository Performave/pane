const path = require('path')

module.exports = {
  webpack: (config) => {
    config['resolve']['alias'] = {
      '@': path.resolve(__dirname, 'src'),
    }
    config['output'] = {
      ...config['output'],
      filename: 'static/js/[name].js',
      chunkFilename: 'static/js/[name].chunk.js',
    }

    if (process.env.NODE_ENV !== 'development') {
      config['plugins'].shift() // remove htmlwebpack plugin

      config.plugins.map((plugin, i) => {
        if (
          plugin.options &&
          plugin.options.filename &&
          plugin.options.filename.includes('static/css')
        ) {
          config.plugins[i].options = {
            ...config.plugins[i].options,
            filename: 'static/css/main.css',
            chunkFilename: 'static/css/main.css',
          }
        }
      })
    }

    return config
  },
  paths: function (paths, env) {
    // ...add your paths config
    paths.appBuild = path.resolve(__dirname, '../backend/public/')
    return paths
  },
}
