import axios from "axios";

const api = axios.create({
  baseURL: "https://userregistrationbackend-production.up.railway.app/users", // your backend base path
});

// --- Request Interceptor: Attach Access Token ---
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor: Handle Expired Token ---
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired and request not retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        // Call your refresh API
        const res = await axios.post(
          "https://userregistrationbackend-production.up.railway.app/users/refresh-token",
          { refreshToken }
        );

        const newAccessToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export const SignUpUser = (data: any) => api.post(`/signup`, data);
export const LoginUser = (data: any) => api.post(`/login`, data);
export const SendOtp = (data: any) => api.post(`/send-otp`, data);
export const ResetPassword = (data: any) => api.post(`/reset-password`, data);




