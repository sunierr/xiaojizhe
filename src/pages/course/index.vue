<template>
  <view class="container">
    <view class="header">
      <text class="title">提升技能</text>
      <text class="subtitle">专业记者培训课程</text>
    </view>
    
    <view class="course-list">
      <view class="card course-card" v-for="n in 2" :key="n">
        <view class="course-info">
          <text class="course-title">新闻伦理与深度调查采访</text>
          <text class="course-desc">掌握核心采访技巧与道德准则</text>
        </view>
        <button class="btn-primary enroll-btn">立即报名</button>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.container {
  padding: 20px;
}
.header {
  margin-bottom: 24px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  color: #1a1a1a;
  display: block;
}
.subtitle {
  font-size: 14px;
  color: #999;
  margin-top: 4px;
  display: block;
}
.course-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
}
.course-info {
  flex: 1;
  padding-right: 16px;
}
.course-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 6px;
}
.course-desc {
  font-size: 12px;
  color: #777;
  display: block;
}
.enroll-btn {
  font-size: 14px;
  padding: 6px 16px;
  border-radius: 20px;
  margin: 0;
}
</style>
