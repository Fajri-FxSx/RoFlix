import React from 'react';
import './Preloader.scss';

const Preloader = () => {
  return (
    <div className="preloader">
      <div className="preloader__ball"></div>
      <div className="preloader__ball"></div>
      <div className="preloader__ball"></div>
    </div>
  );
};
export default React.memo(Preloader);
