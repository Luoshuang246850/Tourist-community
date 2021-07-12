module.exports = {
    devServer: {
        proxy: {
            '/province': {
                target: 'http://47.112.151.152:2020',
                changeOrigin: true
            },
            '/captcha':{
                target: 'http://47.112.151.152:2020',
                changeOrigin: true
            },
            '/user':{
                target: 'http://47.112.151.152:2020',
                changeOrigin: true
            }
        }
    }
}