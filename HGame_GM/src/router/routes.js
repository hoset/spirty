import Home from '@/components/layout/Home'
import Index from '@/components/views/Index'

const Chart = () => import('@/components/views/Chart')
const NotFound = () => import('@/components/pages/NotFound')
const E404 = () => import('@/components/pages/E404')
const Icon = () => import('@/components/pages/Icon')
const Login = () => import('@/components/pages/Login')
const Table = () => import('@/components/views/Table')
const UserInfo = () => import('@/components/views/UserInfo')
// const List = () => import('@/components/views/List')
// const timeList = () => import('@/components/views/timeList')
const Filter = () => import('@/components/pages/Filter')
const Lock = () => import('@/components/layout/base/Lock')
const addList = () => import('@/components/pages/playerAnalyse/addList')
const activeList = () => import('@/components/pages/playerAnalyse/activeList')
const actionList = () => import('@/components/pages/playerAnalyse/actionList')
const usersList = () => import('@/components/pages/terraManage/usersList')
const role = () => import('@/components/pages/terraManage/role')
const keepList = () => import('@/components/pages/playerAnalyse/keepList')
const normalLevel = () => import('@/components/pages/playerAnalyse/normalLevel')
const vipLevel = () => import('@/components/pages/playerAnalyse/vipLevel')
const priceList = () => import('@/components/pages/playerAnalyse/priceList')
const levelA = () => import('@/components/pages/playerAnalyse/levelA')
const levelB = () => import('@/components/pages/playerAnalyse/levelB')
const levelC = () => import('@/components/pages/playerAnalyse/levelC')
const levelD = () => import('@/components/pages/playerAnalyse/levelD')
const pandect = () => import('@/components/pages/summary/pandect')
const priceLog = () => import('@/components/pages/summary/priceLog')
const count = () => import('@/components/pages/summary/count')
const activePlayerLevel = () => import('@/components/pages/playerAnalyse/activePlayerLevel')
const activePlayerLevelVip = () => import('@/components/pages/playerAnalyse/activePlayerLevelVip')
const atTimeLog = () => import('@/components/pages/summary/atTimeLog')
const luckyWheel = () => import('@/components/pages/activity/luckyWheel')
const mysterySpirit = () => import('@/components/pages/activity/mysterySpirit')
const vowPool = () => import('@/components/pages/activity/vowPool')
const timeSpirit = () => import('@/components/pages/activity/timeSpirit')
const runActivity = () => import('@/components/pages/activity/runActivity')
const customGoods = () => import('@/components/pages/activity/customGoods')
const activitySwitch = () => import('@/components/pages/activity/activitySwitch')
const fictitiousPrice = () => import('@/components/pages/activity/fictitiousPrice')
const infaccount = () => import('@/components/pages/info/infaccount')
const infuserbanned = () => import('@/components/pages/info/infuserbanned')
const infwhitelist = () => import('@/components/pages/info/infwhitelist')
const infemail = () => import('@/components/pages/info/infemail')
const infnotice = () => import('@/components/pages/info/infnotice')
const infonlineperson = () => import('@/components/pages/info/infonlineperson')
const infgameserver = () => import('@/components/pages/info/infgameserver')
const infserversitch = () => import('@/components/pages/info/infserversitch')
const payAnalysis = () => import('@/components/pages/playerAnalyse/payAnalysis')
const arpuAndarppu = () => import('@/components/pages/playerAnalyse/arpuAndarppu')
const rechargeList = () => import('@/components/pages/playerAnalyse/rechargeList')
const realData = () => import('@/components/pages/playerAnalyse/realData')
const realRecharge = () => import('@/components/pages/playerAnalyse/realRecharge')
const payconversionRate = () => import('@/components/pages/playerAnalyse/payconversionRate')
const rechargeRate = () => import('@/components/pages/playerAnalyse/rechargeRate')
const paySort = () => import('@/components/pages/playerAnalyse/paySort')
const timeRunActivity = () => import('@/components/pages/activity/timeRunActivity')
const loginLog = () => import('@/components/pages/log/loginLog')
const levelLog = () => import('@/components/pages/log/levelLog')
const priceLog2 = () => import('@/components/pages/log/priceLog2')
const vipLevelLog = () => import('@/components/pages/log/vipLevelLog')
const propLog = () => import('@/components/pages/log/propLog')
const zlRankings = () => import('@/components/pages/info/zlRankings')

