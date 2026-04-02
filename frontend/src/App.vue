<script setup>
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'

onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style>
/* 全局样式 - 高级感留白设计 */
page {
  background-color: #F8F9FA;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

/* 一些通用的卡片阴影和圆角设置 */
.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
}
.card:active {
  transform: scale(0.98);
}

.text-primary {
  color: #C4454C;
}
.bg-primary {
  background-color: #C4454C;
}

.btn-primary {
  background: linear-gradient(135deg, #CF5359, #C4454C);
  color: white;
  border-radius: 8px;
  padding: 12px 24px;
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  border: none;
  box-shadow: 0 4px 10px rgba(196, 69, 76, 0.2);
}
.btn-primary:active {
  opacity: 0.9;
}
</style>
