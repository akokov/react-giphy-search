import React from 'react';
import PropTypes from 'prop-types';
import './GifItem.css';

export const GifItem = (
  {url},
  {title}
) => {
  return (
    <div>
      <img src={url} alt={title} className='gif-item'/>
    </div>
  );
};

GifItem.propTypes = {
  /** this is url */
  url: PropTypes.string.isRequired,

  /** this is onclick */
  onClick: PropTypes.func

};