<!--平台管理 -> 用户-->
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
            :id="pageType"
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

      <!-- 编辑 -->
      <Modal v-model="editModal">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>编辑</span>
        </p>
        <div style="text-align:center">
          <Form :label-width="80">
            <Form-item label="用户名">
              <Input placeholder="请输入" v-model="tableRowData.userName"></Input>
            </Form-item>
            <Form-item label="角色">
              <Select :placeholder="tableRowData.roleName" filterable v-model="modelIdSel" id="select">
                <Option v-for="(item, i) in roleDataSel" :value="item.id" :key="item.id">{{ item.roleName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="密码">
              <Input placeholder="请输入" v-model="tableRowData.password"></Input>
            </Form-item>
            <Form-item label="用户状态" class="lable-left">
              <RadioGroup size="large" v-model="tableRowData.status">
                <Radio label="激活" :value="tableRowData.status == '激活' ? true : false"></Radio>
                <Radio label="未激活" :value="tableRowData.status == '激活' ? false : true"></Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="是否验证ip" class="lable-left">
              <RadioGroup size="large" v-model="tableRowData.validate">
                <Radio label="是" :value="tableRowData.validate == '是' ? true : false"></Radio>
                <Radio label="否" :value="tableRowData.validate == '是' ? false : true"></Radio>
              </RadioGroup>
            </Form-item>
            <Form-item label="绑定ip	">
              <Input placeholder="请输入" v-model="tableRowData.ip"/>
            </Form-item>
          </Form>
        </div>
        <div slot="footer">
          <Button type="success" @click="tableEditClick(tableRowData)" size="large" long >
            保存
          </Button>
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
    name: 'usersList',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        modelIdSel: '',             // 接收下拉框id
        roleDataSel: [],            // 角色下拉框数据
        delUserId: 0,               // 当前需要删除的用户id
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
        pageType: 1,                // 页面类型（决定表搜索框的样式）
        tableRowData: {},           // 表格当前一行的数据
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
      getAddListData (page, nameVal = '') {
        var _this = this
        if (nameVal !== '') {
          this.initPages.userName = nameVal // 如果传入userName,则根据userName查询
        } else {
          delete this.initPages.userName // 如果不传入userName,则不需要该字段
        }
        // 请求数据
        var res = _this.apiList3.api_loaduser(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        // 添加一个属性
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].createTime = window.timeChange(res.rows[i].createTime) // 时间戳转换
          res.rows[i].status = res.rows[i].status ? '激活' : '未激活'
          res.rows[i].validate = res.rows[i].validate ? '是' : '否'
          if (res.rows[i].role != null) {
            res.rows[i].roleName = res.rows[i].role.roleName
          }
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
          var res = _this.apiList3.api_loaduser({a: _this.setPageData})
          if (!res || res.hasOwnProperty('code')) {
            this.$Message.error(res.message)
            this.loading2 = false
            return
          }
          _this.loading2 = false
          // 添加一个属性
          for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].createTime = window.timeChange(res.rows[i].createTime) // 时间戳转换
            res.rows[i].status = res.rows[i].status ? '激活' : '未激活'
            res.rows[i].validate = res.rows[i].validate ? '是' : '否'
            if (res.rows[i].role != null) {
              res.rows[i].roleName = res.rows[i].role.roleName
            }
          }
          _this.listDatas = _this.listDatas.concat(res.rows) // 重新赋值新数据
          _this.pageNum = res.total // 总共条数
        }
        _this.listDataShow = _this.listDatas.slice((page - 1) * _this.limits, (page - 1) * _this.limits + _this.limits)
      },

      /**
       * 点击编辑弹框
       */
      edit (params) {
        this.addOrEdit = 2 // 标示编辑
        this.editModal = true
        this.tableRowData = params.row // 当前行的数据
      },

      /**
       * 点击编辑保存
       */
      tableEditClick (val) {
        // 编辑
        if (this.addOrEdit === 2) {
          val.role.id = this.modelIdSel // 传进下拉框id
          val.createTime = new Date(val.createTime).getTime()
          val.status = val.status === '激活' ? 'true' : 'false'
          val.validate = val.validate === '是' ? 'true' : 'false'
          var resE = this.apiList3.api_updateuser(val)
          if (resE) {
            this.$Message.info('保存成功')
          } else {
            this.$Message.info('保存失败')
          }
        }
        // 添加
        if (this.addOrEdit === 1) {
          val.role = {}
          val.role.id = this.modelIdSel // 传进下拉框id
          val.status = val.status === '激活' ? 'true' : 'false'
          val.validate = val.validate === '是' ? 'true' : 'false'
          var resA = this.apiList3.api_insertuser(val)
          if (resA) {
            this.$Message.info('添加成功')
          } else {
            this.$Message.info('添加失败')
          }
        }
        this.editModal = false
        this.getAddListData(this.initPages)
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
        this.getAddListData(this.initPages, res)
      },

      /**
       * 表格查看
       */
      show (index) {
        this.$Modal.info({
          title: '详情',
          content: `用户名：${this.listDataShow[index].userName}<br>
                    角色：${this.listDataShow[index].roleName}<br>
                    用户状态：${this.listDataShow[index].status}<br>
                    是否验证ip：${this.listDataShow[index].validate}<br>
                    绑定ip：${this.listDataShow[index].ip}<br>
                    创建时间：${this.listDataShow[index].createTime}<br>
                    上一次登陆时间：${this.listDataShow[index].lastLogin}<br>
                    上一次登陆ip：${this.listDataShow[index].lastIp}<br>`
        })
      },

      /**
       * 点击删除弹出
       */
      remove (params) {
        this.deleteTip = true
        this.delUserId = params.row.id
      },

      /**
       * 删除操作
       */
      deleteBatch () {
        var res = this.apiList3.api_deleteuser({id: this.delUserId})
        if (!res) {
          this.$Message.info('删除失败')
        } else {
          this.$Message.info('删除成功')
          this.getAddListData(this.initPages)
        }
        this.deleteTip = false
      },

      /**
       * 角色下拉框数据
       */
      roleData () {
        var res = this.apiList3.api_loadrolecase()
        if (!res) {
          return
        }
        this.roleDataSel = res
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
      // 初始化角色下拉框数据
      this.roleData()
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

