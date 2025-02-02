/** @format */

export function getCurrentDateTimeStringIndia() {
  const now = new Date();

  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // Set the time zone to India (Kolkata)
  };
  let timeString = now.toLocaleTimeString("en-IN", timeOptions).toLowerCase(); // Use en-IN locale and convert to lowercase

  const dayOptions = {
    weekday: "long",
    timeZone: "Asia/Kolkata",
  };
  const dayString = now.toLocaleDateString("en-IN", dayOptions); // Use en-IN locale

  const dateOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "Asia/Kolkata",
  };
  const dateString = now
    .toLocaleDateString("en-IN", dateOptions)
    .replace(/\//g, "-"); // Use en-IN locale and replace slashes
    const newt = now.toLocaleString();

  return `${timeString},${dayString},${dateString}`;
}

