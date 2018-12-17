import Vue from 'vue'
import iView from 'iview'
import axios from './axios.js'
var url = window.config.dev.baseServerUrl
Vue.use(iView)

// // 登录
// export function login (data) {
//   return fetch({
//     url: '',
//     method: 'post',
//     data
//   })
// }
// // 登出
// export function logout () {
//   return fetch({
//     url: '',
//     method: 'post'
//   })
// }
window.apiUrl = {
  api_findgamelog: '/game_boss_server/gamelogactioncontroller/findgamelog',
  api_updateuser: '/game_boss_server/systemusercontroller/updateuser',
  api_insertuser: '/game_boss_server/systemusercontroller/insertuser',
  api_login: '/game_boss_server/systemlogincontroller/login',
  api_deleteuser: '/game_boss_server/systemusercontroller/deleteuser',
  api_powermenu: '/game_boss_server/systemlogincontroller/powermenu',
  api_loaduser: '/game_boss_server/systemusercontroller/loaduser',
  api_loadrole: '/game_boss_server/systemrolecontroller/loadrole',
  api_deleterole: '/game_boss_server/systemrolecontroller/deleterole',
  api_insertrole: '/game_boss_server/systemrolecontroller/insertrole',
  api_updaterole: '/game_boss_server/systemrolecontroller/updaterole',
  api_loadonlyrole: '/game_boss_server/systemrolecontroller/loadonlyrole',
  api_loadmenu: '/game_boss_server/systemmenucontroller/loadmenu',
  api_condition: '/game_boss_server/systemselectcasecontroller/loadquerycase',// 服务器id，渠道id，渠道appID  下拉列表
  api_loadrolecase: '/game_boss_server/systemselectcasecontroller/loadrolecase',
  api_findactionlog: '/game_boss_schudler/gamelogactioncontroller/findactionlog', // 行为
  api_findnewcreatelog: '/game_boss_schudler/gamelognewcreatecontroller/findnewcreatelog', // 新增
  api_findactivitylog: '/game_boss_schudler/gamelogactivitycontroller/findactivitylog', // 活跃
  api_findkeeplog: '/game_boss_schudler/gamelogkeepcontroller/findkeeplog', // 留存
  api_findlevellog: '/game_boss_schudler/gameloglevelcontroller/findlevellog', // 普通等级
  api_findlevelviplog: '/game_boss_schudler/gameloglevelvipcontroller/findlevelviplog', // vip等级
  api_findlifevaluelog: '/game_boss_schudler/gameloglifevaluecontroller/findlifevaluelog', // 价值
  api_findrateofprogressfourteenlog: '/game_boss_schudler/gamelograteofprogressfourteencontroller/findrateofprogressfourteenlog', // 14日等级
  api_findrateofprogressheadlog: '/game_boss_schudler/gamelograteofprogressheadcontroller/findrateofprogressheadlog', // 首日等级
  api_findrateofprogresssevenlog: '/game_boss_schudler/gamelograteofprogresssevencontroller/findrateofprogresssevenlog', // 七日等级
  api_findrateofprogressstrandlog: '/game_boss_schudler/gamelograteofprogressstrandcontroller/findrateofprogressstrandlog', // 滞留
  api_findaccumulatelog: '/game_boss_schudler/gamelogaccumulatecontroller/findaccumulatelog', // 总览
  api_findcostlog: '/game_boss_schudler/gamelogcostcontroller/findcostlog', // 累计消费
  api_logcount: '/game_boss_schudler/gamelogcountcontroller/findcountlog', // 总览
  api_findlevelactivitylog: '/game_boss_schudler/gameloglevelcontroller/findactivitylevellog', // 活跃玩家等级
  api_findlevelvipactivitylog: '/game_boss_schudler/gameloglevelvipcontroller/findactivitylevelviplog', // 活跃vip玩家等级
  api_findacurrentlog: '/game_boss_schudler/gamelogcurrentcontroller/findacurrentlog', // 实时日志
  api_findpayanalysislog: '/game_boss_schudler/gamelogcontroller/findpayanalysislog', // 付费分析
  api_findarpuandarppulog: '/game_boss_schudler/gamelogarpuandarppucontroller/findarpuandarppulog', // arpu& arppu
  api_findrechargelog: '/game_boss_schudler/gamelogrechargecontroller/findrechargelog', // 充值
  api_recharge: '/game_boss_schudler/newsletter/recharge', // 充值
  api_conversion: '/game_boss_schudler/newsletter/conversion', // 付费转化率
  api_rechargefrequency: '/game_boss_schudler/newsletter/rechargefrequency', // 充值频率
  api_rechargesort: '/game_boss_schudler/newsletter/rechargesort', // 付费排行榜
  // 幸运轮
  api_spirityluckcontroller_loadall: '/game_platform_tempserver/spirityluckcontroller/loadall', // 幸运轮获取表格数据
  api_spirityluckcontroller_server: '/game_platform_tempserver/spirityluckcontroller/server', // 幸运轮查服务器列表
  api_spirityluckcontroller_addorupdate: '/game_platform_tempserver/spirityluckcontroller/addorupdate', // 幸运轮修改
  api_spirityluckcontroller_delete: '/game_platform_tempserver/spirityluckcontroller/delete', // 幸运轮删除
  api_spirityluckcontroller_openorclose: '/game_platform_tempserver/spirityluckcontroller/openorclose', // 幸运轮开启或者关闭
  api_spirityluckcontroller_reload: '/game_platform_tempserver/spirityluckcontroller/reload', // 幸运轮重载
  // 神秘精灵
  api_spiritymysticcontroller_loadall: '/game_platform_tempserver/spiritymysticcontroller/loadall', // 神秘精灵获取表格数
  api_spiritymysticcontroller_addorupdate: '/game_platform_tempserver/spiritymysticcontroller/addorupdate', // 神秘精灵修改
  api_spiritymysticcontroller_delete: '/game_platform_tempserver/spiritymysticcontroller/delete', // 神秘精灵删除
  api_spiritymysticcontroller_openorclose: '/game_platform_tempserver/spiritymysticcontroller/openorclose', // 神秘精灵开启或者关闭
  api_spiritymysticcontroller_reload: '/game_platform_tempserver/spiritymysticcontroller/reload', // 神秘精灵重载
  // 许愿池
  api_spiritywishcontroller_loadall: '/game_platform_tempserver/spiritywishcontroller/loadall', // 许愿池获取表格数据
  api_spiritywishcontroller_addorupdate: '/game_platform_tempserver/spiritywishcontroller/addorupdate', // 许愿池修改
  api_spiritywishcontroller_delete: '/game_platform_tempserver/spiritywishcontroller/delete', // 许愿池删除
  api_spiritywishcontroller_openorclose: '/game_platform_tempserver/spiritywishcontroller/openorclose', // 许愿池开启或者关闭
  api_spiritywishcontroller_reload: '/game_platform_tempserver/spiritywishcontroller/reload', // 许愿池重载
  // 限时精灵
  api_spiritydeadcontroller_loadall: '/game_platform_tempserver/spiritydeadcontroller/loadall', // 限时精灵获取表格数据
  api_spiritydeadcontroller_addorupdate: '/game_platform_tempserver/spiritydeadcontroller/addorupdate', // 限时精灵修改
  api_spiritydeadcontroller_delete: '/game_platform_tempserver/spiritydeadcontroller/delete', // 限时精灵删除
  api_spiritydeadcontroller_openorclose: '/game_platform_tempserver/spiritydeadcontroller/openorclose', // 限时精灵开启或者关闭
  api_spiritydeadcontroller_reload: '/game_platform_tempserver/spiritydeadcontroller/reload', // 限时精灵重载
  // 运营活动
  api_spiritygenneralcontroller_loadall: '/game_platform_tempserver/spiritygenneralcontroller/loadall', // 运营活动获取表格数据
  api_spiritygenneralcontroller_addorupdate: '/game_platform_tempserver/spiritygenneralcontroller/addorupdate', // 运营活动修改
  api_spiritygenneralcontroller_delete: '/game_platform_tempserver/spiritygenneralcontroller/delete', // 运营活动删除
  api_spiritygenneralcontroller_openorclose: '/game_platform_tempserver/spiritygenneralcontroller/openorclose', // 运营活动开启或者关闭
  api_spiritygenneralcontroller_reload: '/game_platform_tempserver/spiritygenneralcontroller/reload', // 运营活动重载
  api_spiritygenneralcontroller_template: '/game_platform_tempserver/spiritygenneralcontroller/template', // 运营活动模板
  // 限时运营活动
  api_addactivity: '/game_platform_tempserver/spiritylimitactivitycontroller/addactivity', // 添加
  api_updateactivitybyid: '/game_platform_tempserver/spiritylimitactivitycontroller/updateactivitybyid', // 修改
  api_selectallactivity: '/game_platform_tempserver/spiritylimitactivitycontroller/selectallactivity', // 查询
  api_delectactivitybyid: '/game_platform_tempserver/spiritylimitactivitycontroller/delectactivitybyid', // 删除
  // 日志
  api_log_playerlogin: '/game_boss_schudler/newsletter/playerloginlogcontroller/loadall', // 登陆日志
  api_log_playerlvl: '/game_boss_schudler/newsletter/playerlvllogcontroller/loadall', // 等级日志
  api_log_playerrecharge: '/game_boss_schudler/newsletter/playerrechargelogcontroller/loadall', // 充值日志
  api_log_playerviplvl: '/game_boss_schudler/newsletter/playerviplvllogcontroller/loadall', // vip等级日志
  api_log_itemlog: '/game_boss_schudler/newsletter/itemlogcontroller/loadall', // 道具日志
  // 战力排行
  api_spiritypowerranking: '/game_platform_tempserver/spiritypowerrankingcontroller/loadall', // 战力排行
  // 自定义商品
  api_custompackageservicecontroller_loadall: '/game_platform_tempserver/custompackageservicecontroller/loadall', // 自定义商品获取表格数据
  api_custompackageservicecontroller_addorupdate: '/game_platform_tempserver/custompackageservicecontroller/addorupdate', // 自定义商品修改
  api_custompackageservicecontroller_delete: '/game_platform_tempserver/custompackageservicecontroller/delete', // 自定义商品删除
  api_custompackageservicecontroller_reload: '/game_platform_tempserver/custompackageservicecontroller/reload', // 自定义商品重载
  // 开关
  api_spirityfunctionswitchcontroller_loadall: '/game_platform_tempserver/spirityfunctionswitchcontroller/loadall', // 开关获取表格数据
  api_spirityfunctionswitchcontroller_update: '/game_platform_tempserver/spirityfunctionswitchcontroller/update', // 开关修改
  api_spirityfunctionswitchcontroller_dogmaction: '/game_platform_tempserver/spirityfunctionswitchcontroller/dogmaction', // 开关重载
  // 虚拟充值
  api_spirityrechargecontroller_addrecharge: '/game_platform_tempserver/spirityrechargecontroller/addrecharge', // 虚拟充值
  api_resetdoublediamond: '/game_platform_tempserver/spirityrechargecontroller/resetdoublediamond', // 重置
  api_getlastresetdoublediamondtime: '/game_platform_tempserver/spirityrechargecontroller/getlastresetdoublediamondtime', // 时间
  // 账号查询
  api_spirityaccountcontroller_loadall: '/game_platform_tempserver/spirityaccountcontroller/loadall', // 账号查询
  // 玩家封禁
  api_spiritygameinterceptcontroller_loadall: '/game_platform_tempserver/spiritygameinterceptcontroller/loadall', // 玩家封禁获取表格数据
  api_spiritygameinterceptcontroller_intercept: '/game_platform_tempserver/spiritygameinterceptcontroller/intercept', // 玩家封禁添加
  api_spiritygameinterceptcontroller_remove: '/game_platform_tempserver/spiritygameinterceptcontroller/remove', // 玩家封禁删除
  // 白名单查询
  api_spiritywhitelistcontroller_loadall: '/game_platform_tempserver/spiritywhitelistcontroller/loadall', // 白名单获取表格数据
  api_spiritywhitelistcontroller_addwhitelist: '/game_platform_tempserver/spiritywhitelistcontroller/addwhitelist', // 白名单添加
  api_spiritywhitelistcontroller_deletewhite: '/game_platform_tempserver/spiritywhitelistcontroller/deletewhite', // 白名单删除
  api_spiritywhitelistcontroller_isexistswhite: '/game_platform_tempserver/spiritywhitelistcontroller/isexistswhite', // 白名单判断
  // 邮件查询
  api_spiritymailcontroller_loadall: '/game_platform_tempserver/spiritymailcontroller/loadall', // 邮件获取表格数据
  api_spiritymailcontroller_send: '/game_platform_tempserver/spiritymailcontroller/send', // 邮件添加
  api_spiritymailcontroller_querymailrecord: '/game_platform_tempserver/spiritymailcontroller/querymailrecord', // 邮件
  api_spiritymailcontroller_loaditems: '/game_platform_tempserver/spiritymailcontroller/loaditems', // 邮件
  // 公告查询
  api_spiritynoticecontroller_sendmesg: '/game_platform_tempserver/spiritynoticecontroller/sendmesg', // 公告查询
  // 在线人数
  api_spirityonlinecontroller_loadall: '/game_platform_tempserver/spirityonlinecontroller/loadall', // 在线人数
  // 游戏服务器
  api_spirityservercontroller_loadall: '/game_platform_tempserver/spirityservercontroller/loadall', // 游戏服务器获取表格数据
  api_spirityservercontroller_update: '/game_platform_tempserver/spirityservercontroller/update', // 游戏服务器添加
  api_spirityservercontroller_save: '/game_platform_tempserver/spirityservercontroller/save', // 游戏服务器修改
  // 游戏服务器开关
  api_getallserverswitch: '/game_platform_tempserver/spirityservercontroller/getallserverswitch', // 游戏服务器开关获取表格数据
  api_updateserverswitch: '/game_platform_tempserver/spirityservercontroller/updateserverswitch', // 游戏服务器开关更新
  api_getAllExtraDrop:'/game_platform_tempserver/spiritextradropactivitycontroller/getAllExtraDrop',//额外掉落
  api_getRankingItem:'/game_boss_schudler/newsletterrechargerankingcontroller/ranking',//查询rank排行明细
  api_getRankingCount:'/game_boss_schudler/newsletterrechargerankingcontroller/position',//汇总rank排行
  api_reloadAll: '/game_platform_tempserver/spiritygenneralcontroller/reload',//重载全部运营活动

  api_getRankingLog:'/game_boss_schudler/newsletterrechargerankingcontroller/rechargeLog',//充值日志查询   /newsletter/itemlogcontroller
  api_getItemChangeLog:'/game_boss_schudler/newsletter/itemlogcontroller/itemchangelog',//道具变化日志
  api_ActionChangeLog:'/game_boss_schudler/newsletteractionchangecontroller/actionchangelog', // 动作变化日志

  api_ExtraDropActivity:'/game_platform_tempserver/spiritextradropactivitycontroller/getExtraDrop',// 查询额外掉落活动
  api_addOrUpdateExtraDropActivity:'/game_platform_tempserver/spiritextradropactivitycontroller/addOrUpdateExtraDrop', //新增或者修改额外掉落
  api_reloadExtraDropActivity:'/game_platform_tempserver/spiritextradropactivitycontroller/reloadactivity',//重载额外掉落活动

  api_LimittimeExchange:'/game_platform_tempserver/spiritlimitexchangecontroller/getlimittimeexchange',//查询限时兑换活动
  api_addOrUpdateLimittimeExchange:'/game_platform_tempserver/spiritlimitexchangecontroller/addorupdatelimittimeexchange', // 新增或者修改限时兑换
  api_reloadLimittimeExchange:'/game_platform_tempserver/spiritlimitexchangecontroller/reloadactivity',//重载限时兑换活动

  api_FlashSale:'/game_platform_tempserver/spiritflashsalecontroller/getflashsaleby',// 查询限时抢购
  api_addOrUpdateFlashSale:'/game_platform_tempserver/spiritflashsalecontroller/addorupdateflashsale', // 新增或者修改限时抢购
  api_reloadFlashSale:'/game_platform_tempserver/spiritflashsalecontroller/reloadactivity'//重载限时抢购活动



}

