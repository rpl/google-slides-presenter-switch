let isPresentMode = window.location.href.includes("present#slide=");

// Workaround for content script running before the background page is started.
let retrySendMessage = () => {
  if (chrome.runtime.lastError &&
      chrome.runtime.lastError.message.includes("Receiving end does not exist.")) {
    setTimeout(() => {
      chrome.runtime.sendMessage({
        googlePresentationURL: window.location.href,
        isPresentMode,
      });
    }, 500);
  }
};

chrome.runtime.sendMessage({
  googlePresentationURL: window.location.href,
  isPresentMode,
}, retrySendMessage);

chrome.runtime.onMessage.addListener((msg) => {
  // Toggle present/edit mode
  if (msg == "toggle-present") {
    if (isPresentMode) {
      window.location = `${location.pathname.replace(/present$/, "edit")}${location.hash}`;
    } else {
      window.location = `${location.pathname.replace(/edit$/, "present")}${location.hash}`;
    }
  }
});
