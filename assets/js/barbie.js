$(document).ready(function() {
    
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria'); // 'barbie', 'harry+potter', etc.

    if (categoria) {
        $('#titulo-categoria').text(`Películas de ${categoria.replace('+', ' ')}`); 

        
        const apikey = '906b5c9d'; 
        const query = encodeURIComponent(categoria); 
        const apiUrl = `https://www.omdbapi.com/?apikey=${apikey}&s=${query}`;

        $.ajax({
            type: 'GET',
            url: apiUrl,
            dataType: 'json',
            success: function(data) {
                console.log('Datos de la API:', data);
                if (data.Search) {
                    mostrarPeliculas(data.Search);
                } else {
                    console.log('No se encontraron películas');
                }
            },
            error: function(error) {
                console.log("Error en la solicitud", error);
            }
        });

        function mostrarPeliculas(peliculas) {
            console.log(peliculas);
            const moviesContainer = $('#movies-container');
            moviesContainer.empty(); 

            peliculas.forEach(function(pelicula) {
                const poster = pelicula.Poster; 
                const movieTitle = pelicula.Title;

                const movieDiv = `
                    <div class="movie">
                        <img src="${poster}" alt="${movieTitle}">
                        <div class="movie-title">${movieTitle}</div>
                    </div>
                `;
                moviesContainer.append(movieDiv);
            });
        }
    } else {
        console.log('No se proporcionó una categoría.');
    }
});
