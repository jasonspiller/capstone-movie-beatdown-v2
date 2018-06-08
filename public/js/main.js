console.log('Hello JS.');

$(function() {

	// global variables to ease accessing objects
	var arrMovies = [],
			arrMatches = [],
			intMatch = 0;


  // save the game
  function saveGame() {

    console.log('Saved Game.');

    $.ajax({
      type: 'post',
      url: '/game/save',
      data: {
        movies: arrMovies,
        matches: arrMatches,
        current_match: parseInt(intMatch),
        user_id: $('#user').attr('class')
      },
      success: function(res) {
        $.message({
          type:'success',
          message:'Game has been saved.'
        });
      },
      fail: function(err) {
        $.message({
          type:'error',
          message:'Game was not saved.'
        });
      }
    })
  }

  // update the game
  function updateGame() {

    $.ajax({
      type: 'post',
      url: '/game/update',
      data: {
        movies: arrMovies,
        current_match: parseInt(intMatch),
        user_id: $('#user').attr('class')
      },
      success: function(res) {
        console.log('Updated Game.');
      },
      fail: function(err) {
        $.message({
          type:'error',
          message:'Game was not updated.'
        });
      }
    })
  }

  // delete the game
  function deleteGame() {

    $.ajax({
      type: 'post',
      url: '/game/delete',
      data: {
        user_id: $('#user').attr('class')
      },
      success: function(res) {
        console.log('Game Deleted.');
        window.location.href = '/profile';
      },
      fail: function(err) {
        $.message({
          type:'error',
          message:'Game was not deleted.'
        });
      }
    })
  }

  function displayCompletedList() {

    // no more matches, sort array based on votes
    arrMovies.sort(sortMovieArray);

    // start ordered list
    var strOrderedList = '<div class="col-10 col-sm-8 col-lg-6 justify-content-center"><h2>Congratulations!</h2><p>Here is your top 100 American films of all time!</p><ol class="sorted-list">';

    for (var i = 0; i < arrMovies.length; i++) {
      strOrderedList += '<li><div class="movie"><img src="' + arrMovies[i].Poster +
                        '" alt="' + arrMovies[i].Title +
                        '"><h2>' + arrMovies[i].Title +
                        '</h2><p>' + arrMovies[i].Year +
                        '</p></div></li>';
    }

    // end ordered listener
    strOrderedList += '</ol><ul class="list-unstyled">';

    // test if they're playing the mini or full game
    if (window.location.pathname != '/game' || window.location.pathname != '/profile') {
      strOrderedList += '<li class="mt-4"><p>Ready to take your game to the next level?</p><a href="/auth/signin" class="btn btn-lg btn-primary">Lets Get Serious <i class="fas fa-film"></i></a>'
    } else {
      strOrderedList += '<li class="mt-4"><button type="button" class="btn btn-lg btn-primary delete">Delete Game <i class="fas fa-trash-alt"></i></button></li>'
    }

    // add the ability to copy
    strOrderedList += '<li class="mt-3"><button type="button" class="btn btn-lg btn-secondary copy" data-clipboard-target="#gameBoard ol">Copy List <i class="fas fa-copy"></i></button></li></ul></div>'


    // output sorted array
    $('#gameBoard').slideToggle(500, function() {
      $(this).html(strOrderedList);
      $(this).slideToggle(500);
    });

  }

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
			strOutputMatch += `<div class="row text-center font-weight-bold"><div class="col-12">Step ${intMatch+1} of ${arrMatches.length}</div></div>`;

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

        // check to see if you're on the game page
        if (window.location.pathname == '/game') {
          updateGame();
        }
				playGame();

			});

		} else {

      displayCompletedList();

			// clear all event listeners
			$('#gameBoard').off('click', '.movie');

      // check to see if you're on the game page
      if (window.location.pathname == '/game') {
        updateGame();
      }
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

    // check to see if you're on the game page
    if (window.location.pathname == '/game') {
      saveGame();
    }
		playGame();
	}


	// initilize the game
	function initMiniGame() {

		// array to hold top 10 movies
		var arrMovieIDs = [
			'tt0033467',
			'tt0068646',
			'tt0034583'
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


  // initilize the game
  function initFullGame() {

    // array to hold top 10 movies
    var arrMovieIDs = [
      // 'tt0033467',
      // 'tt0068646',
      // 'tt0034583',
      // 'tt0081398',
      // 'tt0045152',
      // 'tt0031381',
      // 'tt0056172',
      // 'tt0108052',
      // 'tt0052357',
      // 'tt0032138',
      // 'tt0021749',
      // 'tt0049730',
      'tt0076759',
      'tt0054215',
      'tt0062622',
      // 'tt0043014',
      // 'tt0061722',
      // 'tt0017925',
      // 'tt0047296',
      // 'tt0038650',
      // 'tt0071315',
      // 'tt0053291',
      // 'tt0032551',
      // 'tt0083866',
      // 'tt0056592',
      // 'tt0031679',
      // 'tt0044706',
      // 'tt0042192',
      // 'tt0036775',
      // 'tt0078788',
      // 'tt0033870',
      // 'tt0071562',
      // 'tt0073486',
      // 'tt0029583',
      // 'tt0075686',
      // 'tt0050212',
      // 'tt0036868',
      // 'tt0040897',
      // 'tt0057012',
      // 'tt0059742',
      // 'tt0024216',
      // 'tt0061418',
      // 'tt0064665',
      // 'tt0032904',
      // 'tt0046303',
      // 'tt0025316',
      // 'tt0044081',
      // 'tt0047396',
      // 'tt0006864',
      // 'tt0120737',
      // 'tt0055614',
      // 'tt0075314',
      // 'tt0077416',
      // 'tt0066026',
      // 'tt0053125',
      // 'tt0073195',
      // 'tt0075148',
      // 'tt0015864',
      // 'tt0073440',
      // 'tt0023969',
      // 'tt0034240',
      // 'tt0069704',
      // 'tt0068327',
      // 'tt0074958',
      // 'tt0043265',
      // 'tt0082971',
      // 'tt0061184',
      // 'tt0105695',
      // 'tt0084805',
      // 'tt0066921',
      // 'tt0120815',
      // 'tt0111161',
      // 'tt0064115',
      // 'tt0102926',
      // 'tt0061811',
      // 'tt0109830',
      // 'tt0074119',
      // 'tt0027977',
      // 'tt0065214',
      // 'tt0053604',
      // 'tt0054331',
      // 'tt0018455',
      // 'tt0120338',
      // 'tt0064276',
      // 'tt0026778',
      // 'tt0091763',
      // 'tt0050083',
      // 'tt0029947',
      // 'tt0167404',
      // 'tt0028333',
      // 'tt0084707',
      // 'tt0099685',
      // 'tt0067116',
      // 'tt0110912',
      // 'tt0067328',
      // 'tt0097216',
      // 'tt0083658',
      // 'tt0035575',
      // 'tt0114709',
      // 'tt0052618'
    ];

    // make api calls for all movies
    for(var i = 0; i < arrMovieIDs.length; i++) {

      // call api
      $.get(`//www.omdbapi.com/?i=${arrMovieIDs[i]}&apikey=5e90d428`, function(response) {

        // add each move to the array
        arrMovies.push({
          Poster: response.Poster,
          Title: response.Title,
          Year: response.Year
        });

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


	// copy list
	function copyList() {
		new ClipboardJS('.copy');

    $.message({
      type:'success',
      message:'Your list was copied to the clipboard.'
    });
	}


  // all code needed for full game
  if (window.location.pathname == '/game') {
    console.log('Full Game');
    initFullGame();
  }

	// event handlers
	$('.play').on('click', initMiniGame);
	$('#gameBoard').on('click', '.delete', deleteGame);
	$('#gameBoard').on('click', '.copy', copyList);

})
