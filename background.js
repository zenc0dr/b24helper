chrome.action.onClicked.addListener((tab) => {
    chrome.tabs.sendMessage(tab.id, {"message": "clicked_browser_action"});
});

chrome.runtime.onMessage.addListener((data, sender) => {
    if (data.type === 'notification') {
        chrome.notifications.create('', data.options);
    }
});