<template>
  <view class="container" v-if="user">
    <view class="user-header">
      <view class="avatar-area">
        <image class="avatar" :src="formatFileUrl(user.avatar) || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200'" mode="aspectFill" />
      </view>
      <view class="info-area">
        <text class="name">{{ user.username }}</text>
        <text class="role">{{ user.role }}</text>
      </view>
    </view>

    <view class="stats-row">
      <view class="stat-item">
        <text class="stat-val">{{ user.stats?.publishedCount || 0 }}</text>
        <text class="stat-label">已发报道</text>
      </view>
      <view class="stat-item">
        <text class="stat-val">{{ myCourses.length }}</text>
        <text class="stat-label">所修课程</text>
      </view>
      <view class="stat-item">
        <text class="stat-val">{{ user.stats?.acceptanceRate || 100 }}%</text>
        <text class="stat-label">采纳率</text>
      </view>
    </view>

    <view class="list-group">
      <view class="card list-item">
        <text class="item-text">我的草稿箱</text>
        <view class="item-right">
          <text class="badge">2</text>
          <text class="arrow">></text>
        </view>
      </view>

      <!-- 我的课程下拉列表 -->
      <view class="card collapsible-card" :class="{ 'expanded': coursesExpanded }">
        <view class="list-item" @click="toggleCourses">
          <text class="item-text">我的课程</text>
          <view class="item-right">
            <text class="arrow" :class="{ 'rotate': coursesExpanded }">></text>
          </view>
        </view>
        <view class="expanded-content" v-if="coursesExpanded">
          <view class="course-mini-item" v-for="course in myCourses" :key="course._id">
            <view class="dot"></view>
            <text class="course-name">{{ course.title }}</text>
          </view>
          <view class="empty-hint" v-if="myCourses.length === 0">
            暂未参加任何课程
          </view>
        </view>
      </view>

      <view class="card list-item">
        <text class="item-text">帮助与关于</text>
        <text class="arrow">></text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { fetchUser, BASE_URL, formatFileUrl } from '@/utils/api';
import { request } from '@/utils/request';

const user = ref(null);
const myCourses = ref([]);
const coursesExpanded = ref(false);

const toggleCourses = () => {
  coursesExpanded.value = !coursesExpanded.value;
};

const loadUserData = async () => {
  try {
    const [userRes, coursesRes] = await Promise.all([
      fetchUser(),
      request({ url: `${BASE_URL}/courses/my/me` })
    ]);

    if (userRes.statusCode === 200) {
      user.value = userRes.data;
    }
    if (coursesRes.statusCode === 200) {
      myCourses.value = coursesRes.data;
    }
  } catch (error) {
    console.error('Failed to load My Profile data:', error);
  }
};

onShow(() => {
  loadUserData();
});
</script>

<style scoped>
.container {
  padding: 0;
  background-color: #F8F5F5;
  min-height: 100vh;
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
  transition: background-color 0.1s;
  cursor: pointer;
}
.list-item:active {
  background-color: #f5f5f5;
}
.collapsible-card {
  margin-bottom: 12px;
  overflow: hidden;
  padding: 0;
}
.collapsible-card .list-item {
  margin-bottom: 0;
}
.item-text {
  font-size: 15px;
  color: #333;
  font-weight: 500;
}
.item-right {
  display: flex;
  align-items: center;
}
.badge {
  background: #C4454C;
  color: #fff;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-right: 8px;
}
.arrow {
  color: #ccc;
  font-weight: bold;
  transition: transform 0.3s;
}
.arrow.rotate {
  transform: rotate(90deg);
}

.expanded-content {
  padding: 0 20px 16px;
  border-top: 1px solid #f9f9f9;
}
.course-mini-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.dot {
  width: 6px;
  height: 6px;
  background: #C4454C;
  border-radius: 3px;
  margin-right: 10px;
}
.course-name {
  font-size: 14px;
  color: #666;
}
.empty-hint {
  padding: 20px 0;
  text-align: center;
  color: #bbb;
  font-size: 13px;
}
</style>
