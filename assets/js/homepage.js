function getUserResponse(user) {
	var res = fetch("https://api.github.com/users/" + user + "/repos");
	res.then(function (response) {
		console.log("inside", response);
		response.json().then(function (data) {
			console.log(data);
		});
	});
	console.log("outside");
}
getUserResponse("microsoft");
