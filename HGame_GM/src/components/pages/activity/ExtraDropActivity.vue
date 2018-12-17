<template>
  <Table border :columns="columns7" :data="activityData">
    <div slot="header">
      <h3>服务器Id：
      	{{model1}}
      <Select v-model="serverName"  style="width:200px">
        <Option v-for="item in serverNames" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
     	活动Id：
      <Select v-model="id"  style="width:200px">
        <Option v-for="item in serverNames" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Button icon="ios-search" v-on:click="queryActivity()">查询</Button>
      </h3>
    </div>
    <div slot="footer">
      <Page :total="100" show-elevator show-total />
    </div>
  </Table>
</template>
<script type="text/javascript">
import elementResizeDetectorMaker from 'element-resize-detector'
var erd = elementResizeDetectorMaker()
export default {
  name: 'ExtraDropActivity',
  components: {

  },
  data() {
    return {
      searchData: {
        serverName: "",
        id: ""
      },

      serverNames: [{ label: "qw", value: 1 }, { label: "ew", value: 2 }],
      columns7: [{
          title: '活动Id',
          key: 'id',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        },
        {
          title: '活动名称',
          key: 'name'
        },
        {
          title: '备注',
          key: 'remark'
        },
        {
          title: '时间类型',
          key: 'timeType'
        },
        {
          title: '活动时间',
          key: '活动时间'
        },
        {
          title: '开服时间',
          key: 'openServerTime'
        },
        {
          title: '权重',
          key: 'weight'
        },
        {
          title: 'UI',
          key: 'imgUrl'
        },
        {
          title: '明细',
          key: 'itemStr'
        },
        {
          title: '信息',
          key: 'info'
        },
        {
          title: '状态',
          key: 'open'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '修改')
            ]);
          }
        }
      ],
      activityData: [{
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park'
        }
      ]
    }
  },
  methods: {
    edit() {
      alert(1)
    },
    queryActivity() {

      var res = this.apiList4._get_(window.apiUrl.api_getAllExtraDrop, { serverName: "童曾玉熙" }, (s) => console.log(s, "返回"))


    }
  }
}

</script>
