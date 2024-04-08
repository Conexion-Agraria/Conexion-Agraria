class Game {
  constructor(contGame) {
    this.contGame = document.getElementById(contGame); // Contenedor de las cartas
    this.contCardClass = "contCard"; // Clase de las cartas
    this.getServer = window.location.origin; // Ruta del servidor
    this.folderPath = "/games_memory"; // Carpeta de las imágenes
    this.serverPath = this.getServer + this.folderPath; // Ruta completa del servidor
    this.URL = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Properties.json"; // URL de los datos JSON
    this.pathImg = this.serverPath + "/assets/img/memory/"; // Ruta de las imágenes
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    fetch(this.URL)
      .then(response => response.json())
      .then(data => {
        this.setElements(data); // Crear las cartas
        this.addClickEventToCards(); // Agregar evento clic a las cartas
      })
      .catch(error => {
        console.error("Error fetching data from Firebase:", error);
      });
  }

  setElements(arrayJson) {
    let cardsHtml = ""; // HTML de las cartas

    // Verificar si hay suficientes imágenes para crear las cartas
    if (arrayJson.length < 4) {
        console.error("No hay suficientes imágenes para crear las cartas.");
        return;
    }

    // Obtener un subconjunto aleatorio de 4 imágenes únicas
    const shuffledImages = this.shuffleArray(arrayJson).slice(0, 4);

    // Construir el HTML de las cartas
    shuffledImages.forEach(image => {
      cardsHtml += `
        <div class="col-md-3 mb-3 ${this.contCardClass}">
          <div class="card card-size">
            <img 
              data-value="${image.valor}" 
              data-src="${this.pathImg}${image.img}" 
              data-medida="${image.medida}"
              src="${this.pathImg}${image.img}" 
            >
            <div class="card-body">
              <h5 class="card-title  mb-0" style="font-size: 1rem;">${image.nombre}</h5>
              <p class="card-text  mb-0" style="font-size: 0.8rem;">${image.direccion}</p>
            </div>
          </div>
        </div>`;
    });

    // Insertar las cartas en el contenedor del juego
    this.contGame.innerHTML = `<div class="row">${cardsHtml}</div>`;
  }

  // Evento click en las tarjetas
  addClickEventToCards() {
    // Obtener todas las cartas después de que se han creado
    const cards = this.contGame.querySelectorAll('.card');
  
    // Agregar evento clic a cada carta
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // Mostrar la información de la carta en el modal
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        
        const modalDescription = document.getElementById('modal-description');
  
        // Obtener la información de la carta
        const nombre = card.querySelector('.card-title').textContent;
        const direccion = card.querySelector('.card-text').textContent;
        const medidas = card.querySelector('img').dataset.medida; // Accede a la propiedad medida
  
        // Configurar el contenido del modal
        modalImage.src = card.querySelector('img').dataset.src;
        modalTitle.textContent = nombre;
        
        // Mostrar solo las medidas en el modal
        modalDescription.innerHTML = `
            <p>Dirección: ${direccion}</p>
            <p>Medida: ${medidas}</p>
        `;
  
        // Ocultar el formulario
        document.getElementById('contactFormSection').style.display = 'none';
        
        // Mostrar la sección de la tarjeta
        document.getElementById('cardInfo').style.display = 'block';
  
        // Mostrar el modal
        $('#gameModal').modal('show');
      });
    });
  }
  
  
  shuffleArray(dataArray) {
    return dataArray.sort(() => Math.random() - 0.5);
  }
}
