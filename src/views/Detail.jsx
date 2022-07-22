import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { MovieDetails, NotFound } from '../components';

const Detail = () => {
  const { category, movieId } = useParams();

  const isMatchParam = useMemo(() => {
    if ((category === 'movie' || category === 'tv') && !isNaN(movieId)) {
      return true;
    }
    return null;
  }, [category, movieId]);

  return (
    <>
      {!isMatchParam && <NotFound />}
      {isMatchParam && <MovieDetails id={movieId} genre={category} />}
    </>
  );
};

export default Detail;
