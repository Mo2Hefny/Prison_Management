import { getStaffType } from "../service/staffService";
import { getDayDifference, getMonthDifference } from "./dateUtils";

// dataUtils.js
export const filterPrisonersColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['pid'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        newRow[column['id']] = `${row['fname']} ${row['lname']}`;
      } else if (column['id'] === 'sentenceLeft') {
        // Get remaining service to serve from the release date and today's date to create the "Sentence Left" column
        const monthDifference = getMonthDifference(new Date(), new Date(row['releaseDate']));
        const dayDifference = getDayDifference(new Date(), new Date(row['releaseDate']));
        if (monthDifference > 0) {
          newRow[column['id']] = `${monthDifference} month${monthDifference > 1 ? 's' : ''}`;
        } else if (dayDifference > 0) {
          newRow[column['id']] = `${dayDifference} day${dayDifference > 1 ? 's' : ''}`;
        } else {
          newRow[column['id']] = `-`;
        }
      } else {
        newRow[column['id']] = row[column['id']];
      }
    });
    return newRow;
  });
};

export const filterStaffColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['pid'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        newRow[column['id']] = `${row['fname']} ${row['lname']}`;
      } else if (column['id'] === 'staffType') {
        // Get remaining service to serve from the release date and today's date to create the "Sentence Left" column
        newRow[column['id']] = getStaffType(row);
      } else {
        newRow[column['id']] = row[column['id']];
      }
    });
    return newRow;
  });
};
