// formatUtils.js
import { getDateFromDBFormat, isDateInFuture } from "./dateUtils"


// Fix prisoners dates, gender, and status format
export const fixPrisonerFormat = (row) => {
  row['bdate'] = getDateFromDBFormat(row['bdate']);
  row['admission_date'] = getDateFromDBFormat(row['admission_date']);
  row['release_date'] = getDateFromDBFormat(row['release_date']);
  row['gender'] = (row['gender'] === 1 ? 'Male' : 'Female');
  row['status'] = (row['status'] === 1 ? 'Detained' : 'Released');
}

// Fix visits date, and attended format
export const fixVisitFormat = (row) => {
  row['Visit date'] = getDateFromDBFormat(row['Visit date']);
  row['attended'] = (isDateInFuture(row['Visit date']) ? 'Pending' : row['attended'] === 1 ? 'Attended' : 'Absence');
}