import PropTypes from 'prop-types';
import React from 'react';

import Button from '../Button';
import './LoadMoreBtn.scss';

const LoadMoreBtn = ({ loading, onClick }) => {
  const handleOnClick = () => {
    if (onClick && typeof onClick === 'function') {
      return onClick();
    }
    return null;
  };
  return (
    <div className="loadmore-btn">
      <Button
        onClick={handleOnClick}
        color="primary"
        sizeS
        icon={loading ? 'bx-loader-circle bx-spin bx-sz' : ''}
        disabled={loading}
      >
        {loading ? 'Loading' : 'Load More'}
      </Button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default React.memo(LoadMoreBtn);
