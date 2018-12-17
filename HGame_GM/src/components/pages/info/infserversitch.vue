<!--信息 -> 游戏服务器开关-->
<template>
  <div class="list-lb">
    <Row>
      <Col>
        <Card>
          <!--操作按钮-->
          <div slot="title">
            <Button type="success" @click="tableAddClick()" v-if="leftIsShowButton_c">
              添加
            </Button>
          </div>

          <!--表格头部搜索功能-->
          <tableTopSearch v-if="leftIsShowButton_r"
            :id="pageType" :searchData="searchData"
            @on-click-search="onClickSearch"></tableTopSearch>

          <!--table-->
          <Table class="content-table"
                 :loading="loading2"
                 :show-header="showHeader"
                 :size="tableSize"
                 :data="listDataShow"
                 :columns="columnsSet"/>

          <!--分页-->
          <Page :total="pageNum" show-sizer show-elevator
                v-if="isShowPage"
                @on-change="pageChange"
                @on-page-size-change="PageSizeChange" id="page-click" />
        </Card>
      </Col>
    </Row>
    <!--开关提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>开关确认</span>
      </p>
      <div style="text-align:center">
        <p>是否执行该操作</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">确定</Button>
      </div>
    </Modal>
    <!--查看详情弹框-->
    <Modal v-model="isShowDetail" title="详情">
      <div class="outDetailDiv">
        <p class="inDetailP" v-for="(item, key, i) in rowDataVal">{{key}}：{{item}}</p>
      </div>
    </Modal>
  </div>
