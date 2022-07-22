import PropTypes from 'prop-types';
import React, { useCallback, useLayoutEffect, useRef } from 'react';

import { $ } from '../../constants';
import { getTrailerThumbUrl, getTrailerUrl } from '../../utils';
import CarouselNavigation from '../CarouselNavigation';

const TrailerList = ({ videos }) => {
  const trailersRef = useRef(null);
  const navigationRef = useRef(null);

  useLayoutEffect(() => {
    const trailersDOM = trailersRef.current;
    const { clientWidth, scrollWidth } = trailersRef.current;

    if (scrollWidth === clientWidth) {
      navigationRef.current.removeClassName(['next', 'previous']);
    } else if (scrollWidth > clientWidth) {
      navigationRef.current.addClassName('next');
      navigationRef.current.removeClassName('previous');
    }

    return () => {
      trailersDOM.scrollLeft = 0;
    };
  }, [videos]);

  const handleTurnOnTrailer = (id, key) => {
    $(`#trailer-modal-${id} iframe`).setAttribute('src', getTrailerUrl(key));
    $(`#trailer-modal-${id}`).classList.add('active');
  };

  const handleCaroselNavigation = useCallback((direction) => {
    let scrollLeft = trailersRef.current.scrollLeft;
    const { clientWidth, scrollWidth } = trailersRef.current;
    const { addClassName, removeClassName } = navigationRef.current;
    const scrollMaxWidth = scrollWidth - clientWidth;

    if (direction === 'next') {
      trailersRef.current.scrollLeft += 440;
      scrollLeft += 440;
    } else if (direction === 'prev') {
      trailersRef.current.scrollLeft -= 440;
      scrollLeft -= 440;
    }

    if (scrollLeft <= 0) {
      removeClassName('previous');
      addClassName('next');
    } else if (scrollLeft > 0 && scrollLeft < scrollMaxWidth) {
      addClassName(['next', 'previous']);
    } else if (scrollLeft >= scrollMaxWidth) {
      removeClassName('next');
      addClassName('previous');
    }
  }, []);

  return (
    <div className="trailer-list">
      <ul className="trailer-list__container" ref={trailersRef}>
        {videos.map((video) => (
          <li
            key={video?.id}
            className="trailer-card"
            onClick={() => handleTurnOnTrailer(video?.id, video?.key)}
          >
            <div
              className="trailer-card__img"
              style={{
                backgroundImage: `url(${
                  getTrailerThumbUrl(video?.key).standard
                })`,
              }}
            >
              <span className="play-btn">
                <i className="bx bx-play-circle bx-lg"></i>
              </span>
            </div>
            <h3 className="trailer-card__title">{video?.name}</h3>
          </li>
        ))}
      </ul>

      <CarouselNavigation
        onClick={handleCaroselNavigation}
        ref={navigationRef}
      />
    </div>
  );
};

TrailerList.propTypes = {
  videos: PropTypes.array,
};

export default React.memo(TrailerList);
