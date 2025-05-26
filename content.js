chrome.storage.sync.get(['autoAdmit', 'autoJoin', 'joinNowText', 'AskToJoinText', 'switchHereText', 'ViewText', 'AdmitText', 'CloseText'], function(items) {
    let autoAdmit = items.autoAdmit === undefined ? true : items.autoAdmit;
    let autoJoin = items.autoJoin === undefined ? true : items.autoJoin;
    let joinNowText = items.joinNowText || "Join now";
    let askToJoinText = items.AskToJoinText || "Ask to join";
    let switchHereText = items.switchHereText || "Switch here";
    let viewText = items.ViewText || "View";
    let admitText = items.AdmitText || "Admit";
    let closeText = items.CloseText || "Close";

    if (autoAdmit) {
        observeForViewButton(viewText, admitText, closeText);
    }

    if (autoJoin) {
        observeForJoinNowButton(joinNowText, askToJoinText, switchHereText);
    }
});

function observeForJoinNowButton(joinNowText, askToJoinText, switchHereText) {
    let observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                checkForJoinNowButton(joinNowText, askToJoinText, switchHereText);
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function observeForViewButton(viewText, admitText, closeText) {
    let observer = new MutationObserver(function(mutations) {
        for (let mutation of mutations) {
            if (mutation.addedNodes.length) {
                checkForViewButtonAndAdmit(viewText, admitText);
                checkForCloseButton(closeText); 
            }
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

function checkForViewButtonAndAdmit(ViewText,AdmitText) {
    // Find and click the "View" button
    let viewButton = document.evaluate('//*[text()="'+ViewText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (viewButton) {
        let clickableAncestor = findClosestClickableAncestor(viewButton);
        if (clickableAncestor) {
            setTimeout(function() {
                clickableAncestor.click();
            }, 1000);
            // After clicking "View", check for the "Admit" button
            setTimeout(function() {
                checkForAdmitButton(AdmitText);
            }, 1000);
        }
    }
}

function checkForAdmitButton(AdmitText) {
    // Find and click the "Admit" button
    let admitButton = document.evaluate('//*[text()="'+AdmitText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (admitButton) {
        let clickableAncestor = findClosestClickableAncestor(admitButton);
        if (clickableAncestor) {
            setTimeout(function() {
                clickableAncestor.click();
            }, 1000);
        }
    }
}

function checkForCloseButton(CloseText) {
    // find any <i class="google-material-icons">close</i>
    const icon = Array.from(document.querySelectorAll('i'))
    .find(i => i.textContent.trim().toLowerCase() === 'close');
    if (icon) {
        const btn = icon.closest('button');
        if (btn) {
          // Use 5 seconds delay as requested
          setTimeout(() => btn.click(), 5000);
        }
    }
}

function checkForJoinNowButton(joinNowText,AskToJoinText,switchHereText) {
    // Try to find and click the "Join now" or "Ask to join" button
    let joinNowButton = document.evaluate('//*[text()="'+joinNowText+'" or text()="'+AskToJoinText+'" or text()="'+switchHereText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (joinNowButton) {
        let clickableAncestor = findClosestClickableAncestor(joinNowButton);
        if (clickableAncestor) {
            setTimeout(function() {
                clickableAncestor.click();
            }, 1000);
        }
    }
}

function findClosestClickableAncestor(element) {
    // Find the closest ancestor element that is clickable
    let ancestor = element.parentElement;
    while (ancestor) {
        if (ancestor.querySelector('button')) {
            return ancestor.querySelector('button');
        }
        ancestor = ancestor.parentElement;
    }
    return null;
}
