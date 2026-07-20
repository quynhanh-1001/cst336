//event listeners
document.querySelector("button").addEventListener("click", getMovieData);

//getMovieData();

async function getMovieData() {
    try {
        let movieTitle = document.querySelector("#movieTitle").value;

        let url = "https://www.omdbapi.com/?apikey=12215ee6&s=" + movieTitle;

        let response = await fetch(url);
        let data = await response.json();

        console.log(data.Search[0].Poster);

        let imageElement = document.createElement("img");
        imageElement.src = data.Search[0].Poster;

        let headerElement = document.createElement("h1");
        headerElement.textContent = data.Search[0].Title;

        document.querySelector("#movieInfo").append(imageElement);
        document.querySelector("#movieInfo").append(headerElement);

    }    catch (err) {

        //if (err typeof TypeError) {
        if (err instanceof TypeError) {
            alert("ERRPR! API can't be accessed")
        }
        alert(err)
    }

}