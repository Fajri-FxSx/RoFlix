import axiosClient from './axiousClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
  all: 'all',
};

export const movieType = {
  trending: 'trending',
  upcoming: 'upcoming',
  popular: 'popular',
  top_rated: 'top_rated',
};

export const tvType = {
  trending: 'trending',
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getTrendingList(cate, params) {
    const url = `trending/${category[cate]}/day`;
    return axiosClient.get(url, params ?? { params: { page: 1 } });
  },
  getMovieList(type, params) {
    const url = `movie/${movieType[type]}`;
    return axiosClient.get(url, params ?? { params: { page: 1 } });
  },
  getTvList(type, params) {
    const url = `tv/${tvType[type]}`;
    return axiosClient.get(url, params ?? { params: { page: 1 } });
  },
  getVideos(cate, id) {
    const url = `${category[cate]}/${id}/videos`;
    return axiosClient.get(url, { params: {} });
  },
  getDetails(cate, id, params) {
    const url = `${category[cate]}/${id}`;
    return axiosClient.get(url, params ?? { params: { page: 1 } });
  },
  credits(cate, id) {
    const url = `${category[cate]}/${id}/credits`;
    return axiosClient.get(url, { params: {} });
  },
  getSimilarMovies(cate, id) {
    const url = `${category[cate]}/${id}/similar`;
    return axiosClient.get(url, { params: {} });
  },
  getTVSeasons(id, season_number) {
    const url = `tv/${id}/season/${season_number}`;
    return axiosClient.get(url, { params: {} });
  },
  getGenres(cate) {
    const url = `genre/${category[cate]}/list`;
    return axiosClient.get(url, { params: {} });
  },
  searchMultiByKeyword(params) {
    const url = 'search/multi';
    return axiosClient.get(url, params ?? { params: { page: 1 } });
  },
  getCountries() {
    const url = 'configuration/countries';
    return axiosClient.get(url, { params: {} });
  },
  getDiscover(cate, params) {
    const url = `/discover/${cate}`;
    return axiosClient.get(url, params);
  },
};

export default tmdbApi;
