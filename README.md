# CLIPPASS

Chrome extension to receive gpg ecrypted pass trough the clipboard...

-------------------------------

## Install

* Save extension_decrypt_password.sh in some path, for example:
        /home/emi/bin/extension_decrypt_password.sh

* Import the chrome extension, at chrome://extensions/ I use developer mode (top right corner toggle) and "load unpacked"

* Save com.example.password.json at the correct chrome path, for me it is:
        /home/emi/.config/google-chrome/NativeMessagingHosts/com.example.password.json

        replace line 4 with the correct path of the script

            "path": "/home/emi/bin/extension_decrypt_password.sh",

        replace line 7 with your chrome extension id, (will have an id after imported to chrome)

            "allowed_origins": [
                "chrome-extension://ofbgbplogdelpcfnkjicleeieaapcefd/"
            ]

* Update the extension loaded


--------------------------------

## OTHERS

to run chrome in debug use

opt/google/chrome/google-chrome "--profile-directory=Default" --enable-logging=stderr --v=1
