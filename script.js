//OBTENEMOS LA CAJA-LISTA CON LOS PERSONAJES
const cajaLista = document.getElementById("listaDragonBall");

const inputBusqueda = document.getElementById("inputBusqueda");
const botonBusqueda = document.getElementById("botonBusqueda");
inputBusqueda.addEventListener("keyup", buscarPersonajes);

//OBTENEMOS Y AÑADIMOS EVENTOS A LOS BOTONES DE PAGINAGIÓN
const previousButton = document.getElementById("previousButton");
previousButton.addEventListener("click", paginaAnterior);
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", paginaSiguiente);

//OBTENEMOS LOS SELECT Y EL BOTÓN DEL MENÚ DE FILTROS
const selectGender = document.getElementById("selectGender");
const selectRace = document.getElementById("selectRace");
const buttonFilter = document.getElementById("buttonFilter");
buttonFilter.addEventListener("click", mostrarPersonajesFiltrados);

function mostrarPersonajesFiltrados() {
    const encoredRace = encodeURIComponent(selectRace.value);

    fetch("https://dragonball-api.com/api/characters?gender="+selectGender.value+"&race="+encoredRace)
    .then((response) => response.json())
    .then((filtrados) => {
        previousButton.setAttribute("disabled", "true");
        nextButton.setAttribute("disabled", "true");
        cajaLista.innerHTML = "";
        filtrados.forEach((filtro) => {
            const { name, description, image } = filtro;
                cajaLista.innerHTML +=
                    "<div class='cajaPersonaje'><h1>" +
                    name +
                    "</h1><img src=" +
                    image +
                    "><p><b>DESCRIPCIÓN:</b> " +
                    description +
                    "</p></div>"; 
        })
    })
}

//MOSTRAMOS LA LISTA INICIAL CON LOS 10 PRIMEROS PERSONAJES
function mostrarPersonajes() {
    fetch("https://dragonball-api.com/api/characters?page=1&limit=10") //HACEMOS PETICIÓN API_FETCH A UNA URL
    .then((response) => response.json())    //OBTENEMOS LA RESPUESTA Y LA DEVOLVEMOS EN FORMATO JSON
    .then((listaPersonajes) => {    //MANIPULAMOS LOS DATOS DE LA RESPUESTA OBTENIDA
        
        previousButton.setAttribute("disabled", "true");    //ATRIBUTO 'disabled' AL BOTÓN ANTERIOR
        nextButton.setAttribute("href", listaPersonajes.links.next); //ATRIBUTO 'href' AL BOTÓN SIGUIENTE
            listaPersonajes.items.forEach((personaje) => {     //RECORREMOS PARA CADA 'personaje' DE 'listaPersonajes'
                const { name, description, image } = personaje; //DESTRUCTURACIÓN DE PERSONAJE
                cajaLista.innerHTML +=      //INSERTAMOS ELEMENTOS HTML A LA CAJA-LISTA DE PERSONAJES
                    "<div class='cajaPersonaje'><h1>" +
                    name +
                    "</h1><img src=" +
                    image +
                    "><p><b>DESCRIPCIÓN:</b> " +
                    description +
                    "</p></div>";
            });
        })
        .catch((error) => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error)); //MANEJO DE POSIBLES ERRORES
}

//MOSTRAMOS LA LISTA CON LOS 10 PERSONAJES ANTERIORES
function paginaAnterior() {
    fetch(previousButton.getAttribute("href")) //SACAMOS EL VALOR 'href' DEL BOTÓN ANTERIOR Y LE HACEMOS PETICIÓN
        .then((response) => response.json())
        .then((listaPersonajes) => {
            if (listaPersonajes.meta.currentPage == 1) { //SI LA PÁGINA ACTUAL ES 1...
                previousButton.setAttribute("disabled", "true");    //...SE DESHABILITARÁ EL BOTÓN ANTERIOR
            }
            nextButton.removeAttribute("disabled"); //EL BOTÓN SIGUIENTE SE HABILITA

            //AÑADIMOS ENLACES CON LOS VALORES DE LAS URL ANTERIOR Y POSTERIOR
            previousButton.setAttribute("href", listaPersonajes.links.previous);
            nextButton.setAttribute("href", listaPersonajes.links.next);

            cajaLista.innerHTML = "";
            listaPersonajes.items.forEach((personaje) => {
                const { name, description, image } = personaje;
                cajaLista.innerHTML +=
                    "<div class='cajaPersonaje'><h1>" +
                    name +
                    "</h1><img src=" +
                    image +
                    "><p><b>DESCRIPCIÓN:</b> " +
                    description +
                    "</p></div>";
            });
        })
        .catch((error) => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error));
}

//MOSTRAMOS LA LISTA CON LOS 10 PERSONAJES SIGUIENTES
function paginaSiguiente() {
    fetch(nextButton.getAttribute("href"))  //SACAMOS EL VALOR 'href' DEL BOTÓN SIGUIENTE Y LE HACEMOS PETICIÓN
        .then((response) => response.json())
        .then((listaPersonajes) => {

            if (listaPersonajes.meta.currentPage == 6) {    //SI LA PÁGINA ACTUAL ES 6...
                nextButton.setAttribute("disabled", "true");    //...SE DESHABILITARÁ EL BOTÓN SIGUIENTE
            }
            previousButton.removeAttribute("disabled"); //EL BOTÓN ANTERIOR SE HABILITA

            //AÑADIMOS ENLACES CON LOS VALORES DE LAS URL ANTERIOR Y POSTERIOR
            previousButton.setAttribute("href", listaPersonajes.links.previous);
            nextButton.setAttribute("href", listaPersonajes.links.next);

            cajaLista.innerHTML = "";
            listaPersonajes.items.forEach((personaje) => {
                const { name, description, image } = personaje;
                cajaLista.innerHTML +=
                    "<div class='cajaPersonaje'><h1>" +
                    name +
                    "</h1><img src=" +
                    image +
                    "><p><b>DESCRIPCIÓN:</b> " +
                    description +
                    "</p></div>";
            });
        })
        .catch((error) => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error));
}

//MOSTRAMOS LA LISTA DE PERSONAJES SEGÚN LO INTRODUCIDO EN EL CUADRO DE BÚSQUEDA
function buscarPersonajes() {
    fetch(
        "https://dragonball-api.com/api/characters?name=" + inputBusqueda.value
    )
        .then((response) => response.json())
        .then((personajesFilter) => {
            if (inputBusqueda.value != "") {
                previousButton.setAttribute("disabled", "true");
                nextButton.setAttribute("disabled", "true");
                cajaLista.innerHTML = "";
                personajesFilter.forEach((personajes) => {
                    const { name, description, image } = personajes;
                    cajaLista.innerHTML +=
                        "<div class='cajaPersonaje'><h1>" +
                        name +
                        "</h1><img src=" +
                        image +
                        "><p><b>DESCRIPCIÓN:</b> " +
                        description +
                        "</p></div>";
                });
            } else {
                cajaLista.innerHTML = "";
                previousButton.setAttribute("disabled", "true");
                nextButton.removeAttribute("disabled");
                mostrarPersonajes();
            }
        })
        .catch((error) => console.log("ERROR AL OBTENER PERSONAJES FILTRADOS", error));
}
mostrarPersonajes(); //LLAMAMOS A ESTA FUNCIÓN AL INICIAR LA PÁGINA WEB