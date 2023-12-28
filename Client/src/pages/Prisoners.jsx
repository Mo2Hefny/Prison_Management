import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import EnhancedTable from "../components/SortingTable";
import { fetchPrisonerById, fetchPrisoners, insertPrisoner } from "../service/prisonerService";
import { filterPrisonersColumns } from "../utils/dataUtils";
import { queryPrisonerFormat } from "../utils/formatUtils";

const prisonersHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Full Name',
  },
  {
    id: 'ssn',
    numeric: true,
    disablePadding: false,
    label: 'SSN',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Age',
  },
  {
    id: 'admission_date',
    numeric: true,
    disablePadding: false,
    label: 'Admission Date',
  },
  {
    id: 'release_date',
    numeric: true,
    disablePadding: false,
    label: 'Release Date',
  },
  {
    id: 'sentence_left',
    numeric: true,
    disablePadding: false,
    label: 'Sentence Left',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  
];

const prisonerDetailsTemplate = {
  pid: null,
  fname: "",
  lname: "",
  bdate: "",
  gender: "Male",
  ssn: "",
  status: "Detained",
  admission_date: new Date(),
  release_date: new Date(),
  cellid: null,
  blockid: null
}

const Prisoners = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [prisonerDetails, setPrisonerDetails] = useState(prisonerDetailsTemplate);
  const [prisonersFilteredTable, setPrisonersFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "doctor"].includes(view);
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setPrisonerDetails(prisonerDetailsTemplate);
  };
  
  const editForm = () => {
    setIsFormEdit(true);
    setIsFormOpen(true);
  };

  const toggleForm = () => {
    setIsFormEdit(false);
    setIsFormOpen(!isFormOpen);
  };

  const getPrisonerDetails = async (id) => {
    try {
      const newDetails = await fetchPrisonerById(id);
      console.log("Fetched prisoner:", newDetails);
      setPrisonerDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all prisoners details on any change or submission
  useEffect(() => {
    async function fetchPrisonersData() {
      try {
        const prisonersDataTable = await fetchPrisoners();
        const filteredTable = filterPrisonersColumns(prisonersDataTable, prisonersHeadCells);
        console.log("Fetched prisoners:", filteredTable);
        setPrisonersFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchPrisonersData();
  }, [isFormEdit, isFormOpen]);

  return (
    <div className="page prisoners-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <PrisonerForm
          details={prisonerDetails}
          isOpen={isFormOpen}
          isEdit={isFormEdit}
          onClose={onClose}
        ></PrisonerForm>
      )}
      <h1 className="page-title">Prisoners Management Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table enhanced-table">
            <EnhancedTable
              dataTable={prisonersFilteredTable}
              dataHeadCells={prisonersHeadCells}
              title="Prisoners"
              onAdd={toggleForm}
              onEdit={getPrisonerDetails}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prisoners;
