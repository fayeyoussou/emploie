var pathFull = "http://localhost:8080/emploie/"
let links = document.getElementsByTagName("a");
var action = "create"
var id = 0
class Role {
  constructor(id, nom) {
    this.id = id;
    this.nom = nom;
  }
}

updateUrl();
for (const element of links) {
	element.addEventListener("click", function(event) {
		// Get the href of the link that was clicked
		let href = this.getAttribute("href");
		console.log(href);
		let path = window.location.pathname;
		console.log(path)
		event.preventDefault();
		// Check if the link should trigger content update
		if (href && href != "#" && path.indexOf(href) == -1) {
			// Prevent the link from following its href


			// Make an AJAX request for the new content
			$.ajax({
				url: href,
				method: "GET",
				dataType: "html",
				success: function(response) {
					// Update the content of the "content" div with the new content
					const responseHtml = new DOMParser().parseFromString(response, 'text/html');
					let content = document.getElementById("content")
					let modalElement = document.getElementById("block-content")
					modalElement.innerHTML = responseHtml.getElementById("block-content").innerHTML
					content.classList.remove("rollIn")
					content.classList.add("js-animation-object", "animated", "rollOut")
					window.history.pushState({}, '', href);
					setTimeout(function() {

						content.classList.remove("rollOut")
						content.classList.add("rollIn")
						content.innerHTML = responseHtml.querySelector("#content").innerHTML;
						editButtons(content)
						// Execute any scripts in the new content
						let scripts = document.getElementById("content").getElementsByTagName("script");

						for (const element of scripts) {
							eval(element.innerHTML);
						}

					}, 2000);
				},
				error: function(xhr, status, error) {
					console.log("AJAX error:", status, error);
					event.preventDefault();

					// Optionally, you could check the status code here to determine if it's a 404 error or some other type of error
					if (xhr.status === 404) {
						showNotification("404: Page not found", false, 5000);
					} else {
						showNotification("An error occurred while loading the page", false, 5000);
					}
				}
			});
		}
	});
}
editButtons();
function editButtons(element) {
	const newEnt = element == null ? document.querySelector('#create') : element.querySelector('#create');
	newEnt.addEventListener('click',_=>{
		const tabindex = button.getAttribute('tabindex');
			action= 'create'
			const titleName = document.getElementById("modal_title");
			titleName.innerText = ("Create new").toUpperCase()
			
	})
	const editButtons = element == null ? document.querySelectorAll('.edit') : element.querySelectorAll('.edit');
	const deleteButtons = element == null ? document.querySelectorAll('.delete') : element.querySelectorAll('.delete');
	editButtons.forEach(button => {
		action = "edit"
		button.addEventListener('click', () => {
			const tabindex = button.getAttribute('tabindex');
			id = tabindex
			const title = button.getAttribute('title');
			console.log(pathFull + title + "/" + tabindex)
			const element = document.getElementById(tabindex);
			const titleName = document.getElementById("modal_title");
			titleName.innerText = ("edit " + title + " " + tabindex).toUpperCase()
			fetch(pathFull + title + "/" + tabindex)
				.then(response => response.json())
				.then(data => {
					// Handle the response data
					console.log(data);
				})
				.catch(error => {
					// Handle any errors
					console.error(error);
				});
		});
	});
	deleteButtons.forEach(button => {

		button.addEventListener('click', () => {
			const tabindex = button.getAttribute('tabindex');
			const title = button.getAttribute('title');
			id = tabindex
			console.log("here")
			let value = `
				<p>Voulez vous vraiment supprimmer ${title}  ${tabindex}</p>
				<div id="notification-buttons">
					<button class="confirm">Confirm</button>
					<button class="cancel">Cancel</button>
				</div>
			`
			showNotification(value, true, 10000)

		});
	});
}
function isLoggedIn() {
	// Check if the user is logged in (replace this with your own authentication check)
	const loggedIn = false; // replace with your authentication check
	return loggedIn;
}
function showNotification(value, success, time) {
	let animated = document.getElementById("notification");
	// Remove all classes from the element with the ID "animated" and add the classes "js-animation-object", "animated", and "lightSpeedIn"
	animated.classList.remove("rollOut")
	animated.classList.add("js-animation-object", "animated", "rollIn")
	if (success) animated.classList.add("n-success")
	else animated.classList.add("n-fail")
	animated.innerHTML = value;
	setTimeout(function() {
		animated.classList.remove("rollIn")
		animated.classList.add("rollOut")
		setTimeout(function() {
			animated.classList.add("fade")

		}, 2000)
	}, time);
}
