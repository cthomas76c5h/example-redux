export interface Lead {
  id: number | string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  contact_type: string;
  message: string;
}

export interface LeadsPaginated {
  data: Lead[];
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  current_page: number;
  last_page: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
