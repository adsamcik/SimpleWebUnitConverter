var done = false;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("convertButton").addEventListener("click", function() {
        if (!done) {
            done = true;
            chrome.tabs.executeScript(null, { "file": "matcher.js" }, null);

        }
    });
});