<!--信息 -> 邮件查询-->
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
    <!-- 编辑 -->
    <Modal width='800' v-model="editModal" @on-ok="tableEditClick(o_model_data)" footer-hide :mask-closable="false">
      <p slot="header">
        <Icon type="information-circled"></Icon>
        <span>添加</span>
      </p>
      <div style="text-align:center" id="formId">
        <Form :label-width="80" class="formClass" :model="o_model_data" :rules="ruleInline" ref="o_model_data">
              <Row>
                <Col span="12">
                  <Form-item label="服务器" prop="serverId">
                    <Select filterable v-model="o_model_data.serverId">
                      <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="12">
                  <div>{{o_model_data.serverId}}</div>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item label="发送人" prop="sender">
                    <Input placeholder="请输入" v-model="o_model_data.sender"></Input>
                  </Form-item>
                </Col>
                <Col span="12">
                  <div>{{o_model_data.sender}}</div>
                </Col>
              </Row>
              <Row>
                <Col span="12">
                  <Form-item label="标题" prop="title">
                    <Input placeholder="请输入" v-model="o_model_data.title"></Input>
                  </Form-item>
                </Col>
                <Col span="12">
                  <div>{{o_model_data.title}}</div>
                </Col>
              </Row>

          <Row>
            <Col span="12">
              <Form-item label="主题" prop="topic">
                <Input placeholder="请输入" v-model="o_model_data.topic"></Input>
              </Form-item>
            </Col>
            <Col span="12">
              <div>{{o_model_data.topic}}</div>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Form-item label="内容" prop="content">
                <Input placeholder="请输入" v-model="o_model_data.content"></Input>
              </Form-item>
            </Col>
            <Col span="12">
              <div>{{o_model_data.content}}</div>
            </Col>
          </Row>

          <Row>
            <Col span="12">
              <Form-item label="发送时间" prop="sendTime">
                <DatePicker class="sel-date" type="datetime" v-model="o_model_data.sendTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
              </Form-item>
            </Col>
            <!--<Col span="12">
              <div>{{o_model_data.sendTime}}</div>
            </Col>-->
          </Row>
          <Row>
            <Col span="12">
              <Form-item label="删除时间" prop="delTime">
                <DatePicker class="sel-date" type="datetime" v-model="o_model_data.delTime" show-week-numbers placeholder="Select date" style="width: 200px"></DatePicker>
              </Form-item>
            </Col>
            <!--<Col span="12">
              <div>{{o_model_data.delTime}}</div>
            </Col>-->
          </Row>
          <Row>
            <Col span="12">
              <Form-item label="目标">
                <i-switch size="large" v-model="switchs" @on-change="switchChange">
                  <span slot="open" :value="switchs">个人</span>
                  <span slot="close" :value="!switchs">全服</span>
                </i-switch>
              </Form-item>
            </Col>
            <!--<Col span="12">
              <div>{{switchs}}</div>
            </Col>-->
          </Row>
          <Row>
            <Col span="12">
              <Form-item label="玩家id" prop="playerList">
                <Input type="textarea" v-model="o_model_data.playerList" :disabled="!switchs" :autosize="true" placeholder="Enter something..." ></Input>
              </Form-item>
            </Col>
            <Col span="12">
              <div>{{o_model_data.playerList}}</div>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <Row :gutter="12">
                <Col span="24">
                  <Form-item label="附件">
	                  	<Col span="8">
				                  <Select filterable v-model="modelIptO" >
				                    	<Option v-for="item in emailData" :value="item.itemIdAndText" :key="item.itemId">{{item.itemName}}</Option>
				                  </Select>
			                </Col>
			                <Col span="6">
			                  <Input type="textarea" v-model="emailNum" :autosize="true" placeholder="数量" ></Input>
			                </Col>
			                <Col span="4">
			                  <Button type="info" @click="addIptSet(modelIptO, emailNum)">确定</Button>
			                </Col>
                  </Form-item>
                </Col>
              </Row>
            </Col>
            <Col span="12">
              <div class="outDivAddIpt">
                <!--{{o_model_data.adjunctMap}}-->
                <div v-for="(item, i) in modelIptArr" class="addiptOut">
                  <span class="addipt">
                    <Row :gutter="6">
                      <Col span="24">
                        <Input readonly :value="item" ></Input>
                      </Col>
                    </Row>
                  </span>
                  <span>
                    <Button size="small" type="error" @click="deleteIpt(item, i)">删除</Button>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
          	<Col span="12">
              <div class="outDivAddIpt">
              	<Button @click="editModal=false">取消</Button>
              	<Button type="primary" @click="sendEmail('o_model_data')">确定</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
    <!--查看详情弹框-->
    <Modal v-model="isShowDetail" title="详情">
      <div class="outDetailDiv">
        <p class="inDetailP">发送人名称：{{rowDataVal.sender}}</p>
        <p class="inDetailP">标题：{{rowDataVal.title}}</p>
        <p class="inDetailP">主题：{{rowDataVal.topic}}</p>
        <p class="inDetailP">内容：{{rowDataVal.content}}</p>
        <p class="inDetailP">附件：{{rowDataVal.adjunctMap}}</p>
        <p class="inDetailP">发送时间戳：{{rowDataVal.sendTime}}</p>
        <p class="inDetailP">删除时间戳：{{rowDataVal.delTime}}</p>
        <p class="inDetailP">收件人玩家ID列表：{{rowDataVal.playerList}}</p>
      </div>
    </Modal>
    <!--查看邮件记录弹框-->
    <Modal v-model="isShowRecord" title="邮件记录" width="650">
      <Table :show-header="showHeader"
             size="small"
             :data="recordData"
             :columns="columnsRecord"/>
    </Modal>
  </div>
