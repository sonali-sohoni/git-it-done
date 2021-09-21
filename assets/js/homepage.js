var userFormEl = document.querySelector("#user-form");
var userNameEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
function formSubmitHandler(event) {
	event.preventDefault();
	var username = userNameEl.value.trim();
	if (username) {
		getUserResponse(username);
		console.log(event);
		userNameEl.value = "";
	} else alert("Please enter the user name");
}

userFormEl.addEventListener("submit", formSubmitHandler);
function getUserResponse(user) {
	var res = fetch("https://api.github.com/users/" + user + "/repos");
	res
		.then(function (response) {
			if (response.ok) {
				console.log("inside", response);
				response.json().then(function (data) {
					displayRepos(data, user);
				});
			} else {
				alert("ERROR: GitHub user not found");
			}
		})
		.catch(function (error) {
			alert("unable to connect to GitHub");
		});
}

function displayRepos(repos, searchTerm) {
	repoContainerEl.textContent = "";
	repoSearchTerm.textContent = searchTerm;
	console.log(repos);
	console.log(searchTerm);
	if (repos.length === 0) {
		repoContainerEl.textContent = "No repositories found.";
		return;
	}
	for (var i = 0; i < repos.length; i++) {
		var reponame = repos[i].owner.login + " / " + repos[i].name;
		var repoEl = document.createElement("div");
		repoEl.classList.add(
			"list-item",
			"flex-row",
			"justify-space-between",
			"align-center"
		);

		var titleEl = document.createElement("span");
		titleEl.innerHTML = reponame;

		repoEl.appendChild(titleEl);
		repoContainerEl.appendChild(repoEl);

		var statusEl = document.createElement("span");
		statusEl.classList.add("flex-row", "align-center");

		if (repos[i].open_issues_count > 0) {
			statusEl.innerHTML =
				"<i class='fas fa-times status-icon icon-danger'></i>" +
				repos[i].open_issues_count +
				" issue(s)";
		} else {
			statusEl.innerHTML =
				"<i class='fas fa-check-square status-icon icon-success'></i>";
		}
		repoEl.appendChild(statusEl);
	}
}
