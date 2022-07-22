import React from 'react';
import { Banner, MovieSection } from '../components';
import { movieSections } from '../constants';

const Home = () => {
  return (
    <>
      <Banner />
      <div className="container">
        {movieSections.map((content, i) => (
          <MovieSection
            key={i}
            content={content}
            viewAllBtn={!!content?.path}
            horizontalFilter={!!content?.horizontalFilter}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
