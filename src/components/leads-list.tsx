// src/components/leads-list.tsx
import React from 'react';
import { Lead } from '../types/portal';

interface LeadsListProps {
  leads: Lead[];
}

const LeadsList: React.FC<LeadsListProps> = ({ leads }) => {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table data-slot="table" className="w-full caption-bottom text-sm">
        <thead data-slot="table-header" className="[&_tr]:border-b">
          <tr data-slot="table-row" className="hover:bg-muted/50 border-b transition-colors">
            <th data-slot="table-head" className="text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Name
            </th>
            <th data-slot="table-head" className="text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Contact
            </th>
            <th data-slot="table-head" className="text-muted-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">
              Message
            </th>
          </tr>
        </thead>
        <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
          {leads.map((lead) => (
            <tr key={lead.id} data-slot="table-row" className="hover:bg-muted/50 border-b transition-colors">
              <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap font-medium">
                {lead.first_name} {lead.last_name}
              </td>
              <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap">
                {lead.contact_type}
              </td>
              <td data-slot="table-cell" className="p-2 align-middle whitespace-nowrap">
                {lead.message.substring(0, 100) + (lead.message.length > 100 ? "..." : "")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsList;
