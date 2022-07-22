import { useMemo } from 'react';

export const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = (currentPage, totalPages, pageSize = 5) => {
  const pageItems = useMemo(() => {
    if (!currentPage || !totalPages || currentPage > totalPages) {
      return null;
    }

    if (totalPages <= pageSize) {
      return range(1, totalPages);
    }

    if (totalPages > pageSize) {
      const sibling = Math.floor(pageSize / 2);
      let start = Math.max(currentPage - sibling, 1);
      let end = Math.min(start + pageSize - 1, totalPages);

      if (end === totalPages) {
        start = totalPages - pageSize + 1;
      }

      return range(start, end);
    }
  }, [currentPage, pageSize, totalPages]);

  return pageItems;
};

export default usePagination;
