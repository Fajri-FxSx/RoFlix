import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';

import tmdbApi, { category } from '../../api/tmdpApi';
import { noVideoUrl } from '../../constants';
import { useBackdropPath, usePosterPath, useReleaseYear } from '../../hooks';
import { getTrailerUrl } from '../../utils';
import Button from '../Button';

const BannerItem = ({ movies, active }) => {
  const {
    id,
    title,
    overview,
    genre_names,
    release_date,
    vote_average,
    backdrop_path,
    poster_path,
  } = movies;

  const genreNames = useMemo(() => genre_names.join(', '), [genre_names]);

  const handleOpenTrailerModal = useCallback(async () => {
    const trailerModal = document.querySelector(`#trailer-modal-${id}`);
    const iframe = trailerModal.querySelector(`iframe`);
    const trailerVideos = await tmdbApi.getVideos(category.movie, id);

    if (trailerVideos.results.length > 0) {
      iframe.setAttribute('src', getTrailerUrl(trailerVideos.results[0].key));
    } else {
      iframe.setAttribute('src', noVideoUrl);
    }
    trailerModal.classList.add('active');
  }, [id]);

  return (
    <div
      className={clsx('banner__item', { active })}
      style={{ backgroundImage: `url(${useBackdropPath(backdrop_path)})` }}
    >
      <div className=" item-wraper">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12">
              <div className="item-content">
                <h1 className="item-content__title">{title}</h1>
                <ul className="item-content__infos">
                  <li>{vote_average}/10</li>
                  <li>{useReleaseYear(release_date)}</li>
                  <li>{genreNames}</li>
                </ul>
                <p className="item-content__description">{overview}</p>
                <div className="item-content__actions">
                  <Button
                    color="primary"
                    icon="bx-play"
                    onClick={handleOpenTrailerModal}
                  >
                    Watch Trailer
                  </Button>
                  <Button
                    color="info"
                    icon="bx-info-circle"
                    linkTo={`movie/${id}`}
                  >
                    More Info
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-0">
              <div className="item-poster">
                <div
                  className="item-poster__img"
                  style={{
                    backgroundImage: `url(${usePosterPath(poster_path)})`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  movies: PropTypes.object.isRequired,
  active: PropTypes.bool,
};

export default BannerItem;
