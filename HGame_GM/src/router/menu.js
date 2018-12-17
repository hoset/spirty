
const menu = [
  {
    path: '/index',
    menuName: 'index',
    icon: 'icon-dynamic_fill',
    level: 1,
    // sort: 1,
    childMenu: [],
    fixed: false
  },
  {
    path: '/',
    menuName: '玩家分析',
    icon: 'icon-createtask_fill',
    level: 0,
    fixed: false,
    childMenu: [
      {
        path: '/chart',
        menuName: 'chart',
        icon: 'icon-dynamic_fill',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/list',
        menuName: '新增',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/timeList',
        menuName: '时段新增',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/activeList',
        menuName: '活跃用户',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/actionList',
        menuName: '行为',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/usersList',
        menuName: '用户信息',
        level: 1,
        childMenu: [],
        fixed: false
      },
      {
        path: '/userInfo',
        menuName: 'userInfo',
        icon: 'icon-addpeople_fill',
        childMenu: [],
        fixed: false,
        level: 1
      },
      {
        level: 1,
        path: '/userList',
        childMenu: [],
        fixed: false,
        menuName: 'userList'
      },
      {
        level: 1,
        path: '/table',
        menuName: 'table',
        childMenu: [],
        fixed: false,
        hidden: true
      },
      {
        level: 1,
        path: '/icon',
        menuName: 'icon',
        childMenu: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      },
      {
        level: 1,
        path: '/filter',
        menuName: 'filter',
        childMenu: [],
        fixed: false,
        icon: 'icon-emoji_fill'
      },
      {
        level: 1,
        path: '/',
        menuName: 'test',
        childMenu: [
          {
            level: 2,
            path: '/filter',
            name: 'filter',
            childMenu: [],
            fixed: false,
            icon: 'icon-emoji_fill'
          }
        ],
        icon: 'icon-emoji_fill'
      }
    ]
  },
  {
    path: '/',
    menuName: '页面',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    childMenu: [
      {
        level: 1,
        path: '/error404',
        childMenu: [],
        fixed: false,
        menuName: '404'
      },
      {
        level: 1,
        path: '/notfound',
        childMenu: [],
        fixed: false,
        menuName: 'Not found'
      },
      {
        level: 1,
        path: '/login',
        childMenu: [],
        fixed: false,
        menuName: '登录'
      },
      {
        level: 1,
        path: '/register',
        childMenu: [],
        fixed: false,
        menuName: '注册'
      }
    ]
  },
  {
    path: '/',
    menuName: '管理',
    level: 0,
    icon: 'icon-manage_fill',
    fixed: false,
    childMenu: [
      {
        level: 1,
        path: '/setMenu',
        childMenu: [],
        fixed: false,
        menuName: 'setMenu'
      },
      {
        level: 1,
        path: '/setMenu2',
        childMenu: [],
        fixed: false,
        menuName: 'setMenu2'
      },
      {
        level: 1,
        path: '/notFound',
        childMenu: [],
        fixed: false,
        menuName: 'notFound'
      }
    ]
  }
]

/*
const menu = [
  {
    id: null,
    icon: 'icon-createtask_fill',
    path: '/',
    menuName: '玩家分析',
    menuDescribe: null,
    level: 0,
    fixed: false,
    parent: null,
    childMenu: [
      {
        id: null,
        icon: 'icon-createtask_fill',
        path: '/list',
        menuName: '新增',
        menuDescribe: null,
        level: 1,
        fixed: false,
        parent: null,
        childMenu: [],
        resources: null
      },
      {
        id: null,
        icon: 'icon-createtask_fill',
        path: '/timeList',
        menuName: '时段新增',
        menuDescribe: null,
        level: 1,
        fixed: false,
        parent: null,
        childMenu: [],
        resources: null
      },
      {
        id: null,
        icon: 'icon-createtask_fill',
        path: '/activeList',
        menuName: '活跃用户',
        menuDescribe: null,
        level: 1,
        fixed: false,
        parent: null,
        childMenu: [],
        resources: null
      }
    ],
    resources: null
  },
  {
    id: null,
    icon: 'icon-createtask_fill',
    path: '/',
    menuName: '管理',
    menuDescribe: null,
    level: 0,
    fixed: false,
    parent: null,
    childMenu: [
      {
        id: null,
        icon: 'icon-createtask_fill',
        path: '/setMenu2',
        menuName: 'setMenu2',
        menuDescribe: null,
        level: 1,
        fixed: false,
        parent: null,
        childMenu: [],
        resources: null
      },
      {
        id: null,
        icon: 'icon-createtask_fill',
        path: '/',
        menuName: 'setMenu',
        menuDescribe: null,
        level: 1,
        fixed: false,
        parent: null,
        childMenu: [
          {
            id: null,
            icon: 'icon-createtask_fill',
            path: '/filter',
            menuName: 'filter',
            menuDescribe: null,
            level: 2,
            fixed: false,
            parent: null,
            childMenu: [],
            resources: null
          }
        ],
        resources: null
      }
    ],
    resources: null
  }
]
*/
export default menu
