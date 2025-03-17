<template>
	<div class='Tabbar-container'>
		<ul class="nav">
			<li v-for="item in tabbarList" :key="item.title"  @click="routerRedirect(item.path)">
				<img :src="$route.path.includes(item.path)?item.activeIcon:item.icon" alt=""> 
				<span :class="$route.path.includes(item.path)?'active':''">
					{{ item.title }}
				</span>
			</li>
			
		</ul>
	</div>
</template>

<script>

export default {
  name: "Tabbar",
  data() {
			return {
				tabbarList: [
					{
						title: "首页",
						icon: require("@/assets/images/home.png"),
						path: "/home",
						activeIcon: require("@/assets/images/home-select.png")
					},
					{
						title: "分类",
						icon:require("@/assets/images/list.png") ,
						path: "/list",
						activeIcon: require("@/assets/images/list-select.png")
					},
					{
						title: "购物车",
						icon: require("@/assets/images/cart.png"),
						path: "/cart",
						activeIcon: require("@/assets/images/cart-select.png")
					},
					{
						title: "我的",
						icon: require("@/assets/images/my.png"),
						path: "/my",
						activeIcon: require("@/assets/images/my-select.png")
					}
				]
			};
  },
  methods: {
      routerRedirect(path) {
		if(this.$route.path !== path) {
           this.$router.push(path);
		}
			
      }
  }
};
</script>
<style lang="scss">
.Tabbar-container {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 50px;
  z-index: 999;
  display: flex;
  align-items: center;
  background-color: #fff;
}
.nav {
  display: flex;
  justify-content: space-around;
  list-style: none;
  width: 100%;
  li{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.active {
		color:red;
	}
}
}

.Tabbar-container ul li img{
	width: 30px;
	height: 30px;
}
</style>