<template>
  <div class="my">
    <div class="top">
      <div class="successLogin" v-if="loginStatus">
        <div class="img">
          <img src="https://img01.yzcdn.cn/vant/cat.jpeg" alt="" />
        </div>
        <div class="bottom">
          <span>小猫</span>
        </div>
      </div>

      <van-button v-else type="warning" @click="login">登录/注册</van-button>
    </div>
    <section>
      <van-cell title="地址列表" @click="goAddress"  is-link />
      <van-cell title="退出登录" @click="loginOut" is-link />
    </section>
    <Tabbar></Tabbar>
  </div>
</template>

<script>
import Tabbar from '../components/common/Tabbar.vue';
import { mapState } from 'vuex';
import { Dialog } from 'vant';
export default {
  name: 'My',
  components: {
    Tabbar,
  },
  created() {
    console.log(this.loginStatus, 'loginStatus');
  },
  computed: {
    ...mapState({
      loginStatus: (state) => state.user.loginStatus,
    }),
  },
  methods: {
    goAddress() {
      this.$router.push('/address');
    },
    login() {
      this.$router.push('/login');
    },
    loginOut() {
      Dialog.confirm({
       
        message: '您确定要退出登录吗？',
      })
        .then(() => {
          this.$store.commit('logOut');
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>
<style lang="less" scoped>
.my {
  .top {
    height: 200px;
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    button {
      width: 100px;
      height: 40px;
      border-radius: 20px;
    }
  }
  .successLogin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .img {
    width: 75px;
    height: 75px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .bottom {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    span {
      margin: 2px 0;
    }
  }
}
</style>
