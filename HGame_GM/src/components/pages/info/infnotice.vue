<!--信息 -> 公告查询-->
<template>
  <div class="list-lb">
    <Row>
      <Button type="success" @click="showModal()">
        点击发送公告
      </Button>
      <!--公告弹框-->
      <Modal v-model="priceEditModal" @on-ok="okTableEditClick(o_model_data)">
        <p slot="header">
          <Icon type="information-circled"></Icon>
          <span>公告</span>
        </p>
        <div style="text-align:center">
          <Form :label-width="80">
            <Form-item label="服务器">
              <Select filterable v-model="o_model_data.serverName">
                <Option v-for="item in searchData" :value="item.id" :key="item.id">{{item.text}}</Option>
              </Select>
            </Form-item>
            <Form-item label="滚动次数">
              <Input placeholder="请输入" v-model="o_model_data.rollNum"></Input>
            </Form-item>
            <Form-item label="内容">
              <Input type="textarea" v-model="o_model_data.content" :autosize="true" placeholder="Enter something..." ></Input>
            </Form-item>
            <Form-item label="显示方式">
              <Select filterable v-model="o_model_data.showType">
                <Option v-for="item in showTypeData" :value="item.id" :key="item.id">{{item.val}}</Option>
              </Select>
            </Form-item>
          </Form>
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
    name: 'infnotice',
    components: {
      tableTopSearch,
      editTables
    },
    data () {
      return {
        o_model_data: {}, // model框的输入值
        serverId: 0, // 服务器id
        searchData: [], // 获取服务器列表
        priceEditModal: true, // 弹框默认弹出
        playerId: '', // 玩家id
        productId: '', // 商品id
        showTypeData: [ // select框展示类型
          {
            id: 1,
            val: '仅聊天窗口'
          },
          {
            id: 2,
            val: '仅跑马灯'
          },
          {
            id: 3,
            val: '聊天窗口和跑马灯均显示'
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
       * 发送公告
       */
      okTableEditClick (r) {
        let o = {
          serverName: r.serverName,
          content: r.content,
          showType: r.showType,
          rollNum: r.rollNum
        }
        var res = this.apiList3.api_spiritynoticecontroller_sendmesg(o)
        if (!res || !res.success) {
          this.$Message.info('发送失败')
          return
        }
        this.$Message.info('发送成功')
      },

      /**
       * 点击弹框
       */
      showModal () {
        this.priceEditModal = !this.priceEditModal
      }
    },
    created () {
      this.getServerData()
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