const rechargeRanking = () => import('@/components/pages/rechargeRanking/rechargeRanking')
const RechargeLog = () => import('@/components/pages/rechargeRanking/RechargeLog')
const ItemChangeLog = () => import('@/components/pages/rechargeRanking/ItemChangeLog')
const ActionChangeLog = () => import('@/components/pages/rechargeRanking/ActionChangeLog')
const ExtraDropActivity = () => import('@/components/pages/rechargeRanking/ExtraDropActivity')
const LimittimeExchange = () => import('@/components/pages/rechargeRanking/LimittimeExchange')
const FlashSaleActivity = () => import('@/components/pages/rechargeRanking/FlashSaleActivity')

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: [{
        path: '/FlashSaleActivity',
        name: 'FlashSaleActivity',
        component: FlashSaleActivity,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },{
        path: '/LimittimeExchange',
        name: 'LimittimeExchange',
        component: LimittimeExchange,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },{
        path: '/ExtraDropActivity',
        name: 'ExtraDropActivity',
        component: ExtraDropActivity,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },{
        path: '/ActionChangeLog',
        name: 'ActionChangeLog',
        component: ActionChangeLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/ItemChangeLog',
        name: 'ItemChangeLog',
        component: ItemChangeLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/RechargeLog',
        name: 'RechargeLog',
        component: RechargeLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/rechargeRanking',
        name: 'rechargeRanking',
        component: rechargeRanking,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/zlRankings',
        name: 'zlRankings',
        component: zlRankings,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/propLog',
        name: 'propLog',
        component: propLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/vipLevelLog',
        name: 'vipLevelLog',
        component: vipLevelLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/levelLog',
        name: 'levelLog',
        component: levelLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/priceLog2',
        name: 'priceLog2',
        component: priceLog2,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/loginLog',
        name: 'loginLog',
        component: loginLog,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/timeRunActivity',
        name: 'timeRunActivity',
        component: timeRunActivity,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/index',
        name: 'index',
        component: Index,
        icon: 'icon-wujiaoxing',
        level: 1,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/chart',
        name: 'chart',
        component: Chart,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/addList',
        name: 'addList',
        component: addList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/activeList',
        name: 'activeList',
        component: activeList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/actionList',
        name: 'actionList',
        component: actionList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/keepList',
        name: 'keepList',
        component: keepList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/normalLevel',
        name: 'normalLevel',
        component: normalLevel,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/payAnalysis',
        name: 'payAnalysis',
        component: payAnalysis,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/arpuAndarppu',
        name: 'arpuAndarppu',
        component: arpuAndarppu,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/rechargeList',
        name: 'rechargeList',
        component: rechargeList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/realData',
        name: 'realData',
        component: realData,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/realRecharge',
        name: 'realRecharge',
        component: realRecharge,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/payconversionRate',
        name: 'payconversionRate',
        component: payconversionRate,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/rechargeRate',
        name: 'rechargeRate',
        component: rechargeRate,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/paySort',
        name: 'paySort',
        component: paySort,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/vipLevel',
        name: 'vipLevel',
        component: vipLevel,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/priceList',
        name: 'priceList',
        component: priceList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/levelA',
        name: 'levelA',
        component: levelA,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/levelB',
        name: 'levelB',
        component: levelB,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/levelC',
        name: 'levelC',
        component: levelC,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/levelD',
        name: 'levelD',
        component: levelD,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/pandect',
        name: 'pandect',
        component: pandect,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/priceLog',
        name: 'priceLog',
        component: priceLog,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/count',
        name: 'count',
        component: count,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/activePlayerLevel',
        name: 'activePlayerLevel',
        component: activePlayerLevel,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/activePlayerLevelVip',
        name: 'activePlayerLevelVip',
        component: activePlayerLevelVip,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/atTimeLog',
        name: 'atTimeLog',
        component: atTimeLog,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/luckyWheel',
        name: 'luckyWheel',
        component: luckyWheel,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/mysterySpirit',
        name: 'mysterySpirit',
        component: mysterySpirit,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/vowPool',
        name: 'vowPool',
        component: vowPool,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/timeSpirit',
        name: 'timeSpirit',
        component: timeSpirit,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/runActivity',
        name: 'runActivity',
        component: runActivity,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/customGoods',
        name: 'customGoods',
        component: customGoods,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/activitySwitch',
        name: 'activitySwitch',
        component: activitySwitch,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/fictitiousPrice',
        name: 'fictitiousPrice',
        component: fictitiousPrice,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infaccount',
        name: 'infaccount',
        component: infaccount,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infuserbanned',
        name: 'infuserbanned',
        component: infuserbanned,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infwhitelist',
        name: 'infwhitelist',
        component: infwhitelist,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infemail',
        name: 'infemail',
        component: infemail,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infnotice',
        name: 'infnotice',
        component: infnotice,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infonlineperson',
        name: 'infonlineperson',
        component: infonlineperson,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infgameserver',
        name: 'infgameserver',
        component: infgameserver,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/infserversitch',
        name: 'infserversitch',
        component: infserversitch,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/usersList',
        name: 'usersList',
        component: usersList,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/role',
        name: 'role',
        component: role,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: UserInfo,
        icon: 'icon-addpeople_fill',
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/table',
        name: 'table',
        component: Table,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/icon',
        name: 'icon',
        component: Icon,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/filter',
        name: 'filter',
        component: Filter,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      },
      {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
          requiresAuth: true // 是否需要登录
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/error404',
    name: 'error404',
    component: E404
  },
  {
    path: '/lock',
    name: 'lock',
    component: Lock
  },
  {
    path: '*',
    redirect: '/notFound'
  }

]

export default routes
