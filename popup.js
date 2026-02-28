const usernamePathRegex = /^\/([^/]+)/;
const currentTabStreamBtn = document.getElementById('currentTabStreamBtn');
const currentStreamCard = document.getElementById('currentStreamCard');
const streamerInput = document.getElementById('streamerInput');
const statusElement = document.getElementById('status');
const statusText = document.getElementById('statusText');
const inputError = document.getElementById('inputError');
const goToStreamBtn = document.getElementById('goToStreamBtn');

initializeCurrentTabShortcut();

// Attach the event listener to the "Go to Stream" button
goToStreamBtn.addEventListener('click', function() {
    openLightweightStream();
});

streamerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        openLightweightStream();
    }
});

streamerInput.addEventListener('input', function() {
    inputError.textContent = '';
});

function setStatus(isOnTwitch, message) {
    statusElement.classList.toggle('on-twitch', isOnTwitch);
    statusElement.classList.toggle('off-twitch', !isOnTwitch);
    statusText.textContent = message;
}

function initializeCurrentTabShortcut() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];

        if (!activeTab || !activeTab.url) {
            setStatus(false, 'Could not inspect the active tab.');
            return;
        }

        const tabUrl = new URL(activeTab.url);
        const isTwitchHost = tabUrl.hostname === 'www.twitch.tv' || tabUrl.hostname === 'twitch.tv';

        if (!isTwitchHost) {
            setStatus(false, 'You are not on Twitch. Enter any streamer name below.');
            return;
        }

        const match = tabUrl.pathname.match(usernamePathRegex);

        if (match && match[1]) {
            const username = match[1];
            setStatus(true, `On Twitch now: @${username}`);
            currentTabStreamBtn.textContent = `Open @${username} stream`;
            currentStreamCard.style.display = 'block';
            streamerInput.value = username;

            currentTabStreamBtn.addEventListener('click', function() {
                openLightweightStream(username);
            });
        } else {
            setStatus(true, 'On Twitch. Enter a streamer name to continue.');
        }
    });
}

// Function to open the lightweight Twitch stream for the given streamer
function openLightweightStream(streamerName = null) {
    if (!streamerName) {
        streamerName = streamerInput.value.trim();
    }

    if (!streamerName) {
        inputError.textContent = 'Please enter a streamer name.';
        return;
    }

    const lightweightUrl = `https://player.twitch.tv/?channel=${encodeURIComponent(streamerName)}&parent=localhost`;
    chrome.tabs.create({ url: lightweightUrl });
}
