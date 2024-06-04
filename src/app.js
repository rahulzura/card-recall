import React, { useState } from 'react';

import CreateCardView from './components/createCardView';


const App = () => {
  const [view, setView] = useState('review');
  return (
    <>
      <button type='button' onClick={() => setView('create')}>create card</button>
      <button type='button' onClick={() => setView('review')}>review cards</button>

      <CreateCardView view = {view} />
    </>
  );
};

export default App;
