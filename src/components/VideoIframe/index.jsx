import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { embedEpisode, embedMovie } from '../../api/embedMovie';
import { useBackdropPath, useTvSeasonInfo } from '../../hooks';
import styles from './VideoIframe.module.scss';

const VideoIframe = ({ category, id, backdropPath }) => {
  const [tvInfo] = useTvSeasonInfo();

  const iframeSrc = useMemo(() => {
    if (category === 'movie') {
      return embedMovie(id);
    }
    if (category === 'tv') {
      return embedEpisode(id, tvInfo.season, tvInfo.episode);
    }
    return null;
  }, [category, id, tvInfo.episode, tvInfo.season]);

  return (
    <div
      className={styles.videoIframe}
      style={{ backgroundImage: `url(${useBackdropPath(backdropPath)})` }}
    >
      <div className={styles.videoIframe__wrapper}>
        <div className="container">
          <iframe title={id} src={iframeSrc} frameBorder="0" allowFullScreen />
        </div>
      </div>
    </div>
  );
};

VideoIframe.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  backdropPath: PropTypes.string.isRequired,
};

export default React.memo(VideoIframe);
