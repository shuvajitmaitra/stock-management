export function formatDate(dateStr) {
  if (!dateStr) return dateStr;
  const date = new Date(dateStr);

  // Day with leading zero
  const day = String(date.getDate()).padStart(2, "0");

  // Short month name
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];

  // Full year
  const year = date.getFullYear();

  // Hours and minutes
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");

  // AM or PM
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12; // Convert to 12-hour format
  const hourStr = String(hours).padStart(2, "0");

  return `${hourStr}:${minutes} ${ampm} ${day} ${month}, ${year}`;
}