// const usersList = 'game_boss_server/systemusercontroller/loaduser'
const apiList3 = {
  api_spiritymailcontroller_loaditems () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymailcontroller_loaditems,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      beforeSend: function () {
        iView.Spin.show()
      },
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritymailcontroller_querymailrecord (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymailcontroller_querymailrecord,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_logcount (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_logcount,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findarpuandarppulog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findarpuandarppulog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      xhrFields: {
        withCredentials: true
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findrechargelog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findrechargelog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_recharge (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_recharge,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_conversion (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_conversion,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_rechargefrequency (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_rechargefrequency,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_rechargesort (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_rechargesort,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findpayanalysislog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findpayanalysislog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 游戏服务器开关 */
  api_getallserverswitch (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_getallserverswitch,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_updateserverswitch (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_updateserverswitch,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 游戏服务器开关end */
  /* 游戏服务器 */
  api_spirityservercontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityservercontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityservercontroller_update (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityservercontroller_update,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        data = res
        iView.Spin.hide()
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityservercontroller_save (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityservercontroller_save,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 游戏服务器end */
  /* 在线人数 */
  api_spirityonlinecontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityonlinecontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 在线人数end */
  /* 公告查询 */
  api_spiritynoticecontroller_sendmesg (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritynoticecontroller_sendmesg,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 公告查询end */
  /* 邮件查询 */
  api_spiritymailcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymailcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritymailcontroller_send (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymailcontroller_send,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 邮件查询 */
  /* 白名单 */
  api_spiritywhitelistcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywhitelistcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywhitelistcontroller_addwhitelist (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywhitelistcontroller_addwhitelist,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywhitelistcontroller_deletewhite (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywhitelistcontroller_deletewhite,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywhitelistcontroller_isexistswhite (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywhitelistcontroller_isexistswhite,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 白名单 */
  /* 玩家封禁 */
  api_spiritygameinterceptcontroller_remove (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygameinterceptcontroller_remove,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygameinterceptcontroller_intercept (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygameinterceptcontroller_intercept,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygameinterceptcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygameinterceptcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 玩家封禁end */
  /* 账号查询 */
  api_spirityaccountcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityaccountcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 账号查询end */
  /* 虚拟充值 */
  api_spirityrechargecontroller_addrecharge (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityrechargecontroller_addrecharge,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 虚拟充值end */
  /* 开关 */
  api_spirityfunctionswitchcontroller_dogmaction (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityfunctionswitchcontroller_dogmaction,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityfunctionswitchcontroller_update (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityfunctionswitchcontroller_update,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityfunctionswitchcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityfunctionswitchcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 开关end */
  /* 自定义商品 */
  api_custompackageservicecontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_custompackageservicecontroller_reload,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_custompackageservicecontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_custompackageservicecontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_custompackageservicecontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_custompackageservicecontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_custompackageservicecontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_custompackageservicecontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 自定义商品 */
  /* 运营活动 */
  api_spiritygenneralcontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_reload,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygenneralcontroller_openorclose (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_openorclose,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
         this.$Message.info('成功')
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
         this.$Message.info('失败')
      }
    })
    return data
  },
  api_spiritygenneralcontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygenneralcontroller_template (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_template,
      dataType: 'json',
      type: 'post',
      // contentType: 'application/json',
      async: false,
      data: params,
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygenneralcontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritygenneralcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritygenneralcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 运营活动end */
  /* 限时精灵 */
  api_spiritydeadcontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritydeadcontroller_reload,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritydeadcontroller_openorclose (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritydeadcontroller_openorclose,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritydeadcontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritydeadcontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritydeadcontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritydeadcontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritydeadcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritydeadcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 限时精灵end */
  /* 许愿池 */
  api_spiritywishcontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywishcontroller_reload,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywishcontroller_openorclose (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywishcontroller_openorclose,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywishcontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywishcontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywishcontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywishcontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritywishcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritywishcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 许愿池end */
  /* 神秘精灵 */
  api_spiritymysticcontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymysticcontroller_reload,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        console.log(res)
        iView.Spin.hide()
        data = false
      }
    })
    return data
  },
  api_spiritymysticcontroller_openorclose (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymysticcontroller_openorclose,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritymysticcontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymysticcontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritymysticcontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymysticcontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spiritymysticcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spiritymysticcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 神秘精灵end */
  /* 幸运轮 */
  api_spirityluckcontroller_reload (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_reload,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityluckcontroller_openorclose (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_openorclose,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityluckcontroller_delete (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_delete,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityluckcontroller_addorupdate (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_addorupdate,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityluckcontroller_server () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_server,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_spirityluckcontroller_loadall (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_spirityluckcontroller_loadall,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  /* 幸运轮end */
  api_login (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_login,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findacurrentlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findacurrentlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findlevelactivitylog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findlevelactivitylog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findlevelvipactivitylog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findlevelvipactivitylog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findcostlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findcostlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findaccumulatelog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findaccumulatelog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findrateofprogressfourteenlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findrateofprogressfourteenlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findrateofprogressheadlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findrateofprogressheadlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findrateofprogresssevenlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findrateofprogresssevenlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findrateofprogressstrandlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findrateofprogressstrandlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findlifevaluelog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findlifevaluelog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findlevellog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findlevellog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findlevelviplog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findlevelviplog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findkeeplog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findkeeplog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findactivitylog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findactivitylog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findnewcreatelog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findnewcreatelog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findactionlog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findactionlog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_insertrole (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_insertrole,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      data: JSON.stringify(params),
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_powermenu () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_powermenu,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_deleterole (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_deleterole,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_loadmenu () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_loadmenu,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_loadonlyrole (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_loadonlyrole,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      data: params,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_loadrolecase () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_loadrolecase,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_deleteuser (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_deleteuser,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: params,
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_insertuser (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_insertuser,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_updateuser (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_updateuser,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_loaduser (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_loaduser,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: params,
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_condition () {
    var data
    $.ajax({
      url: url + window.apiUrl.api_condition,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  api_findgamelog (params) {
    var data
    $.ajax({
      url: url + window.apiUrl.api_findgamelog,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: false,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(params),
      beforeSend: function () {
        iView.Spin.show()
      },
      success: function (res) {
        iView.Spin.hide()
        data = res
      },
      error: function (res) {
        iView.Spin.hide()
        console.log(res)
        data = false
      }
    })
    return data
  },
  apiAjax (apiurl, params, type, succCallback) {
    $.ajax({
      url: url + apiurl,
      dataType: 'json',
      type: type || 'get',
      contentType: 'application/json',
      xhrFields: {
        withCredentials: true
      },
      data: params,
      success: function (res) {
        succCallback(res)
      }
    })
  }
}

const apiList2 = {
  apiLists (url, type, params) {
    if (!url) {
      console.error('没有传入url')
      return
    }
    type = type || 'get'
    params = params || ''
    return axios({
      url: url,
      method: type,
      params: params
    })
  }
}

const apiList = {
  // 用户信息删除
  deleteuser (params) {
    return axios({
      url: '/game_boss_server/systemusercontroller/deleteuser',
      method: 'get',
      params: params
    })
  },
  // 用户信息修改
  usersUpdate (params) {
    return axios({
      url: 'game_boss_server/systemusercontroller/updateuser',
      method: 'post',
      params: params
    })
  },
  // 用户列表
  usersList (params) {
    return axios({
      url: 'game_boss_server/systemusercontroller/loaduser',
      method: 'get',
      params: params
    })
  },
  test (params) {
    return axios({
      url: 'game_boss_server/gamelogactioncontroller/findgamelog',
      method: 'post',
      params: params
    })
  },
  test2 (params) {
    return axios({
      url: 'game_boss_server/gamelogqueryconditioncontroller/condition',
      method: 'post',
      params: params
    })
  },
  orderList (params) {
    return axios({
      url: `/api/data/${params.category}/${params.limit}/${params.page}`,
      method: 'get',
      params: ''
    })
  },

  articleList (params) {
    return axios({
      url: `/api/search/query/listview/category/Android/count/${params.limit}/page/${params.page}`,
      method: 'get',
      params: ''
    })
  },

  userList (params) {
    return axios({
      url: '/api/person/getPersonListByCompany',
      method: 'get',
      params: params
    })
  },

  postUserInfo (params) {
    return axios({
      url: '',
      method: 'post',
      data: params
    })
  },

  checkToken (params) {
    return axios({
      url: '',
      method: 'get',
      params: params
    })
  }
}

const apiList4 = {
  _get_ (urlSet, params = {}, errorFn, successFn, loading = true, async = true) {
    
    $.ajax({
      url: url + urlSet,
      dataType: 'json',
      type: 'get',
      contentType: 'application/json',
      async: async,
      xhrFields: {
        withCredentials: true
      },
      data: params,
      beforeSend: function () {
        setTimeout(function () {
          loading ? iView.Spin.show() : ''
        }, 1)
      },
      success: function (res) {
        setTimeout(function () {
          iView.Spin.hide()
        }, 1)
        successFn(res)
      },
      error: function (res) {
        iView.Spin.hide()
        errorFn(res)
      }
    })
  },
  _post_ (urlSet, params = {}, errorFn, successFn, loading = true, async = true) {
    $.ajax({
      url: url + urlSet,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: async,
      xhrFields: {
        withCredentials: true
      },
      data: params,
      beforeSend: function () {
        setTimeout(function () {
          loading ? iView.Spin.show() : ''
        }, 1)
      },
      success: function (res) {
        setTimeout(function () {
          iView.Spin.hide()
        }, 1)
        successFn(res)
      },
      error: function (res) {
        iView.Spin.hide()
        errorFn(res)
      }
    })
  },
  _postj_ (urlSet, params = {}, errorFn, successFn, loading = true, async = true) {
    $.ajax({
      url: url + urlSet,
      dataType: 'json',
      type: 'post',
      contentType: 'application/json',
      async: async,
      xhrFields: {
        withCredentials: true
      },
      data: JSON.stringify(params),
      beforeSend: function () {
        setTimeout(function () {
          loading ? iView.Spin.show() : ''
        }, 1)
      },
      success: function (res) {
        setTimeout(function () {
          iView.Spin.hide()
          successFn(res)
        }, 1)
      },
      error: function (res) {
        iView.Spin.hide()
        errorFn(res)
      }
    })
  }
}

const install = function (Vue) {
  if (install.installed) return
  install.installed = true

  // 定义属性到Vue原型中
  Object.defineProperties(Vue.prototype, {
    apiList: {
      get () {
        return apiList
      }
    },
    apiList2: {
      get () {
        return apiList2
      }
    },
    apiList3: {
      get () {
        return apiList3
      }
    },
    apiList4: {
      get () {
        return apiList4
      }
    }
  })
}

export default {
  install
}
