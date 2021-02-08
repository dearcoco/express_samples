window.onload = function() {
	var p = document.createElement("p");
	var node = document.createTextNode("Some asfda new text");
	// p에 텍스트 추가하기
	p.appendChild(node);
	
	var div = document.getElementById("demo");
	// div에 p 추가하기
	div.appendChild(p);
};