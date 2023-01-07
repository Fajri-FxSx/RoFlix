import tmdbApi, { category, movieType, tvType } from '../api/tmdpApi';
import { convertFilterName } from '../utils';

export const mobileWidth = 740;

export const limitTotalPages = 500;

export const $ = document.querySelector.bind(document);
export const $$ = document.querySelectorAll.bind(document);

export const prevTitle =
  'RoFlix | Nonton Film Gratis';

// Header
export const headerNav = [
  { display: 'home', path: '/' },
  { display: 'movies', path: '/movie' },
  { display: 'tv series', path: '/tv' },
  { display: 'filter', path: '/filter' },
];

export const footerLinks = [
  {
    title: 'Browse',
    childrens: [
      { title: 'Home', path: '/' },
      { title: 'Movies', path: '/movie' },
      { title: 'TV Series', path: '/tv' },
      { title: 'Filter', path: '/search' },
    ],
  },
];

// Category page
export const movieGenres = {
  movie: {
    display: 'Movies',
    defaultFilter: movieType.popular,
    filters: {
      [movieType.popular]: (params) =>
        tmdbApi.getMovieList(movieType.popular, params),
      [movieType.top_rated]: (params) =>
        tmdbApi.getMovieList(movieType.top_rated, params),
      [movieType.trending]: (params) =>
        tmdbApi.getTrendingList(category.movie, params),
    },
    path: '/movie',
  },

  tv: {
    display: 'Tv Series',
    defaultFilter: tvType.popular,
    filters: {
      [tvType.popular]: (params) => tmdbApi.getTvList(tvType.popular, params),
      [tvType.top_rated]: (params) =>
        tmdbApi.getTvList(tvType.top_rated, params),
      [tvType.trending]: (params) =>
        tmdbApi.getTrendingList(category.tv, params),
    },
    path: '/tv',
  },
};

// Home Page
export const movieSections = [
  {
    display: 'Recommended',
    defaultFilter: 'movies',
    filters: {
      movies: (params) => tmdbApi.getTrendingList(category.movie, params),
      tv_series: (params) => tmdbApi.getTrendingList(category.tv, params),
      trending: (params) => tmdbApi.getTrendingList(category.all, params),
    },
    filterIcons: {
      movies: 'bx-trending-up',
      tv_series: 'bx-tv',
      trending: 'bx-movie',
    },
    horizontalFilter: true,
  },

  {
    ...movieGenres.movie,
    display: `${convertFilterName(movieGenres.movie.defaultFilter)} ${
      movieGenres.movie.display
    }`,
  },

  {
    ...movieGenres.tv,
    display: `${convertFilterName(movieGenres.tv.defaultFilter)} ${
      movieGenres.tv.display
    }`,
  },
];

// Filter Page
export const filterForm = {
  type: {
    title: 'Type',
    icon: 'bxs-copy bx-xs',
    paramKey: 'type',
    get defaultChild() {
      return this.children[0].id;
    },
    children: [
      { id: category.movie, name: 'Movie' },
      { id: category.tv, name: 'TV Series' },
    ],
  },
  genre: {
    title: 'Genre',
    icon: 'bxs-folder-open bx-xs',
    paramKey: 'with_genres',
    children(type = category.movie) {
      return tmdbApi.getGenres(type);
    },
  },
  country: {
    title: 'Country',
    icon: 'bx-world bx-xs',
    paramKey: 'with_origin_country',
    children: [
      { id: 'AR', name: 'Argentina' },
      { id: 'AT', name: 'Austria' },
      { id: 'AU', name: 'Australia' },
      { id: 'BE', name: 'Belgium' },
      { id: 'BR', name: 'Brazil' },
      { id: 'CA', name: 'Canada' },
      { id: 'CH', name: 'Switzerland' },
      { id: 'CN', name: 'China' },
      { id: 'CZ', name: 'Czech Republic' },
      { id: 'DE', name: 'Germany' },
      { id: 'DK', name: 'Denmark' },
      { id: 'ES', name: 'Spain' },
      { id: 'FI', name: 'Finland' },
      { id: 'FR', name: 'France' },
      { id: 'GB', name: 'United Kingdom' },
      { id: 'HK', name: 'Hong Kong' },
      { id: 'HU', name: 'Hungary' },
      { id: 'IE', name: 'Ireland' },
      { id: 'IL', name: 'Israel' },
      { id: 'IN', name: 'India' },
      { id: 'IT', name: 'Italy' },
      { id: 'JP', name: 'Japan' },
      { id: 'KR', name: 'South Korea' },
      { id: 'LU', name: 'Luxembourg' },
      { id: 'MX', name: 'Mexico' },
      { id: 'NL', name: 'Netherlands' },
      { id: 'NO', name: 'Norway' },
      { id: 'NZ', name: 'New Zealand' },
      { id: 'PH', name: 'Philippines' },
      { id: 'PL', name: 'Poland' },
      { id: 'RO', name: 'Romania' },
      { id: 'RU', name: 'Russia' },
      { id: 'SE', name: 'Sweden' },
      { id: 'TH', name: 'Thailand' },
      { id: 'TW', name: 'Taiwan' },
      { id: 'ZA', name: 'South Africa' },
    ],
  },
  releaseYear: {
    title: 'Year',
    icon: 'bx-calendar bx-xs',
    paramKey: 'primary_release_year',
    children: [
      '2022',
      '2021',
      '2020',
      '2018',
      '2017',
      '2016',
      '2015',
      '2014',
      '2013',
      '2012',
      '2011',
      '2010',
      '2009',
      '2008',
      '2007',
      '2006',
      '2005',
      '2004',
      '2003',
      '2002',
      '2001',
      '2000',
    ],
  },
  sort: {
    title: 'Sort',
    icon: 'bxs-sort-alt bx-xs',
    paramKey: 'sort_by',
    get defaultChild() {
      return this.children[0].id;
    },
    children: [
      { id: 'popularity.desc', name: 'Population' },
      { id: 'release_date.desc', name: 'Release Date' },
      { id: 'vote_count.desc', name: 'Vote Count' },
    ],
  },
  submit: {
    title: 'Filter',
    icon: 'bxs-filter-alt bx-xs',
  },
};

// Pagination
export const paginationIcons = {
  left: [
    { id: 'first-page', icon: 'bx bx-sm bxs-chevrons-left' },
    { id: 'previous-page', icon: 'bx bx-sm bxs-chevron-left' },
  ],
  right: [
    { id: 'next-page', icon: 'bx bx-sm bxs-chevron-right' },
    { id: 'last-page', icon: 'bx bx-sm bxs-chevrons-right' },
  ],
};

// contentModal and singleContent
export const unavailablePoster =
  'https://www.movienewz.com/img/films/poster-holder.jpg';

// contentModal
export const unavailableLandscape =
  'https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg';

// For Carousel
export const noPicture =
  'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg';

export const noVideoUrl =
  'https://www.youtube-nocookie/embed/watch?v=039nv45oth8';
