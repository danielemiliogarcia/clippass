const statusDiv = document.getElementById('status');
const installButton = document.getElementById('installButton');

// Function to download and install the required files
function installNativeService() {
  const downloadUrl = 'https://raw.githubusercontent.com/danielemiliogarcia/clippass/master/files/clippass-ns-install.sh';
  const anchor = document.createElement('a');
  anchor.href = downloadUrl;
  anchor.download = 'clippass-ns-install.sh';
  anchor.click();
  statusDiv.textContent = 'Please run the downloaded installer to complete setup.';
}

// Attach the install handler
installButton.addEventListener('click', installNativeService);
