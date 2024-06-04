import React from 'react';

const CardFront = (props) => {
  const {
    character,
    frame,
    onCharacterChange,
    onFrameChange,
  } = props;

  return <div className='card-container card-front-container'>
    <input name='character' type='text' value={character} onChange={onCharacterChange} />
    <input name='frame' type='text' frame={frame} onChange={onFrameChange} />
  </div>
};

export default CardFront;
