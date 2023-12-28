import axios from "axios";
import { fixStaffFormat } from "../utils/formatUtils";
// Staff service

// Function to fetch a list of prisoners
export const fetchStaff = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/getallstaff",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Staff: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching staff:', error);
    throw error;
  }
};

export const fetchDoctors = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/doctors",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Doctors: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

export const fetchStaffById = async (id) => {
  try {
    const response = await axios
    .post("http://localhost:3000/admin/getstaffbyid", { "staff_id": id})
    .then((res) => {
      // Find the prisoner with the specified ID
      const data = res.data
      if (!data) {
        throw new Error(`Staff with ID ${id} not found`);
      }

      const staff = data[0];
      fixStaffFormat(staff);
      //fixPrisonerDetailsFormat(prisoner[0]);
      console.log(`Staff with ID ${id}: `, prisoner); // Log the response
      return prisoner;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching staff with ID ${id}:`, error);
    throw error;
  }
};

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