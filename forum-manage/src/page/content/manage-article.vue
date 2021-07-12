<template>
  <div class="address-box">

    <div class="search-bar">
      <!--      顶部搜索   添加   批量删除-->
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

      <!--      //数据显示-->
      <!--      //绑定addresses数据列表-->
      <el-table
          border
          v-loading="loading"
          :data="addresses"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="50">
        </el-table-column>
        <el-table-column
            fixed
            prop="provinceProvince"
            label="美食名称"
            width="250">
        </el-table-column>
        <el-table-column
            prop="provinceCity"
            label="商家名称"
            width="250">
        </el-table-column>
        <el-table-column
            prop="provinceCity"
            label="地址"
            width="250">
        </el-table-column>
        <el-table-column
            prop="provinceCity"
            label="类别"
            width="150">
        </el-table-column>
        <el-table-column
            prop="provinceCity"
            label="状态"
            width="150">
        </el-table-column>
        <el-table-column
            label="创建日期"
            width="200">
          <template slot-scope="scope">
            <span v-text="formatDate(scope.row.createTime)"></span>
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150">
          <!--          //实现具体数据的编辑和删除-->
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--    //dialog部分-->
    <div class="address-dialog-box">

      <!--删除dialog提示   deleteDialogShow:false,   -->
      <el-dialog
          title="删除提示"
          :visible.sync="deleteDialogShow"
          width="400px">
        <span>确定删除: {{deleteTargetId}} 这个地址？</span>
        <span slot="footer" class="dialog-footer">
          <el-button size="mini" type="danger" @click="deleteDialogShow = false">取 消</el-button>
          <el-button size="mini" type="primary" @clicks="doDeleteItem()">确 定</el-button>
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

          <el-form label-width="100px" size="medium" >
            <el-form-item label="美食名称">
              <el-input v-model="address.provinceProvince"></el-input>
            </el-form-item>
            <el-form-item label="商家名称">
              <el-input v-model="address.provinceCity"></el-input>
            </el-form-item>
            <el-form-item label="简介">
              <el-input v-model="address.provinceTown"></el-input>
            </el-form-item>
            <el-form-item label="详情">
<!--              //maxlength限制长度-->
              <el-input v-model="address.provinceCounty"
                        type="textarea"
                        :row="2"
                        maxlength="128"
                        resize="none">
              </el-input>
            </el-form-item>
            <el-form-item label="价格">
              <el-input v-model="address.provinceTown"></el-input>
            </el-form-item>
            <el-form-item label="打折">
              <el-input v-model="address.provinceVillage"></el-input>
            </el-form-item>
            <el-form-item label="点击率">
              <el-input v-model="address.provinceTown"></el-input>
            </el-form-item>
            <el-form-item label="类别">
              <el-select v-model="value" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="图片">
              <!-- action= 上传路径-->
              <el-upload

                  class="avatar-uploader"
                  action="/food/upload1"
                  :show-file-list="false"
                  :on-success="uploadSuccess"
                  :before-upload="beforeUpload">

                <img class="avatar" v-if="images.imageUrl" :src="images.imageUrl">
                <i class="el-icon-plus avatar-uploader-icon"></i> <!--v-else-->
              </el-upload>
            </el-form-item>


          </el-form>

        </span>
        <!--底部操作按钮-->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editorDialogShow=false" size="medium" type="danger">取 消</el-button>
          <el-button type="primary" @click="postAddress" size="medium">{{editorCommitText}}</el-button>
        </span>
      </el-dialog>
    </div>

    <div class="page-navigation-box">
      
    </div>

  </div>

</template>
<script>
const axios = require('axios');
import * as dateUtils from '../../utils/date'

