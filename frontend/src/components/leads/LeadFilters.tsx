import { Search, X } from 'lucide-react';
import { LeadStatus, LeadSource, SortOrder } from '@/types';
import Select from '../ui/Select';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface LeadFiltersProps {
  filters: {
    status?: LeadStatus;
    source?: LeadSource;
    search: string;
    sort: SortOrder;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

const LeadFilters = ({ filters, onFilterChange, onClearFilters }: LeadFiltersProps) => {
  const hasActiveFilters = filters.status || filters.source || filters.search;

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search by name or email..."
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Status Filter */}
        <Select
          value={filters.status || ''}
          onChange={(e) => onFilterChange('status', e.target.value)}
          options={[
            { value: '', label: 'All Status' },
            { value: LeadStatus.NEW, label: 'New' },
            { value: LeadStatus.CONTACTED, label: 'Contacted' },
            { value: LeadStatus.QUALIFIED, label: 'Qualified' },
            { value: LeadStatus.LOST, label: 'Lost' },
          ]}
        />

        {/* Source Filter */}
        <Select
          value={filters.source || ''}
          onChange={(e) => onFilterChange('source', e.target.value)}
          options={[
            { value: '', label: 'All Sources' },
            { value: LeadSource.WEBSITE, label: 'Website' },
            { value: LeadSource.INSTAGRAM, label: 'Instagram' },
            { value: LeadSource.REFERRAL, label: 'Referral' },
          ]}
        />

        {/* Sort */}
        <Select
          value={filters.sort}
          onChange={(e) => onFilterChange('sort', e.target.value)}
          options={[
            { value: SortOrder.LATEST, label: 'Latest First' },
            { value: SortOrder.OLDEST, label: 'Oldest First' },
          ]}
        />
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            onClick={onClearFilters}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2"
          >
            <X size={16} />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeadFilters;
