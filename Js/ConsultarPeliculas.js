let idPeliculaToDelete = null;
let filaToDelete = null;

document.addEventListener('DOMContentLoaded', function () {
    loadGeneros();
    loadIdiomas();
    loadClasificaciones();
    loadGeneroInput();
    loadIdiomaInput();
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

function loadGeneroInput() {
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

function loadGeneros() {
    fetch('https://localhost:7005/peliculas/GetGeneros')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('generoPelicula');
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

function loadIdiomaInput() {
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

function loadIdiomas() {
    fetch('https://localhost:7005/peliculas/GetIdiomas')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('idiomaPelicula');
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

document.getElementById('btnConsultar').addEventListener('click', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('tituloPelicula').value;
    const idGenero = document.getElementById('generoPelicula').value;
    const idIdioma = document.getElementById('idiomaPelicula').value;

    fetch(`https://localhost:7005/peliculas/GetPeliculasConFiltro?id_genero=${idGenero}&id_idioma=${idIdioma}&titulo=${titulo}`)
        .then(response => response.json())
        .then(response => {
            const peliculas = response.data;

            if (Array.isArray(peliculas)) {
                let placeHolder = document.querySelector("#peliculasBody");
                let out = "";

                peliculas.forEach(pelicula => {
                    out += `
                        <tr>
                            <td>${pelicula.idPelicula}</td>
                            <td>${pelicula.titulo}</td>
                            <td>${pelicula.duracion}</td>
                            <td>${pelicula.clasificacion}</td>
                            <td>${pelicula.sinopsis}</td>
                            <td>${pelicula.genero}</td>
                            <td>${pelicula.idioma}</td>
                            <td>
                                <button class="btn btn-primary modificar-btn" data-id="${pelicula.idPelicula}">Modificar</button>
                                <button class="btn btn-danger borrar-btn" data-id="${pelicula.idPelicula}">Borrar</button>
                            </td>
                        </tr>
                    `;
                });

                placeHolder.innerHTML = out;
            } else {
                console.error("Expected an array, but got:", peliculas);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
});

document.addEventListener("click", function (event){
    if(event.target && event.target.classList.contains("modificar-btn")){
        const fila = event.target.closest("tr");

        const id = parseInt(fila.cells[0].textContent);
        const titulo = fila.cells[1].textContent;
        const duracion = parseInt(fila.cells[2].textContent);
        const clasificacion = fila.cells[3].textContent;
        const sinopsis = fila.cells[4].textContent;
        const genero = fila.cells[5].textContent;
        const idioma = fila.cells[6].textContent;

        const clasificacionSelect = document.getElementById('clasificacionInput');
        clasificacionSelect.value = [...clasificacionSelect.options].find(option => option.text === clasificacion).value;

        const generoSelect = document.getElementById('generoInput');
        generoSelect.value = [...generoSelect.options].find(option => option.text === genero).value;

        const idiomaSelect = document.getElementById('idiomaInput');
        idiomaSelect.value = [...idiomaSelect.options].find(option => option.text === idioma).value;

        document.getElementById('tituloInput').value = titulo;
        document.getElementById('duracionInput').value = duracion;
        document.getElementById('sinopsisInput').value = sinopsis;

        document.getElementById('saveChangesBtn').setAttribute('data-id', id);

        $('#modifyModal').modal('show');
    }
});

document.getElementById('saveChangesBtn').addEventListener('click', function () {
    const idPelicula = this.getAttribute('data-id');
    const updatedPelicula = {
        idPelicula: idPelicula,
        titulo: document.getElementById('tituloInput').value,
        duracion: document.getElementById('duracionInput').value,
        sinopsis: document.getElementById('sinopsisInput').value,
        idClasificacion: document.getElementById('clasificacionInput').value,
        idGenero: document.getElementById('generoInput').value,
        idIdioma: document.getElementById('idiomaInput').value
    };

    console.log('Updating pelicula:', updatedPelicula);

    fetch(`https://localhost:7005/peliculas/UpdatePelicula`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPelicula)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Pelicula updated:', data);
            $('#modifyModal').modal('hide');
            const successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();
            document.getElementById('btnConsultar').click();
        })
        .catch(error => {
            console.error('Error updating pelicula:', error);
        });
});

document.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("borrar-btn")) {
        const fila = event.target.closest("tr");
        idPeliculaToDelete = event.target.getAttribute('data-id');
        filaToDelete = fila;

        console.log(idPeliculaToDelete);

        const confirmDeleteModal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
        confirmDeleteModal.show();
    }
});


document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (idPeliculaToDelete !== null) {
        fetch(`https://localhost:7005/peliculas/DeletePelicula?id=${idPeliculaToDelete}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`Pelicula ${idPeliculaToDelete} eliminada exitosamente`);

                filaToDelete.remove();

                idPeliculaToDelete = null;
                filaToDelete = null;

                const confirmDeleteModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                confirmDeleteModal.hide();

                const successModalDelete = new bootstrap.Modal(document.getElementById('successModalDelete'));
                successModalDelete.show();
            } else {
                console.error('Error al eliminar la pelicula:', data.errorMessage);
            }
        })
        .catch(error => {
            console.error('Error al eliminar la pelicula:', error);
        });
    }
});

document.getElementById('cancelarBtn').addEventListener('click', function () {
    const modifyModal = bootstrap.Modal.getInstance(document.getElementById('modifyModal'));
    modifyModal.hide();
});