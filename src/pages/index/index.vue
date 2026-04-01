<template>
  <view class="container">
    <view class="header">
      <text class="title">最新报道</text>
      <text class="subtitle">发现真实的力量</text>
    </view>
    
    <view class="report-list">
      <view class="card report-card" v-for="item in 3" :key="item">
        <image class="cover" src="" mode="aspectFill" />
        <view class="content">
          <text class="tag">独家报道</text>
          <text class="headline">重磅：科技创新在今年迎来了巨大飞跃与突破</text>
          <text class="meta">张记者 · 2小时前</text>
        </view>
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
  padding-top: 10px;
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
.report-card {
  padding: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.cover {
  width: 100%;
  height: 160px;
  background-color: #EAEBEE;
}
.content {
  padding: 16px;
}
.tag {
  display: inline-block;
  font-size: 10px;
  color: #C4454C;
  background: rgba(196, 69, 76, 0.08);
  padding: 4px 8px;
  border-radius: 4px;
  margin-bottom: 8px;
}
.headline {
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 12px;
  display: block;
}
.meta {
  font-size: 12px;
  color: #888;
}
</style>
