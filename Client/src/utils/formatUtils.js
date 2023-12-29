// formatUtils.js
import { getDateFromDBFormat, isDateInFuture, queryDateFormat } from "./dateUtils"


// Fix prisoners dates, gender, and status format
export const fixPrisonerFormat = (row) => {
  row['bdate'] = getDateFromDBFormat(row['bdate']);
  row['admission_date'] = getDateFromDBFormat(row['admission_date']);
  row['release_date'] = getDateFromDBFormat(row['release_date']);
  row['gender'] = (row['gender'] === 1 ? 'Male' : 'Female');
  row['status'] = (row['status'] === 1 ? 'Detained' : 'Released');
}

// Fix prisoners dates, gender, and status format
export const queryPrisonerFormat = (row) => {
  row['bdate'] = queryDateFormat(row['bdate']);
  row['admission_date'] = queryDateFormat(row['admission_date']);
  row['release_date'] = queryDateFormat(row['release_date']);
  row['gender'] = (row['gender'] === 'Male' ? 1 : 0);
  row['status'] = (row['status'] === 'Detained' ? 1 : 0);
}

// Fix staff dates, gender, and status format
export const fixStaffFormat = (row) => {
  row['birthdate'] = getDateFromDBFormat(row['birthdate']);
  row['hiredate'] = getDateFromDBFormat(row['hiredate']);
  row['shift'] = (row['shift'] === 1 ? 'Day' : 'Night');
  if (row['status'] === 0)
    row['status'] = 'Single';
  else if (row['status'] === 1)
    row['status'] = 'Married';
  else if (row['status'] === 2)
    row['status'] = 'Divorced';
  else 
    row['status'] = 'Single';
  // handling 
  if (row['staff_type'] === 4)
    row['staff_type'] = 'doctor';
  else if (row['staff_type'] === 2)
    row['staff_type'] = 'guard';
  else if (row['staff_type'] === 3)
    row['staff_type'] = 'general';
  else if(row['staff_type'] === 1)
    row['staff_type'] = 'manager';
  else if(row['staff_type'] === 0)
    row['staff_type'] = 'admin';

}
//  Ziad // Fix prisoners dates, gender, and status format
export const queryStaffFormat = (row) => {
  row['bdate'] = queryDateFormat(row['bdate']);
  row['hireDate'] = queryDateFormat(row['hireDate']);
  row['gender'] = (row['gender'] === 'Male' ? 1 : 0);
  if (row['status'] === 'Single')
    row['status'] = 0;
  else if (row['status'] === 'Married')
    row['status'] = 1;
  else if (row['status'] === 'Divorced')
    row['status'] = 2;
  else 
    row['status'] = 3;
  // start shift
  if (row['shift'] === 'Night')
    row['shift'] = 0;
  else if (row['shift'] === 'Day')
    row['shift'] = 1;
  // start staff
  if (row['staff_type'] === 'doctor')
    row['staff_type'] = 4;
  else if (row['staff_type'] === 'guard')
    row['staff_type'] = 2;
  else if (row['staff_type'] === 'general')
    row['staff_type'] = 3;
}
// For cells

// end cells part

// Fix visits date, and attended format
export const fixVisitFormat = (row) => {
  row['Visit date'] = getDateFromDBFormat(row['Visit date']);
  row['attended'] = (isDateInFuture(row['Visit date']) ? 'Pending' : row['attended'] === 1 ? 'Attended' : 'Absence');
}

// Fix medical record date
export const fixMedicalRecordFormat = (row) => {
  row['updatedate'] = getDateFromDBFormat(row['updatedate']);
}

// Fix treatments availability, and expire date
export const fixTreatmentsFormat = (row) => {
  if (typeof row['availability'] !== 'undefined')
  row['availability'] = (row['availability'] === 1 ? 'In Stock' : 'Out of Stock');
}

export const queryTreatmentsFormat = (row) => {
  row['availability'] = (row['availability'] === 'In Stock' ? 1 : 0);
}