<template>
  <view class="container">
    <view class="user-header">
      <view class="avatar-area">
        <image class="avatar" src="" />
      </view>
      <view class="info-area">
        <text class="name">媒体人_A001</text>
        <text class="role">认证记者</text>
      </view>
    </view>

    <view class="stats-row">
      <view class="stat-item">
        <text class="stat-val">12</text>
        <text class="stat-label">已发报道</text>
      </view>
      <view class="stat-item">
        <text class="stat-val">5</text>
        <text class="stat-label">所修课程</text>
      </view>
      <view class="stat-item">
        <text class="stat-val">100%</text>
        <text class="stat-label">采纳率</text>
      </view>
    </view>

    <view class="list-group">
      <view class="card list-item">
        <text class="item-text">我的草稿箱</text>
        <text class="arrow">></text>
      </view>
      <view class="card list-item">
        <text class="item-text">我的课程</text>
        <text class="arrow">></text>
      </view>
      <view class="card list-item">
        <text class="item-text">帮助与关于</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
</script>

<style scoped>
.container {
  padding: 0;
}
.user-header {
  background: #C4454C;
  padding: 40px 20px 60px;
  display: flex;
  align-items: center;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
}
.avatar {
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #FFF;
  border: 2px solid rgba(255,255,255,0.4);
}
.info-area {
  margin-left: 16px;
}
.name {
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
  display: block;
}
.role {
  color: rgba(255,255,255,0.8);
  font-size: 12px;
  background: rgba(0,0,0,0.1);
  padding: 2px 8px;
  border-radius: 4px;
  margin-top: 6px;
  display: inline-block;
}

.stats-row {
  display: flex;
  margin: -30px 20px 24px;
  background: #fff;
  border-radius: 12px;
  padding: 16px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
.stat-item {
  flex: 1;
  text-align: center;
  border-right: 1px solid #F0F0F0;
}
.stat-item:last-child {
  border-right: none;
}
.stat-val {
  font-size: 20px;
  font-weight: bold;
  color: #C4454C;
  display: block;
}
.stat-label {
  font-size: 12px;
  color: #888;
  margin-top: 4px;
  display: block;
}

.list-group {
  padding: 0 20px;
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  margin-bottom: 12px;
  border-radius: 12px;
}
.item-text {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}
.arrow {
  color: #ccc;
  font-weight: bold;
}
</style>
