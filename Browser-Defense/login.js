
var old_element;
var new_element;
var original;

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

function ranchar()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}	

