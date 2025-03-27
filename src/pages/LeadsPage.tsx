// src/Pages/LeadsPage.tsx
import { PageHeader } from '../components/page-header';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';
import LeadsList from '../components/leads-list';
import AppLayout from '../layouts/app-layout';
import { Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LeadsPaginated } from '../types/portal';

interface LeadsProps {
  leads: LeadsPaginated;
  filters?: {
    search?: string;
  };
  token: string;
  onLogout: () => void;
}

export default function LeadsPage({ leads, filters = {}, token, onLogout }: LeadsProps) {
  // Determine if pagination is needed
  const hasMultiplePages = leads.last_page > 1;
  const showPagination = hasMultiplePages && leads.links.length > 0;

  const [searchQuery, setSearchQuery] = useState<string>(filters.search || '');

  const navigate = useNavigate();

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/leads?search=${encodeURIComponent(searchQuery)}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
    navigate('/leads');
  };

  return (
    <AppLayout>
      <div>
        <title>Leads</title>
        <meta name="description" content="List of recent leads." />
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <PageHeader title="Leads" description="List of recent leads." />

        <div className="mb-10">
          <form onSubmit={handleSearch}>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4" />
                </div>
                <Input
                  type="text"
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full border-slate-200 pr-10 pl-10 shadow-sm transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 transition-colors hover:text-slate-600"
                    aria-label="Clear search"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex gap-2 sm:flex-shrink-0">
                <Button type="submit" className="h-10 flex-1 px-4 shadow-sm sm:flex-auto sm:px-5">
                  Search
                </Button>
                {filters.search && (
                  <Button type="button" variant="outline" onClick={clearSearch} className="h-10 flex-1 sm:flex-auto">
                    Reset
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="space-y-8">
          <LeadsList leads={leads.data} />

          {showPagination && (
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  {leads.prev_page_url && (
                    <PaginationItem key={leads.prev_page_url}>
                      <PaginationPrevious href={leads.prev_page_url} title="Previous Page" />
                    </PaginationItem>
                  )}

                  {leads.links.map((link) => {
                    if (link.label.includes('Previous') || link.label.includes('Next')) {
                      return null;
                    }

                    return (
                      <PaginationItem key={link.label}>
                        <PaginationLink href={link.url || '#'} isActive={link.active}>
                          {link.label}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {leads.next_page_url && (
                    <PaginationItem key={leads.next_page_url}>
                      <PaginationNext href={leads.next_page_url} title="Next Page" />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
