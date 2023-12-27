import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Prisoners.css";
import EnhancedTable from "../components/SortingTable";
import { filterVisitorsColumns, filterVisitsColumns } from "../utils/dataUtils";
import { fetchVisitations, fetchVisitationsByDate, fetchVisitorById, fetchVisitors } from "../service/visitationService";
import DisplayTable from "../components/DisplayTable";

const visitorsHeadCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    color: "var(--primary-color)",
    label: 'Full Name',
  },
  {
    id: 'ssn',
    numeric: false,
    disablePadding: false,
    label: 'SSN',
  },
  {
    id: 'address',
    numeric: true,
    disablePadding: false,
    label: 'Address',
  },
  
];

const visitationsHeadCells = [
  {
    id: 'Prisoner Name',
    numeric: false,
    disablePadding: true,
    label: 'Prisoner',
  },
  {
    id: 'Visitor Name',
    numeric: false,
    disablePadding: false,
    label: 'Visitor',
  },
  {
    id: 'Visit date',
    numeric: false,
    disablePadding: false,
    label: 'Date',
  },
  {
    id: 'attended',
    numeric: false,
    disablePadding: false,
    label: 'Attended',
  },
  
];

const Visitations = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  // visitors variables
  const [visitorDetails, setVisitorDetails] = useState([]);
  const [visitorsFilteredTable, setVisitorsFilteredTable] = useState([{}]);
  // visitations variables
  const [visitationDetails, setVisitationDetails] = useState([]);
  const [visitsFilteredTable, setVisitsFilteredTable] = useState([{}]);
  const [tdyVisitsFilteredTable, setTdyVisitsFilteredTable] = useState([{}]);
  const readOnly = ["visitor", "doctor"].includes(view);
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setVisitorDetails({
      pid: null,
      fname: "",
      lname: "",
      age: "",
      bDate: "",
      gender: "Male",
      ssn: "",
      status: "Detained",
      admissionDate: new Date(),
      releaseDate: null,
      sentenceTime: 10,
    });
  };

  const editForm = () => {
    setIsFormEdit(true);
    setIsFormOpen(true);
  };

  const toggleForm = () => {
    setIsFormEdit(false);
    setIsFormOpen(!isFormOpen);
  };

  const getVisitorDetails = async (id) => {
    try {
      const newDetails = await fetchVisitorById(id);
      console.log("Fetched prisoner:", newDetails);
      setVisitorDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all visitors details on any change or submission
  useEffect(() => {
    async function fetchVisitorsData() {
      try {
        const visitorsDataTable = await fetchVisitors();
        const filteredTable = filterVisitorsColumns(visitorsDataTable, visitorsHeadCells);
        console.log("Fetched prisoners:", filteredTable);
        setVisitorsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchVisitorsData();
  }, [isFormEdit, isFormOpen]);

  // Retrieve all visitations details on any change or submission
  useEffect(() => {
    async function fetchVisitationsData() {
      try {
        const visitationsDataTable = await fetchVisitations();
        const filteredTable = filterVisitsColumns(visitationsDataTable, visitationsHeadCells);
        console.log("Fetched visitations:", filteredTable);
        setVisitsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchVisitationsData();
    async function fetchTdyVisitationsData() {
      try {
        const visitationsDataTable = await fetchVisitationsByDate(new Date());
        const filteredTable = filterVisitsColumns(visitationsDataTable, visitationsHeadCells);
        console.log("Fetched visitations:", filteredTable);
        setTdyVisitsFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchTdyVisitationsData();
  }, [isFormEdit, isFormOpen]);

  return (
    <div className="page visitations-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <PrisonerForm
          details={visitorDetails}
          isOpen={isFormOpen}
          onClose={onClose}
        ></PrisonerForm>
      )}
      <h1 className="page-title">Visitation Management Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table enhanced-table">
            <EnhancedTable
              dataTable={visitorsFilteredTable}
              dataHeadCells={visitorsHeadCells}
              title="Visitors"
              onAdd={toggleForm}
              onEdit={getVisitorDetails}
              readOnly={readOnly}
              />
          </div>
          <div className="table enhanced-table table-grid">
              <EnhancedTable
                dataTable={visitsFilteredTable}
                dataHeadCells={visitationsHeadCells}
                title="Visitations"
                onAdd={toggleForm}
                onEdit={getVisitorDetails}
                readOnly={readOnly}
                editable={false}
              />
              <DisplayTable
                title="Today visits"
                dataTable={tdyVisitsFilteredTable}
                selectedColumns={["Prisoner Name", "Visitor Name"]}
                onClick={toggleForm}
                UIMode={"add"}
              />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Visitations;
