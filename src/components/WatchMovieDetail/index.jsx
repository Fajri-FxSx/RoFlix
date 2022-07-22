import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import { usePosterPath, useReleaseYear } from '../../hooks';
import './WatchMovieDetail.scss';

const WatchMovieDetail = ({ movieInfo }) => {
  const [showMoreBtn, setShowMoreBtn] = useState(true);

  const posterPath = usePosterPath(
    movieInfo?.poster_path || movieInfo?.backdrop_path
  );

  const releaseYear = useReleaseYear(
    movieInfo?.release_date ||
      movieInfo?.last_air_date ||
      movieInfo?.first_air_date
  );

  const isShowMore = useMemo(() => {
    if (movieInfo?.overview.length > 300) {
      return true;
    }
    return false;
  }, [movieInfo]);

  useEffect(() => {
    setShowMoreBtn(true);
  }, [movieInfo]);

  return (
    <div className="section">
      <div className="watch-movie-detail">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-0">
            <div
              className="watch-movie-detail__poster"
              style={{ backgroundImage: `url(${posterPath})` }}
            ></div>
          </div>
          <div className="col-lg-9 col-md-9 col-12">
            <div className="watch-movie-detail__content">
              <h1 className="title">{movieInfo?.title || movieInfo?.name}</h1>
              <div className="vote-average">
                <span className="vote-average__icon">
                  <i className="bx bxs-star bx-sm" />
                </span>
                {`${movieInfo?.vote_average} of ${movieInfo?.vote_count}`}
              </div>

              <div className="overview">
                <p className="overview__paragraph">
                  {isShowMore && showMoreBtn
                    ? `${movieInfo?.overview?.substring(0, 200)}...`
                    : movieInfo?.overview}
                </p>

                {isShowMore && (
                  <span
                    className="overview__more-btn"
                    onClick={() => setShowMoreBtn((prev) => !prev)}
                  >
                    {showMoreBtn ? 'Show more' : 'Show less'}
                  </span>
                )}
              </div>
              <ul className="meta">
                <li>
                  <b>Country:</b>
                  <span>
                    {movieInfo?.production_countries
                      .map((item) => item?.name)
                      .join(', ')}
                  </span>
                </li>
                <li>
                  <b>Genre:</b>
                  <span>
                    {movieInfo?.genres.map((item) => item?.name).join(', ')}
                  </span>
                </li>
                <li>
                  <b>Release year:</b>
                  <span>{releaseYear}</span>
                </li>
                {movieInfo?.tagline && (
                  <li>
                    <b>Tags: </b>
                    <span>{movieInfo?.tagline}</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WatchMovieDetail.propTypes = { movieInfo: PropTypes.object.isRequired };

export default WatchMovieDetail;
