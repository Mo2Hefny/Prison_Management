import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './DataTable.css'

export default function DataTable({ rows, columns, readOnly, rowID, selectedRows }) {
  const getRowId = (row) => row[rowID];
  console.log(rows)
  console.log(columns)
  const [selectionModel, setSelectionModel] = useState([]);
  console.log('Selected Rows:', selectionModel);
  function addNewSelected(selectedRows) {
    // Add your custom logic here
    setSelectionModel(selectedRows)
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
        checkboxSelection={!readOnly}
        selectionModel={selectionModel}
        onRowSelectionModelChange={(newSelectionModel) => addNewSelected(newSelectionModel)}
        keepNonExistentRowsSelected={true}
        getRowId={getRowId}
      />
    </div>
  );
}

DataTable.defaultProps = {
  readOnly: false,
}