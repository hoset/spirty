// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
import iView from 'iview'
Vue.use(iView)
import api from './api/index.js'
Vue.use(api)
import store from './store'
import Cookies from 'js-cookie'
import 'iview/dist/styles/iview.css' // 使用 CSS
import './assets/styles/layout/layout.less' // 引入布局样式
import './assets/styles/cover/cover.less' // 覆盖样式
import './assets/styles/base/base.less'
import * as filters from './common/filter'
import 'jquery'
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

var winWidth = document.documentElement.clientWidth
if (winWidth <= 600) {
  store.commit('CLOSE_SLIDEBAR')
} else {
  store.commit('OPEN_SLIDEBAR')
}
window.onresize = function () {
  winWidth = document.documentElement.clientWidth
  if (winWidth <= 600) {
    store.commit('CLOSE_SLIDEBAR')
  } else {
    store.commit('OPEN_SLIDEBAR')
  }
}

import zhLocale from 'iview/src/locale/lang/zh-CN'
import enLocale from 'iview/src/locale/lang/en-US'
import twLocale from 'iview/src/locale/lang/zh-TW'

let lang = Cookies.getJSON('lang')
if (lang && lang === 'CN') {
  Vue.config.lang = 'zh-CN'
  store.commit('SET_LANG', 'CN')
} else if (lang && lang === 'EN') {
  Vue.config.lang = 'zh-CN'
  store.commit('SET_LANG', 'CN')
  // store.commit('SET_LANG', 'EN')
  // Vue.config.lang = 'en-US'
} else {
  Vue.config.lang = 'zh-CN'
  store.commit('SET_LANG', 'CN')
  // Vue.config.lang = 'zh-TW'
  // store.commit('SET_LANG', 'TW')
}

Vue.locale('zh-CN', zhLocale)
Vue.locale('en-US', enLocale)
Vue.locale('zh-TW', twLocale)
// 开启debug模式
Vue.config.debug = true
// import $ from 'jquery'
Vue.config.productionTip = false

// 时间转换方法
window.timeChange = function (inputTime) {
  var date = new Date(inputTime)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  // if (second === '00' && minute === '00' && h === '00') {
  //   return y + '-' + m + '-' + d
  // }
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * 数组内根据对象删除
 */
window.removeObjWithArr = function (_arr, _obj) {
  let length = _arr.length
  for (let i = 0; i < length; i++) {
    if (_arr[i] === _obj) {
      if (i === 0) {
        _arr.shift() // 删除并返回数组的第一个元素
        return
      } else if (i === length - 1) {
        _arr.pop()  // 删除并返回数组的最后一个元素
        return
      } else {
        _arr.splice(i, 1) // 删除下标为i的元素
        return
      }
    }
  }
}

/**
 *删除数组指定下标或指定对象
 */
window.Array.prototype.remove = function (obj) {
  for (var i = 0; i < this.length; i++) {
    var temp = this[i]
    if (!isNaN(obj)) {
      temp = i
    }
    if (temp === obj) {
      for (var j = i; j < this.length; j++) {
        this[j] = this[j + 1]
      }
      this.length = this.length - 1
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
