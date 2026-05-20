import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PaginationMeta } from '@/types';
import Button from '../ui/Button';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages, totalRecords, hasNextPage, hasPrevPage } = pagination;

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const showPages = pages.filter((page) => {
    return (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 1 && page <= currentPage + 1)
    );
  });

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6">
      {/* Results info */}
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700 dark:text-gray-400">
          Showing <span className="font-medium">{(currentPage - 1) * pagination.limit + 1}</span>{' '}
          to{' '}
          <span className="font-medium">
            {Math.min(currentPage * pagination.limit, totalRecords)}
          </span>{' '}
          of <span className="font-medium">{totalRecords}</span> results
        </p>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrevPage}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        {showPages.map((page, index) => {
          const prevPage = showPages[index - 1];
          const showEllipsis = prevPage && page - prevPage > 1;

          return (
            <div key={page} className="flex items-center gap-2">
              {showEllipsis && (
                <span className="text-gray-400 dark:text-gray-600">...</span>
              )}
              <Button
                onClick={() => onPageChange(page)}
                variant={page === currentPage ? 'primary' : 'ghost'}
                size="sm"
                className="min-w-[2.5rem]"
              >
                {page}
              </Button>
            </div>
          );
        })}

        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNextPage}
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
