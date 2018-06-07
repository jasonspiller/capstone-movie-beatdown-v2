console.log('Hello JS.');

$(function() {

	// global variables to ease accessing objects
	var arrMovies = [],
			arrMatches = [],
			intMatch = 0;


	// sort the array based on votes
	function sortMovieArray(a, b) {

		var votesA = a.votes;
		var votesB = b.votes;

		var comparison = 0;
		if (votesA < votesB) {
			comparison = 1;
		} else if (votesA > votesB) {
			comparison = -1;
		}
		return comparison;
	}


	// start the game
	function playGame() {

		// test to see if there are more matches
		if (intMatch < arrMatches.length) {

			// the keys to use as IDs on the
			var arrKeys = Object.keys(arrMatches[intMatch]);
			var strOutputMatch = '';

			//build movies output
			for (var i = 0; i < arrKeys.length; i++) {

				strOutputMatch += '<div class="movie col-12 col-md-6" id="' + arrKeys[i] +
													'"><img src="' + arrMatches[intMatch][arrKeys[i]].Poster +
													'" alt="' + arrMatches[intMatch][arrKeys[i]].Title +
													'"><h2>' + arrMatches[intMatch][arrKeys[i]].Title +
													'</h2>' + arrMatches[intMatch][arrKeys[i]].Year +
													'</div>';
			}

			// output progress and save button
			strOutputMatch += `<div class="row text-center font-weight-bold"><div class="col-12">Step ${intMatch+1} of ${arrMatches.length}</div><!--<div class="col-12 mt-3"><button type="button" class="btn btn-primary save">Save Game <i class="fas fa-film"></i></button></div>--></div>`;

			// toggle display and output movies to the board
			$('#gameBoard').slideToggle(500, function() {
				$(this).html(strOutputMatch);
				$(this).slideToggle(500);
			});

			// clear all event listeners
			$('#gameBoard').off('click', '.movie');

			// add event listener to movie
			$('#gameBoard').on('click', '.movie', function () {

				// get the title of winning movie
				var strMovieTitle = $(this).find('h2')[0].innerText;

				// add vote to the appropriate movie
				for (var i = 0; i < arrMovies.length; i++) {
					if (arrMovies[i].Title === strMovieTitle) {
						arrMovies[i].votes += 1;
					}
				}

				intMatch++;

				// call the function again and update
				playGame()

			});

		} else {

			// no more matches, sort array based on votes
			arrMovies.sort(sortMovieArray);

			// start ordered list
			var strOrderedList = '<div class="col-10 col-sm-8 col-lg-6 justify-content-center"><h2>Congratulations!</h2><p>Here is your top 10 American films of all time!</p><ol class="sorted-list">';

			for (var i = 0; i < arrMovies.length; i++) {
				strOrderedList += '<li><div class="movie"><img src="' + arrMovies[i].Poster +
													'" alt="' + arrMovies[i].Title +
													'"><h2>' + arrMovies[i].Title +
													'</h2><p>' + arrMovies[i].Year +
													'</p></div></li>';
			}

			// close ordered list and play again button
			strOrderedList += '</ol><ul class="list-unstyled"><li class="mt-4"><p>Ready to take your game to the next level?</p><a href="/auth/signin" class="btn btn-lg btn-primary">Lets Get Serious <i class="fas fa-film"></i></a></li><li class="mt-5"><button type="button" class="btn btn-lg btn-secondary copy" data-clipboard-target="#gameBoard ol">Copy List <i class="fas fa-copy"></i></button></li></ul></div>'


			// output sorted array
			$('#gameBoard').slideToggle(500, function() {
				$(this).html(strOrderedList);
				$(this).slideToggle(500);
			});

			// clear all event listeners
			$('#gameBoard').off('click', '.movie');
		}
	}

	// determin and store matches
	function createMatches() {

		// for loop variables
		var x = 0,
		    y = 0;

		// output all possible matches
		for (x = arrMovies.length; x--;)
		{
		  for(y = x; y--;)
		  {
		    arrMatches.push({ movie1: arrMovies[x], movie2: arrMovies[y] });
		  }
		}

		// randomize Matches
		function shuffle(array) {

		  var currentIndex = array.length,
					temporaryValue,
					randomIndex;

		  // while there remain elements to shuffle
		  while (0 !== currentIndex) {

		    // pick a remaining element
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
		  return array;
		}

		arrMatches = shuffle(arrMatches);

		playGame();
	}


	// initilize the game
	function initGame() {

		// array to hold top 10 movies
		var arrMovieIDs = [
			'tt0033467',
			// 'tt0068646',
			// 'tt0034583',
			// 'tt0081398',
			// 'tt0045152',
			// 'tt0031381',
			// 'tt0056172',
			// 'tt0108052',
			// 'tt0052357',
			'tt0032138'
		];

		// make api calls for all movies
		for(var i = 0; i < arrMovieIDs.length; i++) {

			// call api
			$.get(`//www.omdbapi.com/?i=${arrMovieIDs[i]}&apikey=5e90d428`, function(response) {

				// add each move to the array
				arrMovies.push(response);

				// make sure we have all movies, add vote property
				if (arrMovies.length === arrMovieIDs.length) {

					for (var i=0; i < arrMovies.length; i++) {
						arrMovies[i].votes = 0;
					}

					createMatches();
				}
			})
		}
	}


	// reset all variables and play again
	function playAgain() {

		arrMovies = [],
		arrMatches = [],
		intMatch = 0;

		initGame();
	}


	// copy list
	function copyList() {
		new ClipboardJS('.copy');

    $.message({
      type:'success',
      message:'Your list was copied to the clipboard.'
    });

	}

  // reset all variables and play again
  // function saveGame() {
  //
  //   console.log('Save Game.');
  //
  //   $.ajax({
  //     type: 'post',
  //     url: '/game/save',
  //     data: {test: 'test'},
  //     success: function(res) {
  //       alert('Game was saved: ' + res.test);
  //     },
  //     fail: function(err) {
  //       alert('Error: ' + err)
  //     }
  //   })
  // }

	// event handlers
	$('.play').on('click', initGame);
	$('#gameBoard').on('click', '.play-again', playAgain);
	$('#gameBoard').on('click', '.copy', copyList);
	// $('#gameBoard').on('click', '.save', saveGame);

})
