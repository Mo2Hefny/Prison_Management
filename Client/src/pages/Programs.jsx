import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/ProgramForm/ProgramForm";
import "./Programs.css";
import EnhancedTable from "../components/SortingTable";
import { fetchParoles, fetchParolesById, fetchProgramById, fetchPrograms, insertProgram } from "../service/programService";
import { filterParolesColumns, filterProgramsColumns } from "../utils/dataUtils";
import { queryProgramFormat } from "../utils/formatUtils";
import ParoleForm from "../components/ParoleForm/ParoleForm";

const programsHeadCells = [
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

const parolesHeadCells = [
  {
    id: 'parole_num',
    numeric: false,
    disablePadding: true,
    label: 'Parole#',
  },
  {
    id: 'parolename',
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

const programsDetailsTemplate = {
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

const paroleDetailsTemplate = {
  paroleid: null,
  parolename: "",
  jailtime: 0,
  degree: 0,
}

const Programs = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [programDetails, setProgramDetails] = useState(programsDetailsTemplate);
  const [programsFilteredTable, setProgramsFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "doctor", "staff"].includes(view);
  // Paroles variables
  const [isParoleFormOpen, setIsParoleFormOpen] = useState(false);
  const [isParoleFormEdit, setIsParoleFormEdit] = useState(false);
  const [paroleDetails, setParoleDetails] = useState(paroleDetailsTemplate);
  const [parolesFilteredTable, setParoleFilteredTable] = useState([{}]);
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setProgramDetails(programDetailsTemplate);
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
  const onParoleClose = () => {
    setIsParoleFormOpen(false);
    setParoleDetails(paroleDetailsTemplate);
  };
  
  const editParoleForm = () => {
    setIsParoleFormEdit(true);
    setIsParoleFormOpen(true);
  };

  const toggleParoleForm = () => {
    setIsParoleFormEdit(false);
    setIsParoleFormOpen(!isFormOpen);
  };

  const getProgramDetails = async (id) => {
    try {
      const newDetails = await fetchProgramById(id);
      console.log("Fetched program:", newDetails);
      setProgramDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const getParolesDetails = async (id) => {
    try {
      const newDetails = await fetchParolesById(id);
      console.log("Fetched parole:", newDetails);
      setParoleDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all programs details on any change or submission
  useEffect(() => {
    async function fetchProgramsData() {
      try {
        const programsDataTable = await fetchPrograms();
        const filteredTable = filterProgramsColumns(programsDataTable, programsHeadCells);
        console.log("Fetched programs:", filteredTable);
        setProgramsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchProgramsData();
  }, [isFormEdit, isFormOpen]);

  // Retrieve all parole details on any change or submission
  useEffect(() => {
    async function fetchAllParoles() {
      try {
        const parolesDataTable = await fetchParoles();
        console.log(parolesDataTable)
        const filteredTable = filterParolesColumns(parolesDataTable, parolesHeadCells);
        console.log("Fetched paroles:", filteredTable);
        setParoleFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchAllParoles();
  }, [isParoleFormEdit, isParoleFormOpen]);

  return (
    <div className="page programs-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <ProgramForm
          details={programDetails}
          isOpen={isFormOpen}
          isEdit={isFormEdit}
          onClose={onClose}
        ></ProgramForm>
      )}
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <ParoleForm
          details={paroleDetails}
          isOpen={isParoleFormOpen}
          isEdit={isParoleFormEdit}
          onClose={onParoleClose}
        ></ParoleForm>
      )}
      <h1 className="page-title">Programs Management Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table enhanced-table glassmorphism">
            <EnhancedTable
              dataTable={programsFilteredTable}
              dataHeadCells={programsHeadCells}
              title="Programs"
              onAdd={toggleForm}
              onEdit={getProgramDetails}
              deletable={false}
              readOnly={readOnly}
            />
          </div>
          <div className="table enhanced-table glassmorphism">
            <EnhancedTable
              dataTable={parolesFilteredTable}
              dataHeadCells={parolesHeadCells}
              title="Paroles"
              onAdd={toggleParoleForm}
              onEdit={getParolesDetails}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Programs;
