document.addEventListener('DOMContentLoaded', initGestion);

const perfilExistente = document.querySelector('#perfil-existente');
const formularioWrapper = document.querySelector('#formulario-wrapper');
const formPerfil = document.querySelector('#form-perfil');
const perfilNombreDisplay = document.querySelector('#perfil-nombre-display');
const perfilEmailDisplay = document.querySelector('#perfil-email-display');
const perfilFechaDisplay = document.querySelector('#perfil-fecha-display');
const perfilAvatar = document.querySelector('#perfil-avatar');
const btnEditarPerfil = document.querySelector('#btn-editar-perfil');
const btnResetear = document.querySelector('#btn-resetear');
const btnConfirmarEliminar = document.querySelector('#btn-confirmar-eliminar');
const btnCancelarEliminar = document.querySelector('#btn-cancelar-eliminar');
const modalEliminar = document.querySelector('#modal-eliminar');
const contadorMotivo = document.querySelector('#contador-motivo');
const resumenFavoritos = document.querySelector('#resumen-favoritos');
const resumenSolicitudes = document.querySelector('#resumen-solicitudes');
const listaSolicitudes = document.querySelector('#lista-solicitudes');
const perfilNombre = document.querySelector('#perfil-nombre');
const perfilEmail = document.querySelector('#perfil-email');
const perfilTelefono = document.querySelector('#perfil-telefono');
const perfilProvincia = document.querySelector('#perfil-provincia');
const perfilVivienda = document.querySelector('#perfil-vivienda');
const perfilPersonas = document.querySelector('#perfil-personas');
const perfilExperiencia = document.querySelector('#perfil-experiencia');
const perfilMotivo = document.querySelector('#perfil-motivo');
const formMensaje = document.querySelector('#form-mensaje');
const errorNombre = document.querySelector('#error-nombre');
const errorEmail = document.querySelector('#error-email');
const errorTelefono = document.querySelector('#error-telefono');
const errorProvincia = document.querySelector('#error-provincia');
const errorVivienda = document.querySelector('#error-vivienda');
const errorPersonas = document.querySelector('#error-personas');
const errorMotivo = document.querySelector('#error-motivo');

