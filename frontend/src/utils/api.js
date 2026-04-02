const BASE_URL = 'http://localhost:5001/api';

export const fetchReports = () => uni.request({ url: `${BASE_URL}/reports` });
export const fetchCourses = () => uni.request({ url: `${BASE_URL}/courses` });
export const fetchUser = (id) => uni.request({ url: `${BASE_URL}/users/${id}` });

export const TEST_USER_ID = '69cdb135178f75a0fd68828c';
