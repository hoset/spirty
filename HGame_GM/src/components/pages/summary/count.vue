<!--概述 -> 总览-->
<template>
  <div class="list-lb">
    <Row>
      <Col>
        <Card>
          <!--表格头部搜索功能-->
          <tableTopSearch v-if="leftIsShowButton_r"
            :id="pageType" :searchData="searchData"
            @on-click-watch-show="onClickWatchShow"
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
    name: 'count',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        a1_2_3: {},                 // 接收子组件的值
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
        pageType: 0,                // 页面类型（决定表搜索框的样式）
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
            title: '累积充值金额',
            sortable: true,
            key: 'allRecharge'
          },
          {
            title: '当日充值金额',
            sortable: true,
            key: 'todayRecharge'
          },
          {
            title: '当日新增人数',
            sortable: true,
            key: 'newCreateRole'
          },
          {
            title: '当日活跃人数',
            sortable: true,
            key: 'activityRole'
          },
          {
            title: '当日充值人数',
            sortable: true,
            key: 'rechargeRole'
          },
          {
            title: 'darpu',
            sortable: true,
            key: 'arpu'
          },
          {
            title: 'arppu',
            sortable: true,
            key: 'arppu'
          },
          {
            title: '活跃付费率',
            sortable: true,
            key: 'rechargeRate'
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
        var _this = this
        // 请求数据
        var res = _this.apiList3.api_logcount(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        // 时间戳转时间
        for (var i = 0; i < res.rows.length; i++) {
          res.rows[i].censusDate = window.timeChange(res.rows[i].censusDate)
          res.rows[i].createTime = window.timeChange(res.rows[i].createTime)
          res.rows[i].updateTime = window.timeChange(res.rows[i].updateTime)
          res.rows[i].arpu = (res.rows[i].todayRecharge / res.rows[i].activityRole).toFixed(2)
          res.rows[i].arppu = (res.rows[i].todayRecharge / res.rows[i].rechargeRole).toFixed(2)
          res.rows[i].rechargeRate = this.toPercent(res.rows[i].rechargeRole / res.rows[i].activityRole)
        }
        _this.pageNum = res.total // 总共条数
        _this.listDatas = res.rows // 总数据
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
       * 小数转百分比
       */
      toPercent (point) {
        let str = Number(point * 100).toFixed(2)
        str += '%'
        return str
      },

      /**
       * 搜索框子组件传出事件
       */
      onClickWatchShow (a, b) {
        this.a1_2_3 = a
        if (a.a1) {
          this.columnsSet[0].key = ''
          this.columnsSet[0].className = 'hides'
        } else {
          this.columnsSet[0].key = 'serverId'
          this.columnsSet[0].className = ''
        }
        if (a.a2) {
          this.columnsSet[1].key = ''
          this.columnsSet[1].className = 'hides'
        } else {
          this.columnsSet[1].key = 'channelId'
          this.columnsSet[1].className = ''
        }
        if (a.a3) {
          this.columnsSet[2].key = ''
          this.columnsSet[2].className = 'hides'
        } else {
          this.columnsSet[2].key = 'channelAppId'
          this.columnsSet[2].className = ''
        }
        let cp = this.copy(this.initPages) // 对象拷贝
        let o = this.extend(cp, b) // 对象合并
        this.getAddListData(o) // 重新请求数据
        // 重置分页组件
        let _this = this
        this.limits = 10
        this.isShowPage = false
        setTimeout(function () {
          _this.isShowPage = true
        })
        // let len = Object.keys(b).length // 获取对象长度
        // let wh = $('#content-table .ivu-table-header table')[0].offsetWidth // 获取表头长度
        // let cout = this.columnsSet.length - (3 - (len === 0 ? 3 : len)) // 获取当前表头项个数
        // let coutWidth = wh / cout // 得到每个表头项的宽度
        // // for (let i = 0; i < this.columnsSet.length; i++) {
        // //   console.log($('#content-table .ivu-table-header table tr th')[i].getAttribute('class'))
        // //   // console.log(coutWidth)
        // //   this.columnsSet[i].width = coutWidth
        // //
        // console.log(coutWidth)
        // setTimeout(function () {
        //   let s = $("#content-table .ivu-table-header table tr th[class!='hides']")
        //   for (let i = 0; i < s.length; i++) {
        //     console.log(s[i])
        //     s[i].style.width = coutWidth + 'px'
        //   }
        // }, 1000)
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
      this.getAddListData(this.initPages)
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
  /*table change*/
  .hides{
    display: none;
  }
  #content-table .ivu-table-header {
    display: flex;
    align-items: center;
    table {
      display: flex;
      align-items: center;
      width: 100%;
      colgroup{
        display: none;
      }
    }
    thead{
      display: flex;
      align-items: center;
      width: 100%;
    }
    tr{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 30px;
      th{
        width: 100%;
        /*text-align: center;*/
      }
    }
  }
  #content-table .ivu-table-body {
    display: flex;
    align-items: center;
    table {
      display: flex;
      align-items: center;
      width: 100%;
      colgroup{
        display: none;
      }
    }
    tbody{
      width: 100%;
    }
    tr{
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      line-height: 40px;
      td{
        width: 100%;
        /*text-align: center;*/
      }
    }
  }
  /*table change end*/
</style>

