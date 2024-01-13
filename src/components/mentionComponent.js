// MentionComponent.js
import React, { useState } from 'react';
import data from './data.json';
import '../styles/mentionComp.css';

const MentionComponent = ({ onChange, value }) => {
  const [mentionOptions, setMentionOptions] = useState([]);
  const [mentionText, setMentionText] = useState('');
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setMentionText(inputValue);

    if (inputValue.includes('@')) {
      const searchTerm = inputValue.split('@')[1].toLowerCase();
      const filteredOptions = data.filter((option) =>
        `${option.first_name.toLowerCase()} ${option.last_name.toLowerCase()}`.includes(searchTerm)
      );
      setMentionOptions(filteredOptions);
      setSelectedOptionIndex(filteredOptions.length > 0 ? 0 : -1);
    } else {
      setMentionOptions([]);
      setSelectedOptionIndex(-1);
    }

    onChange(inputValue, mentionOptions);
  };

  const handleOptionSelect = (selectedOption) => {
    const formattedText = mentionText.replace(/@[\w\s]*/, `@${selectedOption.first_name} ${selectedOption.last_name}`);
    setMentionText(formattedText);
    setMentionOptions([]);
    setSelectedOptionIndex(-1);
    onChange(formattedText, [selectedOption]);
  };

  const handleKeyDown = (e) => {
    if (mentionOptions.length === 0) {
      return;
    }

    if (e.key === 'ArrowDown' && selectedOptionIndex < mentionOptions.length - 1) {
      setSelectedOptionIndex(selectedOptionIndex + 1);
    } else if (e.key === 'ArrowUp' && selectedOptionIndex > 0) {
      setSelectedOptionIndex(selectedOptionIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedOptionIndex !== -1) {
        handleOptionSelect(mentionOptions[selectedOptionIndex]);
      } else if (mentionOptions.length === 1) {
        handleOptionSelect(mentionOptions[0]);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className='inputBox'
      />
      {mentionOptions.length > 0 && (
        <div className='list-container'>
          {mentionOptions.map((option, index) => (
            <div
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={`listItem ${index === selectedOptionIndex ? 'selected' : ''}`}
            >
              {option.first_name} {option.last_name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MentionComponent;
