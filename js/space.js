document.getElementById('btnBuscar').addEventListener('click', async () => {
    const query = document.getElementById('inputBuscar').value.trim();
    if (query) {
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            mostrarItems(data.collection.items);
        } catch (error) {
            console.error('Error al realizar la búsqueda:', error);
        }
    }
});

function mostrarItems(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    items.forEach(item => {
        const imagen = item.links && item.links.length > 0 ? item.links[0].href : 'https://via.placeholder.com/150';
        const { title, description = 'Sin descripción disponible', date_created } = item.data[0];

        const tarjeta = document.createElement('div');
        tarjeta.classList.add("mb-4", "col-md-4");
        tarjeta.innerHTML = `
            <div class="card">
                <img src="${imagen}" class="card-img-top" alt="${title}">
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${description}</p>
                    <p class="card-text"><small class="text-muted">Fecha: ${new Date(date_created).toLocaleDateString()}</small></p>
                </div>
            </div>
        `;

        contenedor.appendChild(tarjeta);
    });
}
