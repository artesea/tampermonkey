// ==UserScript==
// @name        Twitter Link Text
// @namespace   http://tampermonkey.net/
// @match       *://*.twitter.com/*
// @grant       none
// @version     1.0.0
// @author      @artesea
// @description 06/10/2023, 10:47
// ==/UserScript==

// 1.0.0 Inital Version
function handleMutation(mutations) {
  try {
    for (let mutation of mutations) {
      for (let elem of mutation.addedNodes) {
          let mediaCards = elem.querySelectorAll('[data-testid="card.layoutLarge.media"]');
          for (let mediaCard of mediaCards) {
              try {
                  let imageLink = mediaCard.querySelector("a");
                  if(imageLink != null) {
                      if(mediaCard.hasAttribute("added-label") == false) {
                          let ariaLabel = imageLink.getAttribute("aria-label");
                          //sc.log("Adding: " + ariaLabel);
                          let ariaNode = document.createElement("div");
                          ariaNode.setAttribute("class","r-37j5jr");
                          ariaNode.setAttribute("style","font-size:0.8em;padding:10px;");
                          ariaNode.innerText = ariaLabel;
                          mediaCard.parentNode.append(ariaNode);
                          mediaCard.setAttribute("added-label","true");
                      }
                  }
              } catch(e) {sc.log(e)}
          }
      }
    }
  } catch(e) {sc.log(e)}
}

const sc = {
  log: (...args) => {
    console.log('[twitterlinktext]', ...args)
  }
}

const observer = new MutationObserver(handleMutation)
observer.observe(document, { childList: true, subtree: true })
