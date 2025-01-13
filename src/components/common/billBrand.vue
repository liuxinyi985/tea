<template>
  <div class="billBrandContainer">
    <div class="billBrand">
       
      <img :src="imageList[brandId]" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    brandId: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
     imageList:[
     require("@/assets/images/dhp.jpeg"),
     require("@/assets/images/dhp.jpeg"),
     require("@/assets/images/tgy.jpeg"),
     require("@/assets/images/lc.jpg"),
     require("@/assets/images/pe.jpg"),
     require("@/assets/images/cj.jpg"),
     require("@/assets/images/hc.jpg"),
     ]
    }
  },
  methods: {
  
  },
  created() {
    
  }
}
</script>

<style lang="sass" scoped>

.billBrandContainer{
    img {
        width: 100%;
        height: 150px;
        
    }
}

</style>