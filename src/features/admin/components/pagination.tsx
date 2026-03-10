'use client';

import { Icon } from '@iconify/react';

interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly total: number;
  readonly limit: number;
  readonly onPageChange: (page: number) => void;
}

/**
 * Numbered pagination component for admin tables.
 * Shows "Showing X to Y of Z entries" + Previous/page numbers/Next controls.
 */
export function Pagination({
  currentPage,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationProps) {
  const startEntry = (currentPage - 1) * limit + 1;
  const endEntry = Math.min(currentPage * limit, total);

  /** Build visible page numbers with ellipsis. */
  function getVisiblePages(): ReadonlyArray<number | 'ellipsis'> {
    const pages: Array<number | 'ellipsis'> = [];

    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always show page 1
    pages.push(1);

    if (currentPage > 3) {
      pages.push('ellipsis');
    }

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className='flex flex-col items-center gap-4 md:flex-row md:justify-between md:px-6'>
      {/* Entries info - hidden on mobile */}
      <span className='text-foreground hidden text-base font-medium tracking-tight md:block'>
        Showing {startEntry} to {endEntry} of {total} entries
      </span>

      {/* Pagination controls */}
      <nav
        className='bg-background flex items-center gap-4'
        aria-label='Pagination'
      >
        {/* Previous */}
        <button
          type='button'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className='text-foreground flex cursor-pointer items-center gap-1.5 text-base font-medium tracking-tight transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
        >
          <Icon icon='mdi:chevron-left' className='size-6' />
          <span>Previous</span>
        </button>

        {/* Page numbers */}
        <div className='flex items-center'>
          {visiblePages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className='text-foreground flex size-10 items-center justify-center text-base font-medium tracking-tight'
                >
                  ...
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                type='button'
                onClick={() => onPageChange(page)}
                className={`flex size-10 cursor-pointer items-center justify-center rounded-lg text-base font-medium tracking-tight transition-colors ${
                  isActive
                    ? 'border-border text-foreground border font-semibold'
                    : 'text-foreground hover:bg-muted'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Next */}
        <button
          type='button'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className='text-foreground flex cursor-pointer items-center gap-1.5 text-base font-medium tracking-tight transition-opacity disabled:cursor-not-allowed disabled:opacity-30'
        >
          <span>Next</span>
          <Icon icon='mdi:chevron-right' className='size-6' />
        </button>
      </nav>
    </div>
  );
}
