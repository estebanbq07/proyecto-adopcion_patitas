/* gestion.js — Solicitudes de adopción: crear, ver detalle, editar, eliminar */

let solicitudes     = [];
let favoritos       = [];
let modoEdicion     = null;   // null = nueva solicitud | id = editando
let pendienteElim   = null;   // id a eliminar (null = eliminar todas)
let solicitudDetalle = null;  // solicitud abierta en modal detalle

/* ── ELEMENTOS DOM ── */
const formSolicitud     = document.getElementById('form-solicitud');
const formMensaje       = document.getElementById('form-mensaje');
const listaSolicitudes  = document.getElementById('lista-solicitudes');
const btnLimpiarForm    = document.getElementById('btn-limpiar-form');
const btnLimpiarTodo    = document.getElementById('btn-limpiar-todo');
const btnCancelarEdic   = document.getElementById('btn-cancelar-edicion');
const btnEnviar         = document.getElementById('btn-enviar');
const formTitulo        = document.getElementById('form-titulo');
const contadorMotivo    = document.getElementById('contador-motivo');
const avisoMascota      = document.getElementById('aviso-mascota');
const avisoNombre       = document.getElementById('aviso-nombre');
const modalDetalle      = document.getElementById('modal-detalle');
const detalleContenido  = document.getElementById('detalle-contenido');
const modalEliminar     = document.getElementById('modal-eliminar');

const campos = {
    nombre:   document.getElementById('sol-nombre'),
    email:    document.getElementById('sol-email'),
    telefono: document.getElementById('sol-telefono'),
    mascota:  document.getElementById('sol-mascota'),
    motivo:   document.getElementById('sol-motivo'),
};

/* ── LOCALSTORAGE ── */
function cargarLS(clave) {
    try { return JSON.parse(localStorage.getItem(clave)) || []; } catch { return []; }
}
function guardarLS(clave, valor) { localStorage.setItem(clave, JSON.stringify(valor)); }

/* ── CONTADOR TEXTAREA ── */
campos.motivo?.addEventListener('input', () => {
    const len = campos.motivo.value.length;
    contadorMotivo.textContent = len;
    contadorMotivo.style.color = len > 450 ? '#DC2626' : '';
});

/* ── MASCOTA PRESELECCIONADA (viene del catálogo) ── */
function revisarMascotaPreseleccionada() {
    const data = localStorage.getItem('patitas_mascota_seleccionada');
    if (!data) return;
    try {
        const { nombre } = JSON.parse(data);
        campos.mascota.value   = nombre;
        avisoNombre.textContent = nombre;
        avisoMascota.hidden    = false;
        localStorage.removeItem('patitas_mascota_seleccionada');
        campos.nombre.focus();
    } catch { /* nada */ }
}

document.getElementById('btn-quitar-mascota')?.addEventListener('click', () => {
    campos.mascota.value = '';
    avisoMascota.hidden  = true;
});

/* ── VALIDACIÓN ── */
function limpiarErrores() {
    document.querySelectorAll('.campo-error').forEach(e => e.textContent = '');
    document.querySelectorAll('.campo-invalido').forEach(c => c.classList.remove('campo-invalido'));
    document.querySelectorAll('.campo-valido').forEach(c => c.classList.remove('campo-valido'));
}

function marcarError(id, errorId, msg) {
    const c = document.getElementById(id);
    const e = document.getElementById(errorId);
    if (c) c.classList.add('campo-invalido');
    if (e) e.textContent = msg;
}

function marcarValido(id, errorId) {
    const c = document.getElementById(id);
    const e = document.getElementById(errorId);
    if (c) { c.classList.remove('campo-invalido'); c.classList.add('campo-valido'); }
    if (e) e.textContent = '';
}

