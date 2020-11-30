function searchButton() {
	let apiKey = "ca3d69ee336e43d8099727f0d7ce3859";
	let searchString = $('#search-string').val();
	let page = 1;
	let genre = $('#genre-select').val();

	$.ajax({
		method: "GET",
		url: "https://api.themoviedb.org/3/search/movie?api_key="+ 
				apiKey + "&language=en-US&query=" +
				searchString + "&page=" + 
				page + "&include_adult=false" + 
				"&with_genres=" + genre, 
				
		dataType: "json"	  
	}).then((response) => {
		console.log(response);
		let movies = response.results;
		let output = '';
		$.each(movies, (index, movie) => {
			output += `
			<div class="col-md-3 movie">
				<div class="well text-center">
					<h5 class="genre" value="${movie.genre_ids}" style="display: none">${movie.genre_ids}</h5>
					<img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
					<h5 class="title">${movie.original_title}</h5>
					<h5 class="rdate">(${(movie.release_date).substring(0, 4)})</h5>
					<h5 class="score">Оценка: ${movie.vote_average}/10</h5>
					<a onclick="window.open('https://www.themoviedb.org/movie/${movie.id}','_blank');" class="btn btn-primary" href="#">Подробно</a>
				</div>
			</div>
			`;		
		});	

		$('#movies').html(output);
	});
		
}

function sortMoviesAsc(parent, child, key) {
    let movies = parent.children(child).sort(function(a, b) {
        let vA = $(key, a).text();
        let vB = $(key, b).text();
        return (vA < vB) ? -1 : (vA > vB) ? 1 : 0;
    });
    $("#movies").append(movies);
}

function sortMoviesDec(parent, child, key) {
    let movies = parent.children(child).sort(function(a, b) {
        let vA = $(key, a).text();
        let vB = $(key, b).text();
        return (vA > vB) ? -1 : (vA < vB) ? 1 : 0;
    });
    $("#movies").append(movies);
}

function sortStuff() {

	let menu = document.getElementById("sort-by")

	if (menu.value == 'az') {
		sortMoviesAsc($('#movies'), "div", "h5.title");
	} else if (menu.value == 'ya') {
		sortMoviesAsc($('#movies'), "div", "h5.rdate");
	} else if (menu.value == 'sa') {
		sortMoviesAsc($('#movies'), "div", "h5.score");
	} else if (menu.value == 'za') {
		sortMoviesDec($('#movies'), "div", "h5.title");
	} else if (menu.value == 'yd') {
		sortMoviesDec($('#movies'), "div", "h5.rdate");
	} else if (menu.value == 'sd') {
		sortMoviesDec($('#movies'), "div", "h5.score");
	}

}

function filterByGenre() {
	
	let filter = $("#genre-select").val()
	let f = filter + ""

	let movies = document.getElementsByClassName("movie")
	let m = movies + ""

	for(let i = 0; i < $("#movies").length; i++) {		

		if (!m[i].includes(f)) {
			movies[i].style.display="none"
		}
		console.log(f)	
		console.log(movies[i])
	} 
}



	

//style="display: none;" document.querySelector(".content h2").style.display="none";