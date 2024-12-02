$(document).ready(function(){
    $('#newFunctionForm').validate({
        rules: {
            peliculaInput: {
                required: true
            },
            salaInput: {
                required: true
            },
            desdeInput: {
                required: true,
                date: true
            },
            hastaInput: {
                required: true,
                date: true
            },
            horarioInput: {
                required: true
            },
            precioInput: {
                required: true
            }
        },
        messages: {
            peliculaInput: {
                required: "Seleccione una pelicula"
            },
            salaInput: {
                required: "Seleccione una sala"
            },
            desdeInput: {
                required: "Ingrese la fecha de inicio de la función",
                date: "Ingrese una fecha valida"
            },
            hastaInput: {
                required: "Ingrese la fecha de finalización de la función",
                date: "Ingrese una fecha valida"
            },
            horarioInput: {
                required: "Seleccione el horario de la función"
            },
            precioInput: {
                required: "Ingrese un precio para la función"
            }
        }
    })
})