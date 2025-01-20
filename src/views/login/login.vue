<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    >
      <template #right>
        <van-icon name="wap-home-o" @click="$router.push('/home')" size="18" />
      </template>
    </van-nav-bar>

    <div v-if="showFlag === 0" class="loginForm">
      <van-form ref="form">
        <van-field
          style="margin: 16px 0"
          v-model="username"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          style="margin: 16px 0"
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="submitForm"
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
    <div v-else class="registerForm">
      <van-form>
        <van-field
          style="margin: 16px 0"
          v-model="registerForm.username"
          name="账号"
          label="账号"
          placeholder="账号"
          :rules="[{ required: true, message: '请填写账号' }]"
        />
        <van-field
          style="margin: 16px 0"
          v-model="registerForm.password"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <van-field
          style="margin: 16px 0"
          v-model="registerForm.passwordConfirm"
          type="password"
          name="密码"
          label="确认密码"
          placeholder="密码"
          :rules="[
            {
              validator: (val) => val === registerForm.password,
              message: '密码不一致',
            },
          ]"
        />
        <div style="margin: 16px">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="register"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>

    <div class="footer">
      <div @click="showFlag = 1" class="register">
        <span style="margin-right: 4px"><van-icon name="manager-o" /></span>
        <span>注册账号</span>
      </div>
      <div @click="showFlag = 0" class="passwordLogin">
        <span style="margin-right: 3px"><van-icon name="eye-o" /></span>
        <span> 密码登录 </span>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/common/Tabbar.vue';
import { login } from '@/api/home';
import { addUser } from '@/api/home';
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
      username: '',
      password: '',
      showFlag: 0,
      tel: '',
      registerForm: {
        username: '',
        password: '',
        passwordConfirm: '',
      },
    };
  },
  methods: {
    ...mapMutations(['userLogin']),
    onSubmit(values) {
      console.log('submit', values);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    async submitForm() {
      const isValid = this.$refs.form.validate();
      console.log(isValid, 'isValid');
      
      if (!isValid) {
        return;
      }
      await login({ userTel: this.username, userPwd: this.password })
        .then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.userLogin(res.data[0]);
            this.$router.push('/my');
          } else {
            this.$toast.fail('账号或密码错误');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async register() {
      await addUser({
        userTel: this.registerForm.username,
        userPwd: this.registerForm.password,
      }).then((res) => {
        console.log(res);
        if (res.code === 200) {
          this.$toast.success('注册成功');
          this.showFlag = 0;
        } else {
          this.$toast.fail('账号已存在');
        }
      }).catch((error) => {
        console.log(error);
      })
    },
  },
};
</script>

<style>
.footer {
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  margin-top: 20px;
}
</style>
