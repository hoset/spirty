<!--平台管理 -> 角色-->
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
            <Button type="error" v-if="leftIsShowButton_d">
              批量删除
            </Button>
          </div>

          <!--表格头部搜索功能-->
          <tableTopSearch v-if="leftIsShowButton_r"
            @on-click-search="onClickSearch"
            :id="pageType"></tableTopSearch>

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

    <!--编辑-->
    <Modal v-model="editModalRole" title="Title">
      <div class="parinput">
        <div class="sels-div2">
          <span class="sel-fwqtext2">id：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." clearable :value="tableRowData.id" style="width: 200px"></Input>
          </span>
        </div>
        <div class="sels-div2">
          <span class="sel-fwqtext2">角色名：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." clearable :value="tableRowData.roleName" style="width: 200px"></Input>
          </span>
        </div>
        <div class="sels-div2">
          <span class="sel-fwqtext2">描述：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." clearable :value="tableRowData.roleDescribe" style="width: 200px"></Input>
          </span>
        </div>
      </div>
      <div class="treeParent">
        <div class="treeLeft">
          <Tree show-checkbox :data="treeDataL"></Tree>
        </div>
        <div class="treeRight">
          <Tree show-checkbox :data="treeDataR"></Tree>
        </div>
      </div>
    </Modal>

    <!--添加-->
    <Modal v-model="addModalRole" @on-ok="addClickOk" title="Title">
      <div class="parinput">
        <div class="sels-div2">
          <span class="sel-fwqtext2">id：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." v-model="addIdVal" clearable style="width: 200px"></Input>
          </span>
        </div>
        <div class="sels-div2">
          <span class="sel-fwqtext2">角色名：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." v-model="addRoleVal" clearable style="width: 200px"></Input>
          </span>
        </div>
        <div class="sels-div2">
          <span class="sel-fwqtext2">描述：</span>
          <span class="sel-fwqid2">
            <Input placeholder="Enter something..." v-model="addDesVal" clearable style="width: 200px"></Input>
          </span>
        </div>
      </div>
      <div class="treeParent">
        <div class="treeLeft">
          <Tree show-checkbox :data="treeDataNone"></Tree>
        </div>
        <div class="treeRight">
          <Tree show-checkbox :data="treeDataR" @on-check-change="onCheckChange"></Tree>
        </div>
      </div>
    </Modal>

    <!--查看权限菜单树-->
    <Modal v-model="lookModalRole" title="Title">
      <Tree show-checkbox :data="showTreeDataNow"></Tree>
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

  </div>