const FALLBACK_MASCOTAS_GESTION = [
  {
    "id": 1,
    "nombre": "Max",
    "especie": "Perro",
    "edad": "Cachorro",
    "sexo": "Macho",
    "tamaño": "Mediano",
    "temperamento": "Activo",
    "estado": "Disponible",
    "descripcion": "Juguetón, cariñoso y listo para acompañarte en sus primeras aventuras.",
    "foto": "images/mascotas/max.jpg"
  },
  {
    "id": 2,
    "nombre": "Luna",
    "especie": "Gato",
    "edad": "Adulto",
    "sexo": "Hembra",
    "tamaño": "Pequeño",
    "temperamento": "Tranquilo",
    "estado": "Urgente",
    "descripcion": "Luna disfruta del sol, los mimos y los rincones cálidos del hogar.",
    "foto": "images/mascotas/luna.jpg"
  },
  {
    "id": 3,
    "nombre": "Bruno",
    "especie": "Perro",
    "edad": "Joven",
    "sexo": "Macho",
    "tamaño": "Grande",
    "temperamento": "Amigable",
    "estado": "Reservado",
    "descripcion": "Gran compañero para familias activas que disfruten paseos largos.",
    "foto": "images/mascotas/bruno.jpg"
  },
  {
    "id": 4,
    "nombre": "Mía",
    "especie": "Gato",
    "edad": "Cachorro",
    "sexo": "Hembra",
    "tamaño": "Pequeño",
    "temperamento": "Juguetón",
    "estado": "Disponible",
    "descripcion": "Curiosa y dulce, Mía se adapta rápido y ama saltar por los muebles.",
    "foto": "images/mascotas/mia.jpg"
  },
  {
    "id": 5,
    "nombre": "Toby",
    "especie": "Perro",
    "edad": "Adulto",
    "sexo": "Macho",
    "tamaño": "Mediano",
    "temperamento": "Independiente",
    "estado": "Disponible",
    "descripcion": "Aprecio por los momentos tranquilos y un gran amigo para hogares serenos.",
    "foto": "images/mascotas/toby.jpg"
  },
  {
    "id": 6,
    "nombre": "Kiara",
    "especie": "Gato",
    "edad": "Joven",
    "sexo": "Hembra",
    "tamaño": "Pequeño",
    "temperamento": "Amigable",
    "estado": "Disponible",
    "descripcion": "Kiara adora jugar con ovillos y disfrutar la compañía de personas amables.",
    "foto": "images/mascotas/kiara.jpg"
  },
  {
    "id": 7,
    "nombre": "Rocky",
    "especie": "Perro",
    "edad": "Adulto",
    "sexo": "Macho",
    "tamaño": "Grande",
    "temperamento": "Activo",
    "estado": "Urgente",
    "descripcion": "Necesita espacio y cariño; ideal para quien le dedique tiempo y paseos.",
    "foto": "images/mascotas/rocky.jpg"
  },
  {
    "id": 8,
    "nombre": "Nala",
    "especie": "Gato",
    "edad": "Adulto",
    "sexo": "Hembra",
    "tamaño": "Mediano",
    "temperamento": "Tranquilo",
    "estado": "Reservado",
    "descripcion": "Nala es independiente, suave y necesita un hogar con paciencia y amor.",
    "foto": "images/mascotas/nala.jpg"
  },
  {
    "id": 9,
    "nombre": "Bella",
    "especie": "Perro",
    "edad": "Cachorro",
    "sexo": "Hembra",
    "tamaño": "Pequeño",
    "temperamento": "Juguetón",
    "estado": "Disponible",
    "descripcion": "Bella es dulce, llena de energía y perfecta para una familia con niños.",
    "foto": "images/mascotas/bella.jpg"
  },
  {
    "id": 10,
    "nombre": "Simba",
    "especie": "Gato",
    "edad": "Joven",
    "sexo": "Macho",
    "tamaño": "Mediano",
    "temperamento": "Activo",
    "estado": "Disponible",
    "descripcion": "Simba es curioso, cariñoso y disfruta explorar cada rincón de la casa.",
    "foto": "images/mascotas/simba.jpg"
  },
  {
    "id": 11,
    "nombre": "Coco",
    "especie": "Perro",
    "edad": "Adulto",
    "sexo": "Macho",
    "tamaño": "Grande",
    "temperamento": "Amigable",
    "estado": "Reservado",
    "descripcion": "Coco se lleva bien con personas y otros animales, ideal para un hogar activo.",
    "foto": "images/mascotas/coco.jpg"
  },
  {
    "id": 12,
    "nombre": "Milo",
    "especie": "Gato",
    "edad": "Cachorro",
    "sexo": "Macho",
    "tamaño": "Pequeño",
    "temperamento": "Juguetón",
    "estado": "Urgente",
    "descripcion": "Milo es enérgico, curioso y listo para dar amor a su nuevo hogar.",
    "foto": "images/mascotas/milo.jpg"
  }
];

let perfilUsuario = null;
let solicitudes = [];
let comentarios = [];
let mascotasParaComentarios = [];

function initGestion() {
    cargarPerfilUsuario();
    cargarSolicitudes();
    actualizarResumenActividad();
    crearModuloComentarios();
    configurarEventosPerfil();
    cargarMascotasParaComentarios();
}

