<template>
  <view class="container">
    <view class="header">
      <text class="title">提升技能</text>
      <text class="subtitle">专业记者培训课程</text>
    </view>
    
    <!-- 已选课程下拉列表 -->
    <view class="picked-section" :class="{ 'expanded': isExpanded }">
      <view class="picked-header" @click="toggleExpand">
        <view class="picked-info">
          <text class="picked-title">已选课程</text>
          <text class="picked-count">{{ myCourses.length }} / 10</text>
        </view>
        <text class="expand-icon">{{ isExpanded ? '▲' : '▼' }}</text>
      </view>
      
      <view class="picked-list" v-if="isExpanded">
        <view class="empty-picked" v-if="myCourses.length === 0">
          <text>暂未选择课程</text>
        </view>
        <view class="picked-item" v-for="course in myCourses" :key="course._id">
          <text class="picked-course-name text-ellipsis">{{ course.title }}</text>
          <text class="remove-btn" @click.stop="removeCourse(course._id)">移除</text>
        </view>
      </view>
    </view>

    <!-- 全部课程列表 -->
    <view class="course-list">
      <view class="card course-card" v-for="course in courses" :key="course._id">
        <view class="course-info">
          <text class="course-title">{{ course.title }}</text>
          <text class="course-desc">{{ course.description }}</text>
        </view>
        <button 
          class="enroll-btn" 
          :class="isEnrolled(course._id) ? 'btn-disabled' : 'btn-primary'"
          :loading="enrollingId === course._id" 
          @click="enrollCourse(course._id)"
        >
          {{ isEnrolled(course._id) ? '已报名' : '报名' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { fetchCourses, TEST_USER_ID, BASE_URL } from '@/utils/api';

const courses = ref([]);
const myCourses = ref([]);
const enrollingId = ref(null);
const isExpanded = ref(false);

const isEnrolled = (courseId) => {
  return myCourses.value.some(c => c._id === courseId);
};

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

const loadData = async () => {
  try {
    const [allRes, myRes] = await Promise.all([
      fetchCourses(),
      uni.request({ url: `${BASE_URL}/courses/my/${TEST_USER_ID}` })
    ]);
    
    if (allRes.statusCode === 200) courses.value = allRes.data;
    if (myRes.statusCode === 200) myCourses.value = myRes.data;
  } catch (error) {
    console.error('Failed to load data:', error);
  }
};

const enrollCourse = async (courseId) => {
  if (isEnrolled(courseId)) return;
  if (myCourses.value.length >= 10) {
    return uni.showToast({ title: '最多只能选10个课程', icon: 'none' });
  }
  
  enrollingId.value = courseId;
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
      await loadData();
    } else {
      uni.showToast({ title: res.data.message || '报名失败', icon: 'none' });
    }
  } catch (error) {
    uni.showToast({ title: '网络错误', icon: 'none' });
  } finally {
    enrollingId.value = null;
  }
};

const removeCourse = async (courseId) => {
  uni.showLoading({ title: '正在移除...' });
  try {
    const res = await uni.request({
      url: `${BASE_URL}/courses/enroll`,
      method: 'DELETE',
      data: {
        userId: TEST_USER_ID,
        courseId: courseId
      }
    });
    
    if (res.statusCode === 200) {
      uni.showToast({ title: '已移除', icon: 'success' });
      await loadData();
    } else {
      uni.showToast({ title: '移除失败', icon: 'none' });
    }
  } catch (error) {
    uni.showToast({ title: '网络错误', icon: 'none' });
  } finally {
    uni.hideLoading();
  }
};

onShow(() => {
  loadData();
});
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #F8F9FA;
  min-height: 100vh;
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

/* Picked Section */
.picked-section {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 24px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  border: 1px solid #eee;
}
.picked-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.picked-info {
  display: flex;
  align-items: center;
}
.picked-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 12px;
}
.picked-count {
  font-size: 12px;
  color: #C4454C;
  background: rgba(196, 69, 76, 0.1);
  padding: 2px 8px;
  border-radius: 10px;
}
.expand-icon {
  font-size: 12px;
  color: #ccc;
}
.picked-list {
  border-top: 1px solid #f5f5f5;
  max-height: 300px;
  overflow-y: auto;
}
.picked-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-bottom: 1px solid #f9f9f9;
}
.picked-item:last-child {
  border-bottom: none;
}
.picked-course-name {
  font-size: 14px;
  color: #444;
  flex: 1;
  padding-right: 12px;
}
.remove-btn {
  font-size: 12px;
  color: #C4454C;
  padding: 4px 10px;
}
.empty-picked {
  padding: 30px;
  text-align: center;
  color: #bbb;
  font-size: 14px;
}

/* Course List */
.course-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.course-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 0;
}
.course-info {
  flex: 1;
  padding-right: 16px;
}
.course-title {
  font-size: 17px;
  font-weight: 600;
  color: #333;
  display: block;
  margin-bottom: 6px;
}
.course-desc {
  font-size: 13px;
  color: #777;
  display: block;
  line-height: 1.4;
}
.enroll-btn {
  font-size: 14px;
  padding: 0 16px;
  height: 34px;
  line-height: 34px;
  border-radius: 17px;
  margin: 0;
  white-space: nowrap;
}
.btn-disabled {
  background-color: #f0f0f0 !important;
  color: #bbb !important;
  border: none;
}
.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
