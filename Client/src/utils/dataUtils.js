import { getStaffType } from "../service/staffService";
import { getDayDifference, getMonthDifference } from "./dateUtils";

// dataUtils.js
// Prisoners
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

// Staff
export const filterStaffColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['staff_id'];
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
      
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    return newRow;
  });
};

// visitors
export const filterVisitorsColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['visID'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        console.log(row);
        newRow[column['id']] = `${row['visFname']} ${row['visLname']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    return newRow;
  });
};

// Visits
export const filterVisitsColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = [row['pid'], row['date'], row['visID']];
    neededColumns.forEach((column) => {
      newRow[column['id']] = row[column['id']];
    });
    return newRow;
  });
};

// Prison Units
export const filterBlockColumns = (dataTable, neededColumns, neededCollapsingTableColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['block_id'];
    neededColumns.forEach((column) => {
      newRow[column['id']] = row[column['id']];
    });
    newRow['subTable'] = filterCellsColumns(row['cells'], neededCollapsingTableColumns);
    return newRow;
  });
};

// Cells
export const filterCellsColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['cell_id'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'cap') {
        // Combine current capacity and max capacity to create the "capacity" column
        newRow[column['id']] = `- / ${row['cap']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    return newRow;
  });
};