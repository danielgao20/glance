// src/utils.js

// Filter updates based on the selected time frame
export const filterUpdatesByTime = (updates, timeFilter) => {
  if (!updates || updates.length === 0) return [];
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  return updates.filter(update => {
    const updateDate = new Date(update.timestamp || update.created_at || new Date());
    
    switch(timeFilter) {
      case "Today":
        return updateDate >= today;
      case "This Week": {
        // Get the start of the current week (Sunday)
        const firstDayOfWeek = new Date(today);
        firstDayOfWeek.setDate(today.getDate() - today.getDay());
        return updateDate >= firstDayOfWeek;
      }
      case "This Month": {
        // Get the start of the current month
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        return updateDate >= firstDayOfMonth;
      }
      default:
        return true;
    }
  });
};