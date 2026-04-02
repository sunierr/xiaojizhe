<template>
  <view class="container">
    <view class="header">
      <text class="title">发件箱</text>
      <text class="subtitle">投递你的独家报道</text>
    </view>

    <view class="card form-card">
      <view class="input-group">
        <text class="label">报道标题</text>
        <input class="input-box" v-model="form.title" placeholder="请输入抓人眼球的标题" placeholder-class="placeholder" />
      </view>
      
      <view class="input-group">
        <text class="label">正文详情</text>
        <textarea class="textarea-box" v-model="form.content" placeholder="在这里写下你的深度报道..." placeholder-class="placeholder" />
      </view>

      <view class="input-group">
        <text class="label">标签</text>
        <input class="input-box" v-model="form.tag" placeholder="如：突发, 社会, 校园" placeholder-class="placeholder" />
      </view>

      <view class="upload-area">
        <view class="upload-btn" @click="chooseImage">
          <text class="plus" v-if="!form.images.length">+</text>
          <image v-else class="preview-img" :src="form.images[0]" mode="aspectFill" />
        </view>
        <text class="upload-tips">{{ form.images.length ? '已选择 ' + form.images.length + ' 张照片' : '添加配图 (最多 9 张)' }}</text>
      </view>

      <button class="btn-primary submit-btn" :loading="submitting" @click="submitReport">提交报道</button>
    </view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { BASE_URL, TEST_USER_ID } from '@/utils/api';

const form = reactive({
  title: '',
  content: '',
  tag: '',
  images: []
});

const submitting = ref(false);

const chooseImage = () => {
  uni.chooseImage({
    count: 9,
    success: (res) => {
      form.images = res.tempFilePaths;
    }
  });
};

const submitReport = async () => {
  if (!form.title || !form.content) {
    return uni.showToast({ title: '请填写标题和内容', icon: 'none' });
  }

  submitting.value = true;
  try {
    const uploadedUrls = [];
    
    // 1. Upload each image first
    if (form.images.length > 0) {
      uni.showLoading({ title: '正在上传图片...' });
      for (const tempPath of form.images) {
        const uploadRes = await new Promise((resolve, reject) => {
          uni.uploadFile({
            url: `${BASE_URL}/reports/upload`,
            filePath: tempPath,
            name: 'file',
            success: (res) => {
              if (res.statusCode === 200) {
                resolve(JSON.parse(res.data).url);
              } else {
                reject(new Error('上传失败'));
              }
            },
            fail: reject
          });
        });
        uploadedUrls.push(uploadRes);
      }
      uni.hideLoading();
    }

    // 2. Submit the report with the new URLs
    const res = await uni.request({
      url: `${BASE_URL}/reports`,
      method: 'POST',
      data: {
        title: form.title,
        content: form.content,
        tag: form.tag || '未分类',
        author: TEST_USER_ID,
        images: uploadedUrls
      }
    });

    if (res.statusCode === 201) {
      uni.showToast({ title: '提交成功', icon: 'success' });
      // Clear form
      form.title = '';
      form.content = '';
      form.tag = '';
      form.images = [];
      
      setTimeout(() => {
        uni.switchTab({ url: '/pages/index/index' });
      }, 1500);
    } else {
      uni.showToast({ title: '提交失败', icon: 'none' });
    }
  } catch (error) {
    uni.hideLoading();
    uni.showToast({ title: error.message || '网络错误', icon: 'none' });
  } finally {
    submitting.value = false;
  }
};
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
.preview-img {
  width: 100%;
  height: 100%;
  border-radius: 8px;
}
.upload-tips {
  font-size: 12px;
  color: #999;
}
.submit-btn {
  width: 100%;
}
</style>
