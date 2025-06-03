# CLIPPASS

[Chrome extension](https://chromewebstore.google.com/detail/clippass/hnpffflijhlfemngdipepjkjkcgfolpf) designed to receive gpg encrypted pass trough the clipboard... (avoiding clipboard sniffers)


The main idea is to use this extension, with this password manager https://www.passwordstore.org/ using the -e feature added at this [Merge Request](https://salsa.debian.org/danielemiliogarcia/password-store/-/merge_requests/1)


## Setup

### Dependencies
* wget
* jq
* xclip

### 1) Install the Extension

Install the [Chrome extension](https://chromewebstore.google.com/detail/clippass/hnpffflijhlfemngdipepjkjkcgfolpf).


### 2) Install the Native System Host
To set up the native system host, follow these steps:

    * Right click on extension button and click settings
    * Click the "Download" button at the bottom of the Clippass settings page.
    * Run the downloaded installer (clippass-ns-install.sh) on your system. This installer will:
        - Add a script to decrypt passwords from your clipboard.
        - Register the native messaging host required for communication between Clippass and your system.

## Security Note
The installation process requires running a system-level script to set up the native host. This script:

* Does not collect or transmit data.
* Is necessary for the extension's functionality.
* Operates securely within your system to maintain the privacy of your private keys and passwords.

## Usage
see exmple usage [video](https://www.youtube.com/watch?v=kHnr-87B-f0)


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
* Port to other browsers


## Other stuff

* To run this extension in multiple google chrome profiles, you will need to install the Native host scripts only once per system, and install the extension at every profile.

* To run chrome in debug use

    ```
    opt/google/chrome/google-chrome "--profile-directory=Default" --enable-logging=stderr --v=1
    ```