</template>
<script>
	import {dateFtt} from 'common/utils/publicConfig.js'
  import editTables from './../../smallcpt/editTables'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import tableTopSearch from './../../smallcpt/tableTopSearch'
  var erd = elementResizeDetectorMaker()
  export default {
    name: 'infemail',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        recordData: [],             // 邮件记录数据
        isShowRecord: false,        // 查看邮件记录弹框
        arrSpl: [],                 // 邮件附件数组格式的（用于删除功能）
        emailNum: 0,                // 邮件附件数量
        modelIptArrReal: '',        // 邮件附件数据（传入接口）
        emailData: [],              // 邮件附件数据
        modelIptArr: [],
        modelIptO: '',
        tableSelectO: {},           // 当前点击的查询条件
        o_model_data: {
        	sendTime:this.getstartTime(),
        	delTime:this.getendTime()
        },           // model框的输入值
        switchs: true,             // 编辑的开关
        serverId: '',               // 输入的服务器id
        playerId: '',               // 输入的玩家id
        modeljfType: '',            // 输入的解封类型
        endTime: '',                // 输入的结束时间
        pushNum: null,
        a: 0,
        rowDataVal: {},             // 当前行的完整数据
        isShowDetail: false,        // 表格点击查看弹框是否显示
        initPages: {                // 初始化加载第几页
          currentPage: 1
        },
        loading2: false,            // 加载loading
        pageNum: 0,                 // 表格内容条数
        listDatas: [],              // 表格总数据
        listDataShow: [],           // 展示数据
        listDatasLength: 0,         // 当前得到的数据长度
        showHeader: true,           // 是否显示表头 @:show-header
        tableSize: 'small',         // @:size
        isShowPage: true,           // 是否显示分页条
        limits: 10,                 // 多少条每页
        setPageData: 0,             // 当前点击页数，应该请求对应的数据
        searchData: [],             // 表搜索数据
        pageType: 4,                // 页面类型（决定表搜索框的样式）
        resourcesButton: [],        // 权限按钮数据
        leftIsShowButton_r: false,  // 查询权限按钮是否显示
        leftIsShowButton_c: false,  // 添加权限按钮是否显示
        rightIsShowButton_d: false, // 删除权限按钮是否显示
        editModal: false,           // 添加封禁弹框是否弹出
        loading: true,
        ruleInline: {
            serverId: [{ required: true, message: '请选择服务器id', trigger: 'change' }],
            sender: [{ required: true, message: '请输入发送人', trigger: 'blur' }],
            sendTime: [{ required: true, message: '请选择发送时间', trigger: 'change',pattern: /.+/}],
            delTime: [{ required: true, message: '请选择删除时间', trigger: 'change',pattern: /.+/}],
            icon: [{ required: true, message: '请输入', trigger: 'blur' }],
            playerList: [{ required: true, message: '请输入玩家ID', trigger: 'blur' }],
            title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
            topic: [{ required: true, message: '请输入图标', trigger: 'blur' }],
            content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
            
        },
        columnsRecord: [
          {
            title: '邮件状态',
            key: 'status'
          },
          {
            title: '发送人',
            key: 'user'
          },
          {
            title: '发送时间',
            key: 'sendTime'
          },
          {
            title: '服务器名称',
            key: 'serverName'
          },
          {
            title: '备注',
            key: 'mark'
          },
          {
            title: '全部内容',
            key: 'json'
          }
        ],
        columnsSet: [               // 表头数据
          {
            sortable: true,
            title: '发送人名称',
            key: 'sender'
          },
          {
            sortable: true,
            title: '标题',
            key: 'title'
          },
          {
            sortable: true,
            title: '主题',
            key: 'topic'
          },
          {
            sortable: true,
            title: '内容',
            key: 'content'
          },
          {
            sortable: true,
            title: '附件',
            key: 'adjunctMap'
          },
          {
            sortable: true,
            title: '发送时间戳',
            key: 'sendTime'
          },
          {
            sortable: true,
            title: '删除时间戳',
            key: 'delTime'
          },
          {
            sortable: true,
            title: '收件人玩家ID列表',
            key: 'playerList'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
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
                    marginRight: '5px',
                    color: '#5cadff'
                  },
                  on: {
                    click: () => {
                      this.showRecordData(params)
                    }
                  }
                }, '邮件记录'),
                h('Button', {
                  props: {
                    type: 'text',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px',
                    color: '#ff5035',
                    display: this.rightIsShowButton_d ? 'inline-block' : 'none' // 权限操作
                  },
                  on: {
                    click: () => {
                      // this.rightIsShowButton_u ? this.edit(params) : this.$Message.info('没有权限') // 权限操作
                    }
                  }
                }, '删除封禁')
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
        var res = _this.apiList3.api_spiritymailcontroller_loadall(page)
        if (!res || res.hasOwnProperty('code')) {
          this.$Message.error(res.message)
          this.loading2 = false
          return
        }
        _this.loading2 = false
        this.setPageData = 1
        // 时间戳转时间
        // for (var i = 0; i < res.rows.length; i++) {
        //   res.rows[i].censusDate = window.timeChange(res.rows[i].censusDate)
        //   res.rows[i].createTime = window.timeChange(res.rows[i].createTime)
        //   res.rows[i].updateTime = window.timeChange(res.rows[i].updateTime)
        // }
        _this.pageNum = res.total // 总共条数
        _this.listDatas = res.rows // 总数据
        _this.listDatasLength = res.rows.length // 当前得到的数据长度
        _this.listDataShow = res.rows.slice(0, 10) // 展示数据
      },
			getstartTime(){
				let timer=(new Date()).valueOf()
				return dateFtt("yyyy-MM-dd hh:mm:ss",timer)
			},
			getendTime(){
				var ss = 24 * 60 * 60 * 1000; //一天的毫秒数86400
				let timer=(new Date()).valueOf()
				var fiveDay=new Date(ss*5 + timer)
				return dateFtt("yyyy-MM-dd hh:mm:ss",fiveDay)
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
          var res = _this.apiList3.api_spiritymailcontroller_loadall({currentPage: _this.setPageData})
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
        if (res.name === '' || res.pid === '' || res.startTime === '' || res.endTime === '') {
          this.$Message.info('请输入查询条件')
          return
        }
        res.startTime = res.startTime.getTime()
        res.endTime = res.endTime.getTime()
        this.tableSelectO = res
        this.getAddListData(res)
      },

      /**
       * 添加邮件弹框
       */
      tableAddClick () {
        this.editModal = true
      },

      /**
       * 获取邮件记录
       */
      showRecordData (parm) {
        let o = {
          serverName: this.tableSelectO.name,
          sendUser: parm.row.sender,
          startTime: this.tableSelectO.startTime,
          endTime: this.tableSelectO.endTime
        }
        let res = this.apiList3.api_spiritymailcontroller_querymailrecord(o)
        if (!res) {
          this.$Message.info('查询出错')
          return
        }
        for (let i = 0; i < res.rows.length; i++) {
          res.rows[i].status = res.rows[i].status ? '是' : '否'
          res.rows[i].sendTime = this.timeChange(res.rows[i].sendTime)
        }
        this.recordData = res.rows
        this.isShowRecord = true
      },

      /**
       * 邮件附件
       */
      emailInfo () {
        var res = this.apiList3.api_spiritymailcontroller_loaditems()
        if (!res) {
          return
        }
        for (let i = 0; i < res.length; i++) {
          res[i].itemIdAndText = res[i].itemId + '/' + res[i].itemName
        }
        this.emailData = res
      },
			//发送邮件
			sendEmail(name){
					
				
				this.$refs[name].validate((valid) => {
            if(valid){
            		this.$confirm('是否立即发送?', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          type: 'warning'
				        }).then(() => {
				          var obj ={
							          adjunctMaps: this.modelIptArrReal,
							          content: this.o_model_data.content,
							          playerLists: this.o_model_data.playerList,
							          delTime: this.o_model_data.delTime.getTime(),
							          sendTime: this.o_model_data.sendTime.getTime(),
							          sender: this.o_model_data.sender,
							          serverName: this.o_model_data.serverId,
							          title: this.o_model_data.title,
							          topic: this.o_model_data.topic
							        }
		                
		                 var r = this.apiList3.api_spiritymailcontroller_send(obj)
		                 if (r.code !=0) {
							          this.$Message.info('添加失败')
							          return
							        }
						        this.$Message.info('添加成功')
						        this.o_model_data={}
						        this.o_model_data={
						        	sendTime:this.getstartTime(),
        							delTime:this.getendTime()
						        }
						        this.editModal=false
						        this.getAddListData(this.tableSelectO)
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '已取消发送'
				          });          
				        });
            	
            } else {
                this.$Message.error('Fail!');
            }
        })
			},
      /**
       * 添加邮件功能
       */
