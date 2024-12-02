document.addEventListener('DOMContentLoaded', function () {
    loadFunciones();
});

const listaDetalles = [];
const listDetallesTabala = [];

const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");

const asientos = document.querySelectorAll('.seat');
let asiento;
let idButaca;

function loadFunciones() {
    fetch('https://localhost:7005/tickets/GetFunciones')
        .then(response => response.json())
        .then(data => {
            if (data.success && Array.isArray(data.data)) {
                const selectElement = document.getElementById('funcionInput');
                selectElement.innerHTML = '<option selected>Select Función</option>';

                data.data.forEach(funcion => {
                    const option = document.createElement('option');
                    option.value = funcion.id;
                    option.textContent = funcion.pelicula + ". Sala " + funcion.sala + " - " + 
                        new Date(funcion.horario).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    selectElement.appendChild(option);
                });
            } else {
                console.error('Expected an array of funciones, but got:', data);
            }
        })
        .catch(error => {
            console.error('Error loading funciones:', error);
        });
}

async function loadButaca() {
    try {
        const response = await fetch(`https://localhost:7005/tickets/GetIdButaca?nombre=${asiento}`);
        if (!response.ok) {
            throw new Error(`Response error: ${response.status}`);
        }

        const jsonResponse = await response.json();
        idButaca = jsonResponse?.data?.idButaca;

        if (isNaN(idButaca)) {
            throw new Error('El valor devuelto no es un número válido');
        }

        return idButaca;
    } catch (error) {
        console.error('Error al obtener el número:', error);
    }
}

function updateSelectedSeat() {
    const selectedSeat = document.querySelector(".row .seat.selected");

    if (selectedSeat) {
        const seatIndex = Array.from(seats).indexOf(selectedSeat);
        localStorage.setItem("selectedSeats", JSON.stringify([seatIndex]));
    } else {
        localStorage.removeItem("selectedSeats");
    }
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

    if (selectedSeats != null && selectedSeats.length > -1) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
}

container.addEventListener('click', e => {
    if (e.target.classList.contains('seat')) {
        const selectedSeats = document.querySelectorAll(".row .seat.selected");
        selectedSeats.forEach(seat => seat.classList.remove('selected'));

        e.target.classList.add('selected');

        updateSelectedSeat();
    }
});

asientos.forEach(seat => {
    seat.addEventListener('click', function () {
        asiento = this.id;
        console.log(asiento);
    });
});

document.getElementById('addChangesBtn').addEventListener('click', async function () {
    const detalleTicket = {
        funcion: parseInt(document.getElementById('funcionInput').value),
        fecha: new Date().toISOString().slice(0, 16),
        idButaca: await loadButaca(),
        precio: parseFloat(document.getElementById('precioInput').value)
    };

    const showDetalles = {
        pelicula: document.getElementById('funcionInput').options[document.getElementById('funcionInput').selectedIndex].text,
        fecha: new Date().toISOString().slice(0, 16),
        butaca: asiento,
        precio: parseFloat(document.getElementById('precioInput').value)
    };

    listaDetalles.push(detalleTicket);
    listDetallesTabala.push(showDetalles);

    console.log(listaDetalles);
    console.log(listDetallesTabala);
});

document.getElementById('goToComprasBtn').addEventListener('click', function() {


    localStorage.setItem('listaDetalles', JSON.stringify(listaDetalles));
    localStorage.setItem('listaDetallesTabla', JSON.stringify(listDetallesTabala));

    window.location.href = "Compra.html";
    
});

function limpiarCampos(){
    document.getElementById('funcionInput').value = ""
    document.getElementById('precioInput').value = ""
}