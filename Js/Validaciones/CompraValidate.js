$(document).ready(function () {
    $('#compraForm').validate({
        rules: {
            clienteInput: {
                required: true
            },
            medioDeVentaInput: {
                required: true
            },
            formaDePagoInput: {
                required: true
            },
            promocionInput: {
                required: true
            }
        },
        messages: {
            clienteInput: {
                required: "Seleccione al cliente"
            },
            medioDeVentaInput: {
                required: "Seleccione el medio de venta"
            },
            formaDePagoInput: {
                required: "Seleccione la forma de pago"
            },
            promocionInput: {
                required: "Seleccione la promoción"
            }
        }
    })
})