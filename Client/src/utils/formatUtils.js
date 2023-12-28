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
  if (row['status'] === 'Single')
    row['status'] = 0;
  else if (row['status'] === 'Married')
    row['status'] = 1;
  else if (row['status'] === 'Divorced')
    row['status'] = 2;
  else 
    row['status'] = 3;
}

// Fix visits date, and attended format
export const fixVisitFormat = (row) => {
  row['Visit date'] = getDateFromDBFormat(row['Visit date']);
  row['attended'] = (isDateInFuture(row['Visit date']) ? 'Pending' : row['attended'] === 1 ? 'Attended' : 'Absence');
}

// Fix medical record date
export const fixMedicalRecordFormat = (row) => {
  row['updatedate'] = getDateFromDBFormat(row['updatedate']);
}