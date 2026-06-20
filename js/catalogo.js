const FALLBACK_MASCOTAS_CATALOGO = [
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

let mascotasCatalogo = [];
let favoritos = [];
let adoptados = new Set();

const FALLBACK_HISTORIAS_CATALOGO = [
  { "mascota": "Luna" },
  { "mascota": "Bruno" },
  { "mascota": "Kiara" },
  { "mascota": "Rocky" },
  { "mascota": "Mía" },
  { "mascota": "Simba" }
];

const gridMascotas = document.querySelector('#grid-mascotas');
const campoBusqueda = document.querySelector('#campo-busqueda');
const filtroEspecie = document.getElementById('filtro-especie');
const filtroTamano = document.getElementById('filtro-tamaño');
const filtroTemperamento = document.getElementById('filtro-temperamento');
const filtroVista = document.getElementById('filtro-vista');
const btnLimpiar = document.querySelector('#btn-limpiar');
const toast = document.querySelector('#toast');
const modalAdopcion = document.querySelector('#modal-adopcion');
const modalCerrar = document.querySelector('#modal-cerrar');
const btnCancelarModal = document.querySelector('#btn-cancelar-modal');
const formAdopcion = document.querySelector('#form-adopcion');
const inputMascotaId = document.querySelector('#adopcion-mascota-id');
const inputMascotaNombre = document.querySelector('#adopcion-mascota-nombre');
const inputNombre = document.querySelector('#adopcion-nombre');
const inputEmail = document.querySelector('#adopcion-email');
const inputTelefono = document.querySelector('#adopcion-telefono');
const inputVivienda = document.querySelector('#adopcion-vivienda');
const inputMensaje = document.querySelector('#adopcion-mensaje');
const errorNombre = document.querySelector('#error-adopcion-nombre');
const errorEmail = document.querySelector('#error-adopcion-email');
const errorTelefono = document.querySelector('#error-adopcion-telefono');
const errorVivienda = document.querySelector('#error-adopcion-vivienda');
const modalConfirmacion = document.querySelector('#modal-confirmacion');
const confirmacionTexto = document.querySelector('#confirmacion-texto');
const btnCerrarConfirmacion = document.querySelector('#btn-cerrar-confirmacion');
const statFavoritos = document.querySelector('#stat-favoritos');

document.addEventListener('DOMContentLoaded', async () => {
    await cargarHistoriasAdoptadas();
    await cargarMascotas();
    cargarFavoritos();
    configurarEventosCatalogo();
});

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

async function cargarMascotas() {
    mascotasCatalogo = await cargarJSONConFallback('data/mascotas.json', FALLBACK_MASCOTAS_CATALOGO);
    renderizarMascotas(mascotasCatalogo);
}

async function cargarHistoriasAdoptadas() {
    const historias = await cargarJSONConFallback('data/historias.json', FALLBACK_HISTORIAS_CATALOGO);
    adoptados = new Set(historias.map((historia) => historia.mascota.toLowerCase()));
}

function configurarEventosCatalogo() {
    campoBusqueda.addEventListener('input', aplicarFiltros);
    filtroEspecie.addEventListener('change', aplicarFiltros);
    filtroTamano.addEventListener('change', aplicarFiltros);
    filtroTemperamento.addEventListener('change', aplicarFiltros);
    filtroVista.addEventListener('change', aplicarFiltros);
    btnLimpiar.addEventListener('click', limpiarFiltros);

    modalCerrar.addEventListener('click', cerrarModalAdopcion);
    btnCancelarModal.addEventListener('click', cerrarModalAdopcion);
    btnCerrarConfirmacion.addEventListener('click', cerrarConfirmacion);

    formAdopcion.addEventListener('submit', manejarEnvioAdopcion);
    inputNombre.addEventListener('input', () => errorNombre.textContent = '');
    inputEmail.addEventListener('input', () => errorEmail.textContent = '');
    inputTelefono.addEventListener('input', () => errorTelefono.textContent = '');
    inputVivienda.addEventListener('change', () => errorVivienda.textContent = '');

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (!modalAdopcion.hidden) {
                cerrarModalAdopcion();
            }
            if (!detallesModal.hidden) {
                cerrarModalDetalles();
            }
        }
    });
}

function cargarFavoritos() {
    favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    actualizarEstadisticasFavoritos();
}

function guardarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function actualizarEstadisticasFavoritos() {
    const cantidad = favoritos.length;
    if (statFavoritos) {
        statFavoritos.textContent = `❤️ ${cantidad} favoritos`;
    }
}

