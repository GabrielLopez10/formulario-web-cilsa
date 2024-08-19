const enviarBoton = document.getElementsByClassName("enviar-boton")[0];
const selectorContraste = document.getElementById("selector-alto-contraste");
const estiloAltoContraste = document.getElementById("alto-contraste");

// Implementa el boton para activar el botón de contraste alto.
selectorContraste.addEventListener("click", () => {
    estiloAltoContraste.disabled = !estiloAltoContraste.disabled;
    updateErrorMessageColors();
});

enviarBoton.addEventListener("click", (event) => {
    // Evita que se envie el formulario si no se completaron todos los campos
    event.preventDefault();

    const form = document.forms["mi-formulario"];
    const nombre = form["nombre"].value.trim();
    const apellido = form["apellido"].value.trim();
    const email = form["email"].value.trim();
    const fechaNacimiento = form["fecha-nacimiento"].value.trim();
    const paisResidencia = form["pais-residencia"].value.trim();

    // Limpia los mensajes de errores previos
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());

    let isValid = true;

    const regex = /^[a-zA-Z\s]+$/;

    // Valida cada entrada
    if (!nombre || !regex.test(nombre)) {
        showError(form["nombre"], "Por favor, ingresa un nombre válido (sin números o símbolos).");
        isValid = false;
    }

    if (!apellido || !regex.test(apellido)) {
        showError(form["apellido"], "Por favor, ingresa un apellido válido (sin números o símbolos).");
        isValid = false;
    }

    if (!email) {
        showError(form["email"], "Por favor, ingresa tu email.");
        isValid = false;
    } else if (!email.includes("@")) {
        showError(form["email"], "El email debe contener un '@'");
        isValid = false;
    }

    if (!fechaNacimiento) {
        showError(
            form["fecha-nacimiento"],
            "Por favor, ingresa tu fecha de nacimiento."
        );
        isValid = false;
    }

    if (!paisResidencia || !regex.test(paisResidencia)) {
        showError(
            form["pais-residencia"],
            "Por favor, ingresa un país válido (sin números o símbolos)."
        );
        isValid = false;
    }

    if (!isValid) {
        alert("Por favor, completa todos los campos.");
    } else if (isValid) {
        alert("Formulario enviado exitosamente.");
        form.submit();
    }
});

//Crea un mensaje de error justo después de cada input del formulario en caso de que no haya sido rellenado.
function showError(input, message) {
    const error = document.createElement("span");
    error.className = "error-message";
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);

    updateErrorMessageColors();
}

function updateErrorMessageColors() {
    const errorMessages = document.querySelectorAll(".error-message");
    const color = estiloAltoContraste.disabled ? "red" : "yellow";

    errorMessages.forEach((msg) => {
        msg.style.color = color;
    });
}
