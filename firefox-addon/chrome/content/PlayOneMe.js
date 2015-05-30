var PlayOneMe = function () {
    var prefManager = Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch);
    return {
	init : function () {
	    gBrowser.addEventListener("load", function () {
		var autoRun = prefManager.getBoolPref("extensions.playoneme.autorun");
		if (autoRun) {
		    PlayOneMe.run();
		}
	    }, false);
	},

	run : function () {

	    // IT IS BETTER WITH A CONFIGURATION
	    var ip = prefManager.getCharPref("extensions.playoneme.ip");
	    var port = prefManager.getCharPref("extensions.playoneme.port");
	    // var ip = '192.168.1.15';
	    // var port = '8181';

	    // you need to use this service first
	    var windowsService = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService(Components.interfaces.nsIWindowMediator);
	    // window object representing the most recent (active) instance of Firefox
	    var currentWindow = windowsService.getMostRecentWindow('navigator:browser');
	    // most recent (active) browser object - that's the document frame inside the chrome
	    var browser = currentWindow.getBrowser();
	    // object containing all the data about an address displayed in the browser
	    var uri = browser.currentURI;
	    // textual representation of the actual full URL displayed in the browser
	    var url = uri.spec;

	    var xhr = new XMLHttpRequest();
	    xhr.open('get', 'http://' + ip + ':' + port + '/' + url);
	    xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
	    xhr.send(null);
	}
    };
}();
window.addEventListener("load", PlayOneMe.init, false);
