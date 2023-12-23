import React from 'react'
import Button from './Button.jsx'
import './DisplayTable.css'

const DisplayTable = ({ title, dataTable, selectedColumns, UIMode, onClick}) => {
  const plusSign = `<svg data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
</svg><p>Add</p>`

  return (
    <div className='display-grid-container'>
        <h2 className='display-table-title'>{title}</h2>
      {/* Add a button beside the title to add to the table */}
      {'addBtn' === UIMode && (<Button text={<span dangerouslySetInnerHTML={{ __html: plusSign }} />} onClick={onClick} classNames='add-btn btn btn-G'/>)}
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

DisplayTable.defaultProps = {
  onClick: () => {},
  UIMode: '',
}


export default DisplayTable