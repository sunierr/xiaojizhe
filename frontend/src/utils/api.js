import { request } from './request';

export const BASE_URL = 'http://localhost:5001/api';
export const SERVER_HOST = 'http://localhost:5001';

export const formatFileUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${SERVER_HOST}${url}`;
};

export const fetchReports = (page = 1, limit = 10) => request({ url: `${BASE_URL}/reports?page=${page}&limit=${limit}`, hideLoading: page > 1 });
export const fetchCourses = () => request({ url: `${BASE_URL}/courses` });
export const fetchUser = () => request({ url: `${BASE_URL}/users/me` });

