<template>
  <div class="card-title">
    <slot>
        <span>火爆推荐</span>
    </slot>
  </div>
</template>

<script>
export default {
  comments: {
      
  }
}
</script>

<style scope>
.card-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 10px;
  align-content: center;
  text-align: center;
  color: #d4c0a7;
  position: relative;
  
  
}
.card-title span {
  position: relative;
}
.card-title span::before,
.card-title span::after {
  content: '•';
  color: #d4c0a7;
  font-size: 25px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.card-title span::before {
  left: -20px;
}

.card-title span::after {
  right: -20px;
}
</style>