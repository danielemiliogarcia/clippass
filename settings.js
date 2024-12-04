const statusDiv = document.getElementById('status');
const installButton = document.getElementById('installButton');

// Function to check if the native host is available
async function checkNativeService() {
  try {
    const port = chrome.runtime.connectNative('com.clippass.host');
    port.onDisconnect.addListener(() => {
      if (chrome.runtime.lastError) {
        // Native host is not available
        statusDiv.textContent = 'Native service not found!';
        installButton.style.display = 'inline-block';
      }
    });
    port.disconnect(); // Close the port immediately for testing
  } catch (error) {
    console.error('Error checking native service:', error);
    statusDiv.textContent = 'Native service not found!';
    installButton.style.display = 'inline-block';
  }
}

// Function to download and install the required files
function installNativeService() {
  const downloadUrl = 'https://raw.githubusercontent.com/danielemiliogarcia/files/refs/heads/files/files/clippass-ns-install.sh';
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'clippass-ns-install.sh';
  anchor.click();
  statusDiv.textContent = 'Please run the downloaded installer to complete setup.';
}

// Attach the install handler
installButton.addEventListener('click', installNativeService);

// Run the check on page load
checkNativeService();
