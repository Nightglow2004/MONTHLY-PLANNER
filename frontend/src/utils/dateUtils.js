// frontend/src/utils/dateUtils.js
export const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

export const getCurrentMonth = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};

export const getMonthName = (month) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return months[month - 1];
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const getFirstDayOfMonth = (year, month) => {
  return new Date(year, month - 1, 1).getDay();
};
