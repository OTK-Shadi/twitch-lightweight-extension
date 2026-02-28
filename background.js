// background.js
chrome.action.onClicked.addListener((tab) => {
  const url = new URL(tab.url);
  
  // Regular expressions to match the Twitch channel URL
  const channelUrlRegex = /https:\/\/www\.twitch\.tv\/([^/]+)/;
  
  if (channelUrlRegex.test(url.href)) {
    const match = url.pathname.match(channelUrlRegex);
    if (match && match[1]) {
      const username = match[1];  // Extract the username (e.g., caseoh_)
      // Pass the current username to the storage
      chrome.storage.local.set({ currentUsername: username });
    }
  } else {
    // If not on a Twitch page, clear any stored username
    chrome.storage.local.remove('currentUsername');
  }
});