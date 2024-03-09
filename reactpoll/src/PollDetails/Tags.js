// Tags.js
import './Style.css';
import React from 'react';

function Tags({ tags }) {
  return (
    <div>
      <p className="tags">Tags: {tags.join(', ')}</p>
    </div>
  );
}

export default Tags;
