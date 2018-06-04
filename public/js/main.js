console.log('Hello Dave.');

$(function() {

	$('#signupform').on('submit', function(e) {
		e.preventDefault();

		var formData = {
			name:			$('input[name="name"]').val(),
			email: 		$('input[name="email"]').val(),
			password: $('input[name="password"]').val()
		}

		console.log(formData);

		$.ajax({
			url				: ('/signup'),
			method		: 'POST',
			data			: formData,
			success		: postSuccess,
			fail			: postFail
		})

		function postSuccess() {
			console.log('Post Succeeded');
			window.location = '/signin';
		}

		function postFail() {
			console.log('Post Failed');
		}

	})


	$('#signinForm').on('submit', function(e) {
		e.preventDefault();

		var formData = {
			email: 		$('input[name="email"]').val(),
			password: $('input[name="password"]').val()
		}

		console.log(formData);

		$.ajax({
			url				: ('/sessions'),
			method		: 'POST',
			data			: formData,
			success		: signinSuccess,
			fail			: signinFail
		})

		function signinSuccess() {
			console.log('Sign In Succeeded');
			window.location = '/profile';
		}

		function signinFail() {
			console.log('Sign In Failed');
		}

	})

})
