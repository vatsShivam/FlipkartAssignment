export function formatDate(timestamp) {
  const dateObj = new Date(parseInt(timestamp, 10));
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-indexed, so we add 1.
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");
  const amOrPm = hours >= 12 ? "pm" : "am";

  return `${day}/${month}/${year} ${hours}:${minutes} ${amOrPm}`;
}
