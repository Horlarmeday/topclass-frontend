/*=========================================================================================
  File Name: vue.config.js
  Description: configuration file of vue
==========================================================================================*/


module.exports = {
  publicPath: '/',
  transpileDependencies: [
    'vue-echarts',
    'resize-detector'
  ],
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:6690',
        changeOrigin: true,
        secure: false
      },
      // '/': {
      //   target: 'http://localhost:4050',
      //   changeOrigin: true,
      //   secure: false,
      //   ws: true
      // }
    }
  },
}

