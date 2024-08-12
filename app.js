const enviarBoton = document.getElementsByClassName("enviar-boton")[0];
const selectorContraste = document.getElementById("selector-alto-contraste");
const estiloAltoContraste = document.getElementById("alto-contraste");

enviarBoton.addEventListener("click", (event) => {
    const form = document.forms["mi-formulario"];
    const nombre = form["nombre"].value.trim();
    const apellido = form["apellido"].value.trim();
    const email = form["email"].value.trim();
    const fechaNacimiento = form["fecha-nacimiento"].value.trim();
    const paisResidencia = form["pais-residencia"].value.trim();

    if (!nombre || !apellido || !email || !fechaNacimiento || !paisResidencia) {
        alert("Rellená todos los campos!");
        event.preventDefault(); // Evita que se envie el formulario si no se completaron todos los campos
        return false;
    } else if (!email.includes("@")) {
        alert("El email debe contener un '@'.");
        event.preventDefault();
        return false;
    } else {
        alert("Formulario enviado exitosamente");
    }
});

selectorContraste.addEventListener("click", () => {
    if (estiloAltoContraste.disabled) {
        estiloAltoContraste.disabled = false;
    } else {
        estiloAltoContraste.disabled = true;
    }
});
