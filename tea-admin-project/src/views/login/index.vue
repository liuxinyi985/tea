<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="title-container">
        <h3 class="title">茶叶商城管理系统</h3>
      </div>

      <el-form-item prop="user_name">
        <el-input
          v-model="loginForm.user_name"
          placeholder="用户名"
          type="text"
          prefix-icon="el-icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          placeholder="密码"
          type="password"
          prefix-icon="el-icon-lock"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click.native.prevent="handleLogin"
      >
        登录
      </el-button>

      <div class="register-link">
        <router-link to="/register"> 还没有账号？立即注册 </router-link>
      </div>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  name: 'LoginView',
  data() {
    return {
      loginForm: {
        user_name: '',
        password: '',
      },
      loginRules: {
        user_name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      try {
        await this.$refs.loginForm.validate();
        this.loading = true;
        const res = await login(this.loginForm);
        if (res.code === 0) {
          sessionStorage.setItem('token', res.data.token);
          this.$message.success('登录成功');
          this.$router.push('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f3f3f3;

  .login-form {
    width: 420px;
    padding: 35px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .title-container {
    text-align: center;
    margin-bottom: 30px;
    .title {
      font-size: 26px;
      color: #333;
    }
  }

  .register-link {
    text-align: center;
    font-size: 14px;
    color: #409eff;
  }
}
</style>
