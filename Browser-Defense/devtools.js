chrome.devtools.panels.create('Test', '/icon.png', '/panel.html', function(extensionPanel) {
    var _window; // Going to hold the reference to panel.html's `window`

    var data = [];
    var port = chrome.runtime.connect({name: 'devtools'});
    port.onMessage.addListener(function(msg) {
        // Write information to the panel, if exists.
        // If we don't have a panel reference (yet), queue the data.
        if (_window) {
            _window.do_something(msg);
        } else {
            data.push(msg);
        }
    });

    extensionPanel.onShown.addListener(function tmp(panelWindow) {
        extensionPanel.onShown.removeListener(tmp); // Run once only
        _window = panelWindow;

        // Release queued data
        var msg;
        while (msg = data.shift()) 
            _window.do_something(msg);
        // Just to show that it's easy to talk to pass a message back:
        _window.respond = function(msg) {
            port.postMessage(msg);
        };
    });
});

chrome.devtools.network.onRequestFinished.addListener(
	function(request) {
		if (request.response.bodySize > 40*1024) {
			chrome.devtools.inspectedWindow.eval(
				'console.log("Large image: " + unescape("' +
				escape(request.request.url) + '"))');
            }
	});
	
chrome.devtools.network.onRequestFinished.addListener(
	function(request) {
		request.getContent(function(body) {
			parsed = JSON.parse(body);
			console.log(parsed);
		});
	});




