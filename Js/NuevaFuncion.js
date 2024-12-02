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

document.getElementById('saveChangesBtn').addEventListener('click', function() {
    const postFunction = {
        idPelicula: document.getElementById('peliculaInput').value,
        idSala: document.getElementById('salaInput').value,
        fechaDesde: document.getElementById('desdeInput').value,
        fechaHasta: document.getElementById('hastaInput').value,
        idHorario: document.getElementById('horarioInput').value,
        precio: parseFloat(document.getElementById('precioInput').value)
    };

    fetch(`https://localhost:7005/funciones/PostFuncion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postFunction)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Function updated:', data);
        
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        limpiarCampos();
    })
    .catch(error => {
        console.error('Error updating function:', error);
    });
});

function limpiarCampos(){
    document.getElementById('peliculaInput').value = ""
    document.getElementById('salaInput').value = ""
    document.getElementById('desdeInput').value = ""
    document.getElementById('hastaInput').value = ""
    document.getElementById('horarioInput').value = ""
    document.getElementById('precioInput').value = ""
}
