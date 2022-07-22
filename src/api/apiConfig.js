const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '24661393e867b3b4a85f3f759a76a9d5',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500${imgPath}`,
  w200Image: (imgPath) => `https://image.tmdb.org/t/p/w200${imgPath}`,
};

export default apiConfig;
