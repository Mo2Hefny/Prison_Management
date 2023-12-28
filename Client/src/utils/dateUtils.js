// dateUtils.js
export const getMonthDifference = (startDate, endDate) => {
  const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 +
  endDate.getMonth() - startDate.getMonth();

  return months;
}

export const getDayDifference = (startDate, endDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const diffInMilliseconds = endDate - startDate;
  const diffInDays = Math.floor(diffInMilliseconds / oneDay);

  return diffInDays;
}

export const getYearDifference = (startDate, endDate) => {
  const years = endDate.getFullYear() - startDate.getFullYear();

  return years
}

export const getDateFromDBFormat = (date) => {
  const fixedDate = new Date(date.split('T')[0]);
  fixedDate.setDate(fixedDate.getDate() + 1);
  return fixedDate.toISOString().split('T')[0];
}

export const queryDateFormat = (date) => {
  return date.toISOString().split('T')[0];
}

export const isDateInPast = (dateStr) => {
  // Create a Date object from the date string
  const givenDate = new Date(dateStr);
  // Get the current date
  const currentDate = new Date();
  // Set the hours, minutes, seconds and milliseconds of both dates to zero
  givenDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  // Compare the two dates using the getTime() method
  // If the given date is smaller than the current date, it is in the past
  return givenDate.getTime() < currentDate.getTime();
}

export const isDateToday = (dateStr) => {
  // Create a Date object from the date string
  const givenDate = new Date(dateStr);
  // Get the current date
  const currentDate = new Date();
  // Set the hours, minutes, seconds and milliseconds of both dates to zero
  givenDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  // Compare the two dates using the getTime() method
  // If the given date is smaller than the current date, it is in the past
  return givenDate.getTime() == currentDate.getTime();
}

export const isDateInFuture = (dateStr) => {
  // Create a Date object from the date string
  const givenDate = new Date(dateStr);
  // Get the current date
  const currentDate = new Date();
  // Set the hours, minutes, seconds and milliseconds of both dates to zero
  givenDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);
  // Compare the two dates using the getTime() method
  // If the given date is smaller than the current date, it is in the past
  return givenDate.getTime() > currentDate.getTime();
}