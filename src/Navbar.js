import React ,{useState}from 'react';
import './App.css';
import AddPopup from './AddPopup';
function Navbar({ handleSearchChange, searchQuery, onAddNew }) {
    const [showAddPopup, setShowAddPopup] = useState(false);

    const handleAddClick = () => {
      setShowAddPopup(true);
    };
  
    const handleClosePopup = () => {
      setShowAddPopup(false);
    };
  
    return (

        <nav className='navbar'>
            {/* <div>
                <input

                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />      
            </div> */}
            <div className="search-field">
      <input className="search-btn" type="text" value={searchQuery}
                    onChange={handleSearchChange}
                     placeholder="Search" />
                    <i className="fa fa-search"></i>
      </div>
            <div>
            <button onClick={handleAddClick}>Add</button>
            <AddPopup show={showAddPopup} onClose={handleClosePopup} />
            </div>

        </nav>
    );
}

export default Navbar;
