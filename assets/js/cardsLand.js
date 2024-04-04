class cardLand {
    constructor() {
        // Constructor: Define propiedades necesarias
        this.container = document.querySelector('.container'); // Contenedor donde se agregarán las tarjetas
    }

    // Método para crear una tarjeta dinámica
    createCard(landData) {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = landData.link; // Enlace a la página del predio (scroll.html en este caso)
        link.target = '_blank';

        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = landData.imgSrc; // URL de la imagen del predio
        figure.appendChild(img);

        const contenido = document.createElement('div');
        contenido.classList.add('contenido');

        const h4 = document.createElement('h4');
        h4.innerHTML = `$${landData.price} <b>COP</b>`;
        const p1 = document.createElement('p');
        p1.textContent = `Área de ${landData.area} m²`;
        const p2 = document.createElement('p');
        p2.textContent = landData.location;
        const hr = document.createElement('hr');
        const p3 = document.createElement('p');
        p3.classList.add('especificacion');
        p3.innerHTML = `<i class="fas fa-building"></i><strong>${landData.availability}</strong>`;
        const p4 = document.createElement('p');
        p4.textContent = `Por ${landData.seller}`;

        contenido.appendChild(h4);
        contenido.appendChild(p1);
        contenido.appendChild(p2);
        contenido.appendChild(hr);
        contenido.appendChild(p3);
        contenido.appendChild(p4);

        link.appendChild(figure);
        link.appendChild(contenido);

        card.appendChild(link);

        this.container.appendChild(card);
    }
}
