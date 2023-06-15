// The same script from the previous example but with conditions to check settings before clicking buttons
chrome.storage.sync.get(['autoAdmit', 'autoJoin', 'scanInterval', 'joinNowText', 'AskToJoinText', 'ViewText', 'AdmitText', 'CloseText'], function(items) {
    let scanInterval = (items.scanInterval || 1) * 1000;
    let autoAdmit = items.autoAdmit === undefined ? true : items.autoAdmit;
    let autoJoin = items.autoJoin === undefined ? true : items.autoJoin;
    let joinNowText = items.joinNowText || "Join now";
    let askToJoinText = items.AskToJoinText || "Ask to join";
    let viewText = items.ViewText || "View";
    let admitText = items.AdmitText || "Admit";
    let closeText = items.CloseText || "Close";
    if (autoAdmit) {
        setInterval(function() {
            checkForViewButtonAndAdmit(viewText, admitText, closeText);
        }, scanInterval);
    }
    if (autoJoin) {
        setInterval(function() {
            checkForJoinNowButton(joinNowText, askToJoinText);
        }, scanInterval);
    }
});

function checkForViewButtonAndAdmit(ViewText,AdmitText,CloseText) {
    // Find and click the "View" button
    let viewButton = document.evaluate('//*[text()="'+ViewText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (viewButton) {
        let clickableAncestor = findClosestClickableAncestor(viewButton);
        if (clickableAncestor) {
            clickableAncestor.click();
            // After clicking "View", check for the "Admit" button
            setTimeout(function() {
                checkForAdmitButton(AdmitText, CloseText);
            }, 1000);
        }
    }
}

function checkForAdmitButton(AdmitText,CloseText) {
    // Find and click the "Admit" button
    let admitButton = document.evaluate('//*[text()="'+AdmitText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (admitButton) {
        let clickableAncestor = findClosestClickableAncestor(admitButton);
        if (clickableAncestor) {
            clickableAncestor.click();
            // After clicking "Admit", check for the "Close" button
            setTimeout(function() {
                clickCloseButton(CloseText);
            }, 1000);
        }
    }
}

function clickCloseButton(CloseText) {
    // Find the tooltip with the text "Close"
    let closeTooltip = document.evaluate('//*[text()="'+CloseText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (closeTooltip) {
        let clickableAncestor = findClosestClickableAncestor(closeTooltip);
        if (clickableAncestor) {
            clickableAncestor.click();
        }
    }
}

function checkForJoinNowButton(joinNowText,AskToJoinText) {
    // Try to find and click the "Join now" or "Ask to join" button
    let joinNowButton = document.evaluate('//*[text()="'+joinNowText+'" or text()="'+AskToJoinText+'"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (joinNowButton) {
        let clickableAncestor = findClosestClickableAncestor(joinNowButton);
        if (clickableAncestor) {
            clickableAncestor.click();
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
