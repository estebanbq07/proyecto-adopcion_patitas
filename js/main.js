const FALLBACK_MASCOTAS = [
  {
    "id": 1,
    "nombre": "Max",
    "especie": "Perro",
    "raza": "Mestizo",
    "edad": "Cachorro",
    "tamaño": "Mediano",
    "estado": "Disponible",
    "descripcion": "Juguetón, cariñoso y listo para acompañarte en sus primeras aventuras.",
    "foto": "images/mascotas/max.jpg",
    "imagen": "images/mascotas/max.jpg",
    "genero": "macho"
  },
  {
    "id": 2,
    "nombre": "Luna",
    "especie": "Gato",
    "raza": "Europeo",
    "edad": "Adulto",
    "tamaño": "Pequeño",
    "estado": "Urgente",
    "descripcion": "Luna disfruta del sol, los mimos y los rincones cálidos del hogar.",
    "foto": "images/mascotas/luna.jpg",
    "imagen": "images/mascotas/luna.jpg",
    "genero": "hembra"
  },
  {
    "id": 3,
    "nombre": "Bruno",
    "especie": "Perro",
    "raza": "Labrador",
    "edad": "Joven",
    "tamaño": "Grande",
    "estado": "Reservado",
    "descripcion": "Gran compañero para familias activas que disfruten paseos largos.",
    "foto": "images/mascotas/bruno.jpg",
    "imagen": "images/mascotas/bruno.jpg",
    "genero": "macho"
  },
  {
    "id": 4,
    "nombre": "Mía",
    "especie": "Gato",
    "raza": "Siamés",
    "edad": "Cachorro",
    "tamaño": "Pequeño",
    "estado": "Disponible",
    "descripcion": "Curiosa y dulce, Mía se adapta rápido y ama saltar por los muebles.",
    "foto": "images/mascotas/mia.jpg",
    "imagen": "images/mascotas/mia.jpg",
    "genero": "hembra"
  },
  {
    "id": 5,
    "nombre": "Toby",
    "especie": "Perro",
    "raza": "Beagle",
    "edad": "Adulto",
    "tamaño": "Mediano",
    "estado": "Disponible",
    "descripcion": "Aprecio por los momentos tranquilos y un gran amigo para hogares serenos.",
    "foto": "images/mascotas/toby.jpg",
    "imagen": "images/mascotas/toby.jpg",
    "genero": "macho"
  },
  {
    "id": 6,
    "nombre": "Kiara",
    "especie": "Gato",
    "raza": "Mestizo",
    "edad": "Joven",
    "tamaño": "Pequeño",
    "estado": "Disponible",
    "descripcion": "Kiara adora jugar con ovillos y disfrutar la compañía de personas amables.",
    "foto": "images/mascotas/kiara.jpg",
    "imagen": "images/mascotas/kiara.jpg",
    "genero": "hembra"
  },
  {
    "id": 7,
    "nombre": "Rocky",
    "especie": "Perro",
    "raza": "Pastor",
    "edad": "Adulto",
    "tamaño": "Grande",
    "estado": "Urgente",
    "descripcion": "Necesita espacio y cariño; ideal para quien le dedique tiempo y paseos.",
    "foto": "images/mascotas/rocky.jpg",
    "imagen": "images/mascotas/rocky.jpg",
    "genero": "macho"
  },
  {
    "id": 8,
    "nombre": "Nala",
    "especie": "Gato",
    "raza": "Europeo",
    "edad": "Adulto",
    "tamaño": "Mediano",
    "estado": "Reservado",
    "descripcion": "Nala es independiente, suave y necesita un hogar con paciencia y amor.",
    "foto": "images/mascotas/nala.jpg",
    "imagen": "images/mascotas/nala.jpg",
    "genero": "hembra"
  },
  {
    "id": 9,
    "nombre": "Bella",
    "especie": "Perro",
    "raza": "Pomerania",
    "edad": "Cachorro",
    "tamaño": "Pequeño",
    "estado": "Disponible",
    "descripcion": "Bella es dulce, llena de energía y perfecta para una familia con niños.",
    "foto": "images/mascotas/bella.jpg",
    "imagen": "images/mascotas/bella.jpg",
    "genero": "hembra"
  },
  {
    "id": 10,
    "nombre": "Simba",
    "especie": "Gato",
    "raza": "Mestizo",
    "edad": "Joven",
    "tamaño": "Mediano",
    "estado": "Disponible",
    "descripcion": "Simba es curioso, cariñoso y disfruta explorar cada rincón de la casa.",
    "foto": "images/mascotas/simba.jpg",
    "imagen": "images/mascotas/simba.jpg",
    "genero": "macho"
  },
  {
    "id": 11,
    "nombre": "Coco",
    "especie": "Perro",
    "raza": "Golden",
    "edad": "Adulto",
    "tamaño": "Grande",
    "estado": "Reservado",
    "descripcion": "Coco se lleva bien con personas y otros animales, ideal para un hogar activo.",
    "foto": "images/mascotas/coco.jpg",
    "imagen": "images/mascotas/coco.jpg",
    "genero": "macho"
  },
  {
    "id": 12,
    "nombre": "Milo",
    "especie": "Gato",
    "raza": "Mestizo",
    "edad": "Cachorro",
    "tamaño": "Pequeño",
    "estado": "Urgente",
    "descripcion": "Milo es enérgico, curioso y listo para dar amor a su nuevo hogar.",
    "foto": "images/mascotas/milo.jpg",
    "imagen": "images/mascotas/milo.jpg",
    "genero": "macho"
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
    // fetch debe usar ruta relativa sobre HTTP/HTTPS (o funcionar con Live Server / GitHub Pages)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const datos = await response.json();
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.warn('fetch falló, usando datos de respaldo:', error.message || error);
    // Garantizar que siempre se retorne un array
    return Array.isArray(fallback) ? fallback : [];
  }
}

async function actualizarContadoresDeMascotas() {
    const mascotas = await cargarJSONConFallback('./data/mascotas.json', FALLBACK_MASCOTAS);
    const total = mascotas.length;
    const perros = mascotas.filter((mascota) => mascota.especie.toLowerCase() === 'perro').length;
    const gatos = mascotas.filter((mascota) => mascota.especie.toLowerCase() === 'gato').length;

    contadorTotal.textContent = total;
    contadorPerros.textContent = perros;
    contadorGatos.textContent = gatos;
}

async function cargarHistorias() {
    contenedorCasos.innerHTML = '<p class="estado-cargando">Cargando historias...</p>';
    const historias = await cargarJSONConFallback('./data/historias.json', FALLBACK_HISTORIAS);
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
