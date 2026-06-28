/* catalogo.js — Catálogo: visualizar, filtrar y marcar favoritos */

let todasLasMascotas = [];
let favoritos        = [];

const grid          = document.getElementById('grid-mascotas');
const campoBusqueda = document.getElementById('campo-busqueda');
const filtroEspecie = document.getElementById('filtro-especie');
const filtroEdad    = document.getElementById('filtro-edad');
const filtroTamaño  = document.getElementById('filtro-tamaño');
const filtroVista   = document.getElementById('filtro-vista');
const btnLimpiar    = document.getElementById('btn-limpiar');
const statMostrando = document.getElementById('stat-mostrando');
const statFavoritos = document.getElementById('stat-favoritos');
const toast         = document.getElementById('toast');

const modalAdopcion         = document.getElementById('modal-adopcion');
const modalCerrar           = document.getElementById('modal-cerrar');
const btnCancelarModal      = document.getElementById('btn-cancelar-modal');
const formAdopcion          = document.getElementById('form-adopcion');
const modalConfirmacion     = document.getElementById('modal-confirmacion');
const confirmacionTexto     = document.getElementById('confirmacion-texto');
const btnCerrarConfirmacion = document.getElementById('btn-cerrar-confirmacion');
const modalSubtitulo        = document.getElementById('modal-subtitulo');
const inputMascotaId        = document.getElementById('adopcion-mascota-id');
const inputMascotaNombre    = document.getElementById('adopcion-mascota-nombre');
const inputNombre           = document.getElementById('adopcion-nombre');
const inputEmail            = document.getElementById('adopcion-email');
const inputTelefono         = document.getElementById('adopcion-telefono');
const inputMotivo           = document.getElementById('adopcion-motivo');
const errorNombre           = document.getElementById('error-adopcion-nombre');
const errorEmail            = document.getElementById('error-adopcion-email');
const errorTelefono         = document.getElementById('error-adopcion-telefono');

let listenersAdjuntados = false;

/* ── LOCALSTORAGE ── */
function cargarLS(clave) {
    try { return JSON.parse(localStorage.getItem(clave)) || []; } catch { return []; }
}
function guardarLS(clave, valor) {
    localStorage.setItem(clave, JSON.stringify(valor));
}

/* ── CARGA JSON ── */
async function cargarMascotas() {
    try {
        const res = await fetch('data/mascotas.json');
        if (!res.ok) throw new Error();
        const datos = await res.json();
        // Solo mascotas disponibles para adopción
        return (datos.mascotas || []).filter(m => m.estado === 'disponible');
    } catch (err) {
        // Intentar leer JSON inline (fallback para file:// o bloqueos de fetch)
        try {
            const el = document.getElementById('patitas-data');
            if (el && el.textContent.trim()) {
                const datos = JSON.parse(el.textContent);
                return (datos.mascotas || []).filter(m => m.estado === 'disponible');
            }
        } catch (e) { console.warn('Fallback parse failed', e); }
        console.error('No se pudo cargar mascotas', err);
        return [];
    }
}

/* ── CLASIFICAR EDAD ── */
function clasificarEdad(edadTexto) {
    const num = parseInt(edadTexto);
    if (isNaN(num)) return 'joven';
    if (num < 1)  return 'cachorro';
    if (num <= 3) return 'joven';
    if (num <= 7) return 'adulto';
    return 'senior';
}

/* ── FILTRADO ── */
function filtrar() {
    const termino = campoBusqueda.value.trim().toLowerCase();
    const especie = filtroEspecie.value;
    const edad    = filtroEdad.value;
    const tamaño  = filtroTamaño.value;
    const vista   = filtroVista.value;

    return todasLasMascotas.filter(m => {
        const busqueda   = !termino || m.nombre.toLowerCase().includes(termino) || m.raza.toLowerCase().includes(termino);
        const porEspecie = especie === 'todos' || m.especie === especie;
        const porEdad    = edad    === 'todos' || clasificarEdad(m.edad) === edad;
        const porTamaño  = tamaño  === 'todos' || m.tamaño === tamaño;
        let   porVista   = true;
        if (vista === 'favoritos') porVista = favoritos.includes(m.id);
        if (vista === 'urgentes')  porVista = m.urgente === true;
        return busqueda && porEspecie && porEdad && porTamaño && porVista;
    });
}

/* ── RENDERIZAR ── */
function actualizarEstadoFavorito(card, mascota) {
    const button = card.querySelector('.btn-favorito');
    if (!button) return;

    const esFav = favoritos.includes(mascota.id);
    button.classList.toggle('es-favorito', esFav);
    button.setAttribute('aria-pressed', String(esFav));
    button.setAttribute('aria-label', `${esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}: ${mascota.nombre}`);
    button.innerHTML = esFav ? '❤️' : '🤍';
}

