document.addEventListener('DOMContentLoaded', function () {
    loadClasificaciones();
    loadGeneros();
    loadIdiomas();
});

function loadClasificaciones() {
    fetch('https://localhost:7005/peliculas/GetClasificaiones')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('clasificacionInput');
                selectElement.innerHTML = '<option selected>Select Clasificacion</option>';

                data.data.forEach(clasificacion => {
                    const option = document.createElement('option');
                    option.value = clasificacion.idClasificacion;
                    option.textContent = clasificacion.clasificacion;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of clasificaciones, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading clasificaciones:', error);
        });
}

function loadGeneros() {
    fetch('https://localhost:7005/peliculas/GetGeneros')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('generoInput');
                selectElement.innerHTML = '<option selected>Select Genero</option>';

                data.data.forEach(genero => {
                    const option = document.createElement('option');
                    option.value = genero.idGenero;
                    option.textContent = genero.genero1;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of generos, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading generos:', error);
        });
}

function loadIdiomas() {
    fetch('https://localhost:7005/peliculas/GetIdiomas')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('idiomaInput');
                selectElement.innerHTML = '<option selected>Select Idioma</option>';

                data.data.forEach(idioma => {
                    const option = document.createElement('option');
                    option.value = idioma.idIdioma;
                    option.textContent = idioma.idioma1;
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of idiomas, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading idiomas:', error);
        });
}

document.getElementById('saveChangesBtn').addEventListener('click', function() {
    const postPelicula = {
        titulo: document.getElementById('tituloInput').value,
        duracion: parseInt(document.getElementById('duracionInput').value),
        sinopsis: document.getElementById('sinopsisInput').value,
        idClasificacion: parseInt(document.getElementById('clasificacionInput').value),
        idGenero: parseInt(document.getElementById('generoInput').value),
        idIdioma: parseInt(document.getElementById('idiomaInput').value)
    };

    fetch(`https://localhost:7005/peliculas/PostPelicula`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postPelicula)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Pelicula updated:', data);
        
        const successModal = new bootstrap.Modal(document.getElementById('successModal'));
        successModal.show();
        limpiarCampos();
    })
    .catch(error => {
        console.error('Error updating pelicula:', error);
    });
});

function limpiarCampos(){
    document.getElementById('tituloInput').value = ""
    document.getElementById('duracionInput').value = ""
    document.getElementById('sinopsisInput').value = ""
    document.getElementById('clasificacionInput').value = ""
    document.getElementById('generoInput').value = ""
    document.getElementById('idiomaInput').value = ""
}