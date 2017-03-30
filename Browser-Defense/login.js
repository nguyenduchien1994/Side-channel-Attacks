
var old_element;
var new_element;
var original;
var image_original;

$( document ).ready(function() {
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.message != "") {
				if ($(document).find("title").text() == "Yandex") {
					original = $("#text").val();
					
					//old_element = document.getElementById("text");
					//new_element = old_element.cloneNode(true);
					//parent = old_element.parentNode;
					var query;
					var repNum = 5;
					var query_idx = Math.floor(Math.random() * repNum) + 1;
				
					for ( var i = 0; i <= repNum; i++) {
						if (i === query_idx) {	
							query = original;
							$.get(request.message,
							function(data){
								console.log('%c' + data,'color: #00ff00');
							});
						} else {
							query = ranchar();
							$.get(`https://yandex.com/suggest-spok/suggest-ya.cgi?callback=jQuery183037848249367091813_1490723938382&srv=morda_com_desktop&wiz=TrWth&uil=en&fact=1&v=4&icon=1&hl=1&html=1&n=5&bemjson=1&yu=5530320881490220196&pos=1&part=${query}&_=1490724176268`,
							function(data){
								console.log(data);
							});
						}
					}
					chrome.runtime.sendMessage({message: "done"}); 					
				}
			}
	});
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.message_temp != "") {
				if ($(document).find("title").text().includes("Yandex.Images")) {
					image_original = $('.input__control').val();
					var query;
					var repNum = 5;
					var query_idx = Math.floor(Math.random() * repNum) + 1;
				
					for ( var i = 0; i <= repNum; i++) {
						if (i === query_idx) {	
							query = image_original;
							$.get(request.message_temp,
							function(data){
								console.log('%c' + data,'color: #00ff00');
							});
							$("#text").val(original); 
						} else {
							query = ranchar();
							$.get(`https://yandex.com/suggest-images/suggest-ya.cgi?callback=jQuery21403902796222863467_1490812290073&html=1&srv=images_com&yu=5530320881490220196&lr=223&uil=en&latin=1&nl=1&v=4&n=10&portal=1&fact=1&icon=1&hl=1&wiz=TrWth&bemjson=1&part=${query}&pos=2&svg=1&prev-query=&_=1490812290077`,
							function(data){
								console.log(data);
							});
						}
					}					
				}
				chrome.runtime.sendMessage({message_temp: "done"}); 
			}
	});
})

function ranchar()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}	

