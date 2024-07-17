document.addEventListener("DOMContentLoaded", function () {
    const firebaseUser = new FirebaseUser();
    const formUser = document.getElementById("contactForm");
    
    if (formUser) {
      formUser.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Formulario enviado");
  
        const nombre = document.getElementById("name").value;
        const telefono = document.getElementById("phone").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
        // Capturar el valor del predioId
        const predioId = document.getElementById("predioId").value;
  
        const userData = {
          nombre: nombre,
          telefono: telefono,
          correo: email,
          descripcion: message,
          predioId: predioId  // Asegurarse de incluir predioId
        };
  
        try {
          await firebaseUser.setCreateUser(userData);
          alert("Mensaje enviado correctamente.");
          $('#gameModal').modal('hide');
        } catch (error) {
          console.error("Error al enviar el mensaje:", error);
          alert("Hubo un error al enviar el mensaje. Por favor, inténtelo de nuevo.");
        }
      });
    }
  });
  