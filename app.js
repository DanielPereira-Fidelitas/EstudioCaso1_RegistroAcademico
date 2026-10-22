
// Lista inicial de estudiantes
const estudiantes = [
    { nombre: "María", apellidos: "Mora Pérez", nota: 90 },
    { nombre: "Pedro", apellidos: "Sibaja López", nota: 60 },
    { nombre: "Marco", apellidos: "Rojas Castro", nota: 78 }
];

// Función para mostrar los estudiantes en la tabla
function mostrarEstudiantes() {
    const tabla = document.querySelector("#tablaEstudiantes");

    tabla.innerHTML = "";

    estudiantes.forEach(estudiante => {
        const fila = document.createElement("tr");

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = estudiante.nombre;

        const celdaApellidos = document.createElement("td");
        celdaApellidos.textContent = estudiante.apellidos;

        const celdaNota = document.createElement("td");
        celdaNota.textContent = estudiante.nota;

        // Aplicar colores según la nota
        if (estudiante.nota >= 80) {
            celdaNota.classList.add("nota-alta");
        } else if (estudiante.nota < 65) {
            celdaNota.classList.add("nota-baja");
        }

        fila.append(celdaNombre, celdaApellidos, celdaNota);
        tabla.append(fila);
    });
}

// Función para calcular el resumen de calificaciones
function actualizarResumen() {
    let mejorEstudiante = estudiantes[0];
    let notaMinima = estudiantes[0].nota;
    let sumaNotas = 0;

    estudiantes.forEach(estudiante => {
        sumaNotas += estudiante.nota;

        if (estudiante.nota > mejorEstudiante.nota) {
            mejorEstudiante = estudiante;
        }

        if (estudiante.nota < notaMinima) {
            notaMinima = estudiante.nota;
        }
    });

    const promedio = sumaNotas / estudiantes.length;

    // Mostrar los resultados en la página
    document.querySelector("#mejorEstudiante").textContent =
        mejorEstudiante.nombre + " " + mejorEstudiante.apellidos;

    document.querySelector("#notaMayor").textContent =
        mejorEstudiante.nota;

    document.querySelector("#promedioNotas").textContent =
        Number(promedio.toFixed(2));

    document.querySelector("#notaMinima").textContent =
        notaMinima;
}

// Obtener el formulario
const formulario = document.querySelector("#formEstudiantes");

// Evento para registrar estudiantes
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.querySelector("#nombre").value.trim();
    const apellidos = document.querySelector("#apellidos").value.trim();
    const notaTexto = document.querySelector("#nota").value.trim();
    const mensajeError = document.querySelector("#mensajeError");

    // Validar campos obligatorios
    if (nombre === "" || apellidos === "" || notaTexto === "") {
        mensajeError.textContent = "Todos los campos son obligatorios.";
        return;
    }

    const nota = Number(notaTexto);

    // Validar que la nota sea correcta
    if (isNaN(nota) || nota < 0 || nota > 100) {
        mensajeError.textContent = "La nota debe ser un número entre 0 y 100.";
        return;
    }

    // Agregar el estudiante al arreglo
    const nuevoEstudiante = {
        nombre: nombre,
        apellidos: apellidos,
        nota: nota
    };

    estudiantes.push(nuevoEstudiante);

    // Actualizar la tabla y el resumen
    mostrarEstudiantes();
    actualizarResumen();

    // Limpiar el formulario y los mensajes
    formulario.reset();
    mensajeError.textContent = "";
});

// Mostrar la información inicial
mostrarEstudiantes();
actualizarResumen();
