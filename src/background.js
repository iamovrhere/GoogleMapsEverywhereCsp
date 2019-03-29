const GOOGLE_MAPS_API = 'maps.googleapis.com';
const GOOGLE_MAPS_STATIC = 'maps.gstatic.com';
const MAPS_CSP = `${GOOGLE_MAPS_API}; ${GOOGLE_MAPS_STATIC}`; 

/**
 * Runs through the response headers and appends the maps CSP to
 * the existing CSP. 
 * - https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived
 *
 * @param {Event} e
 * @return {object} In the form {responseHeaders: [...]}
 */
function updateCspHeaders(e) {
  let resultHeaders = [...e.responseHeaders];
  resultHeaders.forEach(header => {
    const name = header.name;
    if (/^Content-Security-Policy$/i.test(name)) {
      header.value += `; ${MAPS_CSP}`;
    }
  });
  return { responseHeaders: resultHeaders };
}

browser.webRequest.onHeadersReceived.addListener(
  updateCspHeaders,
  { urls: ["<all_urls>"] },
  [ "blocking", "responseHeaders" ]
);
