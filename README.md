# CLIPPASS

Chrome extension designed to receive gpg encrypted pass trough the clipboard... (avoiding clipboard sniffers)

The main idea is to use this extension, with this password manager https://www.passwordstore.org/ using the -e feature that i added
see https://salsa.debian.org/danielemiliogarcia/password-store/-/merge_requests/1


## Setup

1. Install the Extension
Load Clippass as a Chrome extension.
During development, load it as an unpacked extension via chrome://extensions/.

2. Install the Native System Host
To set up the native system host, follow these steps:

    * Click the "Download and Install" button in the Clippass settings page.
    * Run the downloaded installer (clippass-ns-install.sh) on your system. This installer will:
        - Add a script to decrypt passwords from your clipboard.
        - Register the native messaging host required for communication between Clippass and your system.

## Security Note
The installation process requires running a system-level script to set up the native host. This script:

* Does not collect or transmit data.
* Is necessary for the extension's functionality.
* Operates securely within your system to maintain the privacy of your private keys and passwords.

## Usage

 * Focus the password field, click the extension icon or use the shortcut (Control+Shitf+K), don't forget to press your yubikey if you use one.
 * It wont work if your clipboard do not contains PGP encrypted data

## Contributing
Contributions are welcome! If you'd like to enhance Clippass or report an issue, feel free to submit a pull request or open an issue in this repository.

## License
This project is licensed under the MIT License. See the LICENSE file for details.


## Manual Install and load unpacked for developing

* Save clippass_extension_decrypt_clipboard.sh in some path, for example:

    ```
    /home/user/bin/clippass_extension_decrypt_clipboard.sh
    ```

* Import the chrome extension, at `chrome://extensions/` I use developer mode (top right corner toggle) and "load unpacked"

* Save the `com.clippass.host.json` file at the correct chrome path, for Linux it is:

    ```
    $HOME/.config/google-chrome/NativeMessagingHosts/com.clippass.host
    ```

* replace line 4 with the correct path of the script

    ```
    "path": "/home/user/bin/clippass_extension_decrypt_clipboard.sh",
    ```


* replace line 7 with your chrome extension id, (will have an id after imported to chrome)

    ```
    "allowed_origins": [
        "chrome-extension://EXTENSION_ID/"
    ]
    ```

* Update the extension loaded



## Future Enhancements
* Replace the dynamic EXTENSION_ID for the Fixed one by the chrome web store. Remove the code that auto replaces that


## Other stuff

* To run this extension in multiple google chrome profiles, you will need to install the Native host scripts only once per system, and install the extension at every profile.

* To run chrome in debug use

    ```
    opt/google/chrome/google-chrome "--profile-directory=Default" --enable-logging=stderr --v=1
    ```
