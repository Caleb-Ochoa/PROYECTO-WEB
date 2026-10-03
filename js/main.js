// ---------- Datos (luego se pueden reemplazar por una API o localStorage) ----------
const usuario = { nombre: 'Laura' };

const indicadores = [
  { etiqueta: 'Total de productos',       valor: '126',        nota: '+8 este mes',        icono: 'package' },
  { etiqueta: 'Productos con poco stock', valor: '13',         nota: 'Requieren atención', icono: 'triangle-alert', alerta: true },
  { etiqueta: 'Valor del inventario',     valor: '$8.450.000', nota: '+5,4% este mes',     icono: 'wallet-cards' },
  { etiqueta: 'Ventas realizadas',        valor: '348',        nota: '+12,6% este mes',    icono: 'badge-dollar-sign' },
];

const productos = {
  arroz:  { nombre: 'Arroz Diana',     categoria: 'Granos',   precio: 4500,  stock: 25, img: 'img/arroz.jpg' },
  leche:  { nombre: 'Leche Entera',    categoria: 'Lácteos',  precio: 3800,  stock: 42, img: 'img/leche.jpg' },
  aceite: { nombre: 'Aceite Premier',  categoria: 'Despensa', precio: 12900, stock: 8,  img: 'img/aceite.jpg' },
  cafe:   { nombre: 'Café Sello Rojo', categoria: 'Bebidas',  precio: 8500,  stock: 5,  img: 'img/cafe.jpg' },
  frijol: { nombre: 'Frijol Rojo',     categoria: 'Granos',   precio: 6200,  stock: 17, img: 'img/frijol.jpg' },
};

const recientes = ['arroz', 'leche', 'aceite', 'cafe'].map(k => productos[k]);
const stockBajo = ['cafe', 'aceite', 'frijol'].map(k => productos[k]);

const UMBRAL_STOCK_BAJO = 10; // por debajo o igual se muestra en amarillo

// ---------- Utilidades ----------
const $ = id => document.getElementById(id);
const moneda = n => '$' + n.toLocaleString('es-CO');
const mayuscula = s => s.charAt(0).toUpperCase() + s.slice(1);

function saludoSegunHora(h) {
  if (h < 12) return 'Buenos días';
  if (h < 19) return 'Buenas tardes';
  return 'Buenas noches';
}

// ---------- Render ----------
function renderEncabezado() {
  const ahora = new Date();
  $('saludo').textContent = `¡${saludoSegunHora(ahora.getHours())}, ${usuario.nombre}!`;

  const corta = ahora.toLocaleDateString('es-CO', { day: 'numeric', month: 'long' });
  $('subtitulo').textContent = `Aquí tienes el resumen de tu tienda para hoy, ${corta}.`;

  const larga = ahora.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  $('fecha').textContent = mayuscula(larga);
}

function renderIndicadores() {
  $('indicadores').innerHTML = indicadores.map(i => `
    <article class="tarjeta indicador${i.alerta ? ' alerta' : ''}">
      <div class="indicador-cabecera">
        <span>${i.etiqueta}</span>
        <span class="indicador-icono"><i class="icono" data-lucide="${i.icono}"></i></span>
      </div>
      <div class="indicador-valor">${i.valor}</div>
      <div class="indicador-nota">${i.nota}</div>
    </article>`).join('');
}

function filaProducto(p) {
  const bajo = p.stock <= UMBRAL_STOCK_BAJO;
  return `
    <div class="producto">
      <div class="producto-img" style="background-image:url('${p.img}')" role="img" aria-label="${p.nombre}"></div>
      <div class="producto-info">
        <span class="producto-nombre">${p.nombre}</span>
        <span class="producto-categoria">${p.categoria}</span>
      </div>
      <span class="producto-precio">${moneda(p.precio)}</span>
      <span class="etiqueta-stock${bajo ? ' bajo' : ''}">${p.stock} uds.</span>
    </div>`;
}

function renderListas() {
  $('recientes').innerHTML = recientes.map(filaProducto).join('');
  $('stockBajo').innerHTML = stockBajo.map(filaProducto).join('');
}

// ---------- Menú móvil ----------
function iniciarMenu() {
  const sidebar = $('sidebar');
  $('menuBtn').addEventListener('click', () => sidebar.classList.toggle('abierto'));
  document.addEventListener('click', e => {
    if (!sidebar.contains(e.target) && !$('menuBtn').contains(e.target)) sidebar.classList.remove('abierto');
  });
}

renderEncabezado();
renderIndicadores();
renderListas();
iniciarMenu();
lucide.createIcons(); // convierte cada <i data-lucide="..."> en su ícono