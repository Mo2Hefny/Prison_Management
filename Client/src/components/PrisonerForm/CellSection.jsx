import React, { useEffect, useState } from 'react'
import Input from '../Input'
import DisplayTable from '../DisplayTable';
import { fetchCellById, fetchCells, fetchPrisonBlocksById } from '../../service/prisonUnitsService';

const cellsHeadCells = [
  {
    field: 'fullName',
    headerName: 'Cell',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 110,
    valueGetter: (params) =>
      `${params.row.blockname || ''} C${params.row.cell_id || ''}`,
  },
  { 
    field: 'security', 
    headerName: 'Security',
    width: 130
  },
  { 
    field: 'capacity', 
    headerName: 'Cap',
    width: 100
  },
]

const CellSection = ({ details, onChange, setSelected }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const [cellTable, setCellTable] = useState([{}]);

  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  }

  useEffect(() => {
    async function fetchOwnCell() {
      const prisonerCell = await fetchCellById([details.blockid, details.cell_id]);
      console.log(prisonerCell);
      setSelectionModel(prisonerCell);
    }
    fetchOwnCell();
    async function fetchPrisonCells() {
      const prisonerCells = await fetchCells();
      console.log(prisonerCells);
      const cellsBlockName = await Promise.all(
      prisonerCells.map( async(cell) => {
        const block = await fetchPrisonBlocksById(cell.block_id);
        console.log(block.blockname);
        return {'id': [cell.blockid, cell.cell_id] ,...cell, 'blockname': block.blockname, 'security': block.security_type};
      }));
      console.log(cellsBlockName);
      setCellTable(cellsBlockName);
    }
    fetchPrisonCells();
  }, []);


  return (
    <div className='form-section cell-section'>
      <DisplayTable
        title='Cells'
        dataTable={cellTable}
        selectedColumns={cellsHeadCells}
        setSelected={setSelected}
        selectedRows={selectionModel} 
        rowID='id'
        readOnly={true}
      />
    </div>
  )
}

export default CellSection