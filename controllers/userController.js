/* These lines of code are importing specific functions and objects from external modules or scripts.
Here's a breakdown of what each import statement is doing: CAMBIAR POR LOS DATOS QUE SE ENVIAN DEL FORMULARIO */
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
import { auth } from "assets/js/firebase.js";

/**Define */
/* These lines of code are defining constants and selecting elements from the DOM using their IDs.
Here's what each line is doing: */


const objForm = document.getElementById('formUser');


/* This code snippet is adding an event listener to the button element with the ID 'btn-password'. When
this button is clicked, the function `FunApp.viewText(idInputPassword)` is executed. */
if(btnPassword)
btnPassword.addEventListener('click', (e) => {
  FunApp.viewText(idInputPassword);
});

/* This code snippet is adding a submit event listener to the `objForm` element, which is likely a form
element in the DOM. When the form is submitted, the following actions are taken: */
if(objForm)
objForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let jsonUser = FunApp.sendData(objForm.id);
  if (typeof jsonUser.password !== 'undefined' && typeof jsonUser.user !== 'undefined') {
    try {
      let pass = jsonUser.password;
      let user = (jsonUser.user).toLowerCase();
      const userCredentials = await createUserWithEmailAndPassword(auth, user, pass).then((data) => {
        //console.log(data);
        alert("User Create");
        FunApp.cleanForm(objForm);
      });
    }
    catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode);
      console.error(errorMessage);
      alert("Validate the data entered");
    }
  } else {
    alert("Validate the data entered");
  }

});
