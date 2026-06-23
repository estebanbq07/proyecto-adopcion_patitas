/* main.js — Página de inicio */

async function cargarDatos() {
    try {
        const res = await fetch('data/mascotas.json');
        if (!res.ok) throw new Error('Error al cargar JSON');
        return await res.json();
    } catch (err) {
        console.warn('Fetch data failed, intentando fallback inline JSON', err);
        try {
            const el = document.getElementById('patitas-data');
            if (el && el.textContent.trim()) return JSON.parse(el.textContent);
        } catch (e) {
            console.error('Error al parsear JSON inline', e);
        }
        console.error(err);
        return null;
    }
}

function actualizarContador(mascotas) {
    const total  = mascotas.length;
    const perros = mascotas.filter(m => m.especie === 'perro').length;
    const gatos  = mascotas.filter(m => m.especie === 'gato').length;
    const elTotal  = document.getElementById('num-total');
    const elPerros = document.getElementById('num-perros');
    const elGatos  = document.getElementById('num-gatos');
    if (elTotal)  elTotal.textContent  = total;
    if (elPerros) elPerros.textContent = perros;
    if (elGatos)  elGatos.textContent  = gatos;
}

function renderizarCasos(casos) {
    const contenedor = document.getElementById('contenedor-casos');
    if (!contenedor) return;
    if (!casos || casos.length === 0) {
        contenedor.innerHTML = '<p class="estado-vacio">Aún no hay historias registradas.</p>';
        return;
    }
    const frag = document.createDocumentFragment();
    casos.forEach(caso => {
        const art = document.createElement('article');
        art.className = 'caso-card';
        const fecha = new Date(caso.fecha_adopcion + 'T00:00:00').toLocaleDateString('es-CR', { year:'numeric', month:'long', day:'numeric' });
        art.innerHTML = `
            <img class="caso-card-img" src="${caso.imagen}" alt="Foto de ${caso.nombre_mascota} adoptado/a"
                onerror="this.style.background='var(--crema-oscuro)';this.removeAttribute('src');" loading="lazy">
            <div class="caso-card-body">
                <span class="caso-tag">Adoptado/a</span>
                <h3>${caso.nombre_mascota}</h3>
                <p>"${caso.historia}"</p>
                <small style="color:var(--texto-suave);font-size:.8rem;display:block;margin-top:10px;">
                    — ${caso.adoptante} · ${fecha}
                </small>
            </div>`;
        frag.appendChild(art);
    });
    contenedor.innerHTML = '';
    contenedor.appendChild(frag);
}

async function inicializar() {
    const datos = await cargarDatos();
    if (!datos) {
        const c = document.getElementById('contenedor-casos');
        if (c) c.innerHTML = '<p class="estado-vacio">No se pudieron cargar las historias.</p>';
        return;
    }
    actualizarContador(datos.mascotas);
    renderizarCasos(datos.casos_exito);
}

document.addEventListener('DOMContentLoaded', inicializar);