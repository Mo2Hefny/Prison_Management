import axios from "axios";
// prisonerService.js

const JSON_FILE_URL_BLOCK = '../../data/prisonBlocks.json'; // Adjust the path as needed
const JSON_FILE_URL_CELL = '../../data/cells.json'; // Adjust the path as needed

// Function to fetch a list of prison blocks
export const fetchPrisonBlocks = async () => {
  try {
    const response = await fetch(JSON_FILE_URL_BLOCK);
    if (!response.ok) {
      throw new Error('Failed to fetch prison blocks');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prison blocks:', error);
    throw error;
  }
};

// Function to fetch a prison block with a specified ID
export const fetchPrisonBlocksById = async (id) => {
  try {
    const response = await fetch(JSON_FILE_URL_BLOCK);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch prisoners');
    }
    
    const data = await response.json();

    // Find the block with the specified ID
    const block = data.find((block) => block.block_id === id);
    
    if (!block) {
      throw new Error(`Block with ID ${id} not found`);
    }
    console.log(`Block ${id}: `, block); // Log the response
    return block;
  } catch (error) {
    console.error(`Error fetching prisoner with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCellsForBlockById = async (id) => {
  try {
    const response = await fetch(JSON_FILE_URL_CELL);
    console.log('Response:', response); // Log the response
    if (!response.ok) {
      throw new Error('Failed to fetch prisoners');
    }
    
    const data = await response.json();

    // Find the cells that belongs to the block with the specified ID
    const cells = data.filter((cell) => cell.block_id === id);

    return cells;
  } catch (error) {
    console.error(`Error fetching cells belonging to block ${id}:`, error);
    throw error;
  }
}