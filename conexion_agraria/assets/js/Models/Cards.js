class Game {
  constructor(contGame) {
    const element = document.getElementById(contGame); // Obtener el elemento del DOM con el ID especificado
    this.contGame = element; // Asignar el elemento encontrado a this.contGame
    this.contCardClass = "contCard"; // Clase de las cartas
    this.URL = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Properties.json"; // URL de los datos JSON
    this.pathImg = "https://firebasestorage.googleapis.com/v0/b/conexion-agraria.appspot.com/o/predios%2F"; // Ruta de las imágenes en Firebase Storage
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
    
    // Obtener la cantidad de imágenes disponibles
    const numImages = arrayJson.length;
  
    // Verificar si hay suficientes imágenes para crear las cartas.
    // Si no hay suficientes, puedes manejarlo como prefieras, como mostrar un mensaje de advertencia.
    if (numImages === 0) {
      console.error("No hay imágenes disponibles para crear las cartas.");
      return;
    }
  
    // Obtener un subconjunto aleatorio de imágenes del array JSON
    const shuffledImages = this.shuffleArray(arrayJson);
  
    // Construir el HTML de las cartas con todas las imágenes disponibles
    shuffledImages.forEach(image => {
      cardsHtml += `
        <div class="col-md-3 mb-3 ${this.contCardClass}">
          <div class="card card-size">
            <img 
              data-value="${image.valor}" 
              data-src="${this.pathImg}${encodeURIComponent(image.img)}?alt=media" 
              data-medida="${image.medida}"
              src="${this.pathImg}${encodeURIComponent(image.img)}?alt=media" 
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
