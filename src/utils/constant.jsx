import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export const FEEDBACK = {
  ALL: "FEEDBACK.ALL",
  ERROR: "FEEDBACK.ERROR",
  SUCCESS: "FEEDBACK.SUCCESS",
  NONE: "FEEDBACK.NONE",
};

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const isLocationMatch = (targetLocation, locationName) => {
  return (
    locationName === targetLocation ||
    locationName.startsWith(`${targetLocation}/`)
  );
};

export function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  // const month = date.getMonth() + 1; // months are 0-based
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export function formattedDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function formateCheckDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getNameInitials(name) {
  const words = name.split(" ");
  const initials = words.map((word) => word[0]);
  return initials.join("");
}

const statusBadges = {
  pending: { color: "error" },
  approved: { color: "success" },
  suspended: { color: "gray" },
  declined: { color: "warning" },
};

const defaultBadge = { color: "primary" };

export const getBadgeColor = (status) => {
  return (statusBadges[status] || defaultBadge).color;
};
export function getBasePath(url) {
  const path = url; // get the path part of the URL
  const segments = path.split("/"); // split the path into segments
  const basePath = segments.slice(0, 2).join("/"); // take the first two segments and join them back into a string
  return basePath;
}

export function getPageFromUrl(url) {
  const parsedUrl = new URL(url);
  const page = parsedUrl.searchParams.get("page");
  return page ? parseInt(page, 10) : null;
}

export function formatDateTime(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}

export function formatShortDate(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${dayOfWeek} ${day} ${month} ${year}`;
}

export function formatNumber(num) {
  return num.toLocaleString("en-CA"); // Force Canadian English locale
}

export function shortenDate(dateString) {
  const date = new Date(dateString);
  return date.toDateString();
}

export function formatDateOnly(dateString) {
  const date = new Date(dateString);
  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `${dayOfWeek} ${day} ${month} ${year}`;
}

export function formatTimeOnly(dateString) {
  const date = new Date(dateString);
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  return `${hours}:${minutes} ${ampm}`;
}

export function maskNumber(number) {
  const strNum = number.toString();
  const firstTwoDigits = strNum.slice(0, 2);
  const lastTwoDigits = strNum.slice(-2);
  const maskedNum = `${firstTwoDigits}********${lastTwoDigits}`;
  return maskedNum;
}

export function formatDateShorter(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-CA"); // 'en-CA' locale formats as YYYY-MM-DD
}

export function removeDecimalPlaces(num) {
  return parseInt(num);
}

export function isHttpsImageUrl(url) {
  return url.startsWith("https://");
}

export function formatDateTimeFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function removeLastPathSegment(url) {
  const urlParts = url.split("/");

  if (urlParts.length > 1) {
    urlParts.pop();
  }

  return urlParts.join("/");
}

export function firstPathSegment(url) {
  const urlParts = url.split(" ");

  if (urlParts.length > 0) {
    urlParts.pop();
  }

  return urlParts.join(" ");
}

export function formatDateStringYearStart(dateString) {
  // Create a new Date object from the input date string
  const date = new Date(dateString);

  // Extract the day, month, and year from the Date object
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear();

  // Return the formatted date as dd/mm/yyyy
  return `${year}-${month}-${day}`;
}

export const getErrormessage = (errorMsg) => {
  if (errorMsg?.errors) {
    const errorMessages = Object.values(errorMsg?.errors).flat().join(", ");
    return errorMessages;
    //  toast.error(errorMessages, { duration: 6000 });
  } else {
    return errorMsg?.message;
    //  toast.error(error?.response?.data?.message, { duration: 6000 });
  }
};

export function capitalizeFirstLetter(str) {
  return str.replace(/^./, (match) => match.toUpperCase());
}
