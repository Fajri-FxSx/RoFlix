import queryString from 'query-string';
import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import tmdbApi from '../api/tmdpApi';
import { FilterForm, MovieList, Pagination, Title } from '../components';
import { filterForm } from '../constants';
import { useTitle } from '../hooks';

const Filter = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  const hashSearchParams = useMemo(() => {
    if (location.search) {
      const hashSearch = queryString.parse(location.search);

      if (hashSearch?.type === 'movie' || hashSearch?.type === 'tv') {
        return hashSearch;
      }
      return null;
    }
    return null;
  }, [location.search]);

  useTitle('filter', null);
  useEffect(() => {
    (async () => {
      if (hashSearchParams) {
        const params = { params: { ...hashSearchParams } };
        delete params[filterForm.type.paramKey];
        const res = await tmdbApi.getDiscover(hashSearchParams.type, params);

        setMovies(res.results);
        setTotalPages(res.total_pages);
      } else {
        setMovies((prev) => {
          if (prev.length === 0) {
            return prev;
          }
          return [];
        });
        setTotalPages(0);
      }
    })();
  }, [hashSearchParams]);

  return (
    <div className="container section" style={{ minHeight: '50vh' }}>
      <Title>Filter Movies</Title>
      <FilterForm />
      {movies.length > 0 && hashSearchParams && (
        <MovieList movies={movies} genre={hashSearchParams?.type} />
      )}

      {!!totalPages && hashSearchParams && (
        <Pagination totalPages={totalPages} />
      )}
    </div>
  );
};

export default Filter;
