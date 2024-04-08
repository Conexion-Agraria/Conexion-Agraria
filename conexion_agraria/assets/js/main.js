document.addEventListener("DOMContentLoaded", function () {

    var firebaseUser;
    var game;
    const contId = "containerGame";
    const firebase = new FirebaseUser();

    function startGame(numCards) {
        game = new Game(contId, numCards); 
        game.getDataFromFirebase();

        const game2 = new Game("containerGame2", numCards); 
        game2.getDataFromFirebase();
    }

    startGame(20); 

    document.getElementById("btn_start").addEventListener("click", function () {
        document.getElementById("contactForm").reset();

        document.getElementById('cardInfo').style.display = 'none';

        document.getElementById('contactFormSection').style.display = 'block';

        $("#gameModal").modal("show");
    });

    const formUser = document.getElementById("contactForm");
    formUser.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Formulario enviado");

        const nombre = document.getElementById("name").value;
        const telefono = document.getElementById("telefono").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;

        const userData = {
            nombre: nombre,
            telefono: telefono,
            correo: email,
            descripcion: message,
        };

        firebase.setCreateUser(userData).then(() => {
            alert("Mensaje enviado correctamente.");

            $('#gameModal').modal('hide');
        }).catch(error => {
            console.error('Error al crear usuario:', error);
        });
    });
});
