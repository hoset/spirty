<!--日志 -> 等级日志-->
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
          <Table class="content-table" id="content-table"
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
    name: 'levelLog',
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
        pageType: 8,                // 页面类型（决定表搜索框的样式）
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 查询权限按钮是否显示
        columnsSet: [               // 表头数据
          {
            title: '服务器ID',
            sortable: true,
            key: 'serverId'
          },
          {
            title: '渠道id',
            sortable: true,
            key: 'channelId'
          },
          {
            title: '渠道appID',
            sortable: true,
            key: 'channelAppId'
          },
          {
            title: '玩家id',
            sortable: true,
            key: 'pid'
          },
          {
            title: '玩家名字',
            sortable: true,
            key: 'pname'
          },
          {
            title: '玩家等级',
            sortable: true,
            key: 'plvl'
          },
          {
            title: '日期',
            sortable: true,
            key: 'logDate'
          },
          {
            title: '记录时间',
            sortable: true,
            key: 'censusDate'
          },
          {
            title: '更新时间',
            sortable: true,
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
        let _this = this
        // 请求数据
        this.apiList4._postj_(window.apiUrl.api_log_playerlvl, page, function (res) {
          console.log('error', res)
        }, function (res) {
          _this.loading2 = false
          // 时间戳转时间
          for (var i = 0; i < res.rows.length; i++) {
            res.rows[i].censusDate = window.timeChange(res.rows[i].censusDate).slice(0, 10)
            res.rows[i].createTime = window.timeChange(res.rows[i].createTime)
            res.rows[i].updateTime = window.timeChange(res.rows[i].updateTime)
          }
          _this.pageNum = res.total // 总共条数
          _this.listDatas = res.rows // 总数据
        }, false)
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
      timeChange (inputTime) {
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
        if (second === '00' && minute === '00' && h === '00') {
          return y + '-' + m + '-' + d
        }
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
      }
    },
    created () {
      // 初始化表格数据
      // this.getAddListData(this.initPages)
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

