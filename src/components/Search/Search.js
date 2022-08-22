import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import './Search.scss';

export default function Search(props) {
  const { handleSearchMovie, handleCancelSearch } = props;

  const searchTimeoutRef = useRef();

  const [isSeaching, setIsSearching] = useState(false);
  const [text, setText] = useState('');


  const handleChange = (event) => {
    console.log(event.target.value);
    const _text = event.target.value.trim();
    setText(_text);
    if (_text.length) {
      setIsSearching(true);
      handleSearch(text);
    }
  }

  const handleSearch = (_text) => {
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      handleSearchMovie(_text)
    }, 500);
  }

  const handleCancel = () => {
    setText('');
    setIsSearching(false);
    handleCancelSearch();
  }

  return (
    <div className="searchWrapper">
      <input
        type="text"
        id="seach"
        name="seach"
        placeholder='Search
        movie'
        onChange={handleChange}
        value={text}
      />
      {isSeaching && <a className='searchButton' onClick={handleCancel}>Cancel</a>}
    </div>
  )
}

Search.propTypes = {
  handleSearchMovie: PropTypes.func.isRequired,
  handleCancelSearch: PropTypes.func.isRequired,
};
