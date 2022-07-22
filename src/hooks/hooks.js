import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import apiConfig from '../api/apiConfig';
import {
  prevTitle,
  unavailableLandscape,
  unavailablePoster,
} from '../constants';

const useTitle = (param, title) => {
  useEffect(() => {
    switch (param) {
      case 'movie':
        document.title = 'Watch Movies Online Free';
        break;
      case 'tv':
        document.title = 'Watch TV Series Online';
        break;
      case 'search':
        document.title = `Result for '${title}' Movies, TV-Series`;
        break;
      case 'filter':
        document.title = 'Filter Movies';
        break;

      default:
        break;
    }
    return () => {
      document.title = prevTitle;
    };
  }, [param, title]);
  return null;
};

const useBackdropPath = (backdrop_path = '') => {
  return useMemo(() => {
    return backdrop_path
      ? apiConfig.originalImage(backdrop_path)
      : unavailableLandscape;
  }, [backdrop_path]);
};

const usePosterPath = (poster_path = '') => {
  return useMemo(() => {
    return poster_path ? apiConfig.w500Image(poster_path) : unavailablePoster;
  }, [poster_path]);
};

const useReleaseYear = (release_date = '') => {
  return useMemo(() => {
    return release_date ? release_date.slice(0, 4) : null;
  }, [release_date]);
};

const useTvSeasonInfo = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tvInfos = useMemo(() => {
    return {
      season: searchParams.get('ss') ? +searchParams.get('ss') : 1,
      episode: searchParams.get('ep') ? +searchParams.get('ep') : 1,
    };
  }, [searchParams]);
  return [tvInfos, searchParams, setSearchParams];
};

export {
  useBackdropPath,
  usePosterPath,
  useReleaseYear,
  useTitle,
  useTvSeasonInfo,
};
