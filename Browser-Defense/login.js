
var old_element;
var new_element;
var original;

console.log($("#text"));

$( document ).ready(function() {
	console.log($(document).find("title").text());
	if ($(document).find("title").text() == "Yandex") {
		$("#text").on("keyup", function(event) {
			original = $("#text").val();
			
			old_element = document.getElementById("text");
			new_element = old_element.cloneNode(true);
			//old_element.parentNode.replaceChild(new_element, old_element);
			
			var query;
			var repNum = 5;
			var query_idx = Math.floor(Math.random() * repNum) + 1;
			
			for ( var i = 0; i <= 5; i++) {
				if (i === query_idx) {	
					query = original;
					$.get(`https://yandex.com/suggest-spok/suggest-ya.cgi?callback=jQuery183037848249367091813_1490723938382&srv=morda_com_desktop&wiz=TrWth&uil=en&fact=1&v=4&icon=1&hl=1&html=1&n=5&bemjson=1&yu=5530320881490220196&pos=1&part=${query}&_=1490724176268`,
						function(data){
							console.log('%c' + data,'color: #ff0000');
						});
				} else {
					query = ranchar();
					$.get(`https://yandex.com/suggest-spok/suggest-ya.cgi?callback=jQuery183037848249367091813_1490723938382&srv=morda_com_desktop&wiz=TrWth&uil=en&fact=1&v=4&icon=1&hl=1&html=1&n=5&bemjson=1&yu=5530320881490220196&pos=1&part=${query}&_=1490724176268`,
						function(data){
							console.log(data);
						});
				}
			}
		});
	}
	
	if ($(document).find("title").text().includes("Yandex.Images")) {
		$('.input__control').on("keyup", function(event) {
			image_original = $('.input__control').val();
			
			var query;
			var repNum = 5;
			var query_idx = Math.floor(Math.random() * repNum) + 1;
			
			for ( var i = 0; i <= 5; i++) {
				if (i === query_idx) {	
					query = image_original;
					$.get(`https://yandex.com/suggest-images/suggest-ya.cgi?callback=jQuery21403902796222863467_1490812290073&html=1&srv=images_com&yu=5530320881490220196&lr=223&uil=en&latin=1&nl=1&v=4&n=10&portal=1&fact=1&icon=1&hl=1&wiz=TrWth&bemjson=1&part=${query}&pos=2&svg=1&prev-query=&_=1490812290077`,
						function(data){
							console.log('%c' + data,'color: #ff0000');
						});
				} else {
					query = ranchar();
					$.get(`https://yandex.com/suggest-images/suggest-ya.cgi?callback=jQuery21403902796222863467_1490812290073&html=1&srv=images_com&yu=5530320881490220196&lr=223&uil=en&latin=1&nl=1&v=4&n=10&portal=1&fact=1&icon=1&hl=1&wiz=TrWth&bemjson=1&part=${query}&pos=2&svg=1&prev-query=&_=1490812290077`,
						function(data){
							console.log(data);
						});
				}
			}
		});
	}
});

function ranchar()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}	

