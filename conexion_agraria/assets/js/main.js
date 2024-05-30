document.addEventListener("DOMContentLoaded", function () {
    const contId = "contGame";
    const firebaseUser = new FirebaseUser();

    function startGame() {
        game = new Game(contId);
        game.getDataProperties();
    }

    startGame();

    const btnStart = document.getElementById("btn_start");
    if (btnStart) {
        btnStart.addEventListener("click", function () {
            const contactForm = document.getElementById("contactForm");
            if (contactForm) {
                contactForm.reset();
            }

            const modalTitle = document.getElementById('modal-title');
            const modalDescription = document.getElementById('modal-description');
            const modalCarouselInner = document.getElementById('modal-carousel-inner');
            if (modalTitle) modalTitle.textContent = '';
            if (modalDescription) modalDescription.innerHTML = '';
            if (modalCarouselInner) modalCarouselInner.innerHTML = '';

            const cardInfo = document.getElementById('cardInfo');
            if (cardInfo) cardInfo.style.display = 'none';

            const contactFormSection = document.getElementById('contactFormSection');
            if (contactFormSection) contactFormSection.style.display = 'block';

            const carouselPrev = document.querySelector('.carousel-control-prev');
            const carouselNext = document.querySelector('.carousel-control-next');
            if (carouselPrev) carouselPrev.style.display = 'none';
            if (carouselNext) carouselNext.style.display = 'none';
            const carouselIndicators = document.querySelector('.carousel-indicators');
            if (carouselIndicators) carouselIndicators.style.display = 'none';

            $("#gameModal").modal("show");
        });
    }

    const formUser = document.getElementById("contactForm");
    if (formUser) {
        formUser.addEventListener("submit", async (e) => {
            e.preventDefault();
            console.log("Formulario enviado");

            const nombre = document.getElementById("name").value;
            const telefono = document.getElementById("phone").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const userData = {
                nombre: nombre,
                telefono: telefono,
                correo: email,
                descripcion: message,
            };

            try {
                await firebaseUser.setCreateUser(userData);
                alert("Mensaje enviado correctamente.");
                $('#gameModal').modal('hide');
            } catch (error) {
                console.error('Error al crear usuario:', error);
            }
        });
    }
});
