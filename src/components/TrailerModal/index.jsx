import React, { useCallback } from 'react';

import PropTypes from 'prop-types';
import Modal from '../Modal';

const TrailerModal = ({ id }) => {
  const handleClose = useCallback(() => {
    const iframe = document.querySelector(`#trailer-modal-${id} iframe`);
    iframe.removeAttribute('src');
  }, [id]);

  return (
    <Modal id={`trailer-modal-${id}`} onClose={handleClose}>
      <iframe
        height="500px"
        width="100%"
        title="trailer"
        frameBorder="0"
        allowFullScreen
        allow="autoplay"
      />
    </Modal>
  );
};

TrailerModal.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default React.memo(TrailerModal);
