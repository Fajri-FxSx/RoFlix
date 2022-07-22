import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { handleScrollTop } from '../../utils';
import { useTvSeasonInfo } from '../../hooks';

const TvEpisodes = ({ episodes, selectedSeason }) => {
  const [tvInfo, searchParams, setSearchParams] = useTvSeasonInfo();

  const handleClickEpisode = (value) => {
    if (selectedSeason !== tvInfo.season || value !== tvInfo.episode) {
      searchParams.set('ss', selectedSeason);
      searchParams.set('ep', value);
      setSearchParams(searchParams);
    }
    handleScrollTop();
  };

  return (
    <ul className="row tv-episodes">
      {episodes.map((item) => (
        <div className="col-lg-3 col-md-4 col-12" key={item?.id}>
          <li
            className={clsx({
              active:
                selectedSeason === tvInfo.season &&
                item?.episode_number === tvInfo.episode,
            })}
            onClick={() => handleClickEpisode(item?.episode_number)}
            title={item?.name}
          >
            <b>{`Episode ${item?.episode_number}: `}</b>
            {item?.name}
          </li>
        </div>
      ))}
    </ul>
  );
};

TvEpisodes.propTypes = {
  episodes: PropTypes.array.isRequired,
  selectedSeason: PropTypes.number.isRequired,
};

export default React.memo(TvEpisodes);