</template>
<script>
  import editTables from './../../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../../smallcpt/tableTopSearch'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'role',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        showTreeDataNow: [],        // 查看当前用户所拥有的权限菜单树
        lookModalRole: false,       // 查看弹框是否弹出
        addDesVal: '',              // 添加描述值
        addRoleVal: '',             // 添加角色值
        addIdVal: '',               // 添加id值
        delUserId: 0,               // 行用户id（用于删除）
        deleteTip: false,           // 是否显示删除弹框
        treeDataNone: [],           // 空的权限菜单树
        treeDataR: [],              // 所有权限菜单
        treeDataL: [],              // 当前拥有的权限菜单
        treeOutChooseData: [],
        treeDataChoose_ref: [],
        tableRowData: {},           // 表格当前一行的数据
        editModalRole: false,       // 编辑弹框是否弹出
        addModalRole: false,        // 添加弹框是否弹出
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
        pageType: 1,                // 页面类型（决定表搜索框的样式）
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 左侧查询按钮是否显示
        leftIsShowButton_c: false,  // 左侧添加按钮是否显示
        leftIsShowButton_d: false,  // 左侧删除按钮是否显示
        rightIsShowButton_u: false, // 右侧修改按钮是否显示
        rightIsShowButton_d: false, // 右侧删除按钮是否显示
        columnsSet: [               // 表头数据
          {
            type: 'selection',      // 开启checkbox
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
    },
    methods: {
      /**
       * 获取表数据
       */
      getAddListData (page, nameVal = '') {
        var _this = this
        if (nameVal !== '') {
          this.initPages.roleName = nameVal // 如果传入userName,则根据userName查询
        } else {
          delete this.initPages.roleName // 如果不传入userName,则不需要该字段
        }
        // 请求数据
        var res = _this.apiList3.api_loadonlyrole(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        _this.pageNum = res.total // 总共条数
        _this.listDatas = res.rows // 总数据
        _this.listDataShow = res.rows.slice(0, 10) // 展示数据
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
          var res = _this.apiList3.api_loadonlyrole({a: _this.setPageData})
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
       * 获取所有菜单树
       */
      getTreeAll () {
        var res = this.apiList3.api_loadmenu()
        if (!res) {
          return
        }
        res.rows.forEach(function (e) {
          e.title = e.menuName
          e.children = e.childMenu
          e.expand = true
          if (e.childMenu.length > 0 && e.childMenu != null) {
            e.childMenu.forEach(function (e2) {
              e2.title = e2.menuName
              e2.children = e2.childMenu
              e2.expand = true
              if (e2.childMenu.length > 0 && e.childMenu != null) {
                e2.childMenu.forEach(function (e3) {
                  e3.title = e3.menuName
                  e3.children = e3.childMenu
                  e3.expand = true
                })
              }
            })
          }
        })
        this.treeDataR = res.rows
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
        this.getAddListData(this.initPages, res)
      },

      /**
       * 编辑弹框弹出
       */
      edit (params) {
        var _this = this
        this.editModalRole = true
        this.tableRowData = params.row // 当前行的数据
        window.MEMU.forEach(function (e) {
          e.title = e.menuName
          e.children = e.childMenu
          e.expand = true
          if (e.childMenu.length > 0 && e.childMenu != null) {
            e.childMenu.forEach(function (e2) {
              e2.title = e2.menuName
              e2.children = e2.childMenu
              e2.expand = true
              if (e2.childMenu.length > 0 && e.childMenu != null) {
                e2.childMenu.forEach(function (e3) {
                  e3.title = e3.menuName
                  e3.children = e3.childMenu
                  e3.expand = true
                })
              }
            })
          }
        })
        _this.treeDataL = window.MEMU
      },

      /**
       * 点击查看当前用户所拥有的权限菜单树
       */
      show (res) {
        this.lookModalRole = true
      },

      /**
       * 添加弹框弹出
       */
      tableAddClick () {
        this.addModalRole = true
      },

      /**
       * 删除弹框
       */
      remove (params) {
        this.deleteTip = true
        this.delUserId = params.row.id
      },

      /**
       * 删除操作
       */
      deleteBatch () {
        var res = this.apiList3.api_deleterole({id: this.delUserId})
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
       * 选择权限菜单树触发
       */
      onCheckChange (a) {
        console.log(a)
        var _this = this
        this.treeDataNone = []
        _this.treeOutChooseData = []
        this.treeDataR.forEach(function (e1) {
          var e1C = _this.copy(e1)
          // console.log(e1C)
          a.forEach(function (a1) {
            if (a1.parentId === e1C.id) {
              _this.treeOutChooseData.push(e1C)
              _this.treeDataChoose_ref.push(a1)
            }
          })
        })
        _this.treeDataNone = _this.unique4(_this.treeOutChooseData)
      },

      /**
       * 添加角色对话框确定按钮触发
       */
      addClickOk () {
        let o = {
          id: this.addIdVal,
          roleName: this.addRoleVal,
          roleDescribe: this.addDesVal,
          SystemRole: this.treeDataNone
        }
        var res = this.apiList3.api_insertrole(o)
        if (!res) {
          this.$Message.info('添加失败')
          return
        }
        this.$Message.info('添加成功')
        this.getAddListData(this.initPages)
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
       * 数组里面对象去重
       */
      unique4 (arr) {
        var hash = []
        for (var i = 0; i < arr.length; i++) {
          for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
              ++i
            }
          }
          hash.push(arr[i])
        }
        return hash
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
      this.getAddListData(this.initPages)
      // 初始化权限菜单树
      this.getTreeAll()
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
  .ivu-modal-body{
    .parinput{
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sels-div2{
        display: flex;
        justify-content: center;
        align-items: center;
        .ivu-input-wrapper{
          width: 120px !important;
        }
      }
    }
    .treeParent{
      text-align: center;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-top: 10px;
      border: 1px solid #eaeaea;
      .treeLeft, .treeRight{
        width: 50%;
        height: 100%;
      }
    }
  }
</style>

