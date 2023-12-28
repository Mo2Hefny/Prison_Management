import React from "react";
import { useState, useEffect } from "react";
import PrisonerForm from "../components/PrisonerForm/PrisonerForm";
import "./Staff.css";
import EnhancedTable from "../components/SortingTable";
import { fetchStaffById, fetchStaff } from "../service/staffService";
import { filterStaffColumns } from "../utils/dataUtils";

const staffHeadCells = [
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
    id: 'salary',
    numeric: true,
    disablePadding: false,
    label: 'Salary',
  },
  {
    id: 'supervisorSSN',
    numeric: true,
    disablePadding: false,
    label: 'Supervisor',
  },
  {
    id: 'hiredate',
    numeric: true,
    disablePadding: false,
    label: 'Hire Date',
  },
  {
    id: 'shift',
    numeric: true,
    disablePadding: false,
    label: 'Shift',
  },
  {
    id: 'staffType',
    numeric: true,
    disablePadding: false,
    label: 'Position',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: false,
    label: 'Status',
  },
  
];

const staffDetailsTemplate = {
  staff_id: "",
  fname: "",
  lname: "",
  ssn: null,
  bdate: "",
  hireDate: new Date(),
  supervisorID: null,
  salary: null,
  shift: "Day",
  status: "Active",
  staffType: "Staff",
  speciality: "",
  experienceYrs: null,
  type: "Patrol Gaurd",
  blockID: null,
}

const Staff = ({ view }) => {
  // State variable to manage the form's visibility.
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFormEdit, setIsFormEdit] = useState(false);
  const [staffDetails, setStaffDetails] = useState(staffDetailsTemplate);
  const [staffFilteredTable, setStaffFilteredTable] = useState([{}]);
  const readOnly = ["visitor"].includes(view);
  // Function to toggle the form's visibility.
  const onClose = () => {
    setIsFormOpen(false);
    setStaffDetails(staffDetailsTemplate);
  };

  const editForm = () => {
    setIsFormEdit(true);
    setIsFormOpen(true);
  };

  const toggleForm = () => {
    setIsFormEdit(false);
    setIsFormOpen(!isFormOpen);
  };

  const getStaffDetails = async (id) => {
    try {
      const newDetails = await fetchStaffById(id);
      console.log("Fetched staff:", newDetails);
      setStaffDetails({ ...newDetails });
      editForm();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  // Retrieve all staff details on any change or submission
  useEffect(() => {
    async function fetchStaffData() {
      try {
        const staffDataTable = await fetchStaff();
        const filteredTable = filterStaffColumns(staffDataTable, staffHeadCells);
        console.log("Fetched staff:", filteredTable);
        setStaffFilteredTable([ ...filteredTable ]);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
    fetchStaffData();
  }, [isFormEdit, isFormOpen]);

  return (
    <div className="page staff-page">
      {/* Render the form when it is opened */}
      {isFormOpen && (
        <PrisonerForm
          details={staffDetails}
          isOpen={isFormOpen}
          onClose={onClose}
        ></PrisonerForm>
      )}
      <h1 className="page-title">Staff Management Dashboard</h1>
      <div className="page-body">
        <div className="page-body-section">
          <div className="table enhanced-table">
            <EnhancedTable
              dataTable={staffFilteredTable}
              dataHeadCells={staffHeadCells}
              title="Staff"
              onAdd={toggleForm}
              onEdit={getStaffDetails}
              readOnly={readOnly}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;