function validarCampo(campoId, errorId) {
    const campo = document.getElementById(campoId);
    const v     = campo.value.trim();
    if (campoId === 'sol-nombre'   && v.length < 3)  { marcarError(campoId, errorId, 'El nombre debe tener al menos 3 caracteres.'); return false; }
    if (campoId === 'sol-email'    && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { marcarError(campoId, errorId, 'Ingresá un correo válido.'); return false; }
    if (campoId === 'sol-telefono' && !/^[\d\s\-+()]{7,15}$/.test(v)) { marcarError(campoId, errorId, 'Ingresá un teléfono válido (ej: 8888-8888).'); return false; }
    if (campoId === 'sol-mascota'  && v.length < 2)  { marcarError(campoId, errorId, 'Ingresá el nombre de la mascota.'); return false; }
    if (campoId === 'sol-motivo'   && v.length < 20) { marcarError(campoId, errorId, 'Contanos un poco más (mínimo 20 caracteres).'); return false; }
    marcarValido(campoId, errorId);
    return true;
}

function validarTodo() {
    return [
        validarCampo('sol-nombre',   'error-nombre'),
        validarCampo('sol-email',    'error-email'),
        validarCampo('sol-telefono', 'error-telefono'),
        validarCampo('sol-mascota',  'error-mascota'),
        validarCampo('sol-motivo',   'error-motivo'),
    ].every(Boolean);
}

// Validación en tiempo real
Object.keys(campos).forEach(clave => {
    const campo = campos[clave];
    if (!campo) return;
    campo.addEventListener('blur', () => { if (campo.value.trim()) validarCampo(`sol-${clave}`, `error-${clave}`); });
    campo.addEventListener('input', () => {
        if (campo.classList.contains('campo-invalido')) validarCampo(`sol-${clave}`, `error-${clave}`);
    });
});

/* ── MENSAJES ── */
function mostrarMensaje(texto, tipo) {
    formMensaje.textContent = texto;
    formMensaje.className   = `form-mensaje mensaje-${tipo}`;
    formMensaje.hidden      = false;
    formMensaje.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    if (tipo === 'exito') setTimeout(() => { formMensaje.hidden = true; }, 5000);
}

/* ── LIMPIAR FORMULARIO ── */
function resetearFormulario() {
    formSolicitud.reset();
    limpiarErrores();
    formMensaje.hidden       = true;
    avisoMascota.hidden      = true;
    btnCancelarEdic.hidden   = true;
    modoEdicion              = null;
    formTitulo.textContent   = 'Nueva solicitud de adopción';
    btnEnviar.textContent    = 'Enviar solicitud';
    document.getElementById('sol-id-edicion').value = '';
    if (contadorMotivo) contadorMotivo.textContent = '0';
    campos.nombre.focus();
}

btnLimpiarForm?.addEventListener('click', resetearFormulario);

btnCancelarEdic?.addEventListener('click', resetearFormulario);

/* ── ENVÍO / ACTUALIZACIÓN ── */
formSolicitud.addEventListener('submit', e => {
    e.preventDefault();
    limpiarErrores();
    formMensaje.hidden = true;

    if (!validarTodo()) {
        mostrarMensaje('Revisá los campos marcados antes de continuar.', 'error');
        formSolicitud.querySelector('.campo-invalido')?.focus();
        return;
    }

    const datos = {
        nombre:   campos.nombre.value.trim(),
        email:    campos.email.value.trim(),
        telefono: campos.telefono.value.trim(),
        mascota:  campos.mascota.value.trim(),
        motivo:   campos.motivo.value.trim(),
    };

    if (modoEdicion !== null) {
        // ── EDITAR solicitud existente ──
        const idx = solicitudes.findIndex(s => s.id === modoEdicion);
            if (idx !== -1) {
            solicitudes[idx] = { ...solicitudes[idx], ...datos, fechaEdicion: new Date().toLocaleDateString('es-CR') };
            guardarLS('patitas_solicitudes', solicitudes);
            mostrarMensaje(`Solicitud actualizada correctamente.`, 'exito');
        }
        resetearFormulario();
    } else {
        // ── NUEVA solicitud ──
        const nueva = { id: Date.now(), ...datos, fecha: new Date().toLocaleDateString('es-CR'), fechaEdicion: null };
        solicitudes.push(nueva);
        guardarLS('patitas_solicitudes', solicitudes);
        mostrarMensaje(`¡Solicitud enviada! El albergue se pondrá en contacto al correo ${datos.email}.`, 'exito');
        resetearFormulario();
    }

    actualizarResumen();
    renderizarLista();
});

/* ── MODO EDICIÓN ── */
function activarEdicion(id) {
    const sol = solicitudes.find(s => s.id === id);
    if (!sol) return;

    modoEdicion = id;
    document.getElementById('sol-id-edicion').value = id;

    campos.nombre.value   = sol.nombre;
    campos.email.value    = sol.email;
    campos.telefono.value = sol.telefono;
    campos.mascota.value  = sol.mascota;
    campos.motivo.value   = sol.motivo;

    if (contadorMotivo) contadorMotivo.textContent = sol.motivo.length;

    formTitulo.textContent    = `Editando solicitud — ${sol.mascota}`;
    btnEnviar.textContent     = 'Guardar cambios';
    btnCancelarEdic.hidden    = false;
    avisoMascota.hidden       = true;
    formMensaje.hidden        = true;

    // Scroll y foco al formulario
    document.querySelector('.formulario-wrapper')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => campos.nombre.focus(), 400);

    // Cerrar modal detalle si estaba abierto
    cerrarModalDetalle();
}

/* ── MODAL DETALLE ── */
function abrirDetalle(id) {
    const sol = solicitudes.find(s => s.id === id);
    if (!sol) return;
    solicitudDetalle = id;

    document.getElementById('detalle-titulo').textContent = `Solicitud — ${sol.mascota}`;

    detalleContenido.innerHTML = `
        <table class="detalle-tabla">
            <tbody>
                <tr><th>Nombre</th><td>${sol.nombre}</td></tr>
                <tr><th>Correo</th><td>${sol.email}</td></tr>
                <tr><th>Teléfono</th><td>${sol.telefono}</td></tr>
                <tr><th>Mascota</th><td>${sol.mascota}</td></tr>
                <tr><th>Motivo</th><td>${sol.motivo}</td></tr>
                <tr><th>Fecha envío</th><td>${sol.fecha}</td></tr>
                ${sol.fechaEdicion ? `<tr><th>Última edición</th><td>${sol.fechaEdicion}</td></tr>` : ''}
            </tbody>
        </table>`;

    modalDetalle.hidden = false;
    document.body.style.overflow = 'hidden';
}

