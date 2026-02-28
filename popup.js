// popup.js

const usernamePathRegex = /^\/([^/]+)/;
const currentTabStreamBtn = document.getElementById('currentTabStreamBtn');
const streamerInput = document.getElementById('streamerInput');

initializeCurrentTabShortcut();

// Attach the event listener to the "Go to Stream" button
document.getElementById('goToStreamBtn').addEventListener('click', function() {
    // Get the streamer name from the input field
    const streamerName = streamerInput.value.trim();

    // Pass the streamer name to the openLightweightStream function
    openLightweightStream(streamerName);
});

function initializeCurrentTabShortcut() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];

        if (!activeTab || !activeTab.url) {
            return;
        }

        const tabUrl = new URL(activeTab.url);
        const isTwitchHost = tabUrl.hostname === 'www.twitch.tv' || tabUrl.hostname === 'twitch.tv';

        if (!isTwitchHost) {
            return;
        }

        const match = tabUrl.pathname.match(usernamePathRegex);

        if (match && match[1]) {
            const username = match[1];
            currentTabStreamBtn.textContent = `Open ${username}'s stream`;
            currentTabStreamBtn.style.display = 'block';
            streamerInput.value = username;

            currentTabStreamBtn.addEventListener('click', function() {
                openLightweightStream(username);
            });
        }
    });
}

// Function to open the lightweight Twitch stream for the given streamer
function openLightweightStream(streamerName = null) {
    if (!streamerName) {
        streamerName = streamerInput.value.trim();
    }

    if (streamerName) {
        // Construct the lightweight URL with the correct streamer name
        const lightweightUrl = `https://player.twitch.tv/?channel=${streamerName}&parent=localhost`;
        chrome.tabs.create({ url: lightweightUrl }); // Open stream in a new tab
    } else {
        alert('Please enter a valid streamer name!');
    }
}
