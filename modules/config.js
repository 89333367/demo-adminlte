seajs.config({
    base: "./",
    alias: {
        "jquery": "plugins/jquery/jquery.min.js",
        "handlebars": "plugins/handlebars/handlebars.min.js",
        "sweetalert2": "modules/sweetalert2.js",
        "common": "modules/common.js",
        "urlhash": "modules/urlhash.js"
    },
    apiUrls: {
        BASE_URL: 'http://bcnytest.bcnyyun.com/dapr-service-iot-ota',
        USER_LOGIN: function () {
            //登入
            return this.BASE_URL + '/user/login';
        },
        USER_LOGOUT: function () {
            //登出
            return this.BASE_URL + '/user/logout';
        }
    }
});

console.log('seajs base', seajs.data.base, seajs.data.apiUrls);

