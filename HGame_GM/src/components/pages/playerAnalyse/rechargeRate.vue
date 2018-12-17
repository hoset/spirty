<!--玩家分析 -> 充值频率-->
<template>
  <div class="list-lb">
    <Row>
      <Col>
        <Card>
          <!--表格头部搜索功能-->
          <tableTopSearch v-if="leftIsShowButton_r"
            :id="pageType" :searchData="searchData"
            @on-click-search="onClickSearch"></tableTopSearch>

          <!--table-->
          <Table class="content-table"
                 :loading="loading2"
                 :show-header="showHeader"
                 :size="tableSize"
                 :data="listDatas"
                 :columns="columnsSet"/>

          <!--分页-->
          <Page :total="pageNum" show-sizer show-elevator
                v-if="isShowPage"
                @on-change="pageChange"
                @on-page-size-change="PageSizeChange" id="page-click" />
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
  import editTables from './../../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../../smallcpt/tableTopSearch'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'rechargeRate',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        searchO: {},                // 当前搜索条件
        initPages: {                // 初始化加载第几页
          currentPage: 1,
          rows: 10
        },
        loading2: false,            // 加载loading
        pageNum: 0,                 // 表格内容条数
        listDatas: [],              // 表格总数据
        listDataShow: [],           // 展示数据
        showHeader: true,           // 是否显示表头 @:show-header
        tableSize: 'small',         // @:size
        isShowPage: true,           // 是否显示分页条
        limits: 10,                 // 多少条每页
        setPageData: 0,             // 当前点击页数，应该请求对应的数据
        searchData: [],             // 表搜索数据
        pageType: 7,                // 页面类型（决定表搜索框的样式）
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 查询权限按钮是否显示
        columnsSet: [               // 表头数据
          {
            sortable: true,
            title: '服务器ID',
            key: 'serverId'
          },
          {
            sortable: true,
            title: '渠道id',
            key: 'channelId'
          },
          {
            sortable: true,
            title: '渠道appID',
            key: 'channelAppId'
          },
          {
            sortable: true,
            title: '充值频率',
            key: 'rechargeNumber'
          },
          {
            sortable: true,
            title: '在充值频率下的充值人数',
            key: 'rechargeRoleInNumber'
          },
          {
            sortable: true,
            title: '总的充值人数',
            key: 'rechargeRole'
          },
          {
            sortable: true,
            title: '占比',
            key: 'proportion'
          },
          {
            sortable: true,
            title: '记录时间',
            key: 'censusDate'
          },
          {
            sortable: true,
            title: '更新时间',
            key: 'updateTime'
          }
        ]
      }
    },
    /**
     * watch
     */
    watch: {
    },
    methods: {
      /**
       * 获取表数据
       */
      getAddListData (page) {
        // 请求数据
        var res = this.apiList3.api_rechargefrequency(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        this.loading2 = false
        // 时间戳转时间
        for (var i = 0; i < res.rows.length; i++) {
          res.rows[i].censusDate = window.timeChange(res.rows[i].censusDate).slice(0, 10)
          res.rows[i].createTime = window.timeChange(res.rows[i].createTime)
          res.rows[i].updateTime = window.timeChange(res.rows[i].updateTime)
        }
        this.pageNum = res.total // 总共条数
        this.listDatas = res.rows // 总数据
      },

      /**
       * 页码改变后截取当页数据显示
       */
      pageChange (page) {
        let o = {
          currentPage: page,
          rows: this.limits
        }
        let cp = this.copy(o)
        let o1 = this.extend(cp, this.searchO)
        this.getAddListData(o1)
      },

      /**
       * 切换每页条数后，重新展示
       */
      PageSizeChange (limit) {
        this.limits = limit
        let o = {
          currentPage: 1,
          rows: limit
        }
        let cp = this.copy(o)
        let o1 = this.extend(cp, this.searchO)
        this.getAddListData(o1)
      },

      /**
       * 点击查询
       */
      onClickSearch (res) {
        let _this = this
        this.searchO = res
        let cp = this.copy(res) // 对象拷贝
        let o = this.extend(cp, this.initPages) // 对象合并
        this.getAddListData(o)
        // 重置分页组件
        this.limits = 10
        this.isShowPage = false
        setTimeout(function () {
          _this.isShowPage = true
        })
      },

      /**
       * 获取表搜索数据
       */
      getTableSearchData () {
        var res = this.apiList3.api_condition()
        this.searchData = res
      },

      /**
       * 对象合并
       */
      extend (target, source) {
        for (var obj in source) {
          target[obj] = source[obj]
        }
        return target
      },

      /**
       * 对象拷贝
       */
      copy (obj) {
        var newobj = {}
        for (var attr in obj) {
          newobj[attr] = obj[attr]
        }
        return newobj
      },

      /**
       * 权限按钮操作
       * 菜单按钮（this.resourcesButton）
       * 'c': 增加, 'r': 查询, 'u': 修改, 'd': 删除
       */
      powerButton () {
        var _this = this
        window.MEMU.forEach((e) => {
          if (e.path === '/' + this.$route.name && (e.resources.length !== 0 || e.resources != null)) {
            _this.resourcesButton = e.resources
          } else {
            if (e.childMenu.length !== 0 || e.childMenu != null) {
              e.childMenu.forEach((e1) => {
                if (e1.path === '/' + this.$route.name && (e1.resources.length !== 0 || e1.resources != null)) {
                  _this.resourcesButton = e1.resources
                } else {
                  if (e1.childMenu.length !== 0 || e1.childMenu != null) {
                    e1.childMenu.forEach((e2) => {
                      if (e2.path === '/' + this.$route.name && (e2.resources.length !== 0 || e2.resources != null)) {
                        _this.resourcesButton = e2.resources
                      }
                    })
                  }
                }
              })
            }
          }
        })
        this.resourcesButton.forEach((e) => {
          // 此页面目前只会在左侧存在查询按钮
          if (e.coordinate === 'left' && e.sn === 'r') {
            _this.leftIsShowButton_r = true
          }
        })
      },

      /**
       * js时间戳转换时间
       */
      timeChange (timestamp) {
        let date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-'
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        let D = date.getDate() + ' '
        let h = date.getHours() + ':'
        let m = date.getMinutes() + ':'
        let s = date.getSeconds()
        return Y + M + D + h + m + s
      }
    },
    created () {
      // 初始化表搜索数据
      this.getTableSearchData()
      // 初始化按钮
      this.powerButton()
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
    }
  }
</script>
<style lang="less">
  #page-click{
    margin-top: 20px;
  }
</style>

