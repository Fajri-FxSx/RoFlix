import React, { useImperativeHandle, useRef } from 'react';
import './MobileMenu.scss';

const MobileMenu = ({ onClick, onBlur }, ref) => {
  const menuRef = useRef(null);

  useImperativeHandle(ref, () => ({
    toggle() {
      menuRef.current.classList.toggle('active');
      return null;
    },
    inactive() {
      menuRef.current.classList.remove('active');
      return null;
    },
    get contains() {
      return menuRef.current.classList.contains('active');
    },
  }));

  const handleClick = () => {
    if (onClick && typeof onClick === 'function') {
      return onClick();
    }
    return null;
  };

  return (
    <div className="hamburger-menu" onClick={handleClick} ref={menuRef}>
      <div className="hamburger"></div>
    </div>
  );
};

export default React.memo(React.forwardRef(MobileMenu));
