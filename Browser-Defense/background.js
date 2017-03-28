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
			//console.log('onBeforeSendHeaders tab id: '+ currentTabId);
			//console.log('onBeforeSendHeaders: '+ JSON.stringify(details));
			console.log(details.url);
			for (var i = 0; i < details.responseHeaders.length; ++i) {
				//if (details.responseHeaders[i].name === 'Content-Length') {
				console.log(details.responseHeaders[i].name + ": " + details.responseHeaders[i].value);
				//}
			}
			
			return {cancel: false}; 
		},
        {urls: ["*://www.yandex.com/*","*://yandex.com/*","*://mc.yandex.ru/*"], tabId: currentTabId},
        ["responseHeaders"]
	);
	





