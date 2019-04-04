const GOOGLE_MAPS_API = 'https://maps.googleapis.com';
const GOOGLE_MAPS_STATIC = 'https://maps.gstatic.com';
const GOOGLE_MAPS_CSP = {
  'script-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'connect-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'style-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'object-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'media-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'img-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
  'font-src' : `${GOOGLE_MAPS_API} ${GOOGLE_MAPS_STATIC}`,
};

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
      let gMapsCspKeys = Object.keys(GOOGLE_MAPS_CSP);
      let existingCsp = header.value.split(';');

      // Map existing values to our desired G.Maps CSP.
      const updatedCsp = existingCsp.map((csp) => {
        for (let i = 0; i < gMapsCspKeys.length; i++) {
          const mapCsp = gMapsCspKeys[i];
          if (csp.includes(mapCsp)) {
            // If csp matches is one we need; remove our item and return our value to existing map.
            gMapsCspKeys.splice(i, 1);
            return `${csp} ${GOOGLE_MAPS_CSP[mapCsp]}`;
          }
        }
        // Existing value.
        return csp;
      }).concat(gMapsCspKeys.map(mapCsp => {
        // Concat remaining unfound CSP values.
        return `${mapCsp} ${GOOGLE_MAPS_CSP[mapCsp]}`;
      }));

      header.value = updatedCsp.join(';');
    }
  });
  return { responseHeaders: resultHeaders };
}

browser.webRequest.onHeadersReceived.addListener(
  updateCspHeaders,
  { urls: ["<all_urls>"] },
  [ "blocking", "responseHeaders" ]
);
