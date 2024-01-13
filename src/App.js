import React, { useState } from 'react';
import MentionComponent from './components/mentionComponent';

const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  return (
    <div>
      <MentionComponent onChange={handleInputChange} value={inputValue} />
    </div>
  );
};

export default App;