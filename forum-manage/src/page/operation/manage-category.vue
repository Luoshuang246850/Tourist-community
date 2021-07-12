<template>
  <div class="address-box">

    <div class="search-bar">
      <el-form :inline="true" size="medium">
        <el-form-item label="美食名称">
          <el-input v-model="search.provinceId" placeholder="请输入美食名称"></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="search.provinceProvince" placeholder="请输入商家名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="doSearch">查询</el-button>
          <el-button type="danger" @click="cleanSearch">清空</el-button>
        </el-form-item>
        <el-form-item style="margin-left: 50px">
          <el-button type="primary" @click="showAddAddress">添加</el-button>
          <el-button type="danger" @click="deleteItem() ">删除</el-button>
        </el-form-item>

      </el-form>
    </div>


    <div class="address-list-box">

      <el-table
          :data="addresses"
          style="width: 100%">
        <el-table-column
            fixed
            prop="provinceId"
            label="ID"
            width="180">
        </el-table-column>
        <el-table-column
            prop="provinceProvince"
            label="省"
            width="150">
        </el-table-column>
        <el-table-column
            prop="provinceCity"
            label="市"
            width="150">
        </el-table-column>
        <el-table-column
            prop="provinceCounty"
            label="县区"
            width="150">
        </el-table-column>
        <el-table-column
            prop="provinceTown"
            label="镇"
            width="150">
        </el-table-column>
        <el-table-column
            prop="provinceCountry"
            label="乡"
            width="180">
        </el-table-column>
        <el-table-column
            prop="provinceVillage"
            label="村"
            width="170">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="address-dialog-box">
      <el-dialog
          title="删除提示"
          :visible.sync="deleteDialogShow"
          width="400px">
        <span>确定删除: {{deleteTargetId}} 这个地址？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="doDeleteItem()">确 定</el-button>
        </span>
      </el-dialog>
      <!--添加/编辑分类的dialog-->
      <el-dialog
          :close-on-press-escape="false"
          :close-on-click-modal="false"
          :title="editorTitle"
          :visible.sync="editorDialogShow"
          width="500px">
        <span class="address-editor-box">

          <el-form label-width="50px" size="medium" >

            <el-form-item label="省">
              <el-input v-model="address.provinceProvince"></el-input>
            </el-form-item>
            <el-form-item label="市">
              <el-input v-model="address.provinceCity"></el-input>
            </el-form-item>
            <el-form-item label="县区">
              <el-input v-model="address.provinceCounty"></el-input>
            </el-form-item>
            <el-form-item label="镇">
              <el-input v-model="address.provinceTown"></el-input>
            </el-form-item>
            <el-form-item label="乡">
              <el-input v-model="address.provinceCountry"></el-input>
            </el-form-item>
            <el-form-item label="村">
              <el-input v-model="address.provinceVillage"></el-input>
            </el-form-item>
          </el-form>

        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editorDialogShow=false" size="medium" type="danger">取 消</el-button>
          <el-button type="primary" @click="postAddress" size="medium">{{editorCommitText}}</el-button>
        </span>
      </el-dialog>
    </div>

  </div>

</template>
<script>
const axios = require('axios');

  export default {
    data(){
      return {
        search:{
          provinceId: '',
          provinceProvince: '',
        },

        editorCommitText:'修改地址',
        editorDialogShow:false,
        editorTitle:'编辑地址',
        addresses:[],  //地址列表
        deleteDialogShow:false,
        deleteMessage:'',
        deleteTargetId:'',
        address:{
          provinceId:'',
          provinceProvince:'',
          provinceCounty:'',
          provinceCity:'',
          provinceTown:'',
          provinceCountry:'',
          provinceVillage:'',
        }
      }
    },
    methods:{

      //搜索
      doSearch(){
        axios({
          method:'get',
          url:'/province/find/'+this.search.provinceId,
        }).then(result => {
          console.log(result.data)

          if (result.data.code === 10000){
            this.$message.success(result.data.message)

          } else {
            this.$message.error(result.data.message)
          }
        })

      },
      cleanSearch(){

      },


      //1.添加地址
      postAddress(){
        //检查内容，设置一些限制

        if (this.address.provinceProvince === ''){
          this.showWarning('省份不能为空！');
          return;
        }
        if (this.address.provinceCity === ''){
          this.showWarning('市不能为空！')
          return ;
        }
        if (this.address.provinceId === ''){
          //提交数据
          axios({
            method:'post',
            url:'/province/add',
            data:this.address
          }).then(result => {
            if (result.data.code === 10000){
              console.log(result.data)
              this.$message({
                message:'添加成功',
                center:true,
                type:'success'
              });
              //刷新列表
              axios
                  .get('/province/list/1/6')
                  .then(result => {
                    // console.log(result.data);
                    this.addresses = result.data.data;
                  });
              //重置数据
              this.resetAddress();

            }else{
              this.showWarning(result.data.message)
            }
          });
          this.editorDialogShow = false;
        }else {
          axios({
            method:'put',
            url:'/province/update'+this.address.provinceId,
            data:this.address,
          }).then(result =>{
            this.addresses = result.data.data
            if (result.data.code === 10000){
              console.log(result.data)
              this.$message.success(result.data.message);
              this.editorDialogShow = false;

              this.resetAddress();
            }else{
              this.$message.error(result.data.message)
            }
          })
        }
      },

      //2.编辑
      edit(item){
        //赋值，最好的做法是请求单个数据，再显示，数据回显。
        //显示dialog
        this.address.provinceProvince = item.provinceProvince;
        this.address.provinceCity = item.provinceCity;
        this.address.provinceCounty = item.provinceCounty;
        this.address.provinceTown = item.provinceTown;
        this.address.provinceVillage = item.provinceVillage;
        //console.log(item);
        this.editorDialogShow = true;
        this.editorCommitText = '修改地址';
        this.editorTitle = '编辑地址';
      },

      //3.删除
      deleteItem(item){
        //不是立马删除，而是给出警告提示
        this.deleteDialogShow = true;
        this.deleteMessage = item.provinceId;
        this.deleteTargetId = item.provinceId;
        //console.log(item);
      },

      doDeleteItem(){
        //删除操作
        axios.delete("/province/delete/"+this.deleteTargetId)
        .then(result => {
          console.log(result.data);
          if (result.data.code === 10000){
            this.$message({
              type:'success',
              center:true,
              message:result.data.message
            });
            //及时刷新列表
            axios
                .get('/province/list/1/6')
                .then(result => {
                  // console.log(result.data);
                  this.addresses = result.data.data;
                })
          }
        })
        this.deleteDialogShow = false;
      },
      resetAddress(){
        this.address.provinceProvince = '';
        this.address.provinceCity = '';
        this.address.provinceCounty = '';
        this.address.provinceTown = '';
        this.address.provinceCountry = '';
        this.address.provinceVillage = ''
      },

      showAddAddress(){
        this.editorTitle = '添加分类';
        this.editorCommitText = '添 加';
        this.editorDialogShow = true;
      },
      showWarning(msg){
        this.$message({
          message:msg,
          type:'warning',
          center:true
        })
      }

    },

    mounted() {
      axios
          .get('/province/list/1/6')
          .then(result => {
            // console.log(result.data);
            this.addresses = result.data.data;
          })
    }
  }
</script>
<style>

</style>