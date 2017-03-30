var ports = [];
chrome.runtime.onConnect.addListener(function(port) {
    if (port.name !== "devtools") return;
    ports.push(port);
    // Remove port when destroyed (eg when devtools instance is closed)
    port.onDisconnect.addListener(function() {
        var i = ports.indexOf(port);
        if (i !== -1) ports.splice(i, 1);
    });
    port.onMessage.addListener(function(msg) {
        // Received message from devtools. Do something:
        console.log('Received message from devtools page', msg);
    });
});
// Function to send a message to all devtools.html views:
function notifyDevtools(msg) {
    ports.forEach(function(port) {
        port.postMessage(msg);
    });
}

var currentTabId = -1;
chrome.tabs.getSelected(null, function(tab){
    currentTabId = tab.id;
});


chrome.webRequest.onResponseStarted.addListener(
        function(details) { 
			console.log(details.url);
			for (var i = 0; i < details.responseHeaders.length; ++i) {
				console.log(details.responseHeaders[i].name + ": " + details.responseHeaders[i].value);
			}
			
			return {cancel: false}; 
		},
        {urls: ["*://www.yandex.com/*","*://yandex.com/*","*://mc.yandex.ru/*","*://suggest-maps.yandex.com/*"], tabId: currentTabId},
        ["responseHeaders"]
	);

var real_request = "";
var abort = true;

chrome.webRequest.onBeforeRequest.addListener(
        function(details) { 
			if (abort && !details.url.includes("1490724176268")) {
				real_request = details;
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {message: real_request}, {});
				});
				abort = false;
				return {cancel: true}; 
			}
			chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {
					if (request.message == "done") {
						abort = true;
					}
				}); 
			real_request = "";
			return {cancel: false}; 
		},
        {urls: ["*://yandex.com/suggest-spok/*"]},
        ["blocking","requestBody"]);

var img_request = "";
var abort_temp = true;

chrome.webRequest.onBeforeRequest.addListener(
        function(details) { 
			if (abort_temp && !details.url.includes("1490812290077")) {
				img_request = details;
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, {message_temp: img_request}, {});
				});
				abort_temp = false;
				return {cancel: true}; 
			}
			chrome.runtime.onMessage.addListener(
				function(request, sender, sendResponse) {
					if (request.message_temp == "done") {
						abort_temp = true;
					}
				}); 
			img_request = "";
			return {cancel: false}; 
		},
        {urls: ["*://yandex.com/suggest-images/*"]},
        ["blocking","requestBody"]);

function sleep (seconds) {
    var start = new Date().getTime();
    while (new Date() < start + seconds*1000) {}
    return 0;
}

function ranchar()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}	

