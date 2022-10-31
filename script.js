class Libro {
	constructor(id, nombre, autor, editorial, precio, stock, img) {
		this.id = id;
		this.nombre = nombre.toUpperCase();
		this.autor = autor.toUpperCase();
		this.editorial = editorial.toUpperCase();
		this.precio = precio;
		this.stock = stock;
		this.img = img;
	}
}

const libros = [
	(harryPotter1 = new Libro(
		1,
		"Harry Potter y el P. de Azkaban",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_pa.jpg"
	)),
	(harryPotter2 = new Libro(
		2,
		"Harry Potter y el misterio del principe",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_misterioprin.jpg"
	)),
	(harryPotter3 = new Libro(
		3,
		"Harry Potter y la orden del fénix",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_ordenfenix.jpg"
	)),
	(harryPotter4 = new Libro(
		4,
		"Harry Potter y la cámara secreta",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_camsecret.jpg"
	)),
	(harryPotter5 = new Libro(
		5,
		"Harry Potter y el cáliz de fuego",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_calizfuego.jpg"
	)),
	(harryPotter6 = new Libro(
		6,
		"Harry Potter y la piedra filosofal",
		"J. K. Rowling",
		"Bloomsbury",
		4500,
		10,
		"./libros/hp_piedrafi.jpg"
	)),
];

// const contenedorProductos = document.getElementById("contenedor-productos");

function pintarLibros() {
	for (const producto of libros) {
		let column = document.createElement("div");
		column.className = "col-md-4 mt-3 ";
		column.id = `columna-${producto.id}`;
		column.innerHTML = `
      <div class="card">
          <div class="card-body">
          <img src="${producto.img}" alt="producto" id="mouse">    
          <p class="card-text"><b>${producto.nombre}</b></p>
          <p class="card-text">${producto.autor}</p>
          <p class="card-text">Precio: $<b>${producto.precio}</b></p>
          <button onclick= "guardarEnCarrito(${producto.id})" class= "buy">Comprar</button>
          </div>
      </div>
      </div>`;

		contenedorProductos.append(column);
	}
}

// contenedor();
function guardarEnCarrito(productoId) {
	let item = libros.find((producto) => producto.id === productoId);

	item.stock -= 1;
	carrito_real.push(item);
	renderCarrito();
	calcularTotal();
}

const contenedorCarrito = document.querySelector("#contenedor");

const renderCarrito = () => {
	contenedorCarrito.innerHTML = "";

	console.log("carrito_real", carrito_real);

	carrito_real.forEach((item) => {
		let div = document.createElement("div");
		div.innerHTML = `
         <div id='card2'>
         <div id='imgBox2'>
         <img src=${item.img} alt="">
         </div>
         </div>
         <p>${item.nombre} </p>
         <p>Precio: ${item.precio} </p>
         <button onclick="eliminarItem(${item.id})">Eliminar del Carrito</button>
         `;
		contenedorCarrito.append(div);
	});
};

const eliminarItem = (id) => {
	let borrar = carrito_real.find((producto) => producto.id === id);
	let indice = carrito_real.indexOf(borrar);
	carrito_real.splice(indice, 1);
	renderCarrito();
	calcularTotal();
};

const divPrecio = document.querySelector("#precioTotal");

calcularTotal = () => {
	let cont = 0;

	console.log("carrito", carrito_real);
	carrito_real.forEach((pre) => {
		console.log("pre", pre);
		cont += pre.precio;
	});

	divPrecio.innerHTML = cont;
};

/* Cargar nuevo producto*/

let productos = [];
let carrito_real = [];

let formulario;
let inputId;
let inputNombre;
let inputAutor;
let inputEditorial;
let inputPrecioVenta;
let inputCantidad;
let contenedorProductos;

class Producto {
	constructor(id, nombre, autor, editorial, precioVenta, cantidad) {
		this.id = id;
		this.nombre = nombre.toUpperCase();
		this.autor = autor.toUpperCase();
		this.editorial = editorial.toUpperCase();
		this.precioVenta = precioVenta;
		this.cantidad = cantidad;
	}

