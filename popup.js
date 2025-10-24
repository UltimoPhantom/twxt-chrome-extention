// Send URL button functionality
document.getElementById('send-url-button').addEventListener('click', async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (tab && tab.url) {
      const url = tab.url;
      
      // Display the current URL in the popup
      document.getElementById('url-display').textContent = `URL: ${url}`;
      
      // Send POST request with URL
      sendToServer(url);
    } else {
      document.getElementById('status-display').textContent = 'Could not get current URL!';
      document.getElementById('status-display').classList.add('error');
      document.getElementById('status-display').classList.remove('status');
    }
  } catch (error) {
    console.error('Error getting tab:', error);
    document.getElementById('status-display').textContent = 'Error accessing tab!';
    document.getElementById('status-display').classList.add('error');
    document.getElementById('status-display').classList.remove('status');
  }
});

// Send custom text button functionality
document.getElementById('send-text-button').addEventListener('click', () => {
  const customText = document.getElementById('custom-text').value.trim();
  
  if (!customText) {
    document.getElementById('status-display').textContent = 'Please enter some text!';
    document.getElementById('status-display').classList.add('error');
    document.getElementById('status-display').classList.remove('status');
    return;
  }
  
  // Send POST request with custom text
  sendToServer(customText);
  
  // Clear the text field after sending
  document.getElementById('custom-text').value = '';
});

// Shared function to send data to server
function sendToServer(textContent) {
  fetch('https://twxt-server.vercel.app/api/texts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text_content: textContent,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Display success message
      document.getElementById('status-display').textContent = 'Sent successfully!';
      document.getElementById('status-display').classList.remove('error');
      document.getElementById('status-display').classList.add('status');
    })
    .catch((error) => {
      // Display error message
      document.getElementById('status-display').textContent = 'Error sending data!';
      document.getElementById('status-display').classList.add('error');
      document.getElementById('status-display').classList.remove('status');
      console.error('Error:', error);
    });
}