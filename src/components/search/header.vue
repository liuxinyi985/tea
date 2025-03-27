<template>
  <div class="header">
    <div @click="goBack" class="icon">
      <van-icon name="arrow-left" />
    </div>

    <van-search
      background="#b0352f"
      v-model="searchInput"
      @search="onSearch"
      class="search"
      placeholder="请输入搜索关键词"
    >
    </van-search>
    <div class="search-btn" @click="Search" >搜索</div>
  </div>
</template>

<script>
export default {
  props: {
    searchContent: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchInput: this.searchContent || '',
      searchArr: [],
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    Search() {
      this.onSearch(this.searchInput);
    },
    onSearch(val) {
      if (val.trim() === '') {
        return;
      }
      if (!localStorage.getItem('searchArr')) {
        localStorage.setItem('searchArr', '[]');
      } else {
        this.searchArr = JSON.parse(localStorage.getItem('searchArr'));
      }
      this.searchArr.push(val);
      let newArr = new Set(this.searchArr);
      console.log(this.searchArr, 'this.searchArr');

      localStorage.setItem('searchArr', JSON.stringify(Array.from(newArr)));
      this.$router.push({
        path: 'result',
        query: { search: this.searchInput },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #b0352f;
  .icon {
    color: #fff;
    margin: 0 10px;
  }
  .search {
    flex: 1;
    padding: 5px;
    ::v-deep .van-search__content {
      border-radius: 15px;
    }
  }
  .search-btn {
    color: #fff;
    margin: 0 15px;
  }
}
</style>
