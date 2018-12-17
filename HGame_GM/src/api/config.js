// 接口配置
// 服务器接口根地址
import config from '../../config'
window.config = config
console.log(config)
// 服务器地址
// export const SERVER_BASE_URL = isProduction ? 'http://gank.io' : 'www.baidu.com'
// export const SERVER_BASE_URL = isProduction ? config.build.baseServerUrl : config.dev.baseServerUrl
// 接口地址切换
export const SERVER_BASE_URL = config.dev.baseServerUrl
// export const SERVER_BASE_URL = 'http://gank.io/api'
// global.SERVER_BASE_URL='http://localhost:9999/fwone-central'
export const ERR_OK = 0

