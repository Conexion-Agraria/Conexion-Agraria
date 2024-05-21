document.addEventListener("DOMContentLoaded", function () {

    // Variables globales
    var firebaseUser;
    var game;
    const contId = "contGame";
    const firebase = new FirebaseUser();

    // Define la función startGame() antes de la primera invocación
    function startGame() {
        // Pasa el segundo argumento (numCards) al constructor de la clase Game
        game = new Game(contId); // Eliminar numCards de la instancia
        game.getDataProperties();
    }

    // Iniciar el juego automáticamente al cargar la página
    startGame(contGame); // Por ejemplo, aquí se pasa 20 como el valor de numCards

    // Añadir evento click al botón "Contactanos"
    document.getElementById("btn_start").addEventListener("click", function () {
        // Limpiar el formulario al abrir el modal de contacto
        document.getElementById("contactForm").reset();

        // Limpiar el contenido del modal
        document.getElementById('modal-title').textContent = '';
        document.getElementById('modal-description').innerHTML = '';
        document.getElementById('modal-carousel-inner').innerHTML = '';

        // Ocultar los detalles de las cards
        document.getElementById('cardInfo').style.display = 'none';

        // Mostrar el formulario
        document.getElementById('contactFormSection').style.display = 'block';

        // Ocultar los botones de "Next" y "Previous" del carousel
        document.querySelector('.carousel-control-prev').style.display = 'none';
        document.querySelector('.carousel-control-next').style.display = 'none';
        // Ocultar los botones del carousel
        document.querySelector('.carousel-indicators').style.display = 'none';

        // Mostrar el modal
        $("#gameModal").modal("show");
    });


    // Escuchar el evento de envío del formulario
    const formUser = document.getElementById("contactForm");
    formUser.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        // Obtener los datos del formulario
        const nombre = document.getElementById("name").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        // Crear objeto con los datos del usuario
        const userData = {
            nombre: nombre,
            telefono: telefono,
            correo: email,
            descripcion: message,
        };

        // Llamar al método para crear un nuevo usuario
        firebase.setCreateUser(userData).then(() => {
            // Mostrar alerta de éxito
            alert("Mensaje enviado correctamente.");

            // Cerrar modal después de crear el usuario
            $('#gameModal').modal('hide');
        }).catch(error => {
            console.error('Error al crear usuario:', error);
        });
    });
});


