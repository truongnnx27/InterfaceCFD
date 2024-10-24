const path = require('path');
const { defineConfig } = require('@vue/cli-service');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  lintOnSave: false,
  publicPath: "/vue/",
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('swiper$', 'swiper/js/swiper.js')
      .set('@', path.resolve(__dirname, 'src'))  // Thêm alias cho thư mục src
      .end();
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.ico$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        },
      ],
    },
  },
});
