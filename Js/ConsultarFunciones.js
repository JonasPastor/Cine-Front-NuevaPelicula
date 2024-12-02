let idFuncionToDelete = null;
let filaToDelete = null;

document.addEventListener('DOMContentLoaded', function () {
    loadPelicula();
    loadSalas();
    loadHorarios();
});

function loadPelicula() {
    fetch('https://localhost:7005/funciones/GetPeliculas')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('peliculaInput');
                selectElement.innerHTML = '<option selected>Select Pelicula</option>';

                data.data.forEach(pelicula => {
                    const option = document.createElement('option');
                    option.value = pelicula.idPelicula;
                    option.textContent = pelicula.titulo;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of peliculas, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading peliculas:', error);
        });
}

function loadSalas() {
    fetch('https://localhost:7005/funciones/GetSalas')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('salaInput');
                selectElement.innerHTML = '<option selected>Select Sala</option>';

                data.data.forEach(sala => {
                    const option = document.createElement('option');
                    option.value = sala.idSala;
                    option.textContent = sala.nroSala;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of salas, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading salas:', error);
        });
}

function loadHorarios() {
    fetch('https://localhost:7005/funciones/GetHorarios')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('horarioInput');
                selectElement.innerHTML = '<option selected>Select Horario</option>';

                data.data.forEach(horario => {
                    const option = document.createElement('option');
                    option.value = horario.idHorario;
                    option.textContent = new Date(horario.horario1).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of horarios, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading horarios:', error);
        });
}

document.getElementById('btnConsultar').addEventListener('click', function (event) {
    event.preventDefault();

    const idFuncion = document.getElementById('numeroFuncion').value;
    const desde = document.getElementById('desde').value;
    const hasta = document.getElementById('hasta').value;

    fetch(`https://localhost:7005/funciones/GetFuncionesPorFiltros?id_funcion=${idFuncion}&desde=${encodeURIComponent(desde)}&hasta=${encodeURIComponent(hasta)}`)
        .then(response => response.json())
        .then(response => {
            const funciones = response.data;

            if (Array.isArray(funciones)) {
                let placeHolder = document.querySelector("#funcionesBody");
                let out = "";

                funciones.forEach(funcion => {
                    out += `
                        <tr>
                            <td>${funcion.id}</td>
                            <td>${funcion.pelicula}</td>
                            <td>${funcion.sala}</td>
                            <td>${funcion.tipoSala}</td>
                            <td>${new Date(funcion.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td>${new Date(funcion.fechaDesde).toLocaleDateString()}</td>
                            <td>${new Date(funcion.fechaHasta).toLocaleDateString()}</td>
                            <td>${funcion.precio}</td>
                            <td>
                                <button class="btn btn-primary modificar-btn" data-id="${funcion.id}">Modificar</button>
                                <button class="btn btn-danger borrar-btn" data-id="${funcion.id}">Borrar</button>
                            </td>
                        </tr>
                    `;
                });

                placeHolder.innerHTML = out;
            } else {
                console.error("Expected an array, but got:", funciones);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("modificar-btn")) {
        const fila = event.target.closest("tr");

        const id = parseInt(fila.cells[0].textContent);
        const pelicula = fila.cells[1].textContent;
        const sala = fila.cells[2].textContent;
        const horarioTexto = fila.cells[4].textContent;
        const fechaDesde = fila.cells[5].textContent;
        const fechaHasta = fila.cells[6].textContent;
        const precio = fila.cells[7].textContent;

        const peliculaSelect = document.getElementById('peliculaInput');
        peliculaSelect.value = [...peliculaSelect.options].find(option => option.text === pelicula).value;

        const salaSelect = document.getElementById('salaInput');
        salaSelect.value = [...salaSelect.options].find(option => option.text === sala).value;

        const horarioSelect = document.getElementById('horarioInput');
        horarioSelect.value = [...horarioSelect.options].find(option => option.text === horarioTexto).value;

        document.getElementById('desdeInput').value = fechaDesde;

        document.getElementById('hastaInput').value = fechaHasta;

        document.getElementById('precioInput').value = precio;

        document.getElementById('saveChangesBtn').setAttribute('data-id', id);

        $('#modifyModal').modal('show');
    }
});


document.getElementById('saveChangesBtn').addEventListener('click', function () {
    const idFuncion = this.getAttribute('data-id');
    const updatedFuncion = {
        idFuncion: idFuncion,
        idPelicula: document.getElementById('peliculaInput').value,
        idSala: document.getElementById('salaInput').value,
        fechaDesde: document.getElementById('desdeInput').value,
        fechaHasta: document.getElementById('hastaInput').value,
        idHorario: document.getElementById('horarioInput').value,
        precio: parseFloat(document.getElementById('precioInput').value)
    };

    console.log('Updating function:', updatedFuncion);

    fetch(`https://localhost:7005/funciones/EditFuncion`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFuncion)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Function updated:', data);
            $('#modifyModal').modal('hide');
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            document.getElementById('btnConsultar').click();
        })
        .catch(error => {
            console.error('Error updating function:', error);
        });
});


document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("borrar-btn")) {
        const fila = event.target.closest("tr");
        idFuncionToDelete = event.target.getAttribute('data-id');
        filaToDelete = fila;

        const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmDeleteModal.show();
    }
});


document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (idFuncionToDelete !== null) {
        fetch(`https://localhost:7005/funciones/DeleteFuncion?id=${idFuncionToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Función ${idFuncionToDelete} eliminada exitosamente`);

                filaToDelete.remove();

                idFuncionToDelete = null;
                filaToDelete = null;

                const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                confirmDeleteModal.hide();

                const successModalDelete = new bootstrap.Modal(document.getElementById('successModalDelete'));
                successModalDelete.show();
            } else {
                console.error('Error al eliminar la función:', data.errorMessage);
            }
        })
        .catch(error => {
            console.error('Error al eliminar la función:', error);
        });
    }
});

document.getElementById('cancelarBtn').addEventListener('click', function () {
    const modifyModal = bootstrap.Modal.getInstance(document.getElementById('modifyModal'));
    modifyModal.hide();
});





