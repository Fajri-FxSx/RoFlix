import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useBackdropPath, usePosterPath, useReleaseYear } from '../../hooks';
import Button from '../Button';
import MovieList from '../MovieList';
import Title from '../Title';
import CaseList from './CastList';
import TrailerList from './TrailerList';

const Details = ({ movieInfo, cast, videos, similars, genre }) => {
  const {
    id,
    title,
    name,
    overview,
    release_date,
    last_air_date,
    genres,
    backdrop_path,
    poster_path,
  } = movieInfo;

  const navigate = useNavigate();
  const releaseYear = useReleaseYear(release_date || last_air_date);

  return (
    <>
      <div
        className="banner"
        style={{ backgroundImage: `url(${useBackdropPath(backdrop_path)})` }}
      ></div>

      <div className="movie__content container">
        <div className="movie__content__poster">
          <div
            className="movie__content__poster__img"
            style={{ backgroundImage: `url(${usePosterPath(poster_path)})` }}
          ></div>
        </div>
        <div className="movie__content__info">
          <h1 className="title">
            {title ?? name} {releaseYear && `(${releaseYear})`}
          </h1>
          <p className="overview">{overview}</p>
          <div className="genres">
            {genres?.map((genre) => (
              <Button key={genre?.id} onClick={() => null} border sizeS>
                {genre?.name}
              </Button>
            ))}
          </div>

          <Button
            onClick={() => navigate(`/watch/${genre}/${id}`)}
            icon="bx-play bx-sm"
            color="primary"
          >
            Watch Now
          </Button>

          {cast?.length > 0 && (
            <div className="cast">
              <Title>Series Cast</Title>
              <CaseList cast={cast} />
            </div>
          )}
        </div>
      </div>

      {videos?.length > 0 && (
        <div className="trailer section">
          <div className="container">
            <Title>Trailer</Title>
            <TrailerList videos={videos} />
          </div>
        </div>
      )}

      {similars?.length > 0 && (
        <div className="similar section">
          <div className="container">
            <Title>More Like This</Title>

            <MovieList movies={similars} genre={genre} path={`/${genre}`} />
          </div>
        </div>
      )}
    </>
  );
};

Details.propTypes = {
  movieInfo: PropTypes.object.isRequired,
  cast: PropTypes.array.isRequired,
  videos: PropTypes.array.isRequired,
  similars: PropTypes.array.isRequired,
  genre: PropTypes.string,
};

export default React.memo(Details);
