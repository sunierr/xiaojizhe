import { BASE_URL } from './api';
import { request } from './request';

export const doWechatLogin = () => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: 'weixin',
      success: (loginRes) => {
        if (loginRes.code) {
          // Send to backend
          uni.request({
            url: `${BASE_URL}/users/wechat-login`,
            method: 'POST',
            data: { code: loginRes.code },
            success: (res) => {
              if (res.statusCode === 200 && res.data.token) {
                uni.setStorageSync('token', res.data.token);
                uni.setStorageSync('userInfo', res.data);
                resolve(res.data);
              } else {
                reject(new Error('Login failed on server'));
              }
            },
            fail: (err) => reject(err)
          });
        } else {
          reject(new Error('WeChat login failed'));
        }
      },
      fail: (err) => reject(err)
    });
  });
};

export const checkAuthAndLogin = async () => {
  const token = uni.getStorageSync('token');
  if (!token) {
    console.log('No token found, auto logging in...');
    try {
      await doWechatLogin();
    } catch (e) {
      console.error('Auto login failed', e);
    }
  }
};
