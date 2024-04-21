// Dropdown.js
import React from 'react';

function Dropdown({ options, onChange, selectedValue }) {
  return (
    <select onChange={onChange} value={selectedValue}>
      <option value="">Select Option</option>
      {options.map(option => (
        <option key={option.id} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;
