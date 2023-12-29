import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css'

export default function DataTable({ rows, columns, readOnly }) {
  console.log(rows)
  console.log(columns)
  const [selectionModel, setSelectionModel] = useState([]);
  function addNewSelected(selectedRows) {
    // Add your custom logic here
    console.log('Selected Rows:', selectedRows);
    setSelectionModel([selectedRows])
  }
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        selectionModel={selectionModel}
        onRowSelectionModelChange={(newSelectionModel) => addNewSelected(newSelectionModel)}
        keepNonExistentRowsSelected={true}
      />
    </div>
  );
}

DataTable.defaultProps = {
  readOnly: false,
}