<template>
  <div>
    <!--显示我们的内容-->
    <div class="content-title-box" v-text="$route.name"></div>
    <div class="content-container-box">
      <router-view></router-view>
    </div>

  </div>
</template>
<script>
  export default {

  }
</script>
<style>
.content-title-box{
  padding: 10px;
  border-bottom: solid 1px #e6e6e6;
}
.content-container-box{
  padding: 10px;
}
</style>
