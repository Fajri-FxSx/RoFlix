import React from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../MovieCard';
import clsx from 'clsx';

const MovieList = ({ movies, genre, path, watchMovieLayout }) => {
  return (
    <div className="movie-list">
      <div className="row">
        {movies?.map((movie) => (
          <div
            className={clsx('col-lg-2 col-md-3 col-6', {
              'col-lg-4': watchMovieLayout,
            })}
            key={movie?.id}
          >
            <MovieCard
              movieInfo={movie}
              genre={movie?.media_type ?? genre}
              path={path}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
  genre: PropTypes.string,
  path: PropTypes.string,
  watchMovieLayout: PropTypes.bool,
};

export default React.memo(MovieList);
