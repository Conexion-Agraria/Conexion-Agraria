class Game {
  constructor(contGame) {
    const element = document.getElementById(contGame);
    this.contGame = element;
    this.contCardClass = "contCard";
    this.URL_PROPERTIES = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Properties.json";
    this.URL_DEPARTMENTS = "https://conexion-agraria-default-rtdb.firebaseio.com/Api/Department.json";
    this.pathImg = "https://firebasestorage.googleapis.com/v0/b/conexion-agraria.appspot.com/o/predios%2F";

    this.propertiesPromise = this.getDataProperties();
    this.departmentsPromise = this.getDepartments();

    this.initializeGame();
  }

  async initializeGame() {
    try {
      const [properties, departments] = await Promise.all([this.propertiesPromise, this.departmentsPromise]);
      this.departments = departments;
      this.setElements(properties);
      this.addClickEventToCards();
    } catch (error) {
      console.error("Error initializing game:", error);
    }
  }

  async getDataProperties() {
    try {
      const response = await fetch(this.URL_PROPERTIES);
      const data = await response.json();

      // Convertir el objeto en un array de objetos
      const propertiesArray = Object.keys(data).map(key => {
        data[key].id = key; // Añadir el ID como una propiedad de cada objeto
        return data[key];
      });

      return propertiesArray;
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      throw error;
    }
  }

  async getDepartments() {
    try {
      const response = await fetch(this.URL_DEPARTMENTS);
      return await response.json();
    } catch (error) {
      console.error("Error fetching department data:", error);
      throw error;
    }
  }

  async setElements(arrayJson) {
    try {
      if (!Array.isArray(arrayJson)) {
        arrayJson = Object.keys(arrayJson).map(key => arrayJson[key]);
      }
      this.renderCards(arrayJson);
    } catch (error) {
      console.error('Error setting elements:', error);
    }
  }

  renderCards(arrayJson) {
    this.contGame.innerHTML = '';

    let initialCardsHtml = '';
    arrayJson.slice(0, 4).forEach(property => {
      const firstImage = property.imagenes[0];
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

    initialCardsHtml += `
      <div id="toggleCardsBtnContainer" class="toggle-btn-container">
        <span id="toggleCardsBtn" class="toggle-btn">Mas...</span>
      </div>`;

    this.contGame.innerHTML = `<div class="row">${initialCardsHtml}</div>`;

    let remainingCardsHtml = '';
    arrayJson.slice(4).forEach(property => {
      const firstImage = property.imagenes[0];
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

    const remainingCardsContainer = document.createElement('div');
    remainingCardsContainer.classList.add('row', 'd-none');
    remainingCardsContainer.id = 'remainingCardsContainer';
    remainingCardsContainer.innerHTML = remainingCardsHtml;
    this.contGame.appendChild(remainingCardsContainer);

    const toggleCardsBtn = document.getElementById('toggleCardsBtn');
    toggleCardsBtn.addEventListener('click', () => {
      remainingCardsContainer.classList.toggle('d-none');
      toggleCardsBtn.textContent = remainingCardsContainer.classList.contains('d-none') ? 'Mas...' : 'Menos';
    });

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