function configurarEventosPerfil() {
    formPerfil.addEventListener('submit', manejarEnvioPerfil);
    btnEditarPerfil.addEventListener('click', () => mostrarFormulario(true));
    btnResetear.addEventListener('click', limpiarFormulario);
    btnConfirmarEliminar.addEventListener('click', confirmarEliminarPerfil);
    btnCancelarEliminar.addEventListener('click', () => modalEliminar.hidden = true);
    contadorMotivo.textContent = perfilMotivo.value.length;
    perfilMotivo.addEventListener('input', actualizarContadorMotivo);
    perfilNombre.addEventListener('input', () => errorNombre.textContent = '');
    perfilEmail.addEventListener('input', () => errorEmail.textContent = '');
    perfilTelefono.addEventListener('input', () => errorTelefono.textContent = '');
    perfilProvincia.addEventListener('change', () => errorProvincia.textContent = '');
    perfilVivienda.addEventListener('change', () => errorVivienda.textContent = '');
    perfilPersonas.addEventListener('change', () => errorPersonas.textContent = '');
    perfilMotivo.addEventListener('input', () => errorMotivo.textContent = '');
}

function cargarPerfilUsuario() {
    const perfilGuardado = localStorage.getItem('perfilUsuario');
    perfilUsuario = perfilGuardado ? JSON.parse(perfilGuardado) : null;

    if (perfilUsuario) {
        mostrarPerfilExistente(perfilUsuario);
    } else {
        mostrarFormulario(false);
    }
}

function mostrarPerfilExistente(perfil) {
    perfilExistente.hidden = false;
    formularioWrapper.hidden = true;
    perfilNombreDisplay.textContent = perfil.nombre || '–';
    perfilEmailDisplay.textContent = perfil.correo || '–';
    perfilFechaDisplay.textContent = perfil.fecha || new Date().toISOString().slice(0, 10);
    perfilAvatar.textContent = calcularIniciales(perfil.nombre);
}

function mostrarFormulario(conservarDatos = false) {
    perfilExistente.hidden = true;
    formularioWrapper.hidden = false;

    if (conservarDatos && perfilUsuario) {
        llenarFormulario(perfilUsuario);
    } else if (!conservarDatos) {
        formPerfil.reset();
        limpiarErroresPerfil();
        contadorMotivo.textContent = '0';
    }
}

function calcularIniciales(nombre) {
    if (!nombre) {
        return '👤';
    }

    return nombre.split(' ').map((palabra) => palabra.charAt(0)).join('').slice(0, 2).toUpperCase();
}

function llenarFormulario(perfil) {
    perfilNombre.value = perfil.nombre || '';
    perfilEmail.value = perfil.correo || '';
    perfilTelefono.value = perfil.telefono || '';
    perfilProvincia.value = perfil.provincia || '';
    perfilVivienda.value = perfil.vivienda || '';
    perfilPersonas.value = perfil.personas || '';
    perfilExperiencia.value = perfil.experiencia || 'ninguna';
    perfilMotivo.value = perfil.motivo || '';
    actualizarContadorMotivo();

    const radioMascotas = document.querySelectorAll('input[name="mascotas-actuales"]');
    radioMascotas.forEach((radio) => {
        radio.checked = radio.value === (perfil.mascotasActuales || 'no');
    });

    const checkboxes = document.querySelectorAll('input[name="pref-especie"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = Array.isArray(perfil.preferencias) && perfil.preferencias.includes(checkbox.value);
    });
}

function actualizarContadorMotivo() {
    contadorMotivo.textContent = perfilMotivo.value.length.toString();
}

function manejarEnvioPerfil(event) {
    event.preventDefault();
    limpiarErroresPerfil();

    const perfil = capturarDatosPerfil();
    const valido = validarPerfil(perfil);

    if (!valido) {
        mostrarMensaje('Corrigí los campos marcados antes de guardar.', false);
        return;
    }

    perfil.fecha = new Date().toISOString().slice(0, 10);
    localStorage.setItem('perfilUsuario', JSON.stringify(perfil));
    perfilUsuario = perfil;
    mostrarPerfilExistente(perfil);
    actualizarResumenActividad();
    mostrarMensaje('Perfil guardado con éxito.', true);
}

