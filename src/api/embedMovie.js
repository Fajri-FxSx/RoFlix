const embedMovie = (id) => `https://imdbembed.xyz/movie/tmdb/${id}`;
const embedEpisode = (id, season, episode) =>
  `https://imdbembed.xyz/tv/tmdb/${id}-${season}-${episode}`;

export { embedMovie, embedEpisode };
