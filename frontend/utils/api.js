export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  chat: `${API_BASE_URL}/api/v1/chat`,
};
