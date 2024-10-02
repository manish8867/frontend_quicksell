import React from 'react';

const DisplayOptions = ({ Grouping, SortType }) => {
  return (
    <div>
      <h2>Display Options</h2>
      <select onChange={(e) => Grouping(e.target.value)}>
        <option value="status">Group by Status</option>
        <option value="user">Group by User</option>
        <option value="priority">Group by Priority</option>
      </select>
      <select onChange={(e) => SortType(e.target.value)}>
        <option value="priority">Sort by Priority</option>
        <option value="title">Sort by Title</option>
      </select>
    </div>
  );
};

export default DisplayOptions;
