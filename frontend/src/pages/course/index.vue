<template>
  <view class="container">
    <view class="header">
      <text class="title">提升技能</text>
      <text class="subtitle">专业记者培训课程</text>
    </view>
    
    <view class="course-list">
      <view class="card course-card" v-for="course in courses" :key="course._id">
        <view class="course-info">
          <text class="course-title">{{ course.title }}</text>
          <text class="course-desc">{{ course.description }}</text>
        </view>
        <button class="btn-primary enroll-btn" @click="enrollCourse(course._id)">报名</button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { fetchCourses, TEST_USER_ID, BASE_URL } from '@/utils/api';

const courses = ref([]);

const loadCourses = async () => {
  try {
    const res = await fetchCourses();
    if (res.statusCode === 200) {
      courses.value = res.data;
    }
  } catch (error) {
    console.error('Failed to load courses:', error);
  }
};

const enrollCourse = async (courseId) => {
  try {
    const res = await uni.request({
      url: `${BASE_URL}/courses/enroll`,
      method: 'POST',
      data: {
        userId: TEST_USER_ID,
        courseId: courseId
      }
    });
    
    if (res.statusCode === 201) {
      uni.showToast({ title: '报名成功', icon: 'success' });
    } else {
      uni.showToast({ title: res.data.message || '已报名', icon: 'error' });
    }
  } catch (error) {
    uni.showToast({ title: '网络错误', icon: 'error' });
  }
};

onMounted(() => {
  loadCourses();
});
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
