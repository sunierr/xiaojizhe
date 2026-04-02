<template>
  <view class="container">
    <view class="header">
      <text class="title">发件箱</text>
      <text class="subtitle">投递你的独家报道</text>
    </view>

    <view class="card form-card">
      <view class="input-group">
        <text class="label">报道标题</text>
        <input class="input-box" placeholder="请输入抓人眼球的标题" placeholder-class="placeholder" />
      </view>
      
      <view class="input-group">
        <text class="label">正文详情</text>
        <textarea class="textarea-box" placeholder="在这里写下你的深度报道..." placeholder-class="placeholder" />
      </view>

      <view class="upload-area">
        <view class="upload-btn">
          <text class="plus">+</text>
        </view>
        <text class="upload-tips">添加配图 (最多 9 张)</text>
      </view>

      <button class="btn-primary submit-btn">提交报道</button>
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
.form-card {
  padding: 24px;
}
.input-group {
  margin-bottom: 20px;
}
.label {
  font-size: 14px;
  color: #555;
  font-weight: 500;
  margin-bottom: 8px;
  display: block;
}
.input-box {
  background: #F4F5F7;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 15px;
  height: 44px;
  box-sizing: border-box;
}
.textarea-box {
  background: #F4F5F7;
  border-radius: 8px;
  padding: 16px;
  font-size: 15px;
  width: 100%;
  height: 120px;
  box-sizing: border-box;
}
.placeholder {
  color: #bbb;
}
.upload-area {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
}
.upload-btn {
  width: 60px;
  height: 60px;
  background: #F4F5F7;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
}
.plus {
  font-size: 30px;
  color: #A0A4B1;
  font-weight: 300;
  margin-top: -4px;
}
.upload-tips {
  font-size: 12px;
  color: #999;
}
.submit-btn {
  width: 100%;
}
</style>
