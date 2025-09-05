import axios from 'axios';

// 기본 설정
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


// axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        // 토큰이 있으면 헤더에 추가
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // 요청 로깅 (개발 환경에서만)
        if (import.meta.env.MODE === 'development') {
            console.log('🚀 API Request:', {
                method: config.method?.toUpperCase(),
                url: config.url,
                data: config.data,
            });
        }

        return config;
    },
    (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => {
        // 응답 로깅 (개발 환경에서만)
        if (import.meta.env.MODE === 'development') {
            console.log('✅ API Response:', {
                status: response.status,
                data: response.data,
            });
        }

        return response;
    },
    (error) => {
        // 에러 로깅
        console.error('❌ API Error:', {
            status: error.response?.status,
            message: error.response?.data?.message || error.message,
            url: error.config?.url,
        });

        // 401 에러시 토큰 제거 및 로그인 페이지로 리다이렉트
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            // window.location.href = '/login'; // 필요시 주석 해제
        }

        return Promise.reject(error);
    }
);

// HTTP 메서드 래퍼 함수들
export const api = {
    // GET 요청
    get: (url, config = {}) => {
        return apiClient.get(url, config);
    },

    // POST 요청
    post: (url, data = {}, config = {}) => {
        return apiClient.post(url, data, config);
    },

    // PUT 요청
    put: (url, data = {}, config = {}) => {
        return apiClient.put(url, data, config);
    },

    // PATCH 요청
    patch: (url, data = {}, config = {}) => {
        return apiClient.patch(url, data, config);
    },

    // DELETE 요청
    delete: (url, config = {}) => {
        return apiClient.delete(url, config);
    },

    // 파일 업로드 요청
    upload: (url, formData, config = {}) => {
        return apiClient.post(url, formData, {
            ...config,
            headers: {
                'Content-Type': 'multipart/form-data',
                ...config.headers,
            },
        });
    },
};

// 토큰 관리 유틸리티
export const tokenUtils = {
    // 토큰 저장
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem('accessToken', accessToken);
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    },

    // 토큰 가져오기
    getAccessToken: () => {
        return localStorage.getItem('accessToken');
    },

    getRefreshToken: () => {
        return localStorage.getItem('refreshToken');
    },

    // 토큰 제거
    removeTokens: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
    },

    // 토큰 유효성 검사 (간단한 형태)
    isValidToken: (token) => {
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        } catch {
            return false;
        }
    },
};

// 에러 처리 유틸리티
export const errorHandler = {
    // 에러 메시지 추출
    getErrorMessage: (error) => {
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error.message) {
            return error.message;
        }
        return '알 수 없는 오류가 발생했습니다.';
    },

    // HTTP 상태 코드별 처리
    handleError: (error) => {
        const status = error.response?.status;

        switch (status) {
            case 400:
                return '잘못된 요청입니다.';
            case 401:
                return '인증이 필요합니다.';
            case 403:
                return '접근 권한이 없습니다.';
            case 404:
                return '요청한 리소스를 찾을 수 없습니다.';
            case 500:
                return '서버 오류가 발생했습니다.';
            default:
                return errorHandler.getErrorMessage(error);
        }
    },
};

// API 응답 래퍼 (성공/실패 통일된 형태로 반환)
export const apiWrapper = async (apiCall) => {
    try {
        const response = await apiCall();
        return {
            success: true,
            data: response.data,
            status: response.status,
        };
    } catch (error) {
        return {
            success: false,
            error: errorHandler.getErrorMessage(error),
            status: error.response?.status,
        };
    }
};

// 기본 인스턴스 export (직접 사용하고 싶은 경우)
export default apiClient;