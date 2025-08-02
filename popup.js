// popup.js

document.getElementById('send-url-button').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url;

    // Display the current URL in the popup
    document.getElementById('url-display').textContent = `URL: ${url}`;

    // Send POST request with URL
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
        // Display success message
        document.getElementById('status-display').textContent = 'URL sent successfully!';
        document.getElementById('status-display').classList.remove('error');
        document.getElementById('status-display').classList.add('status');
      })
      .catch((error) => {
        // Display error message
        document.getElementById('status-display').textContent = 'Error sending URL!';
        document.getElementById('status-display').classList.add('error');
        document.getElementById('status-display').classList.remove('status');
      });
  });
});
