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
function renderizar() {
    const lista = filtrar();
    statMostrando.textContent = `Mostrando ${lista.length} de ${todasLasMascotas.length} mascotas`;
    statFavoritos.textContent = `${favoritos.length} favorito${favoritos.length !== 1 ? 's' : ''}`;

    if (lista.length === 0) {
        grid.innerHTML = `
            <div class="estado-vacio" style="grid-column:1/-1">
                <span class="estado-vacio-icono"></span>
                <h3>No encontramos mascotas</h3>
                <p>Intentá con otros filtros o limpiá la búsqueda.</p>
            </div>`;
        return;
    }

    const frag = document.createDocumentFragment();
    lista.forEach(m => {
        const esFav = favoritos.includes(m.id);
        const card  = document.createElement('article');
        card.className = 'mascota-card';
        card.setAttribute('aria-label', `Mascota: ${m.nombre}`);

        card.innerHTML = `
            ${m.urgente ? '<span class="badge-urgente">Urgente</span>' : ''}

            <button class="btn-favorito ${esFav ? 'es-favorito' : ''}"
                data-id="${m.id}"
                aria-label="${esFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}: ${m.nombre}"
                aria-pressed="${esFav}">
                ${esFav ? '❤️' : '🤍'}
            </button>

            <img class="mascota-img" src="${m.imagen}"
                alt="Foto de ${m.nombre}, ${m.raza}"
                onerror="this.style.background='var(--crema-oscuro)';this.removeAttribute('src');"
                loading="lazy">

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

    grid.innerHTML = '';
    grid.appendChild(frag);
    adjuntarEventos();
}

function adjuntarEventos() {
    // Favoritos
    grid.querySelectorAll('.btn-favorito').forEach(btn => {
        btn.addEventListener('click', () => toggleFavorito(parseInt(btn.dataset.id)));
    });

    // Solicitar adopción → lleva a gestion.html con la mascota preseleccionada
    grid.querySelectorAll('.btn-adoptar').forEach(btn => {
        btn.addEventListener('click', () => {
            const id     = btn.dataset.id;
            const nombre = btn.dataset.nombre;
            // Guardar en localStorage para que gestion.js lo lea
            localStorage.setItem('patitas_mascota_seleccionada', JSON.stringify({ id, nombre }));
            window.location.href = 'gestion.html';
        });
    });
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