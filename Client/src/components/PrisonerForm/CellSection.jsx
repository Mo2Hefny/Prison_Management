import React, { useEffect, useState } from "react";
import Input from "../Input";
import DisplayTable from "../DisplayTable";
import {
  fetchCellById,
  fetchCells,
  fetchCellsForBlockById,
  fetchPrisonBlocks,
  fetchPrisonBlocksById,
} from "../../service/prisonUnitsService";
import { SelectSmall } from "../SelectComponent";

const cellsHeadCells = [
  {
    field: "cell_id",
    headerName: "Cell#",
    width: 130,
  },
  {
    field: "size",
    headerName: "Occupants",
    width: 130,
  },
  {
    field: "capacity",
    headerName: "Cap",
    width: 100,
  },
];

const CellSection = ({ details, onChange }) => {
  const [blockList, setBlockList] = useState([[]]);
  const [cellList, setCellList] = useState([[]]);
  const [cellTable, setCellTable] = useState([[]]);

  const handleChange = (e, field) => {
    onChange(field, e.target.value);
  };

  useEffect(() => {
    async function fetchBlockList() {
      try {
        const blocks = await fetchPrisonBlocks();
        console.log(blocks);
        const blockID = blocks.map((block) => block.blockid);
        const blockNames = blocks.map((block) => block.blockname);
        setBlockList([blockID, blockNames]);
      } catch (e) {
        throw new Error(e);
      }
    }
    fetchBlockList();
  }, []);
  useEffect(() => {
    async function fetchPrisonCells() {
      try {
        const blockCells = await fetchCellsForBlockById(details.blockid);
        const cellID = blockCells.map((cell) => cell.cell_id);
        console.log(blockCells);
        console.log(cellID);
        setCellTable(blockCells);
        setCellList(cellID);
      } catch (e) {
        throw new Error(e);
      }
    }
    fetchPrisonCells();
  }, [details.blockid]);

  return (
    <div className="form-section cell-section">
      <SelectSmall value={details.blockid} label='Block Name' list={blockList[0]} field='blockid' onChange={onChange} maxWidth={190} Null={true}/>
      <SelectSmall value={details.cell_id} label='Status' list={cellList} field='cell_id' onChange={onChange} maxWidth={190} Null={true}/>
      <DisplayTable
                title="Block cells"
                dataTable={cellTable}
                selectedColumns={cellsHeadCells}
                readOnly={true}
      />
    </div>
  );
};

export default CellSection;
