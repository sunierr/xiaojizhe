<template>
  <view class="container">
    <view class="header">
      <text class="title">最新报道</text>
      <text class="subtitle">发现真实的力量</text>
    </view>
    
    <view class="report-list">
      <view class="card report-card" v-for="item in reports" :key="item._id">
        <image class="cover" :src="item.images && item.images.length > 0 ? item.images[0] : 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600'" mode="aspectFill" />
        <view class="content">
          <text class="tag">{{ item.tag }}</text>
          <text class="headline">{{ item.title }}</text>
          <text class="meta">{{ item.author?.username || '匿名记者' }} · {{ formatTime(item.createdAt) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchReports } from '@/utils/api';

const reports = ref([]);

const formatTime = (dateStr) => {
  if (!dateStr) return '';
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes || 1}分钟前`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.floor(hours / 24)}天前`;
};

const loadReports = async () => {
  try {
    const res = await fetchReports();
    if (res.statusCode === 200) {
      reports.value = res.data;
    }
  } catch (error) {
    console.error('Failed to load reports:', error);
  }
};

onMounted(() => {
  loadReports();
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
