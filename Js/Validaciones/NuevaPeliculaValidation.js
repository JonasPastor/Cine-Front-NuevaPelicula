$(document).ready(function(){
    $('#newFilmForm').validate({
        rules: {
            tituloInput: {
                required: true
            },
            duracionInput: {
                required: true
            },
            sinopsisInput: {
                required: true
            },
            clasificacionInput: {
                required: true
            }
        },
        messages: {
            tituloInput: {
                required: "Por favor ingrese el nombre de la pelicula."
            },
            duracionInput: {
                required: "Por favor ingrese una duración para la pelicula"
            },
            sinopsisInput: {
                required: "Por favor ingrese una sinopsis para la pelicula."
            },
            clasificacionInput: {
                required: "Selecione una clasificación"
            }
        }
    })
})