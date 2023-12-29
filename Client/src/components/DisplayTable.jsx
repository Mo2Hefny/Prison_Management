import React from 'react'
import Button from './Button';
import './DisplayTable.css'
import './SortingTable.css'
import DataTable from './DataTable';

const DisplayTable = ({ title, dataTable, selectedColumns, UIMode, onClick}) => {
  const plusSign = `<svg data-slot="icon" data-darkreader-inline-stroke="" fill="none" stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px;" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
</svg><p>Add</p>`

  console.log(dataTable)
  console.log(Object.entries(dataTable[0])[0])
  const rows = (Object.entries(dataTable[0])[0] != undefined ? [...dataTable] : [{ id: '1' }])
  console.log(rows)
  console.log(selectedColumns)

  return (
    <div className='display-grid-container'>
        <h2 className='display-table-title'>{title}</h2>
      {/* Add a button beside the title to add to the table */}
      {'addBtn' === UIMode && (<Button text={<span dangerouslySetInnerHTML={{ __html: plusSign }} />} onClick={onClick} classNames='add-btn btn btn-G'/>)}
      <div className='display-table'>
        <DataTable rows={rows} columns={selectedColumns} />
      </div>
    </div>
  )
}

DisplayTable.defaultProps = {
  onClick: () => {},
}


export default DisplayTable