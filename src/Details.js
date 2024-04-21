import React from 'react'
import { useState } from 'react';
import './App.css'
function Details({ isDetailOpen, selectedRow, data, setData, setSelectedRow, handleClose }) {
  const [editMode, setEditMode] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  // const handleEdit = () => {
  //   setEditMode(true);
  //   setEditedRow({ ...selectedRow });
  // };


  const handleSave = () => {
    // Update the selectedRow with editedRow data
    const newData = data.map((row) =>
      row.id === editedRow.id ? editedRow : row
    );
    setData(newData);
    setSelectedRow(editedRow);
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditMode(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRow((prevRow) => ({
      ...prevRow,
      [name]: value,
    }));
  };
  return (
    <div className='detail-section'>
      {isDetailOpen && selectedRow && (
        <div>


          {editMode ? (
            <div className='edit-detail'>

              <label>Title: </label>
              <input
                type="text"
                name="title"
                value={editedRow.error_code}
                onChange={handleChange}

              />
              <br />
              <label>Body: </label>
              <input
                type="text"
                name="body"
                value={editedRow.body}
                onChange={handleChange}
              />
              <br />
              <button onClick={handleSave}>Save</button>
              <button onClick={handleCancel}>Cancel</button>
            </div>
          ) : (
            <>
              <div className='detail-class'>
                <div className=''>
                  <p>Error code: <b>{selectedRow.error_code}</b></p>
                  <p>Error  Details : <input
                type="text"
                name="body"
                className='error-field'
                value={selectedRow.en}
              /></p>        
              <p>Error  Details : <input
                type="text"
                name="body"
                className='error-field'
                value={selectedRow.de}
              /></p>                
                  {/* <button onClick={handleEdit}>Edit</button> */}
                  <button onClick={handleClose}>Close</button>

                </div>
              </div>
              </>
          )}
            </div>
      )}
        </div>
      )
      }

      export default Details