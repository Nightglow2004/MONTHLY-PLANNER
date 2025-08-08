function getMonthDateRange(year, month) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59, 999);
  return { startDate, endDate };
}

const getOverdueQuery = () => {
  const now = new Date();
  now.setHours(0, 0, 0, 0); 
  return {
    date: { $lt: now },
    completed: false
  };
};


module.exports = { getMonthDateRange, getOverdueQuery };
