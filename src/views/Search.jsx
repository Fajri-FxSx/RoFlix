import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import tmdbApi from '../api/tmdpApi';
import {
  FilterForm,
  LoadMoreBtn,
  MovieList,
  Preloader,
  Title,
} from '../components';
import { useTitle } from '../hooks';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [preloader, setPreloader] = useState(true);
  const [loadMoreBtn, setLoadMoreBtn] = useState(false);
  const [totalPage, setTotalPage] = useState(0);

  const urlSearchParams = useMemo(
    () => ({
      keyword: searchParams.get('keyword'),
      currentPage: parseInt(searchParams.get('page')) || 1,
    }),
    [searchParams]
  );

  useTitle('search', urlSearchParams.keyword);

  useEffect(() => {
    if (urlSearchParams.keyword) {
      (async () => {
        setLoadMoreBtn(true);
        const params = {
          query: urlSearchParams.keyword,
          page: urlSearchParams.currentPage,
        };
        const res = await tmdbApi.searchMultiByKeyword({ params });

        const resFilter = res.results.filter((item) => {
          return ['movie', 'tv'].some((type) => type === item?.media_type);
        });
        setMovies((prev) => {
          if (urlSearchParams.currentPage !== 1) {
            const results = resFilter.filter((item) => {
              return !prev.some(({ id }) => item.id === id);
            });
            return [...prev, ...results];
          }

          return resFilter;
        });
        setTotalPage(res.total_pages);
        setLoadMoreBtn(false);
        setPreloader(false);
      })();
    } else {
      return navigate('/');
    }
  }, [navigate, urlSearchParams.currentPage, urlSearchParams.keyword]);

  const handleLoadMoreBtn = useCallback(() => {
    searchParams.set('page', urlSearchParams.currentPage + 1);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, urlSearchParams.currentPage]);

  return (
    <div className="section container">
      {preloader && <Preloader />}
      <Title>{`Result for: ${urlSearchParams.keyword}`}</Title>
      <FilterForm />

      {movies.length > 0 && <MovieList movies={movies} />}
      {totalPage > urlSearchParams.currentPage && (
        <LoadMoreBtn loading={loadMoreBtn} onClick={handleLoadMoreBtn} />
      )}
    </div>
  );
};

export default Search;
