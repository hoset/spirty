<!--活动 -> 开关-->
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
            <Button type="warning" v-if="leftIsShowButton_o" @click="GMSwitch">
              GM开关
            </Button>
            <Button type="error" v-if="leftIsShowButton_d">
              批量删除
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

      <!--gm开关弹框-->
      <Modal v-model="gmEditModal" @on-ok="gmTableEditClick(serverId, gmplayId, gmcommand)">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>GM命令</span>
        </p>
        <div style="text-align:center">
          <Form :label-width="80">

            <Form-item label="服务器">
              <Select filterable v-model="serverId">
                <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
            </Form-item>
            <Form-item label="playId">
              <Input placeholder="请输入" v-model="gmplayId"></Input>
            </Form-item>
            <Form-item label="command">
              <Input placeholder="请输入" v-model="gmcommand"></Input>
            </Form-item>
          </Form>
        </div>
      </Modal>

      <!-- 编辑 -->
      <Modal v-model="editModal" @on-ok="tableEditClick(tableRowData ,serverId, switchType)">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div style="text-align:center">
          <Form :label-width="80">
            <Form-item label="服务器">
              <Select filterable v-model="serverId">
                <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
            </Form-item>
            <Form-item label="开关类型">
              <Input placeholder="请输入" v-model="tableRowData.id" readonly></Input>
              <!--<Select filterable v-model="tableRowData.id">-->
                <!--<Option v-for="item in GMSwitchType" :value="item.id" :key="item.id">{{item.val}}</Option>-->
              <!--</Select>-->
            </Form-item>
            <Form-item label="intValue">
              <Input placeholder="请输入" v-model="tableRowData.intVal"></Input>
              <div>GM命令开关/支付测试接口/客户端战斗验证:需填0(关闭)或者1(开启)</div>
            </Form-item>
            <Form-item label="strValue">
              <Input placeholder="请输入" v-model="tableRowData.strVal"></Input>
              <div>2类型为开服时间戳 23类型为英雄id</div>
            </Form-item>
          </Form>
        </div>
      </Modal>

      <!--删除提示  -->
      <Modal v-model="deleteTip" width="360">
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>删除确认</span>
        </p>
        <div style="text-align:center">
          <p>此操作将删除这条数据。</p>
          <p>是否继续删除？</p>
        </div>
        <div slot="footer">
          <Button type="error" size="large" long @click="deleteBatch">删除</Button>
        </div>
      </Modal>
    </Row>
  </div>