function aplicarFiltros() {
    const textoBusqueda = campoBusqueda.value.trim().toLowerCase();
    const especie = filtroEspecie.value;
    const tamano = filtroTamano.value;
    const temperamento = filtroTemperamento.value;
    const vista = filtroVista.value;

    const mascotasFiltradas = mascotasCatalogo.filter((mascota) => {
        const nombreValido = mascota.nombre.toLowerCase().includes(textoBusqueda) || mascota.descripcion.toLowerCase().includes(textoBusqueda);
        const especieValida = especie === 'todos' || mascota.especie.toLowerCase() === especie;
        const tamanoValido = tamano === 'todos' || mascota.tamaño.toLowerCase() === tamano;
        const temperamentoValido = temperamento === 'todos' || mascota.temperamento.toLowerCase() === temperamento;
        const vistaFavoritos = vista !== 'favoritos' || favoritos.some((favorito) => favorito.id === mascota.id);
        const vistaUrgente = vista !== 'urgentes' || mascota.estado.toLowerCase() === 'urgente';

        return nombreValido && especieValida && tamanoValido && temperamentoValido && vistaFavoritos && vistaUrgente;
    });

    renderizarMascotas(mascotasFiltradas);
}

function limpiarFiltros(event) {
    event.preventDefault();
    campoBusqueda.value = '';
    filtroEspecie.value = 'todos';
    filtroTamano.value = 'todos';
    filtroTemperamento.value = 'todos';
    filtroVista.value = 'todos';
    renderizarMascotas(mascotasCatalogo);
}

function renderizarMascotas(lista) {
    gridMascotas.innerHTML = '';

    if (!Array.isArray(lista) || lista.length === 0) {
        gridMascotas.innerHTML = '<p class="estado-vacio">No se encontraron mascotas que coincidan con tu búsqueda.</p>';
        return;
    }

    lista.forEach((mascota) => {
        const tarjeta = crearTarjetaMascota(mascota);
        gridMascotas.appendChild(tarjeta);
    });
}

function crearTarjetaMascota(mascota) {
    const article = document.createElement('article');
    article.classList.add('caso-card');

    const imagen = document.createElement('img');
    imagen.classList.add('caso-card-img');
    imagen.src = mascota.foto;
    imagen.alt = `Foto de ${mascota.nombre}`;
    imagen.onerror = () => imagen.classList.add('caso-card-img--fallback');

    const body = document.createElement('div');
    body.classList.add('caso-card-body');

    const titulo = document.createElement('h3');
    titulo.textContent = mascota.nombre;

    const especie = document.createElement('p');
    especie.innerHTML = `<strong>Especie:</strong> ${mascota.especie}`;

    const edad = document.createElement('p');
    edad.innerHTML = `<strong>Edad:</strong> ${mascota.edad}`;

    const sexo = document.createElement('p');
    sexo.innerHTML = `<strong>Sexo:</strong> ${mascota.sexo}`;

    const tamano = document.createElement('p');
    tamano.innerHTML = `<strong>Tamaño:</strong> ${mascota.tamaño}`;

    const temperamento = document.createElement('p');
    temperamento.innerHTML = `<strong>Temperamento:</strong> ${mascota.temperamento}`;

    const estado = document.createElement('p');
    const yaAdoptado = adoptados.has(mascota.nombre.toLowerCase());
    estado.innerHTML = `<strong>Estado:</strong> ${yaAdoptado ? 'Adoptado' : mascota.estado}`;
    if (yaAdoptado) {
        estado.classList.add('estado-adoptado');
    }

    const descripcion = document.createElement('p');
    descripcion.textContent = mascota.descripcion;

    const botones = document.createElement('div');
    botones.classList.add('caso-card-botones');

    const btnDetalles = document.createElement('button');
    btnDetalles.type = 'button';
    btnDetalles.classList.add('btn-primary');
    btnDetalles.textContent = 'Ver detalles';
    btnDetalles.addEventListener('click', () => abrirModalDetalles(mascota));

    const btnFavorito = document.createElement('button');
    btnFavorito.type = 'button';
    btnFavorito.classList.add('btn-outline');
    btnFavorito.textContent = esFavorito(mascota.id) ? 'Eliminar favorito' : 'Favorito';
    btnFavorito.addEventListener('click', () => {
        alternarFavorito(mascota);
        aplicarFiltros();
    });

    const btnSolicitar = document.createElement('button');
    btnSolicitar.type = 'button';
    btnSolicitar.classList.add('btn-primary');
    btnSolicitar.textContent = 'Solicitar adopción';
    btnSolicitar.addEventListener('click', () => abrirModalAdopcion(mascota));

    botones.appendChild(btnDetalles);
    botones.appendChild(btnFavorito);
    botones.appendChild(btnSolicitar);

    body.appendChild(titulo);
    body.appendChild(especie);
    body.appendChild(edad);
    body.appendChild(sexo);
    body.appendChild(tamano);
    body.appendChild(temperamento);
    body.appendChild(estado);
    body.appendChild(descripcion);
    body.appendChild(botones);

    article.appendChild(imagen);
    article.appendChild(body);

    return article;
}

function esFavorito(id) {
    return favoritos.some((favorito) => favorito.id === id);
}

function alternarFavorito(mascota) {
    const indice = favoritos.findIndex((favorito) => favorito.id === mascota.id);
    if (indice >= 0) {
        favoritos.splice(indice, 1);
        showToast(`${mascota.nombre} eliminado de favoritos.`);
    } else {
        favoritos.push({ id: mascota.id, nombre: mascota.nombre });
        showToast(`${mascota.nombre} agregado a favoritos.`);
    }
    guardarFavoritos();
    actualizarEstadisticasFavoritos();
}

