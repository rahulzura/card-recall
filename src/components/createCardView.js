import React, { useState, useEffect } from 'react';

import CardBack from './cardBack';
import CardFront from './cardFront';

import * as api from '../utils/api';

const CreateCardView = ({ view = "create" } = {}) => {
  const [isLoading, setIsLoading] = useState(false);

  const [character, setCharacter] = useState('');
  const [frame, setFrame] = useState('');

  const [keyword, setKeyword] = useState('');
  const [topNote, setTopNote] = useState('');
  const [middleNote, setMiddleNote] = useState('');
  const [bottomNote, setBottomNote] = useState('');

  const [cards, setCards] = useState([]);
  const [index, setIndex] = useState(0);
  const [side, setSide] = useState("back");

  const setCard = (card) => {
    setCharacter(card.character);
    setFrame(card.frame);
    setKeyword(card.keyword);
    setTopNote(card.topNote);
    setMiddleNote(card.middleNote);
    setBottomNote(card.bottomNote);
  };

  useEffect(() => {
    if (view !== 'review') return;

    const effect = async () => {
      const data = await api.getCards();
      setCards(data);
      if (data.length) {
        setCard(data[index]);
      }
      setIsLoading(false);
    };

    effect();
  }, []);

  const handleCharacterChange = (e) => {
    setCharacter(e.target.value);
  };

  const handleFrameChange = (e) => {
    setFrame(e.target.value);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleTopNoteChange = (e) => {
    setTopNote(e.target.value);
  };

  const handleMiddleNoteChange = (e) => {
    setMiddleNote(e.target.value);
  };

  const handleBotomNoteChange = (e) => {
    setBottomNote(e.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
  
    const data = {
      character,
      frame,
      keyword,
      topNote,
      middleNote,
      bottomNote,
    };
    await api.saveCard(data);
    setIsLoading(false);
  };

  const handleNextClick = () => {
    setIsLoading(true);
    setSide('back');
    const calcNextIndex = (prevIndex, cards) => prevIndex + 1 < cards.length ? prevIndex + 1 : 0;

    setIndex((prevIndex) => calcNextIndex(prevIndex, cards));
    if (cards.length) {
      setCard(cards[calcNextIndex(index, cards)]);
    }
    setIsLoading(false);
  };

  const handleShowAnswerClick = () => {
    setSide('front');
  };

  let showFront;
  let showBack; 
  if (view === "review") {
    if (side === "front") {
      showFront = true;
      showBack = false;
    } else {
      showFront = false;
      showBack = true;
    }
  } else {
    showFront = showBack = true;
  }

  return isLoading 
    ? <div>Loading...</div>
    : (
      <div className='card-view'>
        <div className='card'>
          {
            showFront
              ? <CardFront
                  character = {character}
                  frame = {frame}
                  onCharacterChange = {handleCharacterChange}
                  onFrameChange = {handleFrameChange}
                />
              : null
          }

          {
            showBack
              ? <CardBack
                  keyword = {keyword}
                  topNote = {topNote}
                  middleNote = {middleNote}
                  bottomNote = {bottomNote}
                  onKeywordChange = {handleKeywordChange}
                  onTopNoteChange = {handleTopNoteChange}
                  onMiddleNoteChange = {handleMiddleNoteChange}
                  onBottomNoteChange = {handleBotomNoteChange}
                />
              : null
          }
        </div>
        
        {
          view === "create"
            ? <button type='button' onClick={handleSubmit}>save</button>
            : null
        }
        {
          view === "review"
            ? <>
              <button type='button' onClick={handleNextClick}>next</button>
              <button type='button' onClick={handleShowAnswerClick}>show answer</button>
            </>
            : null
        }
      </div>
    );
}

export default CreateCardView;
