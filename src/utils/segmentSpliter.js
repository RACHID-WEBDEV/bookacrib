export function getLastSegmentFromUrl(url) {
  // Remove trailing slashes if any
  url = url.replace(/\/+$/, "");

  // Split the URL by "/"
  const segments = url.split("/");

  // Return the last segment
  return segments[segments.length - 1];
}
