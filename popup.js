document.addEventListener('DOMContentLoaded', function() {
    let autoAdmitCheckbox = document.getElementById('autoAdmit');
    let autoJoinCheckbox = document.getElementById('autoJoin');
    let scanIntervalInput = document.getElementById('scanInterval');
    let joinNowText = document.getElementById('joinNowText');
    let AskToJoinText = document.getElementById('AskToJoinText');
    let ViewText = document.getElementById('ViewText');
    let AdmitText = document.getElementById('AdmitText');
    let CloseText = document.getElementById('CloseText');
    
    // Load settings
    chrome.storage.sync.get(['autoAdmit', 'autoJoin', 'scanInterval', 'joinNowText', 'AskToJoinText', 'ViewText', 'AdmitText', 'CloseText'], function(items) {
        // Set the checkboxes to true if they haven't been set before
        autoAdmitCheckbox.checked = (items.autoAdmit === undefined) ? true : items.autoAdmit;
        autoJoinCheckbox.checked = (items.autoJoin === undefined) ? true : items.autoJoin;
        scanIntervalInput.value = items.scanInterval || 1;
        joinNowText.value = items.joinNowText || "Join now";
        AskToJoinText.value = items.AskToJoinText || "Ask to join";
        ViewText.value = items.ViewText || "View";
        AdmitText.value = items.AdmitText || "Admit";
        CloseText.value = items.CloseText || "Close";
    });
    
    // Save settings
    autoAdmitCheckbox.addEventListener('change', function() {
        chrome.storage.sync.set({autoAdmit: this.checked});
    });

    autoJoinCheckbox.addEventListener('change', function() {
        chrome.storage.sync.set({autoJoin: this.checked});
    });

    scanIntervalInput.addEventListener('input', function() {
        chrome.storage.sync.set({scanInterval: this.value});
    });

    joinNowText.addEventListener('input', function() {
        chrome.storage.sync.set({joinNowText: this.value});
    });

    AskToJoinText.addEventListener('input', function() {
        chrome.storage.sync.set({AskToJoinText: this.value});
    });

    ViewText.addEventListener('input', function() {
        chrome.storage.sync.set({ViewText: this.value});
    });

    AdmitText.addEventListener('input', function() {
        chrome.storage.sync.set({AdmitText: this.value});
    });

    CloseText.addEventListener('input', function() {
        chrome.storage.sync.set({CloseText: this.value});
    });
});
