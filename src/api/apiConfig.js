const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '0ad3f1525df2946250e2412049ffa9c1',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
  w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200${imgPath}`,
};

export default apiConfig;