	calcularPrecioVenta = () => this.precioVenta * this.cantidad;
}

function inicializarElementos() {
	nombreUsuario = document.getElementById("nombreUsuario");
	btnLogin = document.getElementById("btn-login");

	registro = document.getElementById("contenedor-login");

	inputCorreo = document.getElementById("inputCorreo");
	inputContrasenia = document.getElementById("inputContrasenia");

	formulario = document.getElementById("formulario");
	inputId = document.getElementById("inputId");
	inputNombre = document.getElementById("inputNombreProducto");
	inputAutor = document.getElementById("inputAutorProducto");
	inputEditorial = document.getElementById("inputEditorialProducto");
	inputPrecioVenta = document.getElementById("inputPrecioVenta");
	inputCantidad = document.getElementById("inputCantidad");
	contenedorProductos = document.getElementById("contenedorProductos");
}

function inicializarEventos() {
	formulario.onsubmit = (event) => validarFormulario(event);
	console.log("btnLogin", btnLogin);
	registro.onsubmit = (event) => bienvenidaUsuario(event);
}

function pintarUsuario() {
	let user = localStorage.getItem("nombreUsuario");
	nombreUsuario.innerHTML = ` Bienvenido ${user}`;
	nombreUsuario.classList.add("usuario-registrado");

	Swal.fire({
		icon: "success",
		color: "#ffffff",
		text: "¡Hola, 		Bienvenid@ a la Tiendita del libro!",
		success: true,
	});
}

function bienvenidaUsuario(event) {
	console.log("entro bbienvenidaUsuario");
	event.preventDefault();
	let usuario = inputCorreo.value;
	localStorage.setItem("nombreUsuario", usuario);
	pintarUsuario();
}

function validarFormulario(event) {
	event.preventDefault();
	let idProducto = inputId.value;
	let nombre = inputNombre.value;
	let autor = inputAutor.value;
	let editorial = inputEditorial.value;
	let precioVenta = parseFloat(inputPrecioVenta.value);
	let cantidad = parseInt(inputCantidad.value);

	const idExiste = productos.some((producto) => producto.id === idProducto);

	if (!idExiste) {
		let producto = new Producto(
			idProducto,
			nombre,
			autor,
			editorial,
			precioVenta,
			cantidad
		);

		productos.push(producto);
		formulario.reset();

		mostrarProductos();
	} else {
		alert("El id ya existe");
	}
}

function eliminarProducto(idProducto) {
	let columnaBorrar = document.getElementById(`columna-${idProducto}`);
	let indiceBorrar = productos.findIndex(
		(producto) => Number(producto.id) === Number(idProducto)
	);

	productos.splice(indiceBorrar, 1);
	columnaBorrar.remove();
}

function mostrarProductos() {
	console.log("contenedorProductos", contenedorProductos);

	// contenedorProductos.innerHTML = "";

	productos.forEach((producto) => {
		let column = document.createElement("div");
		column.className = "col-md-4 mt-3";
		column.id = `columna-${producto.id}`;
		column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <img src="./libros/libro_generico.png" alt="producto" id="mouse">   
                <p class="card-text">ID:
                    <b>${producto.id}</b>
                </p>
                <p class="card-text">Nombre:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Autor:
                    <b>${producto.autor}</b>
                </p>
                <p class="card-text">Editorial:
                    <b>${producto.editorial}</b>
                </p>
                <p class="card-text">Precio venta:
                    <b>${producto.precioVenta}</b>
                </p>
                <p class="card-text">Cantidad:
                    <b>${producto.cantidad}</b>
                </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                </div>
            </div>`;

		contenedorProductos.append(column);

		let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
		botonEliminar.onclick = () => eliminarProducto(producto.id);
	});
}


/*---Fetch---*/

async function consultarProductosServer() {
	try {
	  const response = await fetch("https://hp-api.herokuapp.com/api/characters"
	  );
	  const data = await response.json();
	  productos = [...data];
	  pintarLibros();
	} catch (error) {
	  console.log(error);
	}
  }


function main() {
	inicializarElementos();
	inicializarEventos();
	pintarLibros();
	consultarProductosServer();
	
}

main();



