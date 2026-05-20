import api from './api';
import {
  Lead,
  CreateLeadInput,
  UpdateLeadInput,
  LeadFilters,
  PaginatedResponse,
  ApiResponse,
  LeadStats,
} from '@/types';

export const leadService = {
  async getLeads(filters: Partial<LeadFilters>): Promise<PaginatedResponse<Lead>> {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);
    if (filters.sort) params.append('sort', filters.sort);

    const { data } = await api.get<ApiResponse<PaginatedResponse<Lead>>>(
      `/leads?${params.toString()}`
    );
    return data.data!;
  },

  async getLeadById(id: string): Promise<Lead> {
    const { data } = await api.get<ApiResponse<Lead>>(`/leads/${id}`);
    return data.data!;
  },

  async createLead(input: CreateLeadInput): Promise<Lead> {
    const { data } = await api.post<ApiResponse<Lead>>('/leads', input);
    return data.data!;
  },

  async updateLead(id: string, input: UpdateLeadInput): Promise<Lead> {
    const { data } = await api.patch<ApiResponse<Lead>>(`/leads/${id}`, input);
    return data.data!;
  },

  async deleteLead(id: string): Promise<void> {
    await api.delete(`/leads/${id}`);
  },

  async exportLeadsCSV(filters: Partial<LeadFilters>): Promise<Blob> {
    const params = new URLSearchParams();
    
    if (filters.status) params.append('status', filters.status);
    if (filters.source) params.append('source', filters.source);
    if (filters.search) params.append('search', filters.search);

    const { data } = await api.get(`/leads/export/csv?${params.toString()}`, {
      responseType: 'blob',
    });
    return data;
  },

  async getLeadStats(): Promise<LeadStats> {
    const { data } = await api.get<ApiResponse<LeadStats>>('/leads/stats');
    return data.data!;
  },
};
