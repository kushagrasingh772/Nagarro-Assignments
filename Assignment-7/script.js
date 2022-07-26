const name = document.querySelector("#search");
const result = document.querySelector("#result");

name.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    getMovieDetails();
  }
});

function getMovieDetails() {
  const movieName = name.value;
  const URL = `https://www.omdbapi.com/?t=${movieName}&apikey=1327501b`;
  if (movieName !== "") {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.Response === "False") {
          result.innerHTML = `<h2>Movie Not Found</h2>`;
        } else {
          result.innerHTML = `<div id="poster">
                                          <img src="${data.Poster}">
                                      </div>
                                          <div id="info">
                                              <div id="info-heading">
                                                  <h1 style="color:blue;  font-size:3rem;">${data.Title}</h1>
                                                  <div id="head-assets">
                                                      <p>Year:<span>${data.Year}</span></p>
                                                      <p>Released:<span>${data.Released}</span></p>
                                                      <p>Runtime:<span>${data.Runtime}</span></p>
                                                  </div>
                                              </div>
                                              <div id="info-body">
                                                <h4>Genre: <span>${data.Genre}</span></h4>
                                                <h4>Language: <span>${data.Language}</span></h4>
                                                <h4>Actors: <span>${data.Actors}</span></h4>
                                                <h4>Director: <span>${data.Director}</span></h4>
                                                <h4>Writer: <span>${data.Writer}</span></h4>
                                                <h4>imdb Rating: <span>${data.imdbRating}</span></h4>
                                                <h4>BoxOffice: <span>${data.BoxOffice}</span></h4>
                                                <h4>Awards: <span>${data.Awards}</span></h4>
                                              </div>
                                          </div>
          
                                          `;
        }
      });
  }
}