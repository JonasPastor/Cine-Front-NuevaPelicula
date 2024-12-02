$(document).ready(function(){
    $('#GetPeliculas').validate({
        rules:{
            tituloPelicula: {
                required: true
            },
            generoPelicula: {
                required: true
            },
            idiomaPelicula:{
                required: true
            }
        },
        messages: {
            tituloPelicula: {
                required: "Ingrese el titulo de la pelicula"
            },
            generoPelicula: {
                required: "Seleccione el genero de la pelicula"
            },
            idiomaPelicula:{
                required: "Seleccione el idioma de la pelicula"
            }
        }
    }),
    $('#updateForm').validate({
        rules:{
            tituloInput: {
                required: true
            },
            duracionInput:{
                required: true
            },
            sinopsisInput: {
                required: true
            },
            clasificacionInput:{
                required: true
            },
            generoInput:{
                required: true
            },
            idiomaInput:{
                required: true
            }
        },
        messages: {
            tituloInput: {
                required: "Ingrese el titulo de la pelicula"
            },
            duracionInput:{
                required: "Ingrese la duración de la pelicula"
            },
            sinopsisInput: {
                required: "Ingrese la sinopsis de la pelicula"
            },
            clasificacionInput:{
                required: "Seleccione la clasificación de la pelicula"
            },
            generoInput:{
                required: "Seleccione el genero de la pelicula"
            },
            idiomaInput:{
                required: "Seleccione el idioma de la pelicula"
            }
        }
    })
})