import axios from "axios";
import { isDateToday } from "../utils/dateUtils";
// visitationService.js

const JSON_FILE_URL_VISITS = '../../data/visitations.json'; // Adjust the path as needed
const JSON_FILE_URL_VISITORS = '../../data/visitors.json'; // Adjust the path as needed

// Function to fetch a list of visitors
export const fetchVisitors = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/getAllVisitors",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Visitations: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching visits log:', error);
    throw error;
  }
};

export const fetchVisitorById = async (id) => {
  try {
    const response = await fetch(JSON_FILE_URL_VISITORS);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch visitor');
    }
    
    const data = await response.json();

    // Find the visitor with the specified ID
    const visitor = data.find((visitor) => visitor.visID === id);

    if (!visitor) {
      throw new Error(`Visitors with ID ${id} not found`);
    }

    fixVisitorsDetailsFormat(visitor);
    console.log(`Prisoner with ID ${id}: `, visitor); // Log the response
    return visitor;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};

const fixVisitorsDetailsFormat = (details) => {
  details.bdate = new Date(details.bdate);
}

// Function to fetch a list of visits log
export const fetchVisitations = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/getallvisitation",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    console.log(`Visitations: `, data);
    return data;
  } catch (error) {
    console.error('Error fetching visits log:', error);
    throw error;
  }
};

export const fetchVisitationsByDate = async (date) => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/getallvisitation",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    
    // Find the visits in a specified date
    const visits = data.filter((visit) => isDateToday(visit['Visit date']))
    console.log(new Date())
    console.log(`Today Visitations: `, visits);

    if (visits.length === 0) {
      throw new Error(`Visits with date ${date} not found`);
    }

    return visits;
  } catch (error) {
    console.error(`Error fetching visits with date ${date}`, error);
    throw error;
  }
};

export const fetchVisitationsById = async (pid, visID) => {
  try {
    const response = await fetch(JSON_FILE_URL_VISITS);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch visitor');
    }
    
    const data = await response.json();

    // Find the visits with the specified ID
    const visits = data.filter((visit) => (visit.visID === visID && visit.pid === pid));

    if (visits.length === 0) {
      throw new Error(`Visits with ID ${pid} and ${visID} not found`);
    }

    return visits;
  } catch (error) {
    console.error(`Error fetching visits with ID ${pid} and ${visID}:`, error);
    throw error;
  }
};