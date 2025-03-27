// src/Leads.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LeadsPage from './pages/LeadsPage';
import { Lead, LeadsPaginated } from './types/portal';

interface LeadsProps {
  token: string;
  onLogout: () => void;
}

const Leads: React.FC<LeadsProps> = ({ token, onLogout }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_AL_ENDPOINT}/portal/leads/most_recent`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLeads(response.data.results);
      } catch (err: any) {
        console.error('Error fetching leads:', err);
        setError('Failed to fetch leads.');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [token]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  // Wrap the leads array into a paginated object to match the expected props of LeadsPage
  const leadsPaginated: LeadsPaginated = {
    data: leads,
    links: [],
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  };

  return (
    <LeadsPage
      leads={leadsPaginated}
      filters={{ search: '' }}
      token={token}
      onLogout={onLogout}
    />
  );
};

export default Leads;
