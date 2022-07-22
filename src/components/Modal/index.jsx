import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ children, id, onClose }) => {
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    modalRef.current.classList.remove('active');
    if (onClose && typeof onClose === 'function') {
      return onClose();
    }
    return null;
  };

  return (
    <div id={id} className="modal" ref={modalRef} onClick={handleCloseModal}>
      <ModalContent onClick={handleCloseModal}>{children}</ModalContent>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element,
  active: PropTypes.bool,
  onClose: PropTypes.func,
};

const ModalContent = ({ children, onClick }) => {
  const handlePropagation = (e) => {
    e.stopPropagation();
  };
  const handleCloseModal = () => {
    if (onClick && typeof onClick === 'function') {
      return onClick();
    }
    return null;
  };

  return (
    <div className="modal__content" onClick={handlePropagation}>
      {children}
      <span className="modal__content__close" onClick={handleCloseModal}>
        <i className="bx bx-x"></i>
      </span>
    </div>
  );
};

ModalContent.propTypes = {
  children: PropTypes.element,
  onClick: PropTypes.func,
};

export default React.memo(Modal);
