/* main.js — página de inicio */
/* esta función es async porque puede tardar un poco, sirve para cargar el json */ 
async function cargarDatos() {
    try {
        /* variable para almacenar la información del archivo json, el await espera hasta recibir el archivo */
        const res = await fetch('data/mascotas.json');
        
        /* verifica si la respuesta fue exitosa */
        if (!res.ok) throw new Error('Error al cargar JSON');

        /* si la respuesta es exitosa, retorna el json convertido a objeto de javascript */
        return await res.json();

    } catch (err) {
        /* muestra un mensaje de advertencia en la consola e intenta cargar un json inline */
        console.warn('Fetch data failed, intentando fallback inline JSON', err);

        try {
            /* busca otra solución: encontrar un elemento en el html con ese id */ 
            const el = document.getElementById('patitas-data');
            /* hace una validación y convierte el texto en un objeto json */ 

            if (el && el.textContent.trim()) return JSON.parse(el.textContent);
        } catch (e) {
            /* si incluso eso falla, muestra un error con la variable guardada en el catch */
            console.error('Error al parsear JSON inline', e);
        }
        
        /* si todo falla, muestra el error original y retorna null */
        console.error(err);
        return null;
    }
}

/* este método recibe como parámetro el json con las mascotas */
function actualizarContador(mascotas) { 
    /* guarda la cantidad total de mascotas y valida cuáles son perros o gatos */
    const total  = mascotas.length;

    /* es lo mismo que escribir:
    function(m){
        return m.especie === "perro";
    }
    */
    const perros = mascotas.filter(m => m.especie === 'perro').length;
    const gatos  = mascotas.filter(m => m.especie === 'gato').length;
    /* busca los elementos en el html y los guarda como variables */

    const elTotal  = document.getElementById('num-total');
    const elPerros = document.getElementById('num-perros');
    const elGatos  = document.getElementById('num-gatos');
    /* si existe el elemento, le asigna el texto con la cantidad para que el usuario pueda verla */

    if (elTotal)  elTotal.textContent  = total;
    if (elPerros) elPerros.textContent = perros;
    if (elGatos)  elGatos.textContent  = gatos;
}

/* esta función se encarga de mostrar en el index los finales felices */
/* recibe como parámetro los casos */
function renderizarCasos(casos) {
    /* guarda en una variable el contenedor donde se van a colocar las tarjetas */
    const contenedor = document.getElementById('contenedor-casos');

    /* valida si existe el contenedor; si no existe, termina la función */
    if (!contenedor) return;

    /* valida si existen casos; si no existen, muestra un mensaje de vacío */
    if (!casos || casos.length === 0) {

        /* cambia el html del contenedor y muestra un mensaje de vacío en vez de "cargando..." */
        contenedor.innerHTML = '<p class="estado-vacio">Aún no hay historias registradas.</p>';
        return;
    }
    
    /* crea un fragmento de documento para mejorar el rendimiento al insertar múltiples elementos, va guardando las tarjetas aca para luego meter todo de una vez */
    const frag = document.createDocumentFragment();

    /* recorre cada caso y crea un elemento article para mostrarlo */
    casos.forEach(caso => {
        const art = document.createElement('article');

        /* asigna la clase al elemento */
        art.className = 'caso-card';

        /*formatea la fecha */
        const fecha = new Date(caso.fecha_adopcion + 'T00:00:00').toLocaleDateString('es-CR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        /* asigna el contenido HTML al elemento */
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

            /* agrega el elemento al fragmento, donde se van a ir guardando varias historias*/
        frag.appendChild(art);
    });

    /*quita del contenedor lo que antes decia cargando... */
    contenedor.innerHTML = '';

    /* agrega el fragmento al contenedor, en el fragmento van todas las historias */
    contenedor.appendChild(frag);
}

/*esta funcion es async porque tiene un await de cargar datos y puede demorar */
async function inicializar() {
    const datos = await cargarDatos();

    /*valida que los datos se hayan cargado correctamente, si no: */
    if (!datos) {

        /* busca mediante el id en el html, si existe
        muestra un mensaje de error si no se pudieron cargar los datos, en ves del de cargando... y detiene la funcion*/
        const c = document.getElementById('contenedor-casos');
        if (c) c.innerHTML = '<p class="estado-vacio">No se pudieron cargar las historias.</p>';
        return;
    }

    /*si si cargaron los datos correctamente */
    actualizarContador(datos.mascotas);
    renderizarCasos(datos.casos_exito);
}

/* ejecuta la función de inicialización cuando el html ya haya cargado*/
document.addEventListener('DOMContentLoaded', inicializar);