function showToast(mensaje) {
    toast.textContent = mensaje;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
    }, 2200);
}

function abrirModalAdopcion(mascota) {
    inputMascotaId.value = mascota.id;
    inputMascotaNombre.value = mascota.nombre;
    modalAdopcion.hidden = false;
    modalConfirmacion.hidden = true;
    formAdopcion.hidden = false;
    formAdopcion.reset();
    limpiarErroresAdopcion();
}

function cerrarModalAdopcion() {
    modalAdopcion.hidden = true;
    formAdopcion.hidden = false;
    modalConfirmacion.hidden = true;
    formAdopcion.reset();
    limpiarErroresAdopcion();
}

function limpiarErroresAdopcion() {
    errorNombre.textContent = '';
    errorEmail.textContent = '';
    errorTelefono.textContent = '';
    errorVivienda.textContent = '';
}

function validarFormularioAdopcion() {
    let valido = true;
    const nombre = inputNombre.value.trim();
    const correo = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();
    const vivienda = inputVivienda.value;

    if (nombre.length < 3) {
        errorNombre.textContent = 'Ingresá un nombre válido de al menos 3 caracteres.';
        valido = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        errorEmail.textContent = 'Ingresá un correo electrónico válido.';
        valido = false;
    }

    if (!/^\d{8}$/.test(telefono)) {
        errorTelefono.textContent = 'Ingresá un teléfono de 8 dígitos.';
        valido = false;
    }

    if (!vivienda) {
        errorVivienda.textContent = 'Seleccioná un tipo de vivienda.';
        valido = false;
    }

    return valido;
}

function manejarEnvioAdopcion(event) {
    event.preventDefault();
    limpiarErroresAdopcion();

    if (!validarFormularioAdopcion()) {
        return;
    }

    const solicitud = {
        idSolicitud: Date.now(),
        mascotaId: Number(inputMascotaId.value),
        mascotaNombre: inputMascotaNombre.value,
        nombre: inputNombre.value.trim(),
        correo: inputEmail.value.trim(),
        telefono: inputTelefono.value.trim(),
        vivienda: inputVivienda.value,
        mensaje: inputMensaje.value.trim(),
        fecha: new Date().toISOString().slice(0, 10)
    };

    guardarSolicitud(solicitud);
    mostrarConfirmacionAdopcion(solicitud);
}

function guardarSolicitud(solicitud) {
    const solicitudes = JSON.parse(localStorage.getItem('solicitudes') || '[]');
    solicitudes.push(solicitud);
    localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
}

function mostrarConfirmacionAdopcion(solicitud) {
    formAdopcion.hidden = true;
    confirmacionTexto.textContent = `Tu solicitud para ${solicitud.mascotaNombre} fue registrada con éxito.`;
    modalConfirmacion.hidden = false;
}

function cerrarConfirmacion() {
    cerrarModalAdopcion();
}

const detallesModal = crearModalDetalles();

function crearModalDetalles() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'modal-detalles';
    overlay.hidden = true;

    overlay.innerHTML = `
        <div class="modal-caja">
            <button class="modal-cerrar" type="button" aria-label="Cerrar modal">✕</button>
            <div class="modal-encabezado">
                <span aria-hidden="true">🐾</span>
                <h2 id="detalle-titulo">Detalle de mascota</h2>
            </div>
            <div id="detalle-contenido"></div>
        </div>
    `;

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay || event.target.closest('.modal-cerrar')) {
            cerrarModalDetalles();
        }
    });

    document.body.appendChild(overlay);
    return overlay;
}

function abrirModalDetalles(mascota) {
    const contenido = detallesModal.querySelector('#detalle-contenido');
    contenido.innerHTML = '';

    const imagen = document.createElement('img');
    imagen.src = mascota.foto;
    imagen.alt = `Foto de ${mascota.nombre}`;
    imagen.classList.add('caso-card-img');
    imagen.onerror = () => imagen.classList.add('caso-card-img--fallback');

    const titulo = document.createElement('h3');
    titulo.textContent = mascota.nombre;

    const detalles = document.createElement('div');
    detalles.innerHTML = `
        <p><strong>Especie:</strong> ${mascota.especie}</p>
        <p><strong>Edad:</strong> ${mascota.edad}</p>
        <p><strong>Sexo:</strong> ${mascota.sexo}</p>
        <p><strong>Tamaño:</strong> ${mascota.tamaño}</p>
        <p><strong>Temperamento:</strong> ${mascota.temperamento}</p>
        <p><strong>Estado:</strong> ${mascota.estado}</p>
        <p><strong>Descripción:</strong> ${mascota.descripcion}</p>
    `;

    contenido.appendChild(imagen);
    contenido.appendChild(titulo);
    contenido.appendChild(detalles);

    detallesModal.hidden = false;
}

function cerrarModalDetalles() {
    detallesModal.hidden = true;
}
