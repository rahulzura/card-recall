import React from 'react';

const CardBack = (props) => {
  const {
    keyword,
    topNote,
    middleNote,
    bottomNote,
    onKeywordChange,
    onTopNoteChange,
    onMiddleNoteChange,
    onBottomNoteChange,
  } = props;

  return <div className='card-container card-back-container'>
    <input name='keyword' type='text' value={keyword} onChange={onKeywordChange} />
    <input name='top-note' type='text' value={topNote} onChange={onTopNoteChange} />
    <div>
      <input name='middle-note' type='text' value={middleNote} onChange={onMiddleNoteChange} />
    </div>
    <input name='bottom-note' type='text' value={bottomNote} onChange={onBottomNoteChange} />
  </div>
};

export default CardBack;
