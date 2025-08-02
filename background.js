// background.js

// Listen for the keyboard shortcut (Ctrl+Shift+Y)
chrome.commands.onCommand.addListener((command) => {
  if (command === "send-url") {
    sendUrlToServer();
  }
});

// Listen for the click of the extension icon or popup button
chrome.action.onClicked.addListener(() => {
  sendUrlToServer();
});

// Function to get the current page URL and send POST request
function sendUrlToServer() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;

    fetch('https://twxt-server.vercel.app/api/texts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_content: url,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });
}
