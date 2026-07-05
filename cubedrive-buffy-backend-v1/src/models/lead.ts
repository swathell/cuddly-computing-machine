export type Lead = {
  id?: string;
  name?: string;
  company?: string;
  owner?: string;
  stage?: string;
  ageDays?: number;
  updatedAt?: string;
  [key: string]: unknown;
};

export type ReducedLead = {
  name: string;
  owner?: string;
  age_days?: number;
};
