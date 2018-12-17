<template>
  <div>
    <!--role页面添加-->
    <div v-if="pageInfoType==1 && pageInfoName=='role'">
      <Modal v-model="editModalRole" :loading="loading" title="Title" @on-ok="asyncOK">
        <div class="parinput">
          <!--<Col span="8">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">id：</span>
            <span class="sel-fwqid2">
            <Input v-model="value1" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
          <!--<Col span="6">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">角色名：</span>
            <span class="sel-fwqid2">
            <Input v-model="value2" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
          <!--<Col span="6">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">描述：</span>
            <span class="sel-fwqid2">
            <Input v-model="value3" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
        </div>
        <div class="treeParent">
          <div class="treeLeft">
            <Tree :data="treeDataChoose" show-checkbox @on-check-change="onCheckChoose" ></Tree>
          </div>
          <div class="treeRight">
            <Tree :data="treeData" show-checkbox @on-check-change="onCheckChange" ></Tree>
          </div>
        </div>
      </Modal>
    </div>
    <!--role页面编辑-->
    <div v-if="pageInfoType==2 && pageInfoName=='role'">
      <Modal v-model="editModalRole" :loading="loading" title="Title" @on-ok="asyncOK">
        <div class="parinput">
          <!--<Col span="8">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">id：</span>
            <span class="sel-fwqid2">
            <Input v-model="value1" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
          <!--<Col span="6">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">角色名：</span>
            <span class="sel-fwqid2">
            <Input v-model="value2" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
          <!--<Col span="6">-->
          <div class="sels-div2">
            <span class="sel-fwqtext2">描述：</span>
            <span class="sel-fwqid2">
            <Input v-model="value3" placeholder="Enter something..." clearable style="width: 200px"></Input>
          </span>
          </div>
          <!--</Col>-->
        </div>
        <div class="treeParent">
          <div class="treeLeft">
            <Tree :data="treeDataL" show-checkbox ></Tree>
          </div>
          <div class="treeRight">
            <Tree :data="treeData" show-checkbox @on-check-change="onCheckChange"></Tree>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'editTables',
    props: {
      'editModalRole': {
        type: Boolean,
        default: false
      },
      'pageInfoType': {
        type: Number,
        default: 1
      },
      'pageInfoName': {
        type: String,
        default: ''
      },
      'treeData': {
        type: Array,
        default: []
      },
      'treeDataL': {
        type: Array,
        default: []
      }
    },
    // props: ['editModalRole', 'pageInfos'],
    data () {
      return {
        modal1: false,
        loading: true,
        value1: '',
        value2: '',
        value3: '',
        treeDataChoose: []
      }
    },
    mounted () {
      this.$nextTick(() => {
      })
    },
    watch: {
      'editModalRole' (res) {
        this.$emit('on-click-modal', res)
      }
    },
    methods: {
      asyncOK () {
        setTimeout(() => {
          this.editModalRole = false
        }, 1000)
      },
      // 选择树时出发
      onCheckChange (a) {
        this.treeData[0].render = (h, {root, node, data}) => {
          console.log(root)
        }
        // this.paseTree(this.treeData, a)
        // var _this = this
        // var arr = []
        // var newArrs = []
        // this.treeData.forEach(function (e1) {
        //   a.forEach(function (a1) {
        //     if (e1.id === a1.parentId) {
        //       arr.push(e1)
        //       newArrs = _this.objArrSet(arr)
        //       alert(newArrs)
        //     }
        //   })
        // })
      },
      paseTree (allTree, targetTree) {
        var parentId
        targetTree.map(function (eee, iii, aaa) {
          parentId = eee.parentId
          filterTree(allTree)
        })
        function filterTree (allTree) {
          allTree.filter(function (e, i, a) {
            if (e.id === parentId) {
              return true
            } else {
              var t = e.childMenu
              if (t != null && t.length > 0) {
                return filterTree(e.childMenu)
              }
              return false
            }
          })
        }
      },
      // 数组对象去重
      objArrSet (arrs) {
        var arr = []
        for (let val of arrs) {
          arr.push(val.ids)
        }
        var newArr = []
        var newArr2 = []
        for (var i = 0; i < arr.length - 1; i++) {
          if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
            newArr2.push(arrs[i])
          }
        }
        console.log(newArr2)
        return newArr2
      }
    }
  }
</script>

<style lang="less">
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
