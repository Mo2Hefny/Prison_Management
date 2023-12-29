import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import EnhancedTable from "../components/SortingTable";
import { fetchOffenses, fetchOffensesById, fetchPrisonerById, fetchPrisoners, insertPrisoner } from "../service/prisonerService";
import { filterOffensesColumns, filterPrisonersColumns } from "../utils/dataUtils";
import { queryPrisonerFormat } from "../utils/formatUtils";
import OffenseForm from "../components/OffenseForm/OffenseForm";

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

const offensesHeadCells = [
  {
    id: 'offense_num',
    numeric: false,
    disablePadding: true,
    label: 'Offense#',
  },
  {
    id: 'offensename',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'jailtime',
    numeric: true,
    disablePadding: false,
    label: 'Jail time',
  },
  {
    id: 'degree',
    numeric: true,
    disablePadding: false,
    label: 'Degree',
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
  cell_id: null,
  blockid: null
}

const offenseDetailsTemplate = {
  offenseid: null,
  offensename: "",
  jailtime: 0,
  degree: 0,
}

const Prisoners = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [prisonerDetails, setPrisonerDetails] = useState(prisonerDetailsTemplate);
  const [prisonersFilteredTable, setPrisonersFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "doctor", "staff"].includes(view);
  // Offenses variables
  const [isOffenseFormOpen, setIsOffenseFormOpen] = useState(false);
  const [isOffenseFormEdit, setIsOffenseFormEdit] = useState(false);
  const [offenseDetails, setOffenseDetails] = useState(offenseDetailsTemplate);
  const [offensesFilteredTable, setOffenseFilteredTable] = useState([{}]);
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

  // Function to toggle the form's visibility.
  const onOffenseClose = () => {
    setIsOffenseFormOpen(false);
    setOffenseDetails(offenseDetailsTemplate);
  };
  
  const editOffenseForm = () => {
    setIsOffenseFormEdit(true);
    setIsOffenseFormOpen(true);
  };

  const toggleOffenseForm = () => {
    setIsOffenseFormEdit(false);
    setIsOffenseFormOpen(!isFormOpen);
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

  const getOffensesDetails = async (id) => {
    try {
      const newDetails = await fetchOffensesById(id);
      console.log("Fetched offense:", newDetails);
      setOffenseDetails({ ...newDetails });
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

  // Retrieve all offense details on any change or submission
  useEffect(() => {
    async function fetchAllOffenses() {
      try {
        const offensesDataTable = await fetchOffenses();
        console.log(offensesDataTable)
        const filteredTable = filterOffensesColumns(offensesDataTable, offensesHeadCells);
        console.log("Fetched offenses:", filteredTable);
        setOffenseFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchAllOffenses();
  }, [isOffenseFormEdit, isOffenseFormOpen]);

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
      {/* Render the form when it is opened */}
      {isOffenseFormOpen && (
        <OffenseForm
          details={offenseDetails}
          isOpen={isOffenseFormOpen}
          isEdit={isOffenseFormEdit}
          onClose={onOffenseClose}
        ></OffenseForm>
      )}
      <h1 className="page-title">Prisoners Management Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table enhanced-table glassmorphism">
            <EnhancedTable
              dataTable={prisonersFilteredTable}
              dataHeadCells={prisonersHeadCells}
              title="Prisoners"
              onAdd={toggleForm}
              onEdit={getPrisonerDetails}
              deletable={false}
              readOnly={readOnly}
            />
          </div>
          <div className="table enhanced-table glassmorphism">
            <EnhancedTable
              dataTable={offensesFilteredTable}
              dataHeadCells={offensesHeadCells}
              title="Offenses"
              onAdd={toggleOffenseForm}
              onEdit={getOffensesDetails}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prisoners;
