document.addEventListener('DOMContentLoaded', function () {
    loadClientes();
    loadMediosDeVenta();
    loadFormasDePago();
    loadPromociones();
});

function loadClientes() {
    fetch('https://localhost:7005/tickets/GetClientes')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('clienteInput');
                selectElement.innerHTML = '<option selected>Select Cliente</option>';

                data.data.forEach(cliente => {
                    const option = document.createElement('option');
                    option.value = cliente.idCliente;
                    option.textContent = cliente.nombre;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of clientes, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading clientes:', error);
        });
}

function loadMediosDeVenta() {
    fetch('https://localhost:7005/tickets/GetMediosPedido')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('medioDeVentaInput');
                selectElement.innerHTML = '<option selected>Select Medio de venta</option>';

                data.data.forEach(medio => {
                    const option = document.createElement('option');
                    option.value = medio.idMedioPedido;
                    option.textContent = medio.descripcion;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of medios, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading medios:', error);
        });
}

function loadFormasDePago() {
    fetch('https://localhost:7005/tickets/GetFormasPago')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('formaDePagoInput');
                selectElement.innerHTML = '<option selected>Select Forma de pago</option>';

                data.data.forEach(forma => {
                    const option = document.createElement('option');
                    option.value = forma.idFormaPago;
                    option.textContent = forma.descripcion;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of formas, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading formas:', error);
        });
}

function loadPromociones() {
    fetch('https://localhost:7005/tickets/GetPromociones')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('promocionInput');
                selectElement.innerHTML = '<option selected>Select Promoción</option>';

                data.data.forEach(promocion => {
                    const option = document.createElement('option');
                    option.value = promocion.idPromocion;
                    option.textContent = promocion.porcentaje;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of promociones, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading promociones:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    const listaDetalles = JSON.parse(localStorage.getItem("listaDetalles")) || [];
    const listaDetallesTabla = JSON.parse(localStorage.getItem("listaDetallesTabla")) || [];
    console.log("Detalles cargados:", listaDetalles);
    console.log("Detalles cargados:", listaDetallesTabla);

    if (listaDetallesTabla.length > 0) {
        const tabla = document.getElementById("tablaBody");

        listaDetallesTabla.forEach(detalle => {
            const nuevaFila = document.createElement("tr");

            nuevaFila.innerHTML = `
                <td>${detalle.pelicula}</td>
                <td>${detalle.fecha}</td>
                <td>${detalle.butaca}</td>
                <td>${detalle.precio.toFixed(2)}</td>
                <td><button type="button" class="btn btn-danger btn-sm eliminarFila">Eliminar</button></td>
            `;

            tabla.appendChild(nuevaFila);
        });

        document.querySelectorAll('.eliminarFila').forEach(button => {
            button.addEventListener('click', function() {
                const fila = this.closest('tr');
                fila.remove();
            });
        });
    } else {
        document.body.innerHTML = "<p>No se encontraron datos para mostrar.</p>";
    }
});

function calcularTotal(promocion, precio){
    const total = precio - (precio * promocion / 100)
    return total
}

document.getElementById('buyBtn').addEventListener('click', function() {
    const listaDetalles = JSON.parse(localStorage.getItem("listaDetalles")) || [];
    const promocion = document.getElementById('promocionInput').options[document.getElementById('promocionInput').selectedIndex].text;
    const detallesTicket = listaDetalles.map((detalle, index) => ({
        idDetalle: 0,  
        funcion: {
            idFuncion: detalle.funcion
        },
        idButaca: detalle.idButaca,
        precioVenta: detalle.precio
    }));

    let totalPrecio = 0

    listaDetalles.forEach((detalle, index) => {
        totalPrecio += detalle.precio
    });

    console.log(totalPrecio)

    const postTicket = {
        fecha: new Date().toISOString(),
        idCliente: parseInt(document.getElementById('clienteInput').value),
        idMedioPedido: parseInt(document.getElementById('medioDeVentaInput').value),
        idPromocion: parseInt(document.getElementById('promocionInput').value),
        total: calcularTotal(promocion, totalPrecio),  
        idFormaDePago: parseInt(document.getElementById('formaDePagoInput').value),
        detallesTicket: detallesTicket 
    };

    fetch(`https://localhost:7005/tickets/PostTicket`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postTicket)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Ticket updated:', data);
        console.log(postTicket)
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
    })
    .catch(error => {
        console.error('Error updating ticket:', error);
    });
});



