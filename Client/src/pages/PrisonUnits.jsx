import React from "react";
import { useState, useEffect } from "react";
import "./Prisoners.css";
import CollapsibleTable from "../components/CollapsibleTable";
import {
  fetchPrisonBlocks,
  fetchCellsForBlockById,
  fetchCellById,
  fetchPrisonBlocksById,
} from "../service/prisonUnitsService";
import { filterBlockColumns} from "../utils/dataUtils";
import CellForm from "../components/CellForm/CellForm";
import BlockForm from "../components/BlockForm/BlockForm";
import { deleteblock,deletecell} from "../service/prisonUnitsService"

const prisonBlockHeadCells = [
  {
    id: "blockname",
    numeric: false,
    disablePadding: true,
    label: "Block Name",
  },
  {
    id: "cellsNum",
    numeric: true,
    disablePadding: false,
    label: "Cells Capacity",
  },
  {
    id: "security_type",
    numeric: true,
    disablePadding: false,
    label: "Security",
  },
];

const prisonCellsHeadCells = [
  {
    id: "type",
    numeric: false,
    disablePadding: true,
    label: "Cell Type",
  },
  {
    id: "capacity",
    numeric: true,
    disablePadding: false,
    label: "Capacity",
  },
  {
    id: "floor",
    numeric: true,
    disablePadding: false,
    label: "Floor",
  },
  {
    id: "size",
    numeric: true,
    disablePadding: false,
    label: "Size",
  },
];

const blockDetailsTemplate = {
  blockid: null,
  securityType: "",
  blockName: "",
  cellsNum: 10,
};

const cellDetailsTemplate = {
  block_id: "",
  cell_id: "",
  capacity: "",
  type: "Inmate Cells",
  size: "",
  floor: "",
};

const PrisonUnits = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [blockDetails, setBlockDetails] = useState(blockDetailsTemplate);
  const [blockFilteredTable, setBlockFilteredTable] = useState([{}]);
  const readOnly = ["staff", "visitor", "doctor"].includes(view);
  // Cells variables
  const [isCellFormOpen, setIsCellFormOpen] = useState(false);
  const [isCellFormEdit, setIsCellFormEdit] = useState(false);
  const [cellDetails, setCellDetails] = useState(cellDetailsTemplate);
  console.log(cellDetails)
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setBlockDetails(blockDetailsTemplate);
  };

  const editForm = () => {
    setIsFormEdit(true);
    setIsFormOpen(true);
  };

  const toggleForm = () => {
    setIsFormEdit(false);
    setIsFormOpen(!isFormOpen);
  };

  const getBlockDetails = async (id) => {
    try {
      const newDetails = await fetchPrisonBlocksById(id);
      console.log("Fetched block:", newDetails);
      setBlockDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Function to toggle the form's visibility.
  const onCellClose = () => {
    setIsCellFormOpen(false);
    setCellDetails(cellDetailsTemplate);
  };

  const editCellForm = () => {
    setIsCellFormEdit(true);
    setIsCellFormOpen(true);
  };

  const toggleCellForm = () => {
    setIsCellFormEdit(false);
    setIsCellFormOpen(!isCellFormOpen);
  };

  const deleteBlock = async (blockid) => {
    try {
      const newDetails = await deleteblock(blockid);
      console.log("Fetched cell:", newDetails);
      //editForm();
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };

  const deleteCell = async (blockid_cell_id) => {
    try {
      const newDetails = await deletecell(blockid_cell_id);
      console.log("Fetched cell:", newDetails);
      //editCellForm();
    }
    catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getCellDetails = async (id) => {
    console.log(id);
    try {
      const newDetails = await fetchCellById(id);
      console.log("Fetched cell:", newDetails);
      setCellDetails({ ...newDetails });
      editCellForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all blocks details on any change or submission
  useEffect(() => {
    async function fetchBlockData() {
      try {
        // Retrieve all blocks details.
        const blockDataTable = await fetchPrisonBlocks();
        // Retrieve all cells details belonging to each block.
        const blocksWithCells = await Promise.all(
          blockDataTable.map(async (block) => {
            const cells = await fetchCellsForBlockById(block.blockid);
            // Assuming fetchCellsForBlock(blockId) is a function that fetches cells for a given block ID
            return { ...block, cells };
          })
        );
        console.log("Fetched blocks:", blocksWithCells);
        const filteredTable = filterBlockColumns(
          blocksWithCells,
          prisonBlockHeadCells,
          prisonCellsHeadCells
          );
          console.log("Fetched filtered blocks:", filteredTable);
        setBlockFilteredTable([...filteredTable]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchBlockData();
  }, [isFormEdit, isFormOpen]);

  return (
    <div className="page prison-units-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <BlockForm isOpen={isFormOpen} onClose={toggleForm}details={blockDetails}></BlockForm>
      )}
      {isCellFormOpen && (
        <CellForm isOpen={isCellFormOpen} onClose={toggleCellForm} details={cellDetails}></CellForm>
      )}
      <h1 className="page-title">Prison Units Management</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table collapsible-table glassmorphism">
            <CollapsibleTable
              dataTable={blockFilteredTable}
              dataHeadCells={prisonBlockHeadCells}
              subDataHeadCells={prisonCellsHeadCells}
              title="Prison Blocks"
              subTableTitle="Cells"
              readOnly={readOnly}
              onAdd={toggleForm}
              onEdit={getBlockDetails}
              onSubEdit={getCellDetails}
              onDelete={deleteBlock}
              onSubDelete={deleteCell}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrisonUnits;
