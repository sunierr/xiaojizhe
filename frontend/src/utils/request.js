let requestCount = 0;

export const request = (options) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    
    // By default showing loader, can be disabled via option
    const showLoader = !options.hideLoading;

    if (showLoader) {
      if (requestCount === 0) {
        uni.showLoading({ title: '拼命加载中', mask: true });
      }
      requestCount++;
    }

    const endLoading = () => {
      if (showLoader) {
        requestCount--;
        if (requestCount <= 0) {
          requestCount = 0;
          uni.hideLoading();
        }
      }
    };
    
    uni.request({
      ...options,
      header: {
        ...options.header,
        'Authorization': token ? `Bearer ${token}` : ''
      },
      success: (res) => {
        if (res.statusCode === 401) {
          uni.showToast({ title: '登录状态异常', icon: 'none' });
          uni.removeStorageSync('token');
        } else if (res.statusCode >= 500) {
          uni.showToast({ title: '系统开小差了，稍稍等会', icon: 'none' });
        }
        resolve(res);
      },
      fail: (err) => {
        uni.showToast({ title: '世界断网了，请检查网络配置', icon: 'none' });
        reject(err);
      },
      complete: () => {
        endLoading();
        if (options.complete) options.complete();
      }
    });
  });
};