function capturarDatosPerfil() {
    const mascotasActuales = document.querySelector('input[name="mascotas-actuales"]:checked');
    const preferencias = Array.from(document.querySelectorAll('input[name="pref-especie"]:checked')).map((input) => input.value);

    return {
        nombre: perfilNombre.value.trim(),
        correo: perfilEmail.value.trim(),
        telefono: perfilTelefono.value.trim(),
        provincia: perfilProvincia.value,
        vivienda: perfilVivienda.value,
        personas: perfilPersonas.value,
        mascotasActuales: mascotasActuales ? mascotasActuales.value : '',
        experiencia: perfilExperiencia.value,
        preferencias,
        motivo: perfilMotivo.value.trim()
    };
}

function validarPerfil(perfil) {
    let valido = true;

    if (!perfil.nombre || perfil.nombre.length < 3) {
        errorNombre.textContent = 'Ingresá un nombre válido de al menos 3 caracteres.';
        valido = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(perfil.correo)) {
        errorEmail.textContent = 'Ingresá un correo electrónico válido.';
        valido = false;
    }

    if (!/^\d{8}$/.test(perfil.telefono)) {
        errorTelefono.textContent = 'Ingresá un teléfono válido de 8 dígitos.';
        valido = false;
    }

    if (!perfil.provincia) {
        errorProvincia.textContent = 'Seleccioná tu provincia.';
        valido = false;
    }

    if (!perfil.vivienda) {
        errorVivienda.textContent = 'Seleccioná el tipo de vivienda.';
        valido = false;
    }

    if (!perfil.personas) {
        errorPersonas.textContent = 'Seleccioná la cantidad de personas en el hogar.';
        valido = false;
    }

    if (!perfil.preferencias.length) {
        const errorPreferencias = document.createElement('span');
        errorPreferencias.className = 'campo-error';
        errorPreferencias.textContent = 'Seleccioná al menos una especie preferida.';
        const grupoPreferencias = document.querySelector('div[role="group"][aria-label="Preferencia de especie"]');
        if (grupoPreferencias && !grupoPreferencias.querySelector('.campo-error')) {
            grupoPreferencias.appendChild(errorPreferencias);
        }
        valido = false;
    }

    if (!perfil.motivo || perfil.motivo.length < 10) {
        errorMotivo.textContent = 'Ingresá al menos 10 caracteres en el motivo.';
        valido = false;
    }

    return valido;
}

function limpiarErroresPerfil() {
    errorNombre.textContent = '';
    errorEmail.textContent = '';
    errorTelefono.textContent = '';
    errorProvincia.textContent = '';
    errorVivienda.textContent = '';
    errorPersonas.textContent = '';
    errorMotivo.textContent = '';
    const errorPreferencias = document.querySelector('div[role="group"][aria-label="Preferencia de especie"] .campo-error');
    if (errorPreferencias) {
        errorPreferencias.remove();
    }
}

function mostrarMensaje(texto, exito) {
    if (!formMensaje) {
        return;
    }

    formMensaje.hidden = false;
    formMensaje.textContent = texto;
    formMensaje.className = exito ? 'form-mensaje form-mensaje--exito' : 'form-mensaje form-mensaje--error';
    setTimeout(() => {
        if (formMensaje) {
            formMensaje.hidden = true;
        }
    }, 4200);
}

function limpiarFormulario(event) {
    event.preventDefault();
    formPerfil.reset();
    limpiarErroresPerfil();
    contadorMotivo.textContent = '0';
}

function confirmarEliminarPerfil() {
    localStorage.removeItem('perfilUsuario');
    perfilUsuario = null;
    modalEliminar.hidden = true;
    mostrarFormulario(false);
    actualizarResumenActividad();
    mostrarMensaje('Perfil eliminado correctamente.', true);
}

function cargarSolicitudes() {
    solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    renderizarSolicitudes();
    actualizarResumenActividad();
}

