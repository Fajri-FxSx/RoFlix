import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';

import tmdbApi from '../../api/tmdpApi';
import { $ } from '../../constants';
import { useTvSeasonInfo } from '../../hooks';
import Button from '../Button';
import TvEpisodes from './TvEpisodes';
import './TvSeason.scss';

const TvSeason = ({ seasons, id }) => {
  const [tvInfo] = useTvSeasonInfo();
  const seasonInfos = useMemo(() => {
    return seasons.filter(
      (season) => season?.season_number > 0 && season?.episode_count > 0
    );
  }, [seasons]);

  const [selectedSeason, setSelectedSeason] = useState(tvInfo?.season);
  const [episodes, setEpisodes] = useState([]);

  const selectedSeasonName = useMemo(() => {
    const seasonName = seasons.find(
      (season) => season?.season_number === selectedSeason
    ).name;
    return seasonName;
  }, [seasons, selectedSeason]);

  const handleShowSeasonList = () => {
    $('.tv-season__list').classList.toggle('active');
  };

  const handleBlurSeasonList = () => {
    $('.tv-season__list').classList.remove('active');
  };

  useEffect(() => {
    (async () => {
      const res = await tmdbApi.getTVSeasons(id, selectedSeason);
      setEpisodes(res?.episodes);
    })();
  }, [id, selectedSeason]);

  return (
    <div className="section">
      <div className="tv-season" onBlur={handleBlurSeasonList}>
        <Button
          onClick={handleShowSeasonList}
          color="sliver"
          sizeS
          icon="bx-chevron-down"
          reverse
        >
          {selectedSeasonName}
        </Button>
        <ul className="tv-season__list">
          {seasonInfos.map((season) => (
            <li
              className={clsx({
                active: selectedSeason === season.season_number,
              })}
              key={season?.id}
              onClick={() => setSelectedSeason(season?.season_number)}
            >
              {`${season?.name} - ${season?.air_date?.slice(0, 4)}`}
            </li>
          ))}
        </ul>
      </div>

      {episodes?.length > 0 && (
        <TvEpisodes episodes={episodes} selectedSeason={selectedSeason} />
      )}
    </div>
  );
};

TvSeason.propTypes = {
  seasons: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default TvSeason;