export default {
  data(){
    return {

      loading: false,

      images:{
        imageUrl:''
      },


      //类别选择
      options:[{
        value:'选项一',
        label:'一'
      },{
        value: '选项二',
        label: '二'
      }
      ],
      value:'',



      //搜索
      search:{
        provinceId: '',
        provinceProvince: '',
      },


      editorCommitText:'',
      editorDialogShow:false,
      editorTitle:'',
      editorTargetId:'',

      addresses:[],  //地址列表

      deleteDialogShow:false,
      deleteMessage:'',
      deleteTargetId:'',
      address:{
        provinceId:'',
        provinceProvince: '',
        provinceCity:'',
        provinceCounty:'',
        provinceTown:'',
        provinceCountry:'',
        provinceVillage:'',
      }
    }
  },
  methods:{

    formatDate(dateStr){
      let date = new Date(dateStr);
      return dateUtils.formatDate(date,'yyyy-MM-dd hh:mm:ss')
    },

    beforeUpload(){
      console.log("uploadSuccess...");
    },
    uploadSuccess(response){
      console.log(response);
      if (response.data.code === 10000){
        //上传成功
        //回显图片
        //图片地址
        this.images.imageUrl = '' +response.data.id;
        this.$message.success(response.data.message)
      }else {
        this.$message.error(response.data.message)
      }

    },

    doSearch(){
      axios({
        method:'get',
        url:'/province/find/'+this.search.provinceId,
        // url:'/province/search?keyword='+this.search.provinceId,

      }).then(result => {
        console.log(result.data.data)
        if (result.data.code === 10000){
          this.$message.success(result.data.message)
        } else {
          this.$message.error(result.data.message)
        }
      })
    },
    cleanSearch(){
      this.search.provinceId='';
      this.search.provinceProvince='';
    },
    //1.添加地址
    postAddress(){

      //检查内容，设置一些限制
      if (this.address.provinceProvince === ''){
        this.showWarning('名称不能为空！');
        return;
      }
      if (this.address.provinceCity === ''){
        this.showWarning('商家不能为空！')
        return ;
      }
      if (this.address.provinceId === ''){
        axios({
          method:'post',
          url:'/province/add',
          data:this.address,
        }).then(result => {
          if (result.data.code === 10000){
            console.log(result.data)
            this.$message({
              message:'添加成功',
              center:true,
              type:'success'
            });
            //刷新列表
            this.listAddress();
            //重置数据
            this.resetAddress();
            this.editorDialogShow = false;
          }else{
            this.showWarning(result.data.message)
          }
        });
      }else{
        axios({
          method:'put',
          url:'/province/update/'+this.editorTargetId,
          data:this.address,
        }).then(result =>{

          if (result.data.code === 10000){
            this.editorDialogShow = false;
            console.log(result.data)
            this.$message.success(result.data.message);
            this.listAddress();
            this.resetAddress();
          }else{
            this.$message.error(result.data.message)
          }
        });
      }


    },

    //2.编辑
    edit(item){
      //赋值，最好的做法是请求单个数据，再显示，数据回显。
      this.address.provinceId = item.provinceId;
      this.address.provinceProvince = item.provinceProvince;
      this.address.provinceCity = item.provinceCity;
      this.address.provinceTown = item.provinceTown;
      this.address.provinceCounty = item.provinceCounty;
      this.address.provinceCountry = item.provinceCountry;
      this.address.provinceVillage = item.provinceVillage;
      //console.log(item);
      //显示dialog  dialog相关数据赋值  获取当前数据id
      this.editorDialogShow = true;
      this.editorCommitText = '修改地址';
      this.editorTitle = '编辑地址';
      this.editorTargetId = item.provinceId;
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
              this.listAddress();
            }
          })
      this.deleteDialogShow = false;
    },

    //重置数据
    resetAddress(){
      this.address.provinceId = '';
      this.address.provinceProvince = '';
      this.address.provinceCity = '';
      this.address.provinceTown = '';
      this.address.provinceCounty = '';
      this.address.provinceCountry = '';
      this.address.provinceVillage = '';
    },

    //添加dialog相关数据
    showAddAddress(){
      this.editorTitle = '添加分类';
      this.editorCommitText = '添 加';
      this.editorDialogShow = true;
      this.resetAddress();  //添加的dialog要重置一下数据，前面通过判断id是否为空来进行添加/编辑操作，编辑相关代码有点小问题，没有此行添加会变成编辑操作
    },

    //警告提示  msg警告消息
    showWarning(msg){
      this.$message({
        message:msg,
        type:'warning',
        center:true
      })
    },


    //获取数据列表
    listAddress(){
      this.loading = true;
      axios
          .get('/province/list/1/6')
          .then(result => {
            this.loading = false;
            // console.log(result.data);
            this.addresses = result.data.data;  //得到数据列表
          })
    }

  },

  mounted() {
    this.listAddress();
  }
}
</script>
<style>
.address-list-box .el-table {
  border: 1px solid #e7e7e7;
}
.avatar-uploader .avatar-uploader-icon{
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  border: #8c939d dashed;
  text-align: center;}
.address-list-box .cell{
  text-align: center;
}

</style>