document.addEventListener('DOMContentLoaded', () => {
    const carList = document.getElementById('carList');
    const addCarForm = document.getElementById('addCarForm');

    // Function to fetch and display all cars
    const fetchCars = () => {
        fetch('/api/carros')
            .then(response => response.json())
            .then(data => {
                // Display the list of cars
                carList.innerHTML = '';
                data.forEach(car => {
                    const carItem = document.createElement('li');
                    carItem.textContent = `Descrição: ${car.descricao}, Marca: ${car.marca}, Valor: ${car.valor}`;
                    carList.appendChild(carItem);
                });
            })
            .catch(error => console.error(error));
    };

    // Function to add a new car
    const addCar = () => {
        const descricao = document.getElementById('descricao').value;
        const marca = document.getElementById('marca').value;
        const valor = parseFloat(document.getElementById('valor').value);

        fetch('/api/carros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ descricao, marca, valor }),
        })
            .then(() => {
                fetchCars(); // Refresh car list
            })
            .catch(error => console.error(error));
    };

    // Initial fetch to display cars
    fetchCars();

    // Add event listeners for form submission
    addCarForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addCar();
    });
});
