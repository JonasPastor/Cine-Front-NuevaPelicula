let idFTicketToDelete = null;
let filaToDelete = null;

document.getElementById('btnConsultar').addEventListener('click', function (event) {
    event.preventDefault();

    const NroTicket = document.getElementById('numeroTicket').value;
    const FechaEmision = document.getElementById('fechaEmision').value;
    const Cliente = document.getElementById('cliente').value;

    const fecha = FechaEmision.split('T')[0];


    fetch(`https://localhost:7005/tickets/GetTicketPorFiltros?id=${NroTicket}&fecha=${encodeURIComponent(fecha)}&cliente=${Cliente}`)
        .then(response => response.json())
        .then(response => {
            const tickets = response.data;

            if (Array.isArray(tickets)) {
                let placeHolder = document.querySelector("#ticketsBody");
                let out = "";

                tickets.forEach(ticket => {
                    out += `
                        <tr>
                            <td>${ticket.nroTicket}</td>
                            <td>${ticket.cliente}</td>
                            <td>${new Date(ticket.fechaEmision).toLocaleDateString()}</td>
                            <td>
                                <button class="btn btn-danger borrar-btn" data-id="${ticket.nroTicket}">Borrar</button>
                            </td>
                        </tr>
                    `;
                });

                placeHolder.innerHTML = out;
            } else {
                console.error("Expected an array, but got:", tickets);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("borrar-btn")) {
        const fila = event.target.closest("tr");
        idFTicketToDelete = event.target.getAttribute('data-id');
        filaToDelete = fila;

        const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmDeleteModal.show();
    }
});


document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (idFTicketToDelete !== null) {
        fetch(`https://localhost:7005/tickets/DeleteTicket?id=${idFTicketToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Ticket ${idFTicketToDelete} dado de baja exitosamente`);

                filaToDelete.remove();

                idFTicketToDelete = null;
                filaToDelete = null;

                const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                confirmDeleteModal.hide();

                const successModalDelete = new bootstrap.Modal(document.getElementById('successModalDelete'));
                successModalDelete.show();
            } else {
                console.error('Error al dar de baja el ticket:', data.errorMessage);
            }
        })
        .catch(error => {
            console.error('Error al dar de baja el ticket:', error);
        });
    }
});