//    tableEditClick (res) {
//      var r = this.apiList3.api_spiritymailcontroller_send(o)
//      console.log(r)
//      if (r.code !=0) {
//        this.$Message.info('添加失败')
//        return
//      }
//      this.$Message.info('添加成功')
//      this.getAddListData(this.tableSelectO)
//    },

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
          // 删除按钮
          if (e.coordinate === 'right' && e.sn === 'd') {
            _this.rightIsShowButton_d = true
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
       * 开关变化时触发
       */
      switchChange (res) {
        this.switchs = res
      },

      /**
       * 添加附件功能
       */
      addIptSet (res, emailNum) {
        if (res === '') {
          this.$Message.info('填写完整')
          return
        }
        let o = {}
        let spl = res.split('/')
        o.id = spl[0]
        o.num = emailNum
        let strO = JSON.stringify(o)
        this.modelIptArr.push(strO) // 用于展示
        if (this.modelIptArr.length === 1) {
          this.modelIptArrReal += (o.id + '/' + o.num) // 传入接口
        } else {
          this.modelIptArrReal += ('/' + o.id + '/' + o.num) // 传入接口
        }
        this.arrSpl = this.modelIptArrReal.split('/') // 数组格式的数据   用于删除附件

        console.log(this.arrSpl,"tianjia ")
      },

      /**
       * 删除附件功能
       */
      deleteIpt (item, i) {

        // alert(item)
        console.log(item,i);
        console.log(this.arrSpl);
        this.arrSpl.splice(i * 2, 2) // 接口字段删除
        this.modelIptArrReal = this.arrSpl.join('/') // 重新分割
         // this.arrSpl = this.modelIptArrReal.split('/')
        this.modelIptArr.splice(i, 1) // 展示删除
      },

      /**
       * 修改附件功能
       */
      updateIpt (i) {
        console.log(this.modelIptArr[i])
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
      this.getServerData()
      // 邮件附件
      this.emailInfo()
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
    height: 650px;
    /*padding: 10px;*/
  }

  .outDivAddIpt{
    .addiptOut{
      margin: 5px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .addipt{
      display: inline-block;
      width: 200px;
      margin-right: 3px;
    }
  }
</style>

