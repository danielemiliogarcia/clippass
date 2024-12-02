chrome.action.onClicked.addListener(async (tab) => {

    try {
        const port = chrome.runtime.connectNative("com.example.password");
        port.onMessage.addListener((message) => {
            console.log(message);
            if (message.password) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (password) => {
                        const focusedElement = document.activeElement; // Get the currently focused element
                        if (focusedElement) {
                            focusedElement.value = password; // Input the decrypted password
                        } else if (focusedElement.isContentEditable) {
                            focusedElement.textContent = password; // Handle contenteditable elements
                        } else {
                            console.error("No suitable element is focused for password input.");
                        }
                    },
                    args: [message.password],
                });
            }
        });
        port.onDisconnect.addListener(() => {
            console.log("Native messaging host disconnected.");
        });
        port.postMessage({}); // Trigger the native host
    } catch (error) {
        console.error("Failed to connect to native messaging host:", error);
    }

});