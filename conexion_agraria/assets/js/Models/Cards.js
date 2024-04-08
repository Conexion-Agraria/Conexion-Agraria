class Game {
  constructor(contGame) {
    this.contGame = document.getElementById(contGame); 
    this.contCardClass = "contCard"; 
    this.getServer = window.location.origin; 
    this.folderPath = "/conexion_agraria"; 
    this.serverPath = this.getServer + this.folderPath; 
    this.URL = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Properties.json"; // URL de los datos JSON
    this.pathImg = this.serverPath + "/assets/img/memory/"; 
    this.getDataFromFirebase();
  }

  getDataFromFirebase() {
    fetch(this.URL)
      .then(response => response.json())
      .then(data => {
        this.setElements(data); 
        this.addClickEventToCards(); 
      })
      .catch(error => {
        console.error("Error fetching data from Firebase:", error);
      });
  }

  setElements(arrayJson) {
    let cardsHtml = ""; 

    if (arrayJson.length < 4) {
        console.error("No hay suficientes imágenes para crear las cartas.");
        return;
    }

    const shuffledImages = this.shuffleArray(arrayJson).slice(0, 4);

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

    this.contGame.innerHTML = `<div class="row">${cardsHtml}</div>`;
  }

  addClickEventToCards() {
    const cards = this.contGame.querySelectorAll('.card');
  
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const modalImage = document.getElementById('modal-image');
        const modalTitle = document.getElementById('modal-title');
        
        const modalDescription = document.getElementById('modal-description');
  
        const nombre = card.querySelector('.card-title').textContent;
        const direccion = card.querySelector('.card-text').textContent;
        const medidas = card.querySelector('img').dataset.medida; 
  
        modalImage.src = card.querySelector('img').dataset.src;
        modalTitle.textContent = nombre;
        
        modalDescription.innerHTML = `
            <p>Dirección: ${direccion}</p>
            <p>Medida: ${medidas}</p>
        `;
  
        document.getElementById('contactFormSection').style.display = 'none';
        
        document.getElementById('cardInfo').style.display = 'block';
  
        $('#gameModal').modal('show');
      });
    });
  }
  
  
  shuffleArray(dataArray) {
    return dataArray.sort(() => Math.random() - 0.5);
  }
}
