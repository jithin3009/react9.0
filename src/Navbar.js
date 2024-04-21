import React from 'react';
import './App.css';
function Navbar({ handleSearchChange, searchQuery ,toggleSidebar}) {
    const [sidebarVisible, setSidebarVisible] = useState(false);
   
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    return (

        <nav className='navbar'>
        <button className="toggle-btn" onClick={toggleSidebar}>Toggle</button>
        
            <div className="search-field">
               <input className="search-btn" type="text" value={searchQuery}
                    onChange={handleSearchChange}
                     placeholder="Search Error codes...." />
                </div>
            <div>
            </div>

        </nav>
    );
}

export default Navbar;
