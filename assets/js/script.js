function generateUrl() {
    let id = Math.floor(Math.random() * 9000000) + 1000000;
    return `https://www.omdbapi.com/?i=tt${id}&apikey=906b5c9d&type=movie`;
}


function getPic() {
    $.ajax({
    url: generateUrl(),
    method: 'GET',
    dataType: 'json',
    success: function(info) {
    if (info.Poster !== 'N/A' && info.Type === 'movie') {
    renderPic(info);
    } else {
    getPic(); // Reintentar si no hay película o cartel válido
    }
    },
    error: function(error) {
    console.error('Error al obtener la película:', error);
    }
    });
    }

$(document).ready(function() {
    for (let index = 1; index < 4; index++) {
        getPic();
    }
});
function renderPic(data) {
    console.log(data);
   
    mostrarDatos(data);
}

function mostrarDatos(info) {
    console.log(info);

    const nuevaInfo = info;

   
    let posterDiv = $("<div></div>").addClass("recomendaciones");

   
    $("<img>").attr("src", nuevaInfo.Poster).appendTo(posterDiv);

   
    $("<h3></h3>")
    .html(`<a href="movie-details.html?title=${encodeURIComponent(nuevaInfo.Title)}" target="_blank">${nuevaInfo.Title}</a>`)
    .appendTo(posterDiv);
    $("<p></p>").text(nuevaInfo.Actors).appendTo(posterDiv);


    $("#recomendaciones").append(posterDiv);
}








const apikey = '906b5c9d'; 

$(document).ready(function(){
    $("#search-form").submit(function (e) {
        e.preventDefault(); // Evitar que la página se recargue
        let nombrePelicula = $("#search-input").val().toLowerCase();
        
        if (nombrePelicula) {
            // Borrar todo el contenido del body antes de mostrar los resultados
            $('body').empty();
            buscarPelicula(nombrePelicula);
        } else {
            alert("Necesita colocar un valor en el input");
        }
        $("#search-input").val("");
    });

    function buscarPelicula(movie) {
        $.ajax({
            type: "GET",
            url:  `https://www.omdbapi.com/?apikey=${apikey}&s=${movie}`,
            dataType: "json",
            success: function (data) {
                renderMovie(data);
            },
            error: function() {
                alert('Error al buscar la película.');
            }
        });
    }

    function renderMovie(data) {
        // Crear una nueva estructura HTML
        const newHtml = `
            <header>
                
                <nav>
            <img src="CINEMA_1-removebg-preview.png" alt="cinema" class="cinema">
            <ul class="menu-horizontal">
              <li><a href="index.html">Inicio</a></li>
              <li>
                <a href="#">Catálogo</a>
                <ul>
                  <li><a href="categorias.html?categoria=harry+potter">Harry Potter</a></li>
                  <li><a href="categorias.html?categoria=barbie">Barbie</a></li>
                  <li><a href="categorias.html?categoria=spider+man">Spiderman</a></li>
                  <li><a href="categorias.html?categoria=monster+high">Monster High</a></li>
                  <li><a href="categorias.html?categoria=star+wars">Star Wars</a></li>
                  <li><a href="categorias.html?categoria=lord+of+the+rings">The Lord of the Rings</a></li>
                  <li><a href="categorias.html?categoria=x+men">X-Men</a></li>
                  
              </ul>
      
              </li>
              <li><a href="#">Acerca de nosotras</a></li>
              <li><a href="#">Contactanos</a></li>
            </ul>
        </nav>
        <h1>Resultados de la búsqueda</h1>
    
            </header>
            <main id="movies-container"></main>
            <footer>
                <p>API proporcionada por <a href="https://www.omdbapi.com/" target="_blank">OMDb API</a></p>
            </footer>
        `;
        
        // Añadir la nueva estructura HTML al body
        $('body').html(newHtml);

        const movieContainer = $("#movies-container");

        if (data.Response === "True") {
            data.Search.forEach(function(movie) {
                let moviePoster = $("<div></div>").addClass("movies-container");

                $("<img>").attr("src", movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/300x450').appendTo(moviePoster);
                $("<h3></h3>").text(movie.Year).appendTo(moviePoster);
                $("<h4></h4>")
                .html(`<a href="movie-details.html?title=${encodeURIComponent(movie.Title)}" target="_blank">${movie.Title.toUpperCase()}</a>`)
                .appendTo(moviePoster);
            

                movieContainer.append(moviePoster);
            });
        } else {
            movieContainer.html('<p>No se encontraron resultados.</p>');
        }

        // Añadir funcionalidad al botón de "Volver a buscar"
        $("#volver").click(function() {
            location.reload(); // Recargar la página para volver al formulario original
        });
    }
});