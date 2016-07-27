chrome.runtime.onMessage.addListener((msg, sender, sendReply) => {
  let {googlePresentationURL} = msg;
  if (googlePresentationURL) {
    chrome.pageAction.show(sender.tab.id);
    // Ensure that the sendMessage callback in the content script receive
    // a reply.
    sendReply("done");
  }
});

chrome.pageAction.onClicked.addListener((tab) => {
  // Ask to the content script to switch the mode
  chrome.tabs.sendMessage(tab.id, "toggle-present");
});

// Workaround pageAction reset on same document navigation events.
function workaroundPageActionReset(evt) {
  console.log(evt);
  if (evt.url.includes("https://docs.google.com/presentation/d/")) {
    setTimeout(() => {
      chrome.pageAction.show(evt.tabId);
    }, 200);
  }
}
chrome.webNavigation.onReferenceFragmentUpdated.addListener(workaroundPageActionReset);
chrome.webNavigation.onHistoryStateUpdated.addListener(workaroundPageActionReset);
