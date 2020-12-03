<template>
  <el-upload class="avatar-uploader" action="https://up-z2.qiniup.com" :data="uploadData" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import { GetQuiniuToken } from '@/api/account'
export default {
  name: '',
  components: {},
  props: {
    // 接收到的数据属于“静态数据”，是单向数据，不能反向修改
    imgUrl: {
      type: String,
      default: ''
    },
    requestFlag: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      imageUrl: '',
      uploadData: {}
    }
  },
  watch: {
    imgUrl: {
      handler(newValue) {
        this.imageUrl = newValue
      }
    }
  },
  beforeMount() {
    // this.getQiniuToken()
  },
  methods: {
    clear() {
      this.imageUrl = ''
    },
    getQiniuToken() {
      // 在工作中，
      const requestData = {
        ak: 'V5y-8rIHXtKLJX4bjtROlNtydUxVsm8JMgMiS9w-',
        sk: 'XB22VtWna_hNs_YvX6KMXiwbL3L7hEHVlEkHeUTT',
        buckety: 'carstest-open'
      }
      GetQuiniuToken(requestData).then((response) => {
        const data = response.data
        if (data.token) {
          this.$store.commit('common/SET_UPLOAD_TOKEN', data.token)
        }
      })
    },
    handleAvatarSuccess(res, file) {
      console.log('🚀 ~ file: index.vue ~ line 59 ~ res', res)
      this.imageUrl = `http://qj8zgc8uk.hn-bkt.clouddn.com/${res.key}`
      this.$emit('update:value', this.imageUrl)
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      const fileName = file.name
      const key = encodeURI(fileName)
      this.uploadData.key = key
      this.uploadData.token = this.$store.state.common.upload_token
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang='scss'>
</style>
