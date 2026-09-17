import type { ProjectItem } from '../stores/portfolio';

export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    database: {
      type: string;
      status: 'connected' | 'disconnected';
    };
  };
}

export function useApi() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase || 'http://localhost:3001';

  const getHealth = async (): Promise<HealthResponse> => {
    return $fetch<HealthResponse>(`${apiBase}/api/health`);
  };

  const getProjects = async (featuredOnly = false): Promise<ProjectItem[]> => {
    const url = featuredOnly ? `${apiBase}/api/projects?featured=true` : `${apiBase}/api/projects`;
    return $fetch<ProjectItem[]>(url);
  };

  const getProject = async (id: number): Promise<ProjectItem> => {
    return $fetch<ProjectItem>(`${apiBase}/api/projects/${id}`);
  };

  return {
    apiBase,
    getHealth,
    getProjects,
    getProject,
  };
}
