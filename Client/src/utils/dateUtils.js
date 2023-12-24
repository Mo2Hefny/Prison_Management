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