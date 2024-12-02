$(document).ready(function(){
    $('#newTicketForm').validate({
        rules: {
            funcionInput: {
                required: true
            },
            butacaInput:{
                required: true
            },
            precioInput: {
                required: true
            }
        },
        messages: {
            funcionInput: {
                required: "Seleccione la función"
            },
            butacaInput:{
                required: "Seleccione la butaca"
            },
            precioInput: {
                required: "Ingrese el precio de venta"
            }
        }
    })
})