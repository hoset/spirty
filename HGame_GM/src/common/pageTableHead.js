const pageTableHead = {
  // 行为页面
  columnsSet1: [
    {
      title: '服务器ID',
      key: 'serverId'
    },
    {
      title: '渠道id',
      key: 'channelId'
    },
    {
      title: '渠道appID',
      key: 'channelAppId'
    },
    {
      title: '游戏次数',
      key: 'loginNumber'
    },
    {
      title: '游戏时长',
      key: 'onlineTime'
    },
    {
      title: '记录时间',
      key: 'censusDate'
    },
    {
      title: '更新时间',
      key: 'updateTime'
    }
  ],
  // 新增页面
  columnsSet2: [
    {
      type: 'selection', // 开启checkbox
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '服务器ID',
      key: 'serverId'
    },
    {
      title: '渠道id',
      key: 'channelId'
    },
    {
      title: '渠道appID',
      key: 'channelAppId'
    },
    {
      title: '新增角色',
      key: 'who'
    },
    {
      title: '新增设备',
      key: 'type'
    },
    {
      title: '记录时间',
      key: 'censusDate'
    },
    {
      title: '更新时间',
      key: 'updateTime'
    }
  ],
  // 时段新增页面
  columnsSet3: [
    {
      type: 'selection', // 开启checkbox
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '服务器ID',
      key: 'serverId'
    },
    {
      title: '渠道id',
      key: 'channelId'
    },
    {
      title: '渠道appID',
      key: 'channelAppId'
    },
    {
      title: '新增角色',
      key: 'who'
    },
    {
      title: '新增设备',
      key: 'type'
    },
    {
      title: '时间槽',
      key: 'censusDate'
    },
    {
      title: '日期',
      key: 'updateTime'
    }
  ],
  // 活跃用户
  columnsSet4: [
    {
      title: '服务器ID',
      key: 'serverId'
    },
    {
      title: '渠道id',
      key: 'channelId'
    },
    {
      title: '渠道appID',
      key: 'channelAppId'
    },
    {
      title: '活跃角色数',
      key: 'who'
    },
    {
      title: '新增角色数',
      key: 'type'
    },
    {
      title: '新玩家占比',
      key: 'censusDate'
    },
    {
      title: '记录时间',
      key: 'censusDate'
    },
    {
      title: '更新时间',
      key: 'updateTime'
    }
  ],
  // 用户信息
  columnsSet5: [
    {
      type: 'selection', // 开启checkbox
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      title: '用户名',
      key: 'userName'
    },
    {
      title: '角色',
      key: 'roleName'
    },
    {
      title: '用户状态',
      key: 'status'
    },
    {
      title: '是否验证ip',
      key: 'validate'
    },
    {
      title: '绑定ip',
      key: 'ip'
    },
    {
      title: '创建时间',
      key: 'createTime'
    },
    {
      title: '上一次登陆时间',
      key: 'lastLogin'
    },
    {
      title: '上一次登陆ip',
      key: 'lastIp'
    }
  ],
  // 角色管理
  columnsSet6: [
    {
      type: 'selection', // 开启checkbox
      width: 60,
      align: 'center',
      fixed: 'left'
    },
    {
      title: 'id',
      key: 'id'
    },
    {
      title: '角色名',
      key: 'roleName'
    },
    {
      title: '描述',
      key: 'roleDescribe'
    }
  ]
}
export default {
  pageTableHead
}
