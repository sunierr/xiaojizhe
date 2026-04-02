<template>
  <view class="container" v-if="report">
    <image class="main-image" :src="report.images?.length ? formatFileUrl(report.images[0]) : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800'" mode="aspectFill" />
    
    <view class="content-wrapper">
      <view class="header-section">
        <text class="tag">{{ report.tag }}</text>
        <text class="title">{{ report.title }}</text>
        <view class="author-info">
          <image class="author-avatar" :src="report.author?.avatar || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100'" mode="aspectFill" />
          <view class="author-details">
            <text class="author-name">{{ report.author?.username || '匿名记者' }}</text>
            <text class="date">{{ formatDate(report.createdAt) }}</text>
          </view>
        </view>
      </view>

      <view class="body-section">
        <text class="report-content">{{ report.content }}</text>
      </view>
      
      <view class="gallery" v-if="report.images && report.images.length > 1">
        <image 
          v-for="(img, index) in report.images.slice(1)" 
          :key="index" 
          class="gallery-image" 
          :src="formatFileUrl(img)" 
          mode="aspectFill" 
          @click="previewImage(index + 1)"
        />
      </view>
    </view>
    
    <view class="action-bar">
      <view class="action-item">
        <text class="icon">💬</text>
        <text class="count">24</text>
      </view>
      <view class="action-item">
        <text class="icon">❤️</text>
        <text class="count">128</text>
      </view>
      <button class="share-btn">分享报道</button>
    </view>
  </view>
  <view class="loading" v-else>
    <text>正在加载报道...</text>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { BASE_URL, formatFileUrl } from '@/utils/api';

const props = defineProps(['id']);
const report = ref(null);

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};

const loadDetail = async (id) => {
  try {
    const res = await uni.request({
      url: `${BASE_URL}/reports/${id}`
    });
    if (res.statusCode === 200) {
      report.value = res.data;
    } else {
      uni.showToast({ title: '报道不存在', icon: 'none' });
    }
  } catch (error) {
    console.error('Failed to load detail:', error);
  }
};

const previewImage = (startIndex) => {
  uni.previewImage({
    urls: report.value.images.map(url => formatFileUrl(url)),
    current: formatFileUrl(report.value.images[startIndex])
  });
};

onMounted(() => {
  // Uniapp gets id from onLoad, but with <script setup> and props:
  // Usually we'd use onLoad for page params, but props work if using uni-router or certain builds.
  // For standard uniapp, we usually use onLoad.
});

// Since standard uniapp doesn't pass props automatically to pages via defineProps, 
// I'll use onLoad from @dcloudio/uni-app or just use the current route.
import { onLoad } from '@dcloudio/uni-app';
onLoad((options) => {
  if (options.id) {
    loadDetail(options.id);
  }
});
</script>

<style scoped>
.container {
  padding-bottom: 80px;
  background: #fff;
  min-height: 100vh;
}
.main-image {
  width: 100%;
  height: 240px;
}
.content-wrapper {
  padding: 24px 20px;
}
.tag {
  color: #C4454C;
  font-size: 12px;
  font-weight: 600;
  background: rgba(196, 69, 76, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 12px;
}
.title {
  font-size: 24px;
  font-weight: bold;
  color: #1a1a1a;
  line-height: 1.4;
  display: block;
  margin-bottom: 20px;
}
.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}
.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-right: 12px;
}
.author-name {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  display: block;
}
.date {
  font-size: 12px;
  color: #999;
}
.report-content {
  font-size: 16px;
  line-height: 1.8;
  color: #444;
  text-align: justify;
}
.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}
.gallery-image {
  width: calc(33.33% - 7px);
  height: 100px;
  border-radius: 8px;
}
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}
.action-item {
  display: flex;
  align-items: center;
  margin-right: 24px;
}
.icon {
  font-size: 20px;
  margin-right: 4px;
}
.count {
  font-size: 14px;
  color: #666;
}
.share-btn {
  margin-left: auto;
  background: #C4454C;
  color: #fff;
  font-size: 14px;
  padding: 8px 20px;
  border-radius: 20px;
  line-height: 1;
}
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  color: #999;
}
</style>
