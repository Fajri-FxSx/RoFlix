import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const FilterFormControl = ({
  stateKey,
  data,
  onClick,
  type,
  checkedData,
  sizeWidth,
}) => {
  const handleClick = (value) => {
    if (onClick && typeof onClick === 'function') {
      return onClick(stateKey, value);
    }
    return null;
  };

  return (
    <>
      <ul
        className={clsx('filter-form__control', {
          [`filter-form__control--${sizeWidth}`]: sizeWidth,
        })}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.preventDefault()}
      >
        {data.length > 0 &&
          data.map((item, i) => (
            <li
              key={item?.id ?? i}
              onClick={() => handleClick(item?.id?.toString() ?? item)}
              title={item?.name ?? item}
            >
              <input
                type={type}
                checked={
                  type === 'checkbox'
                    ? checkedData?.includes(item?.id?.toString() ?? item)
                    : checkedData === item?.id
                }
                onChange={() => handleClick(item?.id?.toString() ?? item)}
                onClick={(e) => e.stopPropagation()}
              />
              <label>{item?.name ?? item}</label>
            </li>
          ))}
      </ul>
    </>
  );
};

FilterFormControl.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
      })
    ),
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  stateKey: PropTypes.oneOf([
    'type',
    'genre',
    'country',
    'releaseYear',
    'sort',
  ]),
  type: PropTypes.oneOf(['radio', 'checkbox']),
  onClick: PropTypes.func,
  checkedData: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
};

export default React.memo(FilterFormControl);
