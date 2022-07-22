import apiConfig from '../api/apiConfig';
import { noPicture } from '../constants';

const handleScrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const convertFilterName = (name) => {
  const filterName = name
    .split('_')
    .map((item) => `${item.slice(0, 1).toUpperCase() + item.slice(1)}`)
    .join(' ');
  return filterName;
};

const getTrailerThumbUrl = (key) => {
  const baseUrl = 'https://i1.ytimg.com/vi';

  return {
    get default() {
      return `${baseUrl}/${key}/default.jpg`;
    },
    get medium() {
      return `${baseUrl}/${key}/mqdefault.jpg`;
    },
    get high() {
      return `${baseUrl}/${key}/hqdefault.jpg`;
    },
    get standard() {
      return `${baseUrl}/${key}/sddefault.jpg`;
    },
    get maxresdefault() {
      return `${baseUrl}/${key}/maxresdefault.jpg`;
    },
  };
};

const getTrailerUrl = (key) => {
  return `https://www.youtube-nocookie.com/embed/${key}?autoplay=1`;
};

const getProfilePath = (profile_path = '') => {
  return profile_path ? apiConfig.w200Image(profile_path) : noPicture;
};

const isPositiveInteger = (str) => {
  if (typeof str !== 'string') {
    return false;
  }

  const num = Number(str);
  if (Number.isInteger(num) && num > 0) {
    return true;
  }

  return false;
};

export {
  handleScrollTop,
  convertFilterName,
  getTrailerThumbUrl,
  getTrailerUrl,
  getProfilePath,
  isPositiveInteger,
};
