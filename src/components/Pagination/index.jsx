import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

import { limitTotalPages, paginationIcons } from '../../constants';
import { usePagination } from '../../hooks';
import { handleScrollTop } from '../../utils';
import './Pagination.scss';

const Pagination = ({ totalPages, pageSize = 5 }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  totalPages = useMemo(() => {
    if (totalPages > limitTotalPages) {
      return limitTotalPages;
    }
    return totalPages;
  }, [totalPages]);

  const currentPage = useMemo(() => {
    return searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
  }, [searchParams]);

  const paginateItems = usePagination(currentPage, totalPages, pageSize);

  const handleChangePage = (value) => {
    if (currentPage !== value) {
      searchParams.set('page', value);
      setSearchParams(searchParams);
      handleScrollTop();
    }
    return null;
  };

  const handleChangePageByIcon = (param) => {
    switch (param) {
      case 'first-page':
        searchParams.set('page', 1);
        break;
      case 'last-page':
        searchParams.set('page', totalPages);
        break;
      case 'next-page':
        searchParams.set('page', currentPage + 1);
        break;
      case 'previous-page':
        searchParams.set('page', currentPage - 1);
        break;

      default:
        break;
    }

    setSearchParams(searchParams);
    handleScrollTop();
  };

  return (
    <ul className="pagination">
      {paginationIcons.left.map((item) => (
        <li
          key={item.id}
          className={clsx('pagination__item', {
            disabled: currentPage === 1,
          })}
          onClick={() => handleChangePageByIcon(item.id)}
        >
          <i className={item.icon} />
        </li>
      ))}

      {paginateItems?.map((page) => (
        <li
          className={clsx('pagination__item', {
            active: currentPage === page,
          })}
          key={page}
          onClick={() => handleChangePage(page)}
        >
          {page}
        </li>
      ))}

      {paginationIcons.right.map((item) => (
        <li
          key={item.id}
          className={clsx('pagination__item', {
            disabled: currentPage >= totalPages,
          })}
          onClick={() => handleChangePageByIcon(item.id)}
        >
          <i className={item.icon} />
        </li>
      ))}
    </ul>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
};

export default React.memo(Pagination);
