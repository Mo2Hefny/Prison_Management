import axios from "axios";
// prisonerService.js

const JSON_FILE_URL_BLOCK = '../../data/prisonBlocks.json'; // Adjust the path as needed
const JSON_FILE_URL_CELL = '../../data/cells.json'; // Adjust the path as needed

// Function to fetch a list of prison blocks
export const fetchPrisonBlocks = async () => {
  try {
    const response = await axios ({
      method: "get",
      url: "http://localhost:3000/admin/getAllPrisonBlocks",
    })
    console.log('Response:', response); // Log the response
    const data = response.data;
    return data;
  } catch (error) {
    console.error(`Error fetching visits with date ${date}`, error);
    throw error;
  }
};

// Function to fetch a prison block with a specified ID
export const fetchPrisonBlocksById = async (id) => {
  try {
    console.log(id);
    const response = await axios
    .post("http://localhost:3000/admin/getblockid", { "block_id": id })
    .then((response) => {
      console.log('Response:', response); // Log the response
    const block = response.data;
    
    console.log(`Block: `, block);
    
    if (!block) {
      throw new Error(`Block ${id} is not found`);
    }

    return block;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching block ${id}:`, error);
    throw error;
  }
};

export const fetchCellsForBlockById = async (id) => {
  try {
    console.log(id);
    const response = await axios
    .post("http://localhost:3000/admin/getcellsblock", { "block_id": id})
    .then((response) => {
      console.log('Response:', response); // Log the response
    const cells = response.data;
    
    // Find the visits in a specified date
    console.log(`Cells: `, cells);

    if (cells.length === 0) {
      throw new Error(`Block ${id} has no cells`);
    }

    return cells;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching cells in block ${id}:`, error);
    throw error;
  }
}

export const fetchCellById = async (id) => {
  try {
    console.log(id);
    const response = await axios
    .post("http://localhost:3000/admin/getcellbyid", { "block_id": id[0], "cell_id": id[1] })
    .then((response) => {
      console.log('Response:', response); // Log the response
    const cells = response.data;
    
    // Find the visits in a specified date
    console.log(`Cells: `, cells);

    if (cells.length === 0) {
      throw new Error(`Block ${id} has no cells`);
    }

    return cells;
    })
    .catch((err) => console.log(err));
    return response;
  } catch (error) {
    console.error(`Error fetching cells in block ${id}:`, error);
    throw error;
  }
}