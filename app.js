(() => {
  "use strict";

  const form = document.querySelector(".needs-validation");
  const selectorContraste = document.getElementById("selector-alto-contraste");
  const estiloAltoContraste = document.getElementById("alto-contraste");

  // Implementa el botón para activar el contraste alto.
  selectorContraste.addEventListener("click", () => {
    estiloAltoContraste.disabled = !estiloAltoContraste.disabled;
    updateErrorMessageColors();
  });

  form.addEventListener(
    "submit",
    (event) => {
      // Obtener los valores de los campos del formulario.
      const nombre = form["nombre"].value.trim();
      const apellido = form["apellido"].value.trim();
      const email = form["email"].value.trim();
      const fechaNacimiento = form["fecha-nacimiento"].value.trim();
      const paisResidencia = form["pais-residencia"].value.trim();

      // Expresión regular para validar que el nombre y apellido no tengan números ni símbolos.
      const regex = /^[a-zA-Z\u00C0-\u017F\s]+$/;

      // Validaciones personalizadas para cada campo.
      validateField(
        form["nombre"],
        nombre && regex.test(nombre),
        "Por favor, ingresa un nombre válido (sin números o símbolos)."
      );
      validateField(
        form["apellido"],
        apellido && regex.test(apellido),
        "Por favor, ingresa un apellido válido (sin números o símbolos)."
      );
      validateField(
        form["email"],
        email && email.includes("@"),
        "El email debe ser válido y contener un '@'."
      );
      validateField(
        form["fecha-nacimiento"],
        fechaNacimiento,
        "Por favor, ingresa tu fecha de nacimiento."
      );
      validateField(
        form["pais-residencia"],
        paisResidencia,
        "Por favor, elige un país válido de la lista."
      );

      // Verificar si el formulario es válido.
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
        updateErrorMessageColors();
      } else {
        alert("Formulario enviado exitosamente.");
      }
    },
    false
  );

  // Función para validar campos individualmente.
  function validateField(input, isValid, errorMessage) {
    if (!isValid) {
      input.setCustomValidity(errorMessage);
      showError(input, errorMessage);
    } else {
      input.setCustomValidity("");
      const errorSpan = input.nextElementSibling;
      if (errorSpan && errorSpan.classList.contains("error-message")) {
        errorSpan.remove();
      }
    }
  }

  // Función para mostrar los mensajes de error debajo de cada campo.
  function showError(input, message) {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.textContent = message;
    } else {
      const error = document.createElement("span");
      error.className = "error-message invalid-feedback";
      error.textContent = message;
      input.parentNode.insertBefore(error, input.nextSibling);
    }
  }

  // Función para actualizar los colores de los mensajes de error según el modo de contraste.
  function updateErrorMessageColors() {
    const errorMessages = document.querySelectorAll(".error-message");
    const color = estiloAltoContraste.disabled ? "red" : "yellow";
    errorMessages.forEach((msg) => {
      msg.style.color = color;
    });
  }
})();

// Mostrar en el dropdown pais de residencia sacados del archivo paises.json
fetch("assets/data/paises.json")
  .then((response) => response.json())
  .then((data) => {
    const selectPais = document.getElementById("pais");
    data.forEach((pais) => {
      const option = document.createElement("option");
      option.value = pais.code;
      option.textContent = pais.name;
      selectPais.appendChild(option);
    });
  })
  .catch((error) => console.error("Error al cargar el archivo JSON", error));