</template>
<script>
  import editTables from './../../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../../smallcpt/tableTopSearch'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'infserversitch',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        delr: {},                   // 当前行数据
        deleteTip: false,           // 是否弹出开关提示
        serverId: '',               // 输入的服务器id
        playerId: '',               // 输入的玩家id
        modeljfType: '',            // 输入的解封类型
        endTime: '',                // 输入的结束时间
        pushNum: null,
        a: 0,
        rowDataVal: {},             // 当前行的完整数据
        isShowDetail: false,        // 表格点击查看弹框是否显示
        initPages: {                // 初始化加载第几页
        },
        loading2: false,            // 加载loading
        pageNum: 0,                 // 表格内容条数
        addOrEdit: 0,               // 用于区分添加和编辑（添加：1；编辑：2）
        listDatas: [],              // 表格总数据
        listDataShow: [],           // 展示数据
        listDatasLength: 0,         // 当前得到的数据长度
        showHeader: true,           // 是否显示表头 @:show-header
        tableSize: 'small',         // @:size
        isShowPage: true,           // 是否显示分页条
        limits: 10,                 // 多少条每页
        setPageData: 0,             // 当前点击页数，应该请求对应的数据
        searchData: [],             // 表搜索数据
        pageType: 5,                // 页面类型（决定表搜索框的样式）
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 查询权限按钮是否显示
        leftIsShowButton_c: false,  // 添加权限按钮是否显示
        rightIsShowButton_u: false, // 编辑权限按钮是否显示
        rightIsShowButton_o: false, // 开关权限按钮是否显示
        editModal: false,           // 添加封禁弹框是否弹出
        remarkData: [               // 下拉框字段
          {
            id: 0,
            val: '无标示'
          },
          {
            id: 4,
            val: '推荐'
          },
          {
            id: 8,
            val: '火爆'
          }
        ],
        columnsSet: [               // 表头数据
          {
            sortable: true,
            title: '服务器id',
            key: 'serverId'
          },
          {
            sortable: true,
            title: '开关类型',
            key: 'switchType'
          },
          {
            sortable: true,
            title: '开关状态',
            key: 'open'
          },
          {
            sortable: true,
            title: '更新时间',
            key: 'updateTime'
          },
          {
            sortable: true,
            title: '开关名称',
            key: 'switchName'
          }
          // {
          //   title: '操作',
          //   key: 'action',
          //   width: 150,
          //   fixed: 'right',
          //   align: 'center',
          //   render: (h, params) => {
          //     return h('div', [
          //       h('Button', {
          //         props: {
          //           type: 'text',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px',
          //           color: '#5cadff'
          //         },
          //         on: {
          //           click: () => {
          //             this.show(params.index)
          //           }
          //         }
          //       }, '查看'),
          //       h('Button', {
          //         props: {
          //           type: 'text',
          //           size: 'small'
          //         },
          //         style: {
          //           marginRight: '5px',
          //           color: '#ff5035',
          //           display: this.rightIsShowButton_o ? 'inline-block' : 'none' // 权限操作
          //         },
          //         on: {
          //           click: () => {
          //             this.rightIsShowButton_o ? this.edit(params) : this.$Message.info('没有权限') // 权限操作
          //           }
          //         }
          //       }, '开/关')
          //     ])
          //   }
          // }
        ]
      }
    },
    /**
     * watch
     */
    watch: {
      'setPageData' (a) {
        this.a = a
      }
    },
    methods: {
      /**
       * 获取表数据
       */
      getAddListData (page) {
        var _this = this
        // 请求数据
        var res = _this.apiList3.api_getallserverswitch(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        this.setPageData = 1
        // 时间戳转时间
        for (var i = 0; i < res.length; i++) {
          res[i].open = res[i].open ? '开启' : '关闭'
          res[i].updateTime = window.timeChange(res[i].updateTime)
        }
        _this.pageNum = res.length // 总共条数
        _this.listDatas = res // 总数据
        _this.listDatasLength = res.length // 当前得到的数据长度
        _this.listDataShow = res.slice(0, 10) // 展示数据
      },

      /**
       * 页码改变后截取当页数据显示
       */
      pageChange (page) {
        var _this = this
        let getLimitPageR = this.listDatas.length // 一次获取的数据量长度
        let getLimitPage = this.listDatasLength // 当前得到的数据长度
        let countPage = Math.ceil(this.pageNum / this.limits) // 总页数
        let getPageNum = Math.ceil(getLimitPage / this.limits) // 一次请求分多少页显示
        let getPageNumR = Math.ceil(getLimitPageR / this.limits) // 一次请求分多少页显示(用于下面比较)
        // 一次请求对于当前分页的数量所占比例
        var pageToCount = getPageNum / countPage
        // 当前点击页数，应该请求对应的数据
        this.setPageData = Math.ceil((page / countPage - pageToCount) / pageToCount) + 1
        // 跨分页获取数据
        // this.pushNum: 如果一旦有值，则说明用户跨分页点击了
        if (page > getPageNumR) {
          if (this.setPageData - this.a > 1) {
            this.pushNum = getLimitPage * (this.setPageData - this.a - 1) // 需要push空字符串的量
            for (let i = 0; i < this.pushNum; i++) {
              this.listDatas.push('')
            }
          }
        }
        // 当前点击的页数大于当前页显示的数量（数据展示完了）
        if (page > getPageNumR) {
          this.loading2 = true
          // 请求数据
          var res = _this.apiList3.api_getallserverswitch({currentPage: _this.setPageData})
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
          }
          _this.listDatas = _this.listDatas.concat(res.rows) // 重新赋值新数据
          // _this.pageNum = res.total // 总共条数
        }
        // 截取展示
        _this.listDataShow = _this.listDatas.slice((page - 1) * _this.limits, (page - 1) * _this.limits + _this.limits)
      },

      /**
       * 切换每页条数后，重新展示
       */
      PageSizeChange (limit) {
        this.limits = limit
        this.listDataShow = this.listDatas.slice(0, limit)
      },

      /**
       * 开关弹框
       */
      edit (r) {
        this.deleteTip = true
        this.delr = r.row
      },

      /**
       * 开关功能
       */
      deleteBatch () {
        this.delr.open = this.delr.open === '开启' ? 'true' : 'false'
        this.delr.updateTime = new Date(this.delr).getTime()
        console.log(this.delr)
        let p = JSON.stringify(this.delr)
        let o = {
          json: p
        }
        var res = this.apiList3.api_updateserverswitch(o)
        this.deleteTip = false
        if (!res) {
          this.$Message.info('操作失败')
          return
        }
        this.getAddListData(this.initPages)
        this.$Message.info('操作成功')
      },

      /**
       * 获取服务器列表
       */
      getServerData () {
        var res = this.apiList3.api_spirityluckcontroller_server()
        if (!res) {
          return
        }
        this.searchData = res
      },

      /**
       * 点击查询
       */
      onClickSearch (res) {
        if (res.server === '') {
          this.$Message.info('请输入查询条件')
          return
        }
        this.getAddListData(res)
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
          // 查询按钮
          if (e.coordinate === 'left' && e.sn === 'r') {
            _this.leftIsShowButton_r = true
          }
          // 添加按钮
          if (e.coordinate === 'left' && e.sn === 'c') {
            _this.leftIsShowButton_c = true
          }
          // 编辑按钮
          if (e.coordinate === 'right' && e.sn === 'u') {
            _this.rightIsShowButton_u = true
          }
          // 开关按钮
          if (e.coordinate === 'right' && e.sn === 'o') {
            _this.rightIsShowButton_o = true
          }
        })
      },

      /**
       * 表格详情查看
       */
      show (index) {
        this.rowDataVal = this.listDataShow[index]
        this.isShowDetail = true
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
      // 初始化表数据
      this.getAddListData(this.initPages)
      // 初始化表搜索数据
      this.getServerData()
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
  .outDetailDiv{
    display: flex;
    flex-flow: row wrap;
    text-align: center;
    .inDetailP{
      width: 50%;
      padding: 5px;
      text-align: left;
    }
  }
  #formId{
    overflow: auto;
    height: 450px;
    padding: 10px;
  }
</style>

