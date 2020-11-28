function searchButton() {
	var apiKey = "ca3d69ee336e43d8099727f0d7ce3859";
	var searchString = $('#search-string').val();
	var page = 1;

	$.ajax({
		method: "GET",
		url: "https://api.themoviedb.org/3/search/movie?api_key="+ 
				apiKey + "&language=en-US&query=" +
				searchString + "&page=" + 
				page + "&include_adult=false",
		dataType: "json"	  
	}).then((response) => {
		console.log(response);
		let movies = response.results;
		let output = '';
		$.each(movies, (index, movie) => {
			output += `
			<div class="col-md-3" id="movie">
				<div class="well text-center">
					<img src="https://image.tmdb.org/t/p/w185/${movie.poster_path}">
					<h5 id="title">${movie.original_title}</h5>
					<h5 id="rdate">(${(movie.release_date).substring(0, 4)})</h5>
					<h5 id="score">Оценка: ${movie.vote_average}/10</h5>
					<a onclick="window.open('https://www.themoviedb.org/movie/${movie.id}','_blank');" class="btn btn-primary" href="#">Подробно</a>
				</div>
			</div>
			`;		
		});	
		
		$('#movies').html(output);
	});
		
}
/*
function divToArray(){

}

function sortMoviesBy(){
	
}
*/