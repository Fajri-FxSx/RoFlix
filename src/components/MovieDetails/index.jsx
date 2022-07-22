import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import tmdbApi from '../../api/tmdpApi';
import { prevTitle } from '../../constants';
import Preloader from '../Preloader';
import TrailerModal from '../TrailerModal';
import Details from './Details';
import './MovieDetails.scss';

const MovieDetails = ({ id, genre }) => {
  const [state, setState] = useState({
    movieInfo: {},
    cast: [],
    videos: [],
    similars: [],
  });
  const [preloader, setPreloader] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { credits, getDetails, getVideos, getSimilarMovies } = tmdbApi;
        const responses = await Promise.all([
          getDetails(genre, id),
          credits(genre, id),
          getVideos(genre, id),
          getSimilarMovies(genre, id),
        ]);

        document.title = `DMovies | ${
          responses[0]?.title ?? responses[0]?.name
        } (${
          responses[0]?.release_date?.slice(0, 4) ??
          responses[0]?.last_air_date?.slice(0, 4)
        })`;

        setState((prev) => ({
          ...prev,
          movieInfo: responses[0],
          cast: responses[1]?.cast?.slice(0, 10),
          videos: responses[2]?.results.slice(0, 5),
          similars: responses[3]?.results,
        }));

        setPreloader(false);
      } catch (err) {
        throw new Error(err);
      }
    })();
    return () => {
      document.title = prevTitle;
    };
  }, [id, genre]);

  return (
    <div className="movie-details">
      {preloader && <Preloader />}
      {Object.keys(state.movieInfo).length > 0 && (
        <Details
          movieInfo={state.movieInfo}
          cast={state.cast}
          videos={state.videos}
          similars={state.similars}
          genre={genre}
        />
      )}

      {state.videos?.map((video) => (
        <TrailerModal id={video?.id} key={video?.id} />
      ))}
    </div>
  );
};

MovieDetails.propTypes = {
  id: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
};

export default React.memo(MovieDetails);
