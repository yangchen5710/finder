/** 
 * 生产： prod
 * 测试： test
 * 开发： dev
 */
const CONFIG = {
  env: wx.getStorageSync('env') || 'test'
}

export const BASE_URL = (() => {
  let url = {
    prod: 'https://goatup.cn/api/v1/server/',
    test: 'https://test-mellower-app.powercoffee.cn/api/v1/',
    dev: `https://dev-mellower-app.goatup.net/api/v1/`
  }
  return url[CONFIG.env]
})()

wx.setStorageSync('config', {
  env: CONFIG.env,
  baseUrl: {
    prod: 'https://goatup.cn/',
    test: 'https://test-mellower-app.powercoffee.cn/',
    dev: `https://dev-mellower-app.goatup.net/`,

  }
});

const model = (name = '', data = {}, method = 'GET', header, ip) => {
  let url = `${BASE_URL}${name}`
  if (ip) {
    url = `http://wx.web.haokaixin.xyz/api/${CONFIG.version}/${name}`
  }
  let _token = false;
  if (wx.getStorageSync('token')) {
    _token = wx.getStorageSync('token');
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: header || {
        'content-type': 'application/x-www-form-urlencoded',
        // 'Accept': 'application/json',
        'Authorization': _token ? `${_token}` : '',
        'X-Requested-With': 'XMLHttpRequest',
        'source': 'mellower'
      },
      success(res) {
        const { statusCode, errMsg, data } = res
        if (statusCode === 200 && data.code === 'suc') {
          resolve(data)
        } else {
          console.log(`[interface]: ${name}\n` + errMsg)
          console.log(`[interface]: ${name}\n` + data.msg)
          reject(data.msg, data.code)
        }
      },
      fail(err) {
        console.log(err);
        reject(err)
      }
    })
  })
}
export default model