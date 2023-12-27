import axios from "axios";
// Staff service

const JSON_FILE_URL = '../../data/staff.json'; // Adjust the path as needed

// Function to fetch a list of prisoners
export const fetchStaff = async () => {
  try {
    const response = await fetch(JSON_FILE_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch staff');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

export const fetchStaffById = async (id) => {
  try {
    const response = await fetch(JSON_FILE_URL);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch prisoners');
    }
    
    const data = await response.json();

    // Find the prisoner with the specified ID
    const employee = data.find((employee) => employee.staff_id === id);

    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }

    fixStaffDetailsFormat(employee);
    console.log(`Employee with ID ${id}: `, employee); // Log the response
    return employee;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

const fixStaffDetailsFormat = (details) => {
  details.bdate = new Date(details.bdate);
  details.hireDate = new Date(details.hireDate);
}

export const getStaffType = (staff) => {
  if (staff.hasOwnProperty("specialty")) {
    // Doctor
    return "Doctor";
  } else if (staff.hasOwnProperty("type")) {
    // Guard
    return "Guard";
  } else {
    // General Staff
    return "Staff";
  }
}