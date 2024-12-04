# CLIPPASS

Chrome extension to receive gpg ecrypted pass trough the clipboard... (avoiding clipboard sniffers)


-------------------------------

## Install

* Load the extension to chrome
* Set the extension id in install.sh
* Run install.sh


-------------------------------

## Manual Install

* Save clippass_extension_decrypt_clipboard.sh in some path, for example:
        /home/user/bin/clippass_extension_decrypt_clipboard.sh

* Import the chrome extension, at chrome://extensions/ I use developer mode (top right corner toggle) and "load unpacked"

* Save com.clippass.host.json at the correct chrome path, for me it is:
        /home/user/.config/google-chrome/NativeMessagingHosts/com.clippass.host

        replace line 4 with the correct path of the script

            "path": "/home/user/bin/clippass_extension_decrypt_clipboard.sh",

        replace line 7 with your chrome extension id, (will have an id after imported to chrome)

            "allowed_origins": [
                "chrome-extension://ofbgbplogdelpcfnkjicleeieaapcefd/"
            ]

* Update the extension loaded


--------------------------------

## OTHERS

to run chrome in debug use

opt/google/chrome/google-chrome "--profile-directory=Default" --enable-logging=stderr --v=1
