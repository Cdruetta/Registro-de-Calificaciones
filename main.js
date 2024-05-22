let calificaciones = JSON.parse(localStorage.getItem('calificaciones')) || [] ;
let estudiantes;
let i = 1

document.addEventListener('DOMContentLoaded', () => {
    mostrarCalificaciones()
});

function registrarCalificacion() {
    const nombreInput = document.getElementById('nombre').value;
    const calificacionInput = parseFloat(document.getElementById('calificacion').value);


    if (nombreInput.trim() === '') {
        alert('Por favor, ingrese un nombre.');
        return;
    }
    if (!/^[a-zA-Z\s]+$/.test(nombreInput)) {
        alert('El nombre solo debe contener letras .');
        return;
    }

    
    if (isNaN(calificacionInput) || calificacionInput < 1 || calificacionInput > 10) {
        alert('Por favor, ingrese una calificación válida entre 1 y 10.');
        return;
    }
    calificaciones.push({ nombre: nombreInput, calificacion: calificacionInput });

    localStorage.setItem('calificaciones', JSON.stringify(calificaciones));
    mostrarCalificaciones();

    
    document.getElementById('nombre').value = '';
    document.getElementById('calificacion').value = '';
}

function mostrarCalificaciones() {
    const listaCalificaciones = document.getElementById('lista-calificaciones');
    listaCalificaciones.innerHTML = '';
    calificaciones.forEach((calificacion, index) => {
        const li = document.createElement('li');
        li.textContent = `${calificacion.nombre}: ${calificacion.calificacion}`;
        listaCalificaciones.appendChild(li);
    });
}

function calcularPromedio() {
    if (calificaciones.length === 0) {
        alert('No hay calificaciones registradas');
        return;
    }

    const total = calificaciones.reduce((sum, calificacion) => sum + calificacion.calificacion, 0);
    const promedio = total / calificaciones.length;
    alert(`El promedio de las calificaciones es: ${promedio.toFixed(2)}`);
}

function mostrarMayor() {
    if (calificaciones.length === 0) {
        alert('No hay calificaciones registradas');
        return;
    }

    const maxCalificacion = Math.max(...calificaciones.map(calificacion => calificacion.calificacion));
    const estudiantesMax = calificaciones.filter(calificacion => calificacion.calificacion === maxCalificacion);
    const nombresMax = estudiantesMax.map(estudiante => estudiante.nombre);
    
    alert(`La mayor calificación es ${maxCalificacion}: ${nombresMax.join(', ')}`);
}

function mostrarMenor() {
    if (calificaciones.length === 0) {
        alert('No hay calificaciones registradas');
        return;
    }

    const minCalificacion = Math.min(...calificaciones.map(calificacion => calificacion.calificacion));
    const estudiantesMin = calificaciones.filter(calificacion => calificacion.calificacion === minCalificacion);
    const nombresMin = estudiantesMin.map(estudiante => estudiante.nombre);
    
    alert(`La menor calificación es ${minCalificacion}: ${nombresMin.join(', ')}`);
}

function filtrarAprobados() {
    const aprobados = calificaciones.filter(calificacion => calificacion.calificacion >= 6);
    mostrarFiltrados(aprobados, 'Aprobados');
}

function filtrarReprobados() {
    const reprobados = calificaciones.filter(calificacion => calificacion.calificacion < 6);
    mostrarFiltrados(reprobados, 'Reprobados');
}

function mostrarFiltrados(calificacionesFiltradas, titulo) {
    if (calificacionesFiltradas.length === 0) {
        alert(`No hay ${titulo.toLowerCase()}`);
        return;
    }
    const nombres = calificacionesFiltradas.map(calificacion => calificacion.nombre);
    alert(`${titulo}: ${nombres.join(', ')}`);
}

function borrarRegistros() {
    if (confirm('¿Está seguro de que desea borrar todos los registros?')) {
        localStorage.removeItem('calificaciones');
        calificaciones = [];
        mostrarCalificaciones();
        alert('Todos los registros han sido borrados.');
    }
}