function crearSkeletonLoader() {
    if (!grid) return;

    grid.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (let i = 0; i < 6; i++) {
        const card = document.createElement('article');
        card.className = 'mascota-card skeleton-card';
        card.setAttribute('aria-hidden', 'true');
        card.innerHTML = `
            <div class="skeleton-media"></div>
            <div class="skeleton-body">
                <div class="skeleton-line skeleton-line-short"></div>
                <div class="skeleton-line skeleton-line-medium"></div>
                <div class="skeleton-line"></div>
                <div class="skeleton-line skeleton-line-short"></div>
            </div>`;
        frag.appendChild(card);
    }

    grid.appendChild(frag);
}

function renderizar() {
    const lista = filtrar();
    statMostrando.textContent = `Mostrando ${lista.length} de ${todasLasMascotas.length} mascotas`;
    statFavoritos.textContent = `${favoritos.length} favorito${favoritos.length !== 1 ? 's' : ''}`;

    const vacioActual = grid.querySelector('.estado-vacio');
    if (vacioActual) vacioActual.remove();

    if (lista.length === 0) {
        grid.querySelectorAll('.mascota-card').forEach(card => card.remove());
        grid.innerHTML += `
            <div class="estado-vacio" style="grid-column:1/-1">
                <span class="estado-vacio-icono"></span>
                <h3>No encontramos mascotas</h3>
                <p>Intentá con otros filtros o limpiá la búsqueda.</p>
            </div>`;
        return;
    }

    const cardsActuales = Array.from(grid.querySelectorAll('.mascota-card'));
    const idsActuales = new Set(cardsActuales.map(card => Number(card.dataset.id)));
    const idsNuevos = new Set(lista.map(m => m.id));

    cardsActuales.forEach(card => {
        const idCard = Number(card.dataset.id);
        if (!idsNuevos.has(idCard)) {
            card.remove();
        }
    });

    const cardsRestantes = new Map(Array.from(grid.querySelectorAll('.mascota-card')).map(card => [Number(card.dataset.id), card]));
    grid.style.opacity = '0';

    requestAnimationFrame(() => {
        const frag = document.createDocumentFragment();

        lista.forEach(m => {
            const cardExistente = cardsRestantes.get(m.id);
            if (cardExistente) {
                actualizarEstadoFavorito(cardExistente, m);
                return;
            }

            const esFav = favoritos.includes(m.id);
            const card  = document.createElement('article');
            card.className = 'mascota-card';
            card.dataset.id = m.id;
            card.setAttribute('aria-label', `Mascota: ${m.nombre}`);

            card.innerHTML = `
                ${m.urgente ? '<span class="badge-urgente">Urgente</span>' : ''}

                <button class="btn-favorito ${esFav ? 'es-favorito' : ''}"
                    data-id="${m.id}"
                    aria-label="${esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}: ${m.nombre}"
                    aria-pressed="${esFav}">
                    ${esFav ? '❤️' : '🤍'}
                </button>

                <div class="mascota-img-wrapper">
                    <img class="mascota-img" src="${m.imagen}"
                        alt="Foto de ${m.nombre}, ${m.raza}"
                        onerror="this.style.background='var(--crema-oscuro)';this.removeAttribute('src');"
                        loading="lazy"
                        decoding="async"
                        fetchpriority="low">
                </div>

                <div class="mascota-body">
                <div class="mascota-tags">
                    <span class="mascota-tag tag-especie">${m.especie}</span>
                    <span class="mascota-tag">${m.tamaño}</span>
                    <span class="mascota-tag">${m.edad}</span>
                    <span class="mascota-tag">${m.sexo}</span>
                </div>
                <h3 class="mascota-nombre">${m.nombre}</h3>
                <p class="mascota-raza">${m.raza}</p>
                <p class="mascota-desc">${m.descripcion}</p>
                <p class="mascota-albergue">${m.albergue}</p>
            </div>

            <div class="mascota-acciones">
                <button class="btn-adoptar" data-id="${m.id}" data-nombre="${m.nombre}"
                    aria-label="Solicitar adopción de ${m.nombre}">
                    Solicitar adopción
                </button>
            </div>`;

            frag.appendChild(card);
        });

        if (frag.childNodes.length) {
            grid.appendChild(frag);
        }

        adjuntarEventos();
        grid.style.opacity = '1';
    });
}

