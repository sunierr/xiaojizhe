<template>
  <view class="container">
    <view class="header">
      <text class="title">最新报道</text>
      <text class="subtitle">发现真实的力量</text>
    </view>
    
    <view class="report-list">
      <!-- Skeleton Loading -->
      <view class="skeleton-list" v-if="loading && page === 1">
        <view class="card report-card skeleton-card" v-for="i in 3" :key="i">
          <view class="skeleton-cover"></view>
          <view class="content">
            <view class="skeleton-tag"></view>
            <view class="skeleton-title"></view>
            <view class="skeleton-meta"></view>
          </view>
        </view>
      </view>
      
      <!-- Empty State -->
      <view class="empty-state" v-else-if="reports.length === 0">
        <view class="empty-circle"></view>
        <text class="empty-text">暂无最新报道，快来投稿吧！</text>
      </view>

      <!-- Real Data -->
      <template v-else>
        <view class="card report-card" v-for="item in reports" :key="item._id" @click="goToDetail(item._id)">
          <image class="cover" :src="item.images && item.images.length > 0 ? formatFileUrl(item.images[0]) : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600'" mode="aspectFill" />
          <view class="content">
            <text class="tag">{{ item.tag }}</text>
            <text class="headline">{{ item.title }}</text>
            <text class="meta">{{ item.author?.username || '匿名记者' }} · {{ formatTime(item.createdAt) }}</text>
          </view>
        </view>
        <view class="loading-more" v-if="loading && page > 1">拼命加载中...</view>
        <view class="no-more" v-if="!hasMore && reports.length > 0">- 到底啦 -</view>
      </template>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import { fetchReports, formatFileUrl } from '@/utils/api';

const reports = ref([]);
const page = ref(1);
const limit = ref(10);
const hasMore = ref(true);
const loading = ref(false);

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes || 1}分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.floor(hours / 24)}天前`;
};

const goToDetail = (id) => {
  uni.navigateTo({
    url: `/pages/index/detail?id=${id}`
  });
};

const loadReports = async (isRefresh = false) => {
  if (loading.value || (!hasMore.value && !isRefresh)) return;
  
  loading.value = true;
  if (isRefresh) {
    page.value = 1;
    hasMore.value = true;
  }
  
  try {
    const res = await fetchReports(page.value, limit.value);
    if (res.statusCode === 200) {
      if (isRefresh) {
        reports.value = res.data.data;
      } else {
        reports.value.push(...res.data.data);
      }
      
      if (page.value >= res.data.meta.pages) {
        hasMore.value = false;
      } else {
        page.value++;
      }
    }
  } catch (error) {
    console.error('Failed to load reports:', error);
  } finally {
    loading.value = false;
    if (isRefresh) uni.stopPullDownRefresh();
  }
};

onShow(() => {
  if (reports.value.length === 0) {
    loadReports(true);
  }
});

onPullDownRefresh(() => {
  loadReports(true);
});

onReachBottom(() => {
  if (hasMore.value) {
    loadReports();
  }
});
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
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.report-card:active {
  transform: scale(0.98);
  opacity: 0.9;
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
/* Skeleton */
.skeleton-card {
  pointer-events: none;
}
@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
.skeleton-cover {
  width: 100%;
  height: 160px;
  background-color: #E2E2E2;
  animation: pulse 1.5s infinite;
}
.skeleton-tag {
  width: 40px;
  height: 18px;
  background-color: #E2E2E2;
  border-radius: 4px;
  margin-bottom: 8px;
  animation: pulse 1.5s infinite;
}
.skeleton-title {
  width: 80%;
  height: 20px;
  background-color: #E2E2E2;
  margin-bottom: 12px;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}
.skeleton-meta {
  width: 40%;
  height: 14px;
  background-color: #E2E2E2;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}
/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
}
.empty-circle {
  width: 80px;
  height: 80px;
  margin-bottom: 16px;
  background: #EAEBEE;
  border-radius: 40px;
}
.empty-text {
  font-size: 14px;
  color: #999;
}
.loading-more, .no-more {
  text-align: center;
  font-size: 12px;
  color: #c9c9c9;
  padding: 16px 0;
}
</style>
