document.addEventListener('DOMContentLoaded', () => {

    const getData = (query = "") => {
        const baseURL = 'https://images-api.nasa.gov/search';
        const url = `${baseURL}?q=${encodeURIComponent(query)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data && data.collection && data.collection.items) {
                    showData(data.collection.items);
                } else {
                    console.error('No data found for the query');
                    clearData();
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                clearData();
            });
    }

    const searchData = () => {
        let searchBar = document.querySelector('#inputBuscar');
        let searchButton = document.querySelector('#btnBuscar');

        searchButton.addEventListener('click', function () {
            const query = searchBar.value.toLowerCase();

            if (query.trim() !== "") {
                getData(query);
            } else {
                clearData();
            }
        });
    };

    const fetchImageFromCollection = async (url) => {
        try {
            let response = await fetch(url);
            let data = await response.json();
            if (data && data.length > 0) {
                return data[0]; 
            }
        } catch (error) {
            console.error('Error fetching image collection:', error);
            return null;
        }
    };

    const showData = (data) => {
        let contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';  
    
        data.forEach(async item => {
            const { title, description, date_created, center } = item.data[0];
            let article = document.createElement('article');
            article.classList.add('nasa-item');

            let imageUrl = await fetchImageFromCollection(item.href);
            article.setAttribute('class', 'article')
            article.innerHTML = `
                <img src="${imageUrl ? imageUrl : ''}" alt="${title}" class="nasa-image">
                <h2 class="nasa-title">${title}</h2>
                <p class="nasa-description">${description}</p>
                <p class="nasa-center">Center: ${center}</p>
                <p class="nasa-date">Date Created: ${new Date(date_created).toLocaleDateString()}</p>
            `;
            contenedor.appendChild(article);
        });
    };

    const clearData = () => {
        let contenedor = document.getElementById('contenedor');
        contenedor.innerHTML = '';  
    };

    searchData();
});
