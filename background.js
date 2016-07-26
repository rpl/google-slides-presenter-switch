chrome.runtime.onMessage.addListener((msg, sender, sendReply) => {
  let {googlePresentationURL} = msg;
  if (googlePresentationURL) {
    chrome.pageAction.show(sender.tab.id);
    sendReply("done");
  }
});

chrome.pageAction.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, "toggle-present");
});
