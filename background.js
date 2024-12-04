// Handle the click event
chrome.action.onClicked.addListener((tab) => {
    handleActionClick(tab);
});

// Add a context menu for settings
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "openSettings",
        title: "Open Clippass Settings",
        contexts: ["action"]
    });
});

// Handle the context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "openSettings") {
        chrome.runtime.openOptionsPage(); // Opens the settings page
    }
});

// Handle the shortcut
chrome.commands.onCommand.addListener((command) => {
    if (command === "trigger-decrypt") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length === 0 || !tabs[0].id) {
                console.error("No active tab found.");
                return;
            }

            const activeTab = tabs[0];
            handleActionClick(activeTab);
        });
    }
});

// Handle the main action logic
function handleActionClick(tab) {
    try {
        const port = chrome.runtime.connectNative("com.clippass.host");
        port.onMessage.addListener((message) => {
            if (message.password) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: (password) => {
                        let focusedElement = document.activeElement; // Get the currently focused element

                        let iframeDepth = 0;
                        while (focusedElement.tagName === "IFRAME" && iframeDepth < 10) {
                            // Focused element is an iframe; get its active element
                            let iframeDocument = focusedElement.contentDocument || focusedElement.contentWindow.document;
                            focusedElement = iframeDocument.activeElement;
                            iframeDepth++;
                        }
                        if (iframeDepth === 10) {
                            console.error("Too many nested iframes.");
                        }

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
            if (chrome.runtime.lastError) {
                console.warn("Native messaging host exited:", chrome.runtime.lastError.message);
            } else {
                console.log("Native messaging host disconnected.");
            }
        });
        port.postMessage({}); // Trigger the native host
    } catch (error) {
        console.error("Failed to connect to native messaging host:", error);
    }
}