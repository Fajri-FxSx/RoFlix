import React, { useImperativeHandle, useRef } from 'react';
import './CarouselNavigation.scss';

const CarouselNavigation = ({ onClick }, ref) => {
  const navigationRef = useRef(null);
  const handleNavigation = (params) => {
    if (onClick && typeof onClick === 'function') {
      return onClick(params);
    }
    return null;
  };

  useImperativeHandle(ref, () => ({
    addClassName: (name) => {
      if (Array.isArray(name)) {
        return navigationRef.current.classList.add(...name);
      }
      return navigationRef.current.classList.add(name);
    },
    removeClassName: (name) => {
      if (Array.isArray(name)) {
        return navigationRef.current.classList.remove(...name);
      }
      return navigationRef.current.classList.remove(name);
    },
  }));

  return (
    <div className="navigation-btn" ref={navigationRef}>
      <div
        className="navigation-btn__next"
        onClick={() => handleNavigation('next')}
      >
        <i className="bx bx-chevron-right bx-md"></i>
      </div>
      <div
        className="navigation-btn__previous"
        onClick={() => handleNavigation('prev')}
      >
        <i className="bx bx-chevron-left bx-md"></i>
      </div>
    </div>
  );
};

export default React.memo(React.forwardRef(CarouselNavigation));
