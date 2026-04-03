export const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    
    uni.request({
      ...options,
      header: {
        ...options.header,
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 401) {
          uni.showToast({ title: '登录已过期，请重新登录', icon: 'none' });
          // Optional: clear token and re-login
          uni.removeStorageSync('token');
          // Fallback or navigate to login logic here
        }
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
