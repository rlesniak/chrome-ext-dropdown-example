chrome.extension.sendMessage({}, (response) => {
  const readyStateCheckInterval = setInterval(() => {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval)
      const target = document.getElementsByClassName('property-pricetag')[0]

      const button = new Button()
      button.createButtonWrapper(target)

      console.log("Hello. This message was sent from scripts/homes.js");
    }
  }, 100)
})
