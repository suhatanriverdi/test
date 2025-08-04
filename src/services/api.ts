import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Well {
  _id?: string;
  id?: string;
  name: string;
  depth: number;
  location: string;
  status: 'active' | 'inactive' | 'maintenance';
  lastUpdated: string;
  operator?: string;
  drillType?: string;
  startDate?: string;
  estimatedCompletion?: string;
  notes?: string;
  drillingData?: any[];
}

export interface ChatMessage {
  _id?: string;
  sessionId: string;
  message: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export const wellsApi = {
  getAll: () => api.get<Well[]>('/wells'),
  getById: (id: string) => api.get<Well>(`/wells/${id}`),
  create: (well: Partial<Well>) => api.post<Well>('/wells', well),
  update: (id: string, well: Partial<Well>) => api.put<Well>(`/wells/${id}`, well),
  delete: (id: string) => api.delete<Well>(`/wells/${id}`),
  uploadFile: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/wells/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  uploadWellData: (wellId: string, drillingData: any[]) =>
    api.post<Well>(`/wells/${wellId}/upload-data`, { drillingData }),
};

export const chatApi = {
  sendMessage: (message: string, sessionId: string) =>
    api.post<{ response: string }>('/chat/message', { message, sessionId }),
  getHistory: (sessionId: string) => api.get<ChatMessage[]>(`/chat/history/${sessionId}`),
  clearHistory: (sessionId: string) => api.delete(`/chat/history/${sessionId}`),
};

export default api; 