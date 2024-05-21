class Game {
  constructor(contGame) {
    const element = document.getElementById(contGame); // Obtener el elemento del DOM con el ID especificado
    this.contGame = element; // Asignar el elemento encontrado a this.contGame
    this.contCardClass = "contCard"; // Clase de las cartas
    this.URL_PROPERTIES = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Properties.json"; // URL de los datos JSON
    this.URL_DEPARTMENTS = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Department.json";
    this.pathImg = "https://firebasestorage.googleapis.com/v0/b/conexion-agraria.appspot.com/o/predios%2F"; // Ruta de las imágenes en Firebase Storage
    this.getDataProperties();
    this.getDepartments();
  }

  getDataProperties() {
    fetch(this.URL_PROPERTIES)
      .then(response => response.json())
      .then(data => {
        this.setElements(data); // Crear las cartas
        this.addClickEventToCards(); // Agregar evento clic a las cartas
      })
      .catch(error => {
        console.error("Error fetching data from Firebase:", error);
      });
  }

  async getDepartments() {
    try {
      const response = await fetch(this.URL_DEPARTMENTS);
      const data = await response.json();
      this.departments = data; // Almacena los datos de los departamentos en la propiedad departments
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  }

  async setElements(arrayJson) {
    try {
      // Verificar si arrayJson es un array o un objeto
      if (Array.isArray(arrayJson)) {
        // Si es un array, procesarlo como tal
        this.renderCards(arrayJson);
      } else {
        // Si es un objeto, convertirlo a un array
        arrayJson = Object.keys(arrayJson).map(key => arrayJson[key]);
        // Procesar el array como se hace normalmente
        this.renderCards(arrayJson);
      }
    } catch (error) {
      console.error('Error setting elements:', error);
    }
  }

  renderCards(arrayJson) {
    // Limpiar el contenedor de las cartas
    this.contGame.innerHTML = '';

    // Generar HTML para las primeras 4 cartas
    let initialCardsHtml = '';
    arrayJson.slice(0, 4).forEach(property => {
      const firstImage = property.imagenes[0]; // Mostrar solo la primera imagen en la card
      let departmentName = "Desconocido";
      let municipalityName = "Desconocido";
      if (this.departments && this.departments[property.departamento]) {
        departmentName = this.departments[property.departamento].nombre;
        if (property.municipio) {
          municipalityName = property.municipio;
        }
      }
      
      initialCardsHtml += `
        <div class="col-md-3 mb-3 ${this.contCardClass}">
          <div class="card card-size" data-property='${JSON.stringify(property)}'>
            <img 
              class="card-img-top" 
              src="${this.pathImg}${encodeURIComponent(firstImage)}?alt=media" 
              alt="Card image cap"
            >
            <div class="card-body">
              <h5 class="card-title" style="font-size: 1.2rem;"><strong>${property.nombre}</strong></h5>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Departamento: ${departmentName}</p>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Municipio: ${municipalityName}</p>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Medida: ${property.medida}</p>
            </div>
          </div>
        </div>`;
    });

    // Agregar un botón al final de las primeras 4 cartas
    initialCardsHtml += `
      <div id="toggleCardsBtnContainer" class="toggle-btn-container">
        <span id="toggleCardsBtn" class="toggle-btn">Mas...</span>
      </div>`;

    // Agregar las primeras 4 cartas al contenedor
    this.contGame.innerHTML = `<div class="row">${initialCardsHtml}</div>`;

    // Generar HTML para el resto de las cartas
    let remainingCardsHtml = ''; // Define la variable aquí
    arrayJson.slice(4).forEach(property => {
      const firstImage = property.imagenes[0]; // Mostrar solo la primera imagen en la card
      let departmentName = "Desconocido";
      let municipalityName = "Desconocido";
      if (this.departments && this.departments[property.departamento]) {
        departmentName = this.departments[property.departamento].nombre;
        if (property.municipio) {
          municipalityName = property.municipio;
        }
      }

      remainingCardsHtml += `
        <div class="col-md-3 mb-3 ${this.contCardClass}">
          <div class="card card-size" data-property='${JSON.stringify(property)}'>
            <img 
              class="card-img-top" 
              src="${this.pathImg}${encodeURIComponent(firstImage)}?alt=media" 
              alt="Card image cap"
            >
            <div class="card-body">
              <h5 class="card-title" style="font-size: 1.2rem;"><strong>${property.nombre}</strong></h5>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Departamento: ${departmentName}</p>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Municipio: ${municipalityName}</p>
              <p class="card-text" style="font-size: 1rem; margin-bottom: 0.2rem;">Medida: ${property.medida}</p>
            </div>
          </div>
        </div>`;
    });

    // Agregar un contenedor para las cartas restantes (inicialmente oculto)
    const remainingCardsContainer = document.createElement('div');
    remainingCardsContainer.classList.add('row', 'd-none');
    remainingCardsContainer.id = 'remainingCardsContainer';
    remainingCardsContainer.innerHTML = remainingCardsHtml;
    this.contGame.appendChild(remainingCardsContainer);

    // Agregar evento de clic al botón para mostrar todas las cartas
    const toggleCardsBtn = document.getElementById('toggleCardsBtn');
    toggleCardsBtn.addEventListener('click', () => {
      remainingCardsContainer.classList.toggle('d-none');
      toggleCardsBtn.textContent = remainingCardsContainer.classList.contains('d-none') ? 'Mas...' : 'Menos';
    });

    // Mover el botón al lado de la última carta
    const toggleCardsBtnContainer = document.getElementById('toggleCardsBtnContainer');
    toggleCardsBtnContainer.classList.remove('col-md-3');
    toggleCardsBtnContainer.classList.add('col-md-12');
  }

  async addClickEventToCards() {
    const cards = this.contGame.querySelectorAll('.card');
    cards.forEach(card => {
      if (!card.dataset.clickEventAdded) {
        card.dataset.clickEventAdded = true;
        card.addEventListener('click', () => {
          const property = JSON.parse(card.dataset.property);
  
          const modalImageContainer = document.getElementById('modal-carousel-inner');
          const imagesHtml = property.imagenes.map((image) => `
            <div class="swiper-slide">
              <img src="${this.pathImg}${encodeURIComponent(image)}?alt=media" class="d-block w-100" alt="...">
            </div>
          `).join("");
          modalImageContainer.innerHTML = imagesHtml;
  
          const modalTitle = document.getElementById('modal-title');
          const modalDireccion = document.getElementById('modal-direccion');
          const modalDepartamento = document.getElementById('modal-departamento');
          const modalMunicipio = document.getElementById('modal-municipio');
          const modalClima = document.getElementById('modal-clima');
          const modalMedidas = document.getElementById('modal-medidas');
          const modalDescription = document.getElementById('modal-description');
  
          let departmentName = "Desconocido";
          let municipalityName = "Desconocido";
  
          if (this.departments && this.departments[property.departamento]) {
            departmentName = this.departments[property.departamento].nombre;
            if (property.municipio) {
              municipalityName = property.municipio;
            }
          }
  
          modalTitle.textContent = property.nombre;
          modalDireccion.innerHTML = `<ion-icon name="location-outline"></ion-icon> <strong>Dirección:</strong> ${property.direccion}`;
          modalDepartamento.innerHTML = `<ion-icon name="business-outline"></ion-icon> <strong>Departamento:</strong> ${departmentName}`;
          modalMunicipio.innerHTML = `<ion-icon name="home-outline"></ion-icon> <strong>Municipio:</strong> ${municipalityName}`;
          modalClima.innerHTML = `<ion-icon name="partly-sunny-outline"></ion-icon> <strong>Clima:</strong> ${property.clima}`;
          modalDescription.innerHTML = `<ion-icon name="document-text-outline"></ion-icon> <strong>Descripción:</strong> <br>${property.descripcion}`;
          modalMedidas.innerHTML = `<ion-icon name="cube-outline"></ion-icon> <strong>Medida:</strong> ${property.medida}`;
  
          document.getElementById('contactFormSection').style.display = 'none';
          document.getElementById('cardInfo').style.display = 'block';
          $('#gameModal').modal('show');
  
          if (this.modalSwiper) {
            this.modalSwiper.destroy();
          }
  
          this.modalSwiper = new Swiper('.modal-swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            loop: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '"></span>';
              },
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            threshold: 4,
            speed: 900,
            initialSlide: property.imagenes.length - 1,
          });
        });
      }
    });
  }  
}  