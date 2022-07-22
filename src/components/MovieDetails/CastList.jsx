import React from 'react';
import PropTypes from 'prop-types';
import { getProfilePath } from '../../utils';

const CastList = ({ cast }) => {
  return (
    <ul className="cast-list">
      {cast?.map((item) => (
        <li key={item?.id} className="cast-card">
          <div
            className="cast-card__img"
            title={item?.name || item?.original_name}
            style={{
              backgroundImage: `url(${getProfilePath(item?.profile_path)})`,
            }}
          ></div>
          <div className="cast-card__infos">
            <h3
              className="cast-card__name"
              title={item?.name || item?.original_name}
            >
              {item?.name || item?.original_name}
            </h3>
            <h4 className="cast-card__character" title={item?.character}>
              {item?.character}
            </h4>
          </div>
        </li>
      ))}
    </ul>
  );
};

CastList.propTypes = {
  cast: PropTypes.array,
};

export default React.memo(CastList);
