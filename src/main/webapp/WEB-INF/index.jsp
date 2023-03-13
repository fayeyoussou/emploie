<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<script>
	const path = window.location.pathname;
	let paths = []
	path.split("/").forEach((x,i)=>{
	    if(i>2) paths.push("../");
	})
	console.log(paths)
	const script = document.createElement("script");
	script.src = paths.join() + "assets/script.js";
	document.head.appendChild(script);
</script>
<title>Insert title here</title>
</head>
<body>
	<div id="content" class="content">Cotent</div>
	<a href="/emploie/role">register</a>
</body>
</html>