function adjuntarEventos() {
    if (listenersAdjuntados) return;
    listenersAdjuntados = true;

    grid.addEventListener('click', (event) => {
        const btnFav = event.target.closest('.btn-favorito');
        if (btnFav) {
            toggleFavorito(parseInt(btnFav.dataset.id, 10));
            return;
        }

        const btnAdoptar = event.target.closest('.btn-adoptar');
        if (btnAdoptar) {
            const id     = btnAdoptar.dataset.id;
            const nombre = btnAdoptar.dataset.nombre;
            abrirModalAdopcion(id, nombre);
        }
    });

    modalCerrar.addEventListener('click', cerrarModalAdopcion);
    btnCancelarModal.addEventListener('click', cerrarModalAdopcion);

    modalAdopcion.addEventListener('click', (event) => {
        if (event.target === modalAdopcion) {
            cerrarModalAdopcion();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modalAdopcion.hidden) {
            cerrarModalAdopcion();
        }
    });

    formAdopcion.addEventListener('submit', manejarEnvioFormulario);
    btnCerrarConfirmacion.addEventListener('click', cerrarModalAdopcion);
}

function abrirModalAdopcion(id, nombre) {
    if (!modalAdopcion) return;

    formAdopcion.reset();
    limpiarErroresFormulario();

    inputMascotaId.value     = id;
    inputMascotaNombre.value = nombre;
    modalSubtitulo.textContent = `Vas a solicitar la adopción de ${nombre}`;

    modalConfirmacion.hidden = true;
    formAdopcion.hidden = false;
    modalAdopcion.hidden = false;
}

function cerrarModalAdopcion() {
    if (!modalAdopcion) return;
    modalAdopcion.hidden = true;
    modalConfirmacion.hidden = true;
    formAdopcion.hidden = false;
    limpiarErroresFormulario();
    formAdopcion.reset();
}

function limpiarErroresFormulario() {
    if (errorNombre) errorNombre.textContent = '';
    if (errorEmail) errorEmail.textContent = '';
    if (errorTelefono) errorTelefono.textContent = '';
}

function validarFormularioAdopcion() {
    const nombre  = inputNombre.value.trim();
    const email   = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();

    let esValido = true;
    limpiarErroresFormulario();

    if (!nombre) {
        errorNombre.textContent = 'Por favor, ingresá tu nombre completo.';
        esValido = false;
    }

    if (!email) {
        errorEmail.textContent = 'Por favor, ingresá tu correo electrónico.';
        esValido = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorEmail.textContent = 'Ingresá un correo válido.';
        esValido = false;
    }

    if (!telefono) {
        errorTelefono.textContent = 'Por favor, ingresá tu teléfono.';
        esValido = false;
    }

    return esValido;
}

function manejarEnvioFormulario(event) {
    event.preventDefault();

    if (!validarFormularioAdopcion()) {
        return;
    }

    const nombreMascota = inputMascotaNombre.value || 'la mascota seleccionada';
    confirmacionTexto.textContent = `Tu solicitud de adopción para ${nombreMascota} fue enviada correctamente.`;
    formAdopcion.hidden = true;
    modalConfirmacion.hidden = false;
}

/* ── FAVORITOS ── */
function toggleFavorito(id) {
    const mascota = todasLasMascotas.find(m => m.id === id);
    const nombre  = mascota ? mascota.nombre : 'Mascota';
    const idx     = favoritos.indexOf(id);
    if (idx === -1) {
        favoritos.push(id);
        mostrarToast(`${nombre} agregado/a a favoritos`, 'toast-exito');
    } else {
        favoritos.splice(idx, 1);
        mostrarToast(`${nombre} quitado/a de favoritos`, 'toast-info');
    }
    guardarLS('patitas_favoritos', favoritos);
    renderizar();
}

/* ── TOAST ── */
let toastTimer = null;
function mostrarToast(msg, tipo = 'toast-info') {
    if (toastTimer) clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.className   = `toast ${tipo} visible`;
    toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

/* ── EVENTOS FILTROS ── */
campoBusqueda.addEventListener('input', renderizar);
filtroEspecie.addEventListener('change', renderizar);
filtroEdad.addEventListener('change', renderizar);
filtroTamaño.addEventListener('change', renderizar);
filtroVista.addEventListener('change', renderizar);

btnLimpiar.addEventListener('click', () => {
    campoBusqueda.value = '';
    filtroEspecie.value = filtroEdad.value = filtroTamaño.value = filtroVista.value = 'todos';
    renderizar();
    mostrarToast('Filtros limpiados', 'toast-info');
});

/* ── INICIO ── */
async function inicializar() {
    favoritos        = cargarLS('patitas_favoritos');
    crearSkeletonLoader();
    todasLasMascotas = await cargarMascotas();

    if (todasLasMascotas.length === 0) {
        grid.innerHTML = `
            <div class="estado-vacio" style="grid-column:1/-1">
                <span class="estado-vacio-icono"></span>
                <h3>No se pudo cargar el catálogo</h3>
                <p>Verificá tu conexión e intentá recargar la página.</p>
            </div>`;
        return;
    }
    renderizar();
}

document.addEventListener('DOMContentLoaded', inicializar);