<template>
  <div class="list-lb">
    <!-- 搜索 v-show="state.searchState.show"-->
    <Row class="search-filter" :class="{'active':searchState}">
      <Col>
      <Card>
        <Form :label-width="80" inline>
          <Form-item label="输入框">
            <Input v-model="formItem.input" placeholder="请输入" style="width:187px"></Input>
          </Form-item>
          <Form-item label="选择平台">
            <Select v-model="params.category" placeholder="请选择" style="width:187px">
              <Option value="Android">Android</Option>
              <Option value="iOS">iOS</Option>
              <Option value="休息视频">休息视频</Option>
              <Option value="福利">福利</Option>
              <Option value="拓展资源">拓展资源</Option>
              <Option value="前端">前端</Option>
              <Option value="App">App</Option>
            </Select>
          </Form-item>
          <div class="clearfix" style="border-top:1px solid #eee;margin-top:-15px;padding-top:10px">
          <span class="pull-right">
              <Button type="primary" icon="ios-search" shape="circle">查询</Button>
              <Button type="primary" icon="ios-close-empty" shape="circle">清楚条件</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle" @click="exportData(1)">导出原始数据</Button>
              <Button type="primary" icon="ios-download-outline" shape="circle"
                      @click="exportData(2)">导出排序和过滤后数据</Button>
            </span>

          </div>
        </Form>
      </Card>
      </Col>
    </Row>
    <!-- 搜索 /-->
    <Row>
      <Col>
        <Card>
          <div slot="title">
            <Icon type="ios-film-outline"></Icon>
            新增加
            <Button style="display: none;" type="dashed" @click.native="fixedHeader=!fixedHeader">
              <Icon type="pin"></Icon>
              固定表头
            </Button>
            <Button style="display: none" type="success" @click.native="edit(-1)">
              <Icon type="trash-a"></Icon>
              添加
            </Button>
            <Button style="display: none" type="primary" @click="searchShow" shape="circle" ><Icon type="funnel"></Icon> 筛选</Button>
            <Button type="error" :disabled="selection.length==0" @click="deleteTip=true">
              <Icon type="trash-a"></Icon>
              批量删除
            </Button>
          </div>

          <!--表格头部搜索功能-->
          <tableTopSearch
            :id="pageType" :searchData="searchData"
            @on-click-search="onClickSearch"></tableTopSearch>

          <!--刷新按钮-->
          <a href="#" slot="extra" @click.prevent="refresh">
            <Icon type="ios-loop-strong"></Icon>
          </a>
          <!--table-->
          <Table class="content-table"
                 :loading="loading2"
                 :show-header="showHeader"
                 :size="tableSize"
                 :width="tableWt"
                 :height="fixedHeader ? 300 : tableH"
                 :data="listDataShow"
                 :columns="columns1" ref="table"
                 @on-select="onSelect"
                 @on-selection-change="onSelectionChange" />
          <!--分页-->
          <Page :total="pageNum" show-sizer show-elevator
                v-if="isShowPage"
                @on-change="pageChange"
                style="margin-top: 10px"
                @on-page-size-change="PageSizeChange" />
        </Card>
      </Col>
    </Row>
    <!--删除提示  -->
    <Modal v-model="deleteTip" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="information-circled"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>此操作讲删除{{selection.length}}条数据,并不可恢复。</p>
        <p>是否继续删除？</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="deleteBatch">删除</Button>
      </div>
    </Modal>
    <!--删除提示 / -->
    <editTables :treeData="treeData"
                :treeDataL="treeDataL"
                :editModalRole="editModalRole"
                :pageInfoName="this.$route.name"
                :pageInfoType="pageInfoType"
                @on-click-modal="onClickModal"></editTables>
    <!-- 编辑 -->
    <Modal v-model="editModal" v-if='DateReady'>
      <p slot="header" style="text-align:center">
        <Icon type="information-circled"></Icon>
        <span>编辑</span>
      </p>
      <div style="text-align:center">
        <Form :model="formItem" :label-width="80">
          <Form-item label="用户名">
            <Input v-model="currDate.userName" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="角色">
            <Select v-model="currDate.roleName" filterable>
              <Option v-for="item in [{value: 'New York',label: 'New York'}]" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item label="密码">
            <Input v-model="currDate.password" placeholder="请输入"></Input>
          </Form-item>
          <Form-item label="用户状态" class="lable-left">
            <RadioGroup size="large" v-model="currDate.status">
              <Radio label="是" :value="currDate.status === '是' ? true : false"></Radio>
              <Radio label="否" :value="!currDate.status === '是' ? true : false"></Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="是否验证ip" class="lable-left">
            <RadioGroup size="large" v-model="currDate.validate">
              <Radio label="是" :value="currDate.validate === '是' ? true : false"></Radio>
              <Radio label="否" :value="!currDate.validate === '是' ? true : false"></Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="绑定ip	">
            <Input v-model="currDate.ip" placeholder="请输入" :disabled="currDate.validate === '是' ? false : true" />
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click.native="saveBatch(currDate,isAdd)" :loading="loading" :disabled="saveDisabled">
          保存
        </Button>
      </div>
    </Modal>
    <!-- 编辑/ -->
  </div>