</template>
<script>
  import editTables from './../../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../../smallcpt/tableTopSearch'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'activitySwitch',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        gmcommand: '',              // gm的command
        gmplayId: '',               // gm的playid
        gmEditModal: false,         // gm弹框是否弹出
        switchType: 0,              // 开关类型
        serverId: 0,                // 服务器id
        select_res: {},             // 查询参数
        searchData: [],             // 搜索数据
        modelIdSel: '',             // 接收下拉框id
        delUserId: 0,               // 当前需要删除的id
        delServerName: '',          // 当前需要删除的服务器名字
        deleteTip: false,           // 是否弹出删除提示框
        addOrEdit: 0,               // 用于区分添加和编辑（添加：1；编辑：2）
        editModal: false,           // 编辑弹框是否弹出
        initPages: {                // 初始化加载第几页
          currentPage: 1
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
        pageType: 2,                // 页面类型（决定表搜索框的样式）
        tableRowData: {},           // 表格当前一行的数据
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 左侧查询按钮是否显示
        leftIsShowButton_c: false,  // 左侧添加按钮是否显示
        leftIsShowButton_d: false,  // 左侧删除按钮是否显示
        rightIsShowButton_u: false, // 右侧修改按钮是否显示
        rightIsShowButton_d: false, // 右侧删除按钮是否显示
        rightIsShowButton_o: false, // 右侧开启/关闭按钮是否显示
        leftIsShowButton_o: false,  // 左侧GM开关是否显示
        GMSwitchType: [             // gm开关类型
          {
            sortable: true,
            id: 3,
            val: 'GM命令'
          },
          {
            sortable: true,
            id: 12,
            val: '充值测试'
          },
          {
            sortable: true,
            id: 1,
            val: '10连抽卡池id'
          },
          {
            sortable: true,
            id: 23,
            val: '月签到英雄'
          },
          {
            sortable: true,
            id: 25,
            val: '客户端战斗验证'
          },
          {
            sortable: true,
            id: 26,
            val: '审核环境'
          },
          {
            sortable: true,
            id: 2,
            val: '开服时间'
          },
          {
            sortable: true,
            id: 253,
            val: '战力比拼结束时间'
          },
          {
            sortable: true,
            id: 254,
            val: '奖励下发'
          }
        ],
        columnsSet: [               // 表头数据
          {
            type: 'selection',      // 开启checkbox
            width: 60,
            align: 'center',
            fixed: 'left'
          },
          {
            title: '开关类型',
            key: 'id'
          },
          {
            title: '参数',
            key: 'intVal'
          },
          {
            title: 'strVal',
            key: 'strVal'
          },
          {
            title: '操作',
            key: 'action',
            width: 220,
            fixed: 'right',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#5cadff',
                    display: this.rightIsShowButton_u ? 'inline-block' : 'none' // 权限操作
                  },
                  on: {
                    click: () => {
                      this.rightIsShowButton_u ? this.edit(params) : this.$Message.info('没有权限') // 权限操作
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    color: '#ff3300',
                    display: this.rightIsShowButton_d ? 'inline-block' : 'none' // 权限操作
                  },
                  on: {
                    click: () => {
                      this.rightIsShowButton_d ? this.remove(params) : this.$Message.info('没有权限') // 权限操作
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    /**
     * watch
     */
    watch: {
      // 清除表单值
      'editModal' (val) {
        if (!val) {
          this.listDataShow = this.listDatas.slice(0, this.limits)
        }
      }
    },
    methods: {
      /**
       * 获取表数据
       */
      getAddListData (data) {
        var _this = this
        // 请求数据
        var res = _this.apiList3.api_spirityfunctionswitchcontroller_loadall(data)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        console.log(res)
        for (let i = 0; i < res.rows.length; i++) {
          if (res.rows[i].id === 1) {
            res.rows[i].id = '10连抽卡池id'
          } else if (res.rows[i].id === 2) {
            res.rows[i].id = '开服时间'
          } else if (res.rows[i].id === 26) {
            res.rows[i].id = '审核环境'
          } else if (res.rows[i].id === 3) {
            res.rows[i].id = 'GM命令'
          } else if (res.rows[i].id === 12) {
            res.rows[i].id = '充值测试'
          } else if (res.rows[i].id === 23) {
            res.rows[i].id = '月签到英雄'
          } else if (res.rows[i].id === 25) {
            res.rows[i].id = '客户端战斗验证'
          } else if (res.rows[i].id === 253) {
            res.rows[i].id = '战力比拼结束时间'
          } else if (res.rows[i].id === 254) {
            res.rows[i].id = '奖励下发'
          }
          if (res.rows[i].intVal === 0) {
            res.rows[i].intVal = '未开启'
          } else if (res.rows[i].intVal === 1) {
            res.rows[i].intVal = '开启'
          }
        }
        this.loading2 = false
        this.pageNum = res.total // 总共条数
        this.listDatas = res.rows // 总数据
        this.listDataShow = res.rows.slice(0, 10) // 展示数据
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
       * 页码改变后截取当页数据显示
       */
      pageChange (page) {
        var _this = this
        let getLimitPage = this.listDatas.length // 一次获取的数据量长度
        let countPage = Math.ceil(this.pageNum / this.limits) // 总页数
        let getPageNum = Math.ceil(getLimitPage / this.limits) // 一次请求分多少页显示
        // 一次请求对于当前分页的数量所占比例
        var pageToCount = getPageNum / countPage
        // 当前点击页数，应该请求对应的数据
        this.setPageData = Math.ceil((page / countPage - pageToCount) / pageToCount) + 1
        // 当前点击的页数大于当前页显示的数量（数据展示完了）
        if (page > getPageNum) {
          // 请求数据
          var res = _this.apiList3.api_spirityfunctionswitchcontroller_loadall({currentPage: _this.setPageData})
          if (!res || res.hasOwnProperty('code')) {
            this.$Message.error(res.message)
            this.loading2 = false
            return
          }
          _this.loading2 = false
          _this.listDatas = _this.listDatas.concat(res.rows) // 重新赋值新数据
          _this.pageNum = res.total // 总共条数
        }
        _this.listDataShow = _this.listDatas.slice((page - 1) * _this.limits, (page - 1) * _this.limits + _this.limits)
      },

      /**
       * 点击编辑弹框
       */
      edit (params) {
        let val = params.row
        if (val.id === '10连抽卡池id') {
          val.id = 1
        } else if (val.id === '开服时间') {
          val.id = 2
        } else if (val.id === '审核环境') {
          val.id = 26
        } else if (val.id === 'GM命令') {
          val.id = 3
        } else if (val.id === '充值测试') {
          val.id = 12
        } else if (val.id === '月签到英雄') {
          val.id = 23
        } else if (val.id === '客户端战斗验证') {
          val.id = 25
        } else if (val.id === '战力比拼结束时间') {
          val.id = 253
        } else if (val.id === '奖励下发') {
          val.id = 254
        }
        if (val.intVal === '未开启') {
          val.intVal = 0
        } else if (val.intVal === '开启') {
          val.intVal = 1
        }
        console.log(params)
        this.addOrEdit = 2 // 标示编辑
        this.editModal = true
        this.tableRowData = val // 当前行的数据
      },

      /**
       * 点击编辑保存
       */
      tableEditClick (val1, val2, val3) {
        val1.name = val2
        val1.ee = val3
        console.log(val1)
        // 编辑
        if (this.addOrEdit === 2) {
          var resE = this.apiList3.api_spirityfunctionswitchcontroller_update(val1)
          if (resE) {
            this.getAddListData(this.select_res)
            this.$Message.info('保存成功')
          } else {
            this.$Message.info('保存失败')
          }
        }
        // 添加
        // if (this.addOrEdit === 1) {
        //   var resA = this.apiList3.api_spirityfunctionswitchcontroller_update(val)
        //   if (resA) {
        //     this.$Message.info('添加成功')
        //   } else {
        //     this.$Message.info('添加失败')
        //   }
        // }
        this.editModal = false
      },

      /**
       * 点击添加弹框
       */
      tableAddClick () {
        this.addOrEdit = 1 // 标示添加
        this.editModal = true
        this.tableRowData = {}
      },

      /**
       * 切换每页条数后，重新展示
       */
      PageSizeChange (limit) {
        this.limits = limit
        this.listDataShow = this.listDatas.slice(0, limit)
      },

      /**
       * 点击查询
       */
      onClickSearch (res) {
        this.select_res = res
        this.getAddListData(res)
      },

      /**
       * 表格查看
       */
      show (index) {
        this.$Modal.info({
          title: '详情',
          content: `开关类型：${this.listDataShow[index].id}<br>
                    参数：${this.listDataShow[index].intVal}<br>`
        })
      },

      /**
       * GM开关
       */
      GMSwitch () {
        this.gmEditModal = true
      },

      gmTableEditClick (val1, val2, val3) {
        let o = {
          serverName: val1,
          playerId: val2,
          command: val3
        }
        var res = this.apiList3.api_spirityfunctionswitchcontroller_dogmaction(o)
        if (!res) {
          this.$Message.info('操作失败')
          return
        }
        this.$Message.info('操作成功')
      },

      /**
       * 点击删除弹出
       */
      remove (params) {
        this.deleteTip = true
        this.delUserId = params.row.id
        this.delServerName = params.row.serverName
      },

      /**
       * 删除操作
       */
      deleteBatch () {
        let o = {
          id: this.delUserId,
          name: this.delServerName
        }
        var res = this.apiList3.api_custompackageservicecontroller_delete(o)
        if (!res) {
          this.$Message.info('删除失败')
        } else {
          this.$Message.info('删除成功')
          this.getAddListData(this.initPages)
        }
        this.deleteTip = false
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
          // 左侧查询按钮
          if (e.coordinate === 'left' && e.sn === 'r') {
            _this.leftIsShowButton_r = true
          }
          // 左侧添加按钮
          if (e.coordinate === 'left' && e.sn === 'c') {
            _this.leftIsShowButton_c = true
          }
          // 左侧删除按钮
          if (e.coordinate === 'left' && e.sn === 'd') {
            _this.leftIsShowButton_d = true
          }
          // 左侧GM开关是否显示
          if (e.coordinate === 'left' && e.sn === 'o') {
            _this.leftIsShowButton_o = true
          }
          // 右侧开启/关闭按钮
          if (e.coordinate === 'right' && e.sn === 'o') {
            _this.rightIsShowButton_o = true
          }
          // 右侧修改按钮
          if (e.coordinate === 'right' && e.sn === 'u') {
            _this.rightIsShowButton_u = true
          }
          // 右侧删除按钮
          if (e.coordinate === 'right' && e.sn === 'd') {
            _this.rightIsShowButton_d = true
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
      // 初始化表格数据
      // this.getAddListData(this.initPages)
      // 初始化服务器列表
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
</style>

