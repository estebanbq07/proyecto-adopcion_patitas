const FALLBACK_MASCOTAS = [
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

const FALLBACK_HISTORIAS = [
  {
    "id": 1,
    "mascota": "Luna",
    "familia": "Familia Rodríguez",
    "historia": "Luna llegó muy tímida al albergue y hoy se ha convertido en una compañera inseparable de los niños.",
    "fecha": "2026-03-12",
    "imagen": "images/historias/luna.jpg"
  },
  {
    "id": 2,
    "mascota": "Bruno",
    "familia": "Familia Morales",
    "historia": "Bruno se adaptó rápido y ahora disfruta de caminatas diarias en el parque del barrio.",
    "fecha": "2026-02-28",
    "imagen": "images/historias/bruno.jpg"
  },
  {
    "id": 3,
    "mascota": "Kiara",
    "familia": "Familia Salas",
    "historia": "Kiara era muy asustadiza, pero con paciencia y amor hoy es una gata confiada y cariñosa.",
    "fecha": "2026-01-19",
    "imagen": "images/historias/kiara.jpg"
  },
  {
    "id": 4,
    "mascota": "Rocky",
    "familia": "Familia Castro",
    "historia": "Rocky encontró un hogar donde puede correr y descansar seguro después de su recuperación.",
    "fecha": "2026-04-03",
    "imagen": "images/historias/rocky.jpg"
  },
  {
    "id": 5,
    "mascota": "Mía",
    "familia": "Familia Herrera",
    "historia": "Mía llegó pequeñita y curiosa; hoy llenó el hogar de risas y muchas aventuras.",
    "fecha": "2026-05-10",
    "imagen": "images/historias/mia.jpg"
  },
  {
    "id": 6,
    "mascota": "Simba",
    "familia": "Familia Vega",
    "historia": "Simba encontró un lugar lleno de cariño y ahora es el guardián de su casa.",
    "fecha": "2026-06-02",
    "imagen": "images/historias/simba.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    actualizarContadoresDeMascotas();
    cargarHistorias();
});

const contadorTotal = document.querySelector('#num-total');
const contadorPerros = document.querySelector('#num-perros');
const contadorGatos = document.querySelector('#num-gatos');
const contenedorCasos = document.querySelector('#contenedor-casos');

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

async function actualizarContadoresDeMascotas() {
    const mascotas = await cargarJSONConFallback('data/mascotas.json', FALLBACK_MASCOTAS);
    const total = mascotas.length;
    const perros = mascotas.filter((mascota) => mascota.especie.toLowerCase() === 'perro').length;
    const gatos = mascotas.filter((mascota) => mascota.especie.toLowerCase() === 'gato').length;

    contadorTotal.textContent = total;
    contadorPerros.textContent = perros;
    contadorGatos.textContent = gatos;
}

async function cargarHistorias() {
    contenedorCasos.innerHTML = '<p class="estado-cargando">Cargando historias...</p>';
    const historias = await cargarJSONConFallback('data/historias.json', FALLBACK_HISTORIAS);
    renderizarHistorias(historias);
}

function renderizarHistorias(historias) {
    contenedorCasos.innerHTML = '';

    if (!Array.isArray(historias) || historias.length === 0) {
        contenedorCasos.innerHTML = '<p class="estado-vacio">No hay historias disponibles.</p>';
        return;
    }

    historias.forEach((historia) => {
        const tarjeta = crearHistoriaCard(historia);
        contenedorCasos.appendChild(tarjeta);
    });
}

function crearHistoriaCard(historia) {
    const articulo = document.createElement('article');
    articulo.classList.add('caso-card');

    const imagen = document.createElement('img');
    imagen.classList.add('caso-card-img');
    imagen.src = historia.imagen;
    imagen.alt = `Foto de ${historia.mascota}`;
    imagen.onerror = () => imagen.classList.add('caso-card-img--fallback');

    const cuerpo = document.createElement('div');
    cuerpo.classList.add('caso-card-body');

    const nombre = document.createElement('h3');
    nombre.textContent = historia.mascota;

    const familia = document.createElement('p');
    familia.innerHTML = `<strong>Familia:</strong> ${historia.familia}`;

    const texto = document.createElement('p');
    texto.textContent = historia.historia;

    const fecha = document.createElement('p');
    fecha.classList.add('caso-fecha');
    fecha.textContent = new Date(historia.fecha).toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    cuerpo.appendChild(nombre);
    cuerpo.appendChild(familia);
    cuerpo.appendChild(texto);
    cuerpo.appendChild(fecha);
    articulo.appendChild(imagen);
    articulo.appendChild(cuerpo);

    return articulo;
}
