export const BASE_URL = 'http://localhost:5001/api';
export const SERVER_HOST = 'http://localhost:5001';

export const formatFileUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${SERVER_HOST}${url}`;
};

export const fetchReports = () => uni.request({ url: `${BASE_URL}/reports` });
export const fetchCourses = () => uni.request({ url: `${BASE_URL}/courses` });
export const fetchUser = (id) => uni.request({ url: `${BASE_URL}/users/${id}` });

export const TEST_USER_ID = '69ce2d3c40178d93b67626cc';
