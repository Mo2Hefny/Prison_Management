import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import CollapsibleTable from "../components/CollapsibleTable";
import {
  fetchPrisonBlocks,
  fetchCellsForBlockById,
} from "../service/prisonUnitsService";
import { filterBlockColumns } from "../utils/dataUtils";

const prisonBlockHeadCells = [
  {
    id: "blockName",
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
    id: "securityType",
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
    id: "cap",
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
  block_id: null,
  securityType: "",
  blockName: "",
  cellsNum: 10,
};

const PrisonUnits = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [blockDetails, setBlockDetails] = useState(blockDetailsTemplate);
  const [blockFilteredTable, setBlockFilteredTable] = useState([{}]);
  const readOnly = ["staff", "visitor", "doctor"].includes(view);
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
      const newDetails = await fetchStaffById(id);
      console.log("Fetched staff:", newDetails);
      setBlockDetails({ ...newDetails });
      editForm();
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
            const cells = await fetchCellsForBlockById(block.block_id);
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
          console.log("Fetched blocks:", filteredTable);
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
        <PrisonerForm isOpen={isFormOpen} onClose={toggleForm}></PrisonerForm>
      )}
      <h1 className="page-title">Prison Units Management</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table collapsible-table">
            <CollapsibleTable
              dataTable={blockFilteredTable}
              dataHeadCells={prisonBlockHeadCells}
              subDataHeadCells={prisonCellsHeadCells}
              title="Prison Blocks"
              subTableTitle="Cells"
              readOnly={readOnly}
              onAdd={toggleForm}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrisonUnits;
