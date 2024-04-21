import React from 'react';
import './App.css';
const Sidebar = ({ checkboxOptions,selectedCheckboxes,handleCheckboxChange,handleDropdownChange,dropdownOptions,selectedDropdownValue ,handleClearDropdown}) => {
  // const [checkboxChecked, setCheckboxChecked] = useState(false);
  // const handleCheckboxChange = () => {
  //   setCheckboxChecked(!checkboxChecked);
  // };

  
  return (
    <div className="side-bar">
  <div className='side-bar-top'> 
          <button className="sidebar-heading">Error Codes</button>
      </div>
      <div className="dropdown-container">
        <label className='error-source'>Error Source</label>
        {checkboxOptions.map((option) => (
          <div key={option.label}>
            <input
              type="checkbox"
              id={option.label}
              value={option.label}
              checked={selectedCheckboxes.includes(option.label)}
              onChange={handleCheckboxChange}
            />
            <label className='source-label' htmlFor={option.label}>{option.label}</label>
          </div>
        ))}
         </div>
         <div className="dropdown-container-system">
        <label className="system-name">Service Detail</label>
        <select value={selectedDropdownValue} onChange={handleDropdownChange}>
          <option value="">Select an option</option>
          {dropdownOptions.map((option) => (
            <option key={option.label} value={option.label}>
              {option.label}
            </option>
          ))}        
        </select>
        {selectedDropdownValue && (
            <button className="clear-btn" onClick={handleClearDropdown}>
              x
            </button>
          )}
        </div>
      </div>   
  );
};

export default Sidebar;