</template>
<script>
  import editTables from './../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../smallcpt/tableTopSearch'
  import pageTableHead from './../../common/pageTableHead'
  var pageTableHeads = pageTableHead.pageTableHead
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'list',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        formItem: {
          input: '',
          select: '',
          date: '',
          time: '',
          radio: '',
          checkbox: []
        },
        pageInfoName: '',
        pageInfoType: 1, // 区分操作类型
        searchData: [], // 表搜索数据
        limits: 10, // 多少条每页
        pages: 1, // 当前第几页
        pageNum: 0, // 表格内容条数
        tableWt: '',
        isShowPage: true, // 是否显示分页条
        searchState: false,
        treeData: [], // 所有菜单树
        treeDataL: [], // 权限菜单树
        editModal: false,
        editModalRole: false,
        detailModal: false,
        deleteTip: false,
        setPageData: 0, // 当前点击页数，应该请求对应的数据
        isTableDataSet: false, // 表格数据是否请求
        showHeader: true, // 是否显示表头 @:show-header
        loading2: false, // 分页loading
        fixedHeader: false, // 是否固定表头 @:height
        tableSize: 'small', // @:size
        DateReady: false, // 判断异步数据加载完成，避免报错
        loading: false, // save
        currDate: {}, // 当前编辑和新增的行数据
        currIndex: 0, // 当前编辑和新增的行号
        isAdd: 0,
        pageType: 1,
        a: 1, // 数据页数
        tableH: '', // 表高度
        listDatas: [], // 表格总数据
        listDataShow: [], // 展示数据
        saveDisabled: false,
        params: {
          page: 1,
          limit: 10,
          category: 'Android'
        },
        initPages: {
          currentPage: 1
        },
        selection: [], // 表格选中项
        listData: [], // @:data
        columns1: [] // 渲染表头数据
      }
    },
    /**
     * watch
     */
    watch: {
      // 路由在同一个页面下获取不了参数，需要做监听
      '$route' (to, from) {
        let _this = this
        if (this.$route.name === 'usersList') {
          this.pageType = 1
        } else {
          this.pageType = 0
        }
        this.getDatas()
        this.isShowPage = false
        setTimeout(function () {
          _this.isShowPage = true
        })
      },
      'setPageData' () {
        this.isTableDataSet = true
      },
      fixedHeader: {
        handler (val) {
          if (val) {
            this.$Message.info('表头已固定')
          }
        }
      },
      currDate: {
        handler (val) {
          for (let i = 0; i < Object.values(val).length; i++) {
            if (Object.values(val)[i] === '') {
              this.saveDisabled = true
              return
            } else {
              this.saveDisabled = false
            }
          }
        },
        deep: true
      }
    },
    computed: {
      state () {
        return this.$store.state.app
      }
    },
    methods: {
      // 获取所有权限菜单树的数据
      changeMemuData () {
        var _this = this
        this.apiList3.apiAjax(window.apiUrl.api_loadmenu, '', 'get', function (res) {
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
          _this.treeData = res.rows
        })
      },
      launchPoint (boxSize, pageSize, total) {
        var p = []
        if (total <= boxSize) {
          return p
        }
        var pointNumber = Math.ceil(total / boxSize)

        for (var i = 1; i < pointNumber; i++) {
          var point = boxSize * i / pageSize
          p.push(point)
        }
        return p
      },
      // 弹框组件双向绑定
      onClickModal (res) {
        this.editModalRole = res
      },
      // 点击查询
      onClickSearch (res) {
        this.getDataAxios(res)
      },
      /**
       * 新增页
       */
      getDataAxios (data) {
        this.pageType = 0
        var _this = this
        // 获取搜索数据
        this.apiList.test2().then((res) => {
          this.searchData = res
        })
        // 获取表内容数据
        this.apiList3.apiAjax(window.apiUrl.api_findgamelog, JSON.stringify(data), 'post', function (res) {
          if (res.hasOwnProperty('code')) {
            this.$Message.error(res.message)
            this.loading2 = false
            return
          }
          _this.DateReady = true // 数据异步加载完成
          _this.loading2 = false
          // 时间戳转时间
          for (var i = 0; i < res.rows.length; i++) {
            res.rows[i].censusDate = _this.timeChange(res.rows[i].censusDate)
            res.rows[i].createTime = _this.timeChange(res.rows[i].createTime)
            res.rows[i].updateTime = _this.timeChange(res.rows[i].updateTime)
          }
          _this.pageNum = res.total // 总共条数
          _this.listDatas = res.rows // 总数据
          _this.listDataShow = res.rows.slice(0, 10) // 展示数据
        })
      },
      /**
       * 用户列表页
       */
      getDataUserList (parm) {
        this.pageType = 1
        var _this = this
        this.apiList.usersList(parm).then((res) => {
          // 添加一个属性
          for (let i = 0; i < res.rows.length; i++) {
            res.rows[i].status = res.rows[i].status ? '是' : '否'
            res.rows[i].validate = res.rows[i].validate ? '是' : '否'
            if (res.rows[i].role != null) {
              res.rows[i].roleName = res.rows[i].role.roleName
            }
          }
          _this.DateReady = true // 数据异步加载完成
          _this.loading2 = false
          _this.pageNum = res.total // 总共条数
          _this.listDatas = res.rows // 总数据
          _this.listDataShow = res.rows.slice(0, 10) // 展示数据
        })
      },
      // 新增页
      getDataAction () {
        this.columns1 = pageTableHeads.columnsSet1 // 对表头赋值
        this.getDataAxios(this.initPages)
      },
      // 行为页
      getDataList () {
        this.columns1 = pageTableHeads.columnsSet2
        this.getDataAxios(this.initPages)
      },
      // 时段新增
      getDataTime () {
        this.columns1 = pageTableHeads.columnsSet3
        this.getDataAxios(this.initPages)
      },
      // 活跃用户
      getDataActive () {
        this.columns1 = pageTableHeads.columnsSet4
        this.getDataAxios(this.initPages)
      },
      /**
       * 角色管理
       */
      getDataRole () {
        var _this = this
        this.columns1 = pageTableHeads.columnsSet6
        this.columns1 = this.columns1.concat({
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
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.listDataAdd(params)
                  }
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.edit(params)
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
                  color: '#ff3300'
                },
                on: {
                  click: () => {
                    this.deleteTip = true
                    this.delUserId = params.row.id
                    // this.remove(params)
                  }
                }
              }, '删除')
            ])
          }
        })
        this.apiList3.apiAjax(window.apiUrl.api_loadrole, this.initPages, 'get', function (res) {
          _this.DateReady = true // 数据异步加载完成
          _this.loading2 = false
          _this.pageNum = res.total // 总共条数
          _this.listDatas = res.rows // 总数据
          _this.listDataShow = res.rows.slice(0, 10) // 展示数据
        })
      },
      /**
       * 用户信息
       */
      getDataUser () {
        this.columns1 = pageTableHeads.columnsSet5
        this.columns1 = this.columns1.concat({
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
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.listDataAdd(params)
                  }
                }
              }, '添加'),
              h('Button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: '#5cadff'
                },
                on: {
                  click: () => {
                    this.edit(params)
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
                  color: '#ff3300'
                },
                on: {
                  click: () => {
                    this.deleteTip = true
                    this.delUserId = params.row.id
                    // this.remove(params)
                  }
                }
              }, '删除')
            ])
          }
        })
        this.getDataUserList(this.initPages)
      },
      /**
       * 切换路由时候，根据对应页面获取数据
       */
      getDatas () {
        if (this.$route.name === 'actionList') {
          this.getDataAction()
        }
        if (this.$route.name === 'list') {
          this.getDataList()
        }
        if (this.$route.name === 'timeList') {
          this.getDataTime()
        }
        if (this.$route.name === 'activeList') {
          this.getDataActive()
        }
        if (this.$route.name === 'usersList') {
          this.getDataUser()
        }
        if (this.$route.name === 'role') {
          this.getDataRole()
        }
      },
      searchShow () {
        this.searchState = !this.searchState
      },
      // 刷新页面
      refresh () {
        // this.getData(this.params)
      },
      /**
       * 页码改变后截取当页数据显示
       */
      pageChange (page) {
        let getLimitPage = this.listDatas.length // 一次获取的数据量长度
        let countPage = Math.ceil(this.pageNum / this.limits) // 总页数
        let getPageNum = Math.ceil(getLimitPage / this.limits) // 一次请求分多少页显示
        // 一次请求对于当前分页的数量所占比例
        var pageToCount = getPageNum / countPage
        // 当前点击页数，应该请求对应的数据
        this.setPageData = Math.ceil((page / countPage - pageToCount) / pageToCount) + 1
        // 当前点击的页数大于当前页显示的数量（数据展示完了）
        if (page > getPageNum) {
          if (this.isTableDataSet) {
            this.apiList.test({a: this.setPageData}).then((res) => {
              if (res.hasOwnProperty('code')) {
                this.$Message.error(res.message)
                this.loading2 = false
                return
              }
              this.isTableDataSet = false
              this.DateReady = true // 数据异步加载完成
              this.loading2 = false
              // 时间戳转时间
              for (var i = 0; i < res.rows.length; i++) {
                res.rows[i].censusDate = this.timeChange(res.rows[i].censusDate)
                res.rows[i].createTime = this.timeChange(res.rows[i].createTime)
                res.rows[i].updateTime = this.timeChange(res.rows[i].updateTime)
              }
              this.listDatas = this.listDatas.concat(res.rows) // 重新赋值新数据
              this.pageNum = res.total // 总共条数
            })
          }
        }
        this.listDataShow = this.listDatas.slice((page - 1) * this.limits, (page - 1) * this.limits + this.limits)
      },
      /**
       * 切换每页条数后，重新展示
       */
      PageSizeChange (limit) {
        let _this = this
        // 计算高度控制表头
        setTimeout(function () {
          // 页面表格最大高度
          let winHeight = window.innerHeight - document.querySelector('.header').offsetHeight - document.querySelector('.ivu-breadcrumb').offsetHeight - document.querySelector('#footer').offsetHeight - 250
          // 表格高度
          let tableHeight = document.querySelector('.list-lb').offsetHeight
          if (winHeight < tableHeight) {
            _this.tableH = winHeight
          }
        })
        this.limits = limit
        this.listDataShow = this.listDatas.slice(0, limit)
      },
      /**
       * 表格查看
       */
      show (index) {
        this.currIndex = index
        this.currDate = this.listDataShow[index]
        this.detailModal = true
        this.$Modal.info({
          title: '详情',
          content: `服务器id：${this.listDataShow[index].serverId}<br>
                    渠道id：${this.listDataShow[index].channelId}<br>
                    渠道appID：${this.listDataShow[index].channelAppId}<br>
                    新增角色：${this.listDataShow[index].channelAppId}<br>
                    新增设备：${this.listDataShow[index].channelAppId}<br>
                    记录时间：${this.listDataShow[index].censusDate}<br>
                    更新时间：${this.listDataShow[index].updateTime}<br>`
        })
      },
      /**
       * 表格删除
       */
      remove (datas) {
        var _this = this
        if (this.$route.name === 'usersList') {
          let id = {
            id: datas
          }
          this.apiList3.apiAjax(window.apiUrl.api_deleteuser, id, 'get', function (res) {
            if (res.code === 0) {
              _this.$Message.info('删除成功')
              _this.getDataUserList()
            } else {
              _this.$Message.info('删除失败')
            }
          })
        }
        if (this.$route.name === 'role') {
          let id = {
            id: datas
          }
          this.apiList3.apiAjax(window.apiUrl.api_deleterole, id, 'get', function (res) {
            if (res.code === 0) {
              _this.$Message.info('删除成功')
              _this.getDataRole()
            } else {
              _this.$Message.info('删除失败')
            }
          })
        }
      },
      /**
       * 表格新增
       */
      listDataAdd (params) {
        if (this.$route.name === 'usersList') {
          this.isAdd = 0
          this.currDate = {}
          this.editModal = true
        }
        if (this.$route.name === 'role') {
          this.pageInfoName = this.$route.name // 页面名称
          this.pageInfoType = 1 // 新增
          this.editModalRole = true
        }
      },
      /**
       * 表格编辑
       */
      edit (params) {
        var _this = this
        if (this.$route.name === 'usersList') {
          this.isAdd = 1
          this.editModal = true
          this.currIndex = params.index
          this.currDate = this.listDataShow[params.index]
        }
        if (this.$route.name === 'role') {
          this.pageInfoName = this.$route.name // 页面名称
          this.pageInfoType = 2 // 编辑
          this.editModalRole = true
          setTimeout(function () {
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
          }, 200)
        }
      },
      /**
       * 批量删除
       */
      deleteBatch () {
        this.deleteTip = false
        this.remove(this.delUserId)
      },
      /**
       * 修改保存,添加保存
       */
      saveBatch (currDate, isAdd) {
        var _this = this
        this.loading = true
        currDate.status = currDate.status === '是' ? 'true' : 'false'
        currDate.validate = currDate.validate === '是' ? 'true' : 'false'
        if (isAdd === 1) { // 修改
          currDate.role.roleName = currDate.roleName
          this.apiList3.apiAjax(window.apiUrl.api_updateuser, JSON.stringify(currDate), 'post', function (res) {
            _this.loading = false
            _this.$Message.info('保存成功')
            _this.editModal = false
            currDate.status = currDate.status ? '是' : '否'
            currDate.validate = currDate.validate ? '是' : '否'
          })
        }
        if (isAdd === 0) { // 添加
          this.apiList3.apiAjax(window.apiUrl.api_insertuser, JSON.stringify(currDate), 'post', function (res) {
            _this.getDataUserList(_this.initPages)
            _this.loading = false
            _this.$Message.info('添加成功')
            _this.editModal = false
          })
        }
      },
      /**
       * 数据导出
       * @ type 1 原始数据 2过滤数据
       */
      exportData (type) {
        if (type === 1) {
          this.$refs.table.exportCsv({
            filename: '原始数据'
          })
        } else if (type === 2) {
          this.$refs.table.exportCsv({
            filename: '排序和过滤后的数据',
            original: false
          })
        }
      },
      /**
       * 多选
       * selection：已选项数据 row：刚选择的项数据
       */
      onSelect (selection, row) {
        // console.log(selection,row)
      },
      onSelectionChange (selection) {
        this.selection = selection
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
      this.getDatas()
      this.changeMemuData()
    },
    mounted () {
      erd.listenTo(window, 'resize', this.handleResize)
      this.tableWt = document.getElementsByClassName('content-table')[0].offsetWidth
    }
  }
</script>
<style lang="less">
  .list-lb{
    .search-filter {
      opacity: 0;
      display: none;
      overflow: hidden;
      transition: all 0.28s ease-out;
      &.active {
        opacity: 1;
        display: block;
      }
    }
    .content-table{
      margin-top: 20px;
    }
    .ivu-card-extra{
      z-index: 1;
    }
  }
  .lable-left{
    text-align: left;
  }

</style>

