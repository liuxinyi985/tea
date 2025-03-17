<template>
  <div class="register-container">
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules"
      class="register-form"
    >
      <div class="title-container">
        <h3 class="title">注册账号</h3>
      </div>
     <el-form-item label="昵称" prop="nick_name">
        <el-input
          v-model="registerForm.nick_name"
          placeholder="昵称"
          type="text"
          prefix-icon="el-icon-user"
        />
      </el-form-item>
      <el-form-item prop="user_name">
        <el-input
          v-model="registerForm.user_name"
          placeholder="用户名"
          type="text"
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="密码"
          type="password"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>

      <el-form-item prop="confirmPassword">
        <el-input
          v-model="registerForm.confirmPassword"
          placeholder="确认密码"
          type="password"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleRegister"
      >
        注册
      </el-button>

      <div class="login-link">
        <router-link to="/login">
          已有账号？立即登录
        </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { register } from '@/api/user'

export default {
  name: 'RegisterView',
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerForm: {
        user_name: '',
        password: '',
        confirmPassword: '',
        nick_name: '',
      },
      registerRules: {
        nick_name: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        user_name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validatePassword, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    async handleRegister() {
      try {
        await this.$refs.registerForm.validate()
        this.loading = true
        const res = await register({
          user_name: this.registerForm.user_name,
          password: this.registerForm.password,
          confirm_password: this.registerForm.confirmPassword,
          nick_name: this.registerForm.nick_name,
        })
        if (res.code === 0) {
          this.$message.success('注册成功')
          this.$router.push('/login')
        }
      } catch (error) {
        console.error(error)
        this.$message.error(error.message || '注册失败')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;

  .register-form {
    width: 420px;
    padding: 35px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }

  .title-container {
    text-align: center;
    margin-bottom: 30px;
    .title {
      font-size: 26px;
      color: #333;
    }
  }

  .login-link {
    text-align: center;
    font-size: 14px;
    color: #409EFF;
  }
}
</style>