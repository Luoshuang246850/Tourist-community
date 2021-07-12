<el-form-item label="封面">
  <el-upload
      class="avatar-uploader"
      action="/admin/image"
      :on-success="uploadSuccess"
      :before-upload="beforeUpload">
    <img v-if="loop.imageURL!==''" :src="loop.imageURL" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</el-form-item>

<script>
export default {
  methods:{
    beforeUpload(){
      console.log('beforeUpload...')
    },
    uploadSuccess(){

    }
  }
}

</script>