function cerrarModalDetalle() {
    modalDetalle.hidden = true;
    document.body.style.overflow = '';
    solicitudDetalle = null;
}

document.getElementById('cerrar-detalle')?.addEventListener('click', cerrarModalDetalle);
document.getElementById('cerrar-detalle-btn')?.addEventListener('click', cerrarModalDetalle);
document.getElementById('btn-editar-desde-detalle')?.addEventListener('click', () => {
    if (solicitudDetalle !== null) activarEdicion(solicitudDetalle);
});
modalDetalle.addEventListener('click', e => { if (e.target === modalDetalle) cerrarModalDetalle(); });

/* ── MODAL ELIMINAR ── */
function abrirModalEliminar(id, texto) {
    pendienteElim = id;
    document.getElementById('msg-eliminar').textContent = texto;
    modalEliminar.hidden = false;
    document.body.style.overflow = 'hidden';
}

function cerrarModalEliminar() {
    modalEliminar.hidden = true;
    document.body.style.overflow = '';
    pendienteElim = null;
}

document.getElementById('btn-cancelar-eliminar')?.addEventListener('click', cerrarModalEliminar);

document.getElementById('btn-confirmar-eliminar')?.addEventListener('click', () => {
    if (pendienteElim === 'todas') {
        solicitudes = [];
    } else {
        solicitudes = solicitudes.filter(s => s.id !== pendienteElim);
    }
    guardarLS('patitas_solicitudes', solicitudes);
    cerrarModalEliminar();
    if (modoEdicion === pendienteElim) resetearFormulario();
    actualizarResumen();
    renderizarLista();
});

btnLimpiarTodo?.addEventListener('click', () => {
    abrirModalEliminar('todas', '¿Seguro/a que querés eliminar todas las solicitudes? Esta acción no se puede deshacer.');
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        if (!modalDetalle.hidden)  cerrarModalDetalle();
        if (!modalEliminar.hidden) cerrarModalEliminar();
    }
});

/* ── RENDERIZAR LISTA ── */
function renderizarLista() {
    btnLimpiarTodo.style.display = solicitudes.length > 0 ? 'block' : 'none';

    if (solicitudes.length === 0) {
        listaSolicitudes.innerHTML = '<p class="aside-vacio">Todavía no registraste ninguna solicitud.</p>';
        return;
    }

    const frag = document.createDocumentFragment();
    solicitudes.forEach(s => {
        const item = document.createElement('div');
        item.className = 'solicitud-item';
        const editando = modoEdicion === s.id;
        item.innerHTML = `
            <div class="solicitud-info">
                <span class="solicitud-nombre">${s.nombre} ${editando ? '<span class="badge-editando">editando</span>' : ''}</span>
                <span class="solicitud-mascota">${s.mascota}</span>
                <span class="solicitud-fecha">${s.fecha}${s.fechaEdicion ? ' · editado ' + s.fechaEdicion : ''}</span>
            </div>
            <div class="sol-acciones">
                <button class="btn-sol-accion btn-ver"    data-id="${s.id}" title="Ver detalle"  aria-label="Ver detalle de solicitud de ${s.nombre}">Ver</button>
                <button class="btn-sol-accion btn-editar" data-id="${s.id}" title="Editar"       aria-label="Editar solicitud de ${s.nombre}">Editar</button>
                <button class="btn-sol-accion btn-elim"   data-id="${s.id}" title="Eliminar"     aria-label="Eliminar solicitud de ${s.nombre}">Eliminar</button>
            </div>`;
        frag.appendChild(item);
    });

    listaSolicitudes.innerHTML = '';
    listaSolicitudes.appendChild(frag);

    listaSolicitudes.querySelectorAll('.btn-ver').forEach(btn => {
        btn.addEventListener('click', () => abrirDetalle(parseInt(btn.dataset.id)));
    });
    listaSolicitudes.querySelectorAll('.btn-editar').forEach(btn => {
        btn.addEventListener('click', () => activarEdicion(parseInt(btn.dataset.id)));
    });
    listaSolicitudes.querySelectorAll('.btn-elim').forEach(btn => {
        btn.addEventListener('click', () => {
            const sol = solicitudes.find(s => s.id === parseInt(btn.dataset.id));
            if (sol) abrirModalEliminar(sol.id, `¿Eliminás la solicitud para ${sol.mascota} de ${sol.nombre}?`);
        });
    });
}

/* ── RESUMEN ── */
function actualizarResumen() {
    document.getElementById('resumen-solicitudes').textContent = solicitudes.length;
    document.getElementById('resumen-favoritos').textContent   = favoritos.length;
}

/* ── INICIO ── */
function inicializar() {
    solicitudes = cargarLS('patitas_solicitudes');
    favoritos   = cargarLS('patitas_favoritos');
    actualizarResumen();
    renderizarLista();
    revisarMascotaPreseleccionada();
}

document.addEventListener('DOMContentLoaded', inicializar);