<template>
<div class="loop-box">
  <div class="loop-action-bar">
    <el-button type="primary" size="medium" @click="showAddLoop">添加图片</el-button>
  </div>

  <div class="loop-list-box">

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
  <div class="loop-dialog-box">

  </div>

</div>

</template>
<script>
  export default {
    methods:{
      showAddLoop(){

      }
    }
  }
</script>
<style>

</style>