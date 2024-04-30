import React from 'react'
import Pagination from './Pagination'

function Table({handleRowClick,handleSort,FaSortNumericUp,sortOrder,FaSortNumericUpAlt,currentItems}) {
  return (
    <div>
    <table className='main-table'>
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
          <Pagination/>
          </div>
  )
}

export default Table