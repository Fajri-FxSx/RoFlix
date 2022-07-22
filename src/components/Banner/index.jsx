import React, { useEffect, useState } from 'react';
import { Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';

import tmdbApi, { category, movieType } from '../../api/tmdpApi';
import TrailerModal from '../TrailerModal';
import './Banner.scss';
import BannerItem from './BannerItem';

const Banner = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { getMovieList, getGenres } = tmdbApi;
        const responses = await Promise.all([
          getMovieList(movieType.popular),
          getGenres(category.movie),
        ]);
        const result = responses[0].results.slice(0, 3);

        result.forEach((movie) => {
          const genreNames = responses[1]['genres'].reduce(
            (prev, { id, name }) => {
              if (movie.genre_ids.includes(id)) {
                prev.push(name);
              }
              return prev;
            },
            []
          );
          movie['genre_names'] = genreNames;
        });

        setMovies(result);
      } catch (error) {
        throw error;
      }
    })();
  }, []);

  return (
    <div className="banner">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        loop={true}
        navigation={true}
        // autoplay={{ delay: 5000 }}
        modules={[Autoplay, Navigation]}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {({ isActive }) => (
              <BannerItem key={movie.id} movies={movie} active={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>

      {movies.map(({ id }) => {
        return <TrailerModal key={id} id={id} />;
      })}
    </div>
  );
};

export default Banner;
