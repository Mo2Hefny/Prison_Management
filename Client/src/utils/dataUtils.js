import { getStaffType } from "../service/staffService";
import { getDateFromDBFormat, getDayDifference, getMonthDifference, getYearDifference } from "./dateUtils";
import { fixMedicalRecordFormat, fixPrisonerFormat, fixStaffFormat, fixTreatmentsFormat, fixVisitFormat } from "./formatUtils";

// dataUtils.js
// Prisoners
export const filterPrisonersColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['pid'];
    fixPrisonerFormat(row);
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        newRow[column['id']] = `${row['fname']} ${row['lname']}`;
      } else if (column['id'] === 'age') {
        // Get age from the birth date and today's date to create the "Age" column
        newRow[column['id']] = getYearDifference(new Date(row['bdate']), new Date());
      } else if (column['id'] === 'sentence_left') {
        // Get remaining service to serve from the release date and today's date to create the "Sentence Left" column
        const monthDifference = getMonthDifference(new Date(), new Date(row['release_date']));
        const dayDifference = getDayDifference(new Date(), new Date(row['release_date']));
        if (monthDifference > 0) {
          newRow[column['id']] = `${monthDifference} month${monthDifference > 1 ? 's' : ''}`;
        } else if (dayDifference > 0) {
          newRow[column['id']] = `${dayDifference} day${dayDifference > 1 ? 's' : ''}`;
        } else {
          newRow[column['id']] = `-`;
        }
        // If prisoner is dead or released
        if (row['status'] !== 'Detained')
          newRow[column['id']] = `-`;
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
    fixStaffFormat(row);
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        newRow[column['id']] = `${row['fname']} ${row['lname']}`;
      } else if (column['id'] === 'supervisorSSN') {
        newRow[column['id']] = '-'
        newRow['supervisorID'] = null
        const supervisor = dataTable.find((staff) => staff.staff_id === row['supervisor_id'])
        if (supervisor) {
          newRow[column['id']] = supervisor['ssn']
          newRow['supervisorID'] = supervisor['supervisor_id']
        }
      } else if (column['id'] === 'staff_type') {
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

// Doctor
export const filterDoctorColumns = (dataTable, neededColumns, neededCollapsingTableColumns = undefined) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['doctor_id'];
    fixStaffFormat(row);
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        newRow[column['id']] = `${row['fname']} ${row['lname']}`;
      } else if (column['id'] === 'num_records') {
        newRow['num_records'] = `${(row['records'].length ?  row['records'].length + ' Record' + (row['records'].length > 1 ? 's' : '') : '-')}`
      } else if (column['id'] === 'supervisorSSN') {
        newRow[column['id']] = '-'
        newRow['supervisorID'] = null
        const supervisor = dataTable.find((staff) => staff.staff_id === row['supervisor_id'])
        if (supervisor) {
          newRow[column['id']] = supervisor['ssn']
          newRow['supervisorID'] = supervisor['supervisor_id']
        }
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    if (typeof neededCollapsingTableColumns !== "undefined") {
      newRow['subTable'] = filterMedicalRecordsColumns(row['records'], neededCollapsingTableColumns);
      console.log(newRow)
    }
    return newRow;
  });
};

// visitors
export const filterVisitorsColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['visitorid'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'name') {
        // Combine fname and lname to create the "Name" column
        console.log(row);
        newRow[column['id']] = `${row['Fname']} ${row['Lname']}`;
      } else  if (column['id'] === 'age') {
        newRow[column['id']] = getYearDifference(new Date(row['Bdate']), new Date());
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
    newRow['id'] = `${row['Prisoner id']} ${row['Visit date']} ${row['Visitor id']}`;
    fixVisitFormat(row);
    neededColumns.forEach((column) => {
      newRow[column['id']] = row[column['id']];
    });
    return newRow;
  });
};

// Prison Units
export const filterBlockColumns = (dataTable, neededColumns, neededCollapsingTableColumns = undefined) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['subTable'] = [];
    console.log(neededColumns);
    console.log(row);
    newRow['id'] = row['blockid'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'cellsNum') {
        newRow['cellsNum'] = `- / ${row['cellsnumber']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
    });
    if (typeof neededCollapsingTableColumns !== "undefined" && typeof row['cells'] !== "undefined") {
      newRow['subTable'] = filterCellsColumns(row['cells'], neededCollapsingTableColumns);
      newRow['cellsNum'] = `${newRow['subTable'].length} / ${row['cellsnumber']}`;
    }
    return newRow;
  });
};

// Cells
export const filterCellsColumns = (dataTable, neededColumns) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['cell_id'];
    neededColumns.forEach((column) => {
      if (column['id'] === 'capacity') {
        // Combine current capacity and max capacity to create the "capacity" column
        newRow[column['id']] = `- / ${row['capacity']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    return newRow;
  });
};

// Medical Records
export const filterMedicalRecordsColumns = (dataTable, neededColumns, neededCollapsingTableColumns = undefined) => {
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = [row['Prisoner id'], row['Record id']];
    fixMedicalRecordFormat(row);
    neededColumns.forEach((column) => {
      if (column['id'] === 'record_no') {
        newRow[column['id']] = `Record ${row['Record id']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) 
        newRow[column['id']] = '-';
    });
    if (typeof neededCollapsingTableColumns !== "undefined") {
      newRow['subTable'] = filterTreatmentsColumns(row['treatments'], neededCollapsingTableColumns);
      console.log(newRow)
    }
    return newRow;
  });
};

// Treatments
export const filterTreatmentsColumns = (dataTable, neededColumns) => {
  console.log(dataTable)
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['Drug Name'];
    fixTreatmentsFormat(row);
    neededColumns.forEach((column) => {
      if (column['id'] != 'id')  {
        newRow[column['id']] = row[column['id']];
        if (newRow[column['id']]==null) newRow[column['id']] = '-';
      }
    });
    return newRow;
  });
}

// Conditions
export const filterConditionsColumns = (dataTable, neededColumns) => {
  console.log(dataTable)
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['Prisoner id'];
    neededColumns.forEach((column) => {
      if (column['id'] != 'id')  {
        newRow[column['id']] = row[column['id']];
        if (newRow[column['id']]==null) newRow[column['id']] = '-';
      }
    });
    return newRow;
  });
}

// Offenses
export const filterOffensesColumns = (dataTable, neededColumns) => {
  console.log(dataTable)
  return dataTable.map((row) => {
    const newRow = {};
    newRow['id'] = row['offenseid'];
    neededColumns.forEach((column) => {
      if (column['id'] == 'offense_num')  {
        newRow[column['id']] = `Offense ${row['offenseid']}`;
      } else {
        newRow[column['id']] = row[column['id']];
      }
      if (newRow[column['id']]==null) newRow[column['id']] = '-';
    });
    return newRow;
  });
}
