import React from 'react'
import './DisplayTable.css'

const DisplayTable = ({ title, dataTable, selectedColumns}) => {
  return (
    <div className='display-grid-container'>
      <h2 className='display-table-title'>{title}</h2>
      <div className='display-table'>
        <div className='table-header'>
          {/* Render headers for selected columns */}
          {selectedColumns.map((column, index) => (
            <div key={index} className='table-header-cell'>
              {column}
            </div>
          ))}
        </div>
        
        <div className='table-body'>
          {/* Render rows with data for selected columns */}
          {dataTable.map((row, rowIndex) => (
            <div key={rowIndex} className='table-row'>
              {selectedColumns.map((column, columnIndex) => (
                <div key={columnIndex} className='table-cell'>
                  {row[column]}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DisplayTable