function renderizarSolicitudes() {
    listaSolicitudes.innerHTML = '';

    if (!solicitudes.length) {
        listaSolicitudes.innerHTML = '<p class="aside-vacio">Todavía no enviaste ninguna solicitud.</p>';
        return;
    }

    solicitudes.forEach((solicitud) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'solicitud-card';

        const texto = document.createElement('p');
        texto.innerHTML = `<strong>Mascota:</strong> ${solicitud.mascotaNombre} <br> <strong>Fecha:</strong> ${solicitud.fecha} <br> <strong>Vivienda:</strong> ${solicitud.vivienda}`;

        const botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.className = 'btn-eliminar-solicitud';
        botonEliminar.textContent = 'Eliminar solicitud';
        botonEliminar.addEventListener('click', () => eliminarSolicitud(solicitud.idSolicitud));

        tarjeta.appendChild(texto);
        tarjeta.appendChild(botonEliminar);
        listaSolicitudes.appendChild(tarjeta);
    });
}

function eliminarSolicitud(idSolicitud) {
    solicitudes = solicitudes.filter((solicitud) => solicitud.idSolicitud !== idSolicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
    renderizarSolicitudes();
    actualizarResumenActividad();
}

function actualizarResumenActividad() {
    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    const solicitudesGuardadas = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    resumenFavoritos.textContent = favoritos.length.toString();
    resumenSolicitudes.textContent = solicitudesGuardadas.length.toString();
}

function crearModuloComentarios() {
    const gestionAside = document.querySelector('.gestion-aside');
    if (!gestionAside) {
        return;
    }

    const comentarioCard = document.createElement('div');
    comentarioCard.className = 'aside-card';
    comentarioCard.innerHTML = `
        <h3>Comentarios y experiencias</h3>
        <form id="form-comentarios" novalidate>
            <div class="campo-grupo">
                <label for="comentario-nombre">Nombre *</label>
                <input type="text" id="comentario-nombre" placeholder="Ej: Juan Pérez" autocomplete="name">
                <span class="campo-error" id="error-comentario-nombre"></span>
            </div>
            <div class="campo-grupo">
                <label for="comentario-mascota">Mascota *</label>
                <select id="comentario-mascota"></select>
                <span class="campo-error" id="error-comentario-mascota"></span>
            </div>
            <div class="campo-grupo">
                <label for="comentario-calificacion">Calificación *</label>
                <select id="comentario-calificacion">
                    <option value="">Seleccioná</option>
                    <option value="5">5 estrellas</option>
                    <option value="4">4 estrellas</option>
                    <option value="3">3 estrellas</option>
                    <option value="2">2 estrellas</option>
                    <option value="1">1 estrella</option>
                </select>
            </div>
            <div class="campo-grupo">
                <label for="comentario-texto">Comentario *</label>
                <textarea id="comentario-texto" rows="3" placeholder="Contanos de tu experiencia..." maxlength="500"></textarea>
                <span class="campo-error" id="error-comentario-texto"></span>
            </div>
            <button type="submit" class="btn-primary">Publicar comentario</button>
        </form>
        <div id="comentarios-lista" aria-live="polite"></div>
    `;

    const solicitudCard = listaSolicitudes.closest('.aside-card');
    if (solicitudCard && solicitudCard.parentNode) {
        solicitudCard.parentNode.insertBefore(comentarioCard, solicitudCard.nextSibling);
    } else {
        gestionAside.appendChild(comentarioCard);
    }

    const formComentarios = comentarioCard.querySelector('#form-comentarios');
    formComentarios.addEventListener('submit', manejarComentario);
    comentarioCard.querySelector('#comentario-nombre').addEventListener('input', () => limpiarError('error-comentario-nombre'));
    comentarioCard.querySelector('#comentario-mascota').addEventListener('change', () => limpiarError('error-comentario-mascota'));
    comentarioCard.querySelector('#comentario-texto').addEventListener('input', () => limpiarError('error-comentario-texto'));

    cargarComentarios();
    poblarMascotaSelect();
}

function cargarComentarios() {
    comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
    renderizarComentarios();
}

function renderizarComentarios() {
    const comentariosLista = document.querySelector('#comentarios-lista');
    if (!comentariosLista) {
        return;
    }

    comentariosLista.innerHTML = '';

    if (!comentarios.length) {
        comentariosLista.innerHTML = '<p class="aside-vacio">Todavía no hay comentarios publicados.</p>';
        return;
    }

    comentarios.forEach((comentario) => {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'comentario-card';

        const header = document.createElement('div');
        header.className = 'comentario-header';
        header.innerHTML = `<strong>${comentario.nombre}</strong> comentó sobre <em>${comentario.mascota}</em> - ${comentario.fecha}`;

        const estrellas = document.createElement('p');
        estrellas.className = 'comentario-estrellas';
        estrellas.textContent = 'Calificación: ' + '★'.repeat(comentario.calificacion) + '☆'.repeat(5 - comentario.calificacion);

        const texto = document.createElement('p');
        texto.textContent = comentario.comentario;

        const botonEliminar = document.createElement('button');
        botonEliminar.type = 'button';
        botonEliminar.className = 'btn-eliminar-comentario';
        botonEliminar.textContent = 'Eliminar comentario';
        botonEliminar.addEventListener('click', () => eliminarComentario(comentario.id));

        tarjeta.appendChild(header);
        tarjeta.appendChild(estrellas);
        tarjeta.appendChild(texto);
        tarjeta.appendChild(botonEliminar);
        comentariosLista.appendChild(tarjeta);
    });
}

function manejarComentario(event) {
    event.preventDefault();
    const nombreInput = document.querySelector('#comentario-nombre');
    const mascotaSelect = document.querySelector('#comentario-mascota');
    const calificacionSelect = document.querySelector('#comentario-calificacion');
    const textoInput = document.querySelector('#comentario-texto');

    const nombre = nombreInput.value.trim();
    const mascota = mascotaSelect.value;
    const calificacion = Number(calificacionSelect.value);
    const comentarioTexto = textoInput.value.trim();

    let valido = true;
    if (!nombre) {
        mostrarError('error-comentario-nombre', 'Ingresá tu nombre.');
        valido = false;
    }
    if (!mascota) {
        mostrarError('error-comentario-mascota', 'Seleccioná una mascota.');
        valido = false;
    }
    if (comentarioTexto.length < 10) {
        mostrarError('error-comentario-texto', 'El comentario debe tener al menos 10 caracteres.');
        valido = false;
    }

    if (!valido) {
        return;
    }

    const nuevoComentario = {
        id: Date.now(),
        nombre,
        mascota,
        calificacion: calificacion || 5,
        comentario: comentarioTexto,
        fecha: new Date().toISOString().slice(0, 10)
    };

    comentarios.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    renderizarComentarios();
    event.target.reset();
}

function eliminarComentario(id) {
    comentarios = comentarios.filter((comentario) => comentario.id !== id);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
    renderizarComentarios();
}

function mostrarError(id, texto) {
    const error = document.querySelector(`#${id}`);
    if (error) {
        error.textContent = texto;
    }
}

function limpiarError(id) {
    const error = document.querySelector(`#${id}`);
    if (error) {
        error.textContent = '';
    }
}

async function cargarJSONConFallback(url, fallback) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo cargar: ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.warn(`Fetch falló para ${url}, usando datos de respaldo.`, error);
        return fallback;
    }
}

async function cargarMascotasParaComentarios() {
    mascotasParaComentarios = await cargarJSONConFallback('data/mascotas.json', FALLBACK_MASCOTAS_GESTION);
    poblarMascotaSelect();
}

function poblarMascotaSelect() {
    const mascotaSelect = document.querySelector('#comentario-mascota');
    if (!mascotaSelect) {
        return;
    }

    mascotaSelect.innerHTML = '<option value="">Seleccioná una mascota</option>';

    if (mascotasParaComentarios.length) {
        mascotasParaComentarios.forEach((mascota) => {
            const option = document.createElement('option');
            option.value = mascota.nombre;
            option.textContent = mascota.nombre;
            mascotaSelect.appendChild(option);
        });
    } else {
        ['Max', 'Luna', 'Kiara', 'Simba', 'Nala', 'Bruno'].forEach((nombre) => {
            const option = document.createElement('option');
            option.value = nombre;
            option.textContent = nombre;
            mascotaSelect.appendChild(option);
        });
    }
}
