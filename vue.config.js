const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@pages': path.resolve(__dirname, 'src/pages')
      }
    }
  }
};
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave:false,
  //代理服务器配置
  devServer:{
    proxy:{
      '/api':{
        target:'http://gmall-h5-api.atguigu.cn',
        //路径重写
        //pathRewrite:{'^/api':''}
      }
    }
  }
})
