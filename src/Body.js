import React, { useState, useEffect } from 'react';
import './App.css';
import Details from './Details';
import Pagination from './Pagination';
import { FiMenu} from "react-icons/fi";
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import { FaSortNumericUpAlt,FaSortNumericUp } from "react-icons/fa";
import Sidebar from './Sidebar';
import FileGrab from './FileGrab';
function Body() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [checkboxOptions, setCheckboxOptions] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState('');
  const [sortOrder, setSortOrder] = useState('normal');

  useEffect(() => {
    
    fetch(`https://gtswg.api.io-market.net/get_error_translation`)
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        setFilteredData(json.data);
      });

    fetch('https://gtswg.api.io-market.net/get_source')
      .then((response) => response.json())
      .then((json) => setCheckboxOptions(json.data));

    fetch('https://gtswg.api.io-market.net/get_systems')
      .then((response) => response.json())
      .then((json) => setDropdownOptions(json.data));
  }, []);


  useEffect(() => {
    var filtered = data.filter((item) =>
      (item.error_source.label && item.error_source.label.toLowerCase().includes(searchQuery.trim().toLowerCase())) ||
      (item.system_name.label && item.system_name.label.toLowerCase().includes(searchQuery.trim().toLowerCase())) ||
      (item.service_details.label && item.service_details.label.toLowerCase().includes(searchQuery.trim().toLowerCase())) ||
      (item.en && item.en.toLowerCase().includes(searchQuery.trim().toLowerCase())) ||
      (item.de && item.de.toLowerCase().includes(searchQuery.trim().toLowerCase())) ||
      (item.error_code !== undefined && String(item.error_code).toLowerCase().includes(searchQuery.trim().toLowerCase()))
    );


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
    
  
    const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
    };
  
  






    if (selectedCheckboxes.length > 0) {
      filtered = filtered.filter((row) =>
        selectedCheckboxes.some((checkbox) =>
          row.error_source.label && row.error_source.label.includes(checkbox)
        )
      );
    }

    if (selectedDropdownValue) {
      filtered = filtered.filter((row) =>
        row.system_name.label && row.system_name.label.includes(selectedDropdownValue)
      );
    }

     filtered.sort((a, b) => {
      const fieldA = String(a.error_code).toLowerCase();
      const fieldB = String(b.error_code).toLowerCase();

      if (sortOrder === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else if (sortOrder === 'desc') {
        return fieldB.localeCompare(fieldA);
      } else {
        // For normal order, no sorting needed
        return 0;
      }
    });

    setFilteredData(filtered);
  }, [searchQuery,selectedCheckboxes, selectedDropdownValue, data, sortOrder]);





  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsDetailOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClose = () => {
    setSelectedRow(null);
  };


  const currentItems = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
 


  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setSelectedCheckboxes((prevCheckboxes) => {
      if (prevCheckboxes.includes(value)) {
        return prevCheckboxes.filter((checkbox) => checkbox !== value);
      } else {
        return [...prevCheckboxes, value];
      }
    });
  };

  const handleDropdownChange = (e) => {
    setSelectedDropdownValue(e.target.value);
  };

 
  const handleSort = () => {
    if (sortOrder === 'normal') {
      setSortOrder('asc');
    } else if (sortOrder === 'asc') {
      setSortOrder('desc');
    } else {
      setSortOrder('normal');
    }
  };

  
  const handleClearDropdown = () => {
    setSelectedDropdownValue('');
  };
  
  return (
    <Router>
    <div>

      <nav className='navbar' style={{ zIndex: 100 }}>
        <button className={`toggle-btn ${sidebarVisible ? 'toggle-btn-active' : ''}`} onClick={toggleSidebar}>
        <FiMenu />
                       </button>
        <div className="search-field">
          <input className="search-btn" type="text" value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Error Codes .." />
        </div>
      </nav>

      <div className={`sidebar ${sidebarVisible ? '' : 'visible'}`}>
      <Sidebar checkboxOptions={checkboxOptions}
       selectedCheckboxes={selectedCheckboxes}
       handleCheckboxChange={handleCheckboxChange}
       handleDropdownChange={handleDropdownChange}
       dropdownOptions={dropdownOptions}
       selectedDropdownValue={selectedDropdownValue}
       handleClearDropdown={handleClearDropdown}
       />
      </div> 


            

      
      <div className="main-content" style={{ marginLeft: sidebarVisible ? '0' : '260px' }}>
      <Routes>
        <Route path='/' element={
     <>
    
      <table className='main-table'>
      <colgroup>
        <col style={{ width: '25%' }} />
        <col style={{ width: '25%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '10%' }} />
        <col style={{ width: '20%' }} />
        <col style={{ width: '10%' }} />
      </colgroup>
            <thead>
              <tr>
                <th>English</th>
                <th>German</th>
                <th
                className='code-field'
                onClick={handleSort}>
                Error Code{' '}
                {sortOrder === 'normal' && <FaSortNumericUp />}
                {sortOrder === 'asc' && <FaSortNumericUp />}
                {sortOrder === 'desc' && <FaSortNumericUpAlt />}
                </th>
                <th>Error Source</th>
                <th>Service Details</th>
                <th>System Name</th>

              </tr>
            </thead>
            
            <tbody>
            
            {currentItems.length === 0 ? (
        <p className='no-data'>No data found</p>
      ) : (<>
              {currentItems.map((row) => (
                <tr key={row.error_code} onClick={() => handleRowClick(row)}>
                   <td>{row.en.length > 20 ? row.en.substring(0, 20) + '...' : row.en}</td>
                   <td>{row.de.length > 20 ? row.de.substring(0, 20) + '...' : row.de}</td>
                  <td>{row.error_code}</td>
                  <td>{row.error_source.label}</td>
                  <td>{row.service_details.label}</td>
                  <td>{row.system_name.label}</td>
                </tr>
              ))}
              </>
              )}
            </tbody>
             
          </table>
     
       
          <Pagination setCurrentPage={setCurrentPage}
          filteredData={filteredData}
          itemsPerPage={itemsPerPage}
          currentItems={currentItems}
          currentPage={currentPage}
          setItemsPerPage={setItemsPerPage}
        />
        <div className="details">
          <Details selectedRow={selectedRow}
            data={data} setData={setData}
            setSelectedRow={setSelectedRow}
            handleClose={handleClose} 
            isDetailOpen={isDetailOpen}
            />
        </div>
       </>
      } />
      <Route path='/new-page' element={<FileGrab/>} />
</Routes>
        {/* <div>

          <table className='main-table'>
            <thead>
              <tr>
                <th>English</th>
                <th>Gwe</th>
                <th>Error Code </th>
                <th>Error Source</th>
                <th>Service Details</th>
                <th>System Name</th>

              </tr>
            </thead>
            <tbody>
              {currentItems.map((row) => (
                <tr key={row.error_code} onClick={() => handleRowClick(row)}>
                  <td>{row.en}</td>
                  <td>{row.de}</td>
                  <td>{row.error_code}</td>
                  <td>{row.error_source.label}</td>
                  <td>{row.service_details.label}</td>
                  <td>{row.system_name.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination setCurrentPage={setCurrentPage}
          filteredData={filteredData}
          itemsPerPage={itemsPerPage}
          currentItems={currentItems}
          currentPage={currentPage}
          setItemsPerPage={setItemsPerPage}
        />

        <div className="details">
          <Details selectedRow={selectedRow}
            data={data} setData={setData}
            setSelectedRow={setSelectedRow}
            handleClose={handleClose} />
        </div> */}

      </div>
    </div>
    </Router>
  );
}

export default Body;
