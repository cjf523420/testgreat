module.exports = {
    configureWebpack: {
      devServer: {
        proxy: {
          '/api': {
                    target: 'http://61.177.38.142:83', //实际请求地址
                    changeOrigin: true,
                  }
                }
      }
    }
  };