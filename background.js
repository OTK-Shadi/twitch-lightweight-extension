// background.js
chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);

  // Match the first path segment as the Twitch username
  const usernamePathRegex = /^\/([^/]+)/;

  if (url.hostname === 'www.twitch.tv' || url.hostname === 'twitch.tv') {
    const match = url.pathname.match(usernamePathRegex);

    if (match && match[1]) {
      const username = match[1]; // Extract the username (e.g., caseoh_)
      // Pass the current username to the storage
      chrome.storage.local.set({ currentUsername: username });
    } else {
      chrome.storage.local.remove('currentUsername');
    }
  } else {
    // If not on a Twitch page, clear any stored username
    chrome.storage.local.remove('currentUsername');
  }
});
