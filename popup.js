// popup.js

// Fetch the current streamer's name from storage
chrome.storage.local.get('currentUsername', function(data) {
    const currentStreamer = data.currentUsername;
    if (currentStreamer) {
        // If there's a current streamer, show it in the popup
        const currentStreamerDiv = document.getElementById('currentStreamer');
        currentStreamerDiv.textContent = `Go to ${currentStreamer}'s stream`;
        currentStreamerDiv.style.display = 'block';

        // When clicked, open the lightweight stream of the current streamer
        currentStreamerDiv.addEventListener('click', function() {
            openLightweightStream(currentStreamer);  // Pass the current streamer name
        });
    }
});

// Attach the event listener to the "Go to Stream" button
document.getElementById('goToStreamBtn').addEventListener('click', function() {
    // Get the streamer name from the input field
    const streamerName = document.getElementById('streamerInput').value.trim();

    // Pass the streamer name to the openLightweightStream function
    openLightweightStream(streamerName);
});

// Function to open the lightweight Twitch stream for the given streamer
function openLightweightStream(streamerName = null) {
    if (!streamerName) {
        streamerName = document.getElementById('streamerInput').value.trim();
    }

    if (streamerName) {
        // Construct the lightweight URL with the correct streamer name
        const lightweightUrl = `https://player.twitch.tv/?channel=${streamerName}&parent=localhost`;
        chrome.tabs.create({ url: lightweightUrl });  // Open stream in a new tab
    } else {
        alert("Please enter a valid streamer name!");
    }
}