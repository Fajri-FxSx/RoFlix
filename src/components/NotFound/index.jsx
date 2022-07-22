import React from 'react';
import Button from '../Button';
import './NotFound.scss';

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__content">Opps, sorry we can't find that page!</p>
      <Button linkTo="/" color="primary" icon="bx-arrow-back" sizeS>
        Back to home page
      </Button>
    </div>
  );
};

export default React.memo(NotFound);
