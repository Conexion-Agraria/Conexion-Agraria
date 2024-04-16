document.addEventListener("DOMContentLoaded", function () {

    // Variables globales
    var firebaseUser;
    var game;
    const contId = "containerGame";
    const firebase = new FirebaseUser();

    // Define la función startGame() antes de la primera invocación
    function startGame(numCards) {
        // Pasa el segundo argumento (numCards) al constructor de la clase Game
        game = new Game(contId, numCards); // Aquí debes pasar el valor deseado para numCards
        game.getDataFromFirebase();
    }

    // Iniciar el juego automáticamente al cargar la página
    startGame(20); // Por ejemplo, aquí se pasa 20 como el valor de numCards

    // Añadir evento click al botón "Contactanos"
    document.getElementById("btn_start").addEventListener("click", function () {
        // Limpiar el formulario al abrir el modal de contacto
        document.getElementById("contactForm").reset();

        // Ocultar la información de la tarjeta
        document.getElementById('cardInfo').style.display = 'none';

        // Mostrar el formulario
        document.getElementById('contactFormSection').style.display = 'block';

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


  