import PropTypes from 'prop-types';
import React from 'react';

import './Title.scss';

const Title = ({ children }) => {
  return <h2 className="header-title">{children}</h2>;
};

Title.propTypes = {
  children: PropTypes.string,
};

export default React.memo(Title);
