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

//OBTENEMOS LOS SELECT DEL MENÚ DE FILTROS
const selectGender = document.getElementById("selectGender");
const selectRace = document.getElementById("selectRace");
const selectAffiliation = document.getElementById("selectAffiliation");
//OBTENEMOS LOS BOTONES  DEL MENÚ DE FILTROS Y AÑADIMOS EVENTOS
const buttonFilter = document.getElementById("buttonFilter");
buttonFilter.addEventListener("click", mostrarPersonajesFiltrados);
const buttonDeleteFilter = document.getElementById("buttonDeleteFilter");
buttonDeleteFilter.addEventListener("click", mostrarPersonajesInicial);

//MUESTRA GENERAL DE CONTENIDO
//MOSTRAMOS EL CONTENIDO DE LOS PERSONAJES MEDIANTE EL PARÁMETRO data
function mostrarListaPersonajes(data) {
    const { name, description, image } = data;
        cajaLista.innerHTML +=
            "<div class='cajaPersonaje'><h1>" +
            name +
            "</h1><img src=" +
            image +
            "><p><b>DESCRIPCIÓN:</b> " +
            description +
            "</p></div>"; 
}

//MOSTRAMOS LA LISTA INICIAL CON LOS 10 PRIMEROS PERSONAJES
function mostrarPersonajesInicial() {
    fetch("https://dragonball-api.com/api/characters?page=1&limit=10") //HACEMOS PETICIÓN API_FETCH A UNA URL
    .then(response => response.json())    //OBTENEMOS LA RESPUESTA Y LA DEVOLVEMOS EN FORMATO JSON
    .then(listaPersonajes => {    //MANIPULAMOS LOS DATOS DE LA RESPUESTA OBTENIDA
        cajaLista.innerHTML = "";
        previousButton.setAttribute("disabled", "true");    //ATRIBUTO 'disabled' AL BOTÓN 
        nextButton.removeAttribute("disabled");
        selectGender.value = "";
        selectRace.value = "";
        nextButton.setAttribute("href", listaPersonajes.links.next); //ATRIBUTO 'href' AL BOTÓN SIGUIENTE
            listaPersonajes.items.forEach(personaje => {     //RECORREMOS PARA CADA 'personaje' DE 'listaPersonajes'
                mostrarListaPersonajes(personaje);
            });
        })
        .catch(error => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error)); //MANEJO DE POSIBLES ERRORES
}

//MENÚ FILTROS
//MOSTRAMOS LOS PERSONAJES FILTADROS SEGÚN LAS OPCIONES DEL MENÚ FILTRO
function mostrarPersonajesFiltrados() {
    const encoredRace = encodeURIComponent(selectRace.value);
    const encoredAffiliation = encodeURIComponent(selectAffiliation.value);
    let filters = "";
    if (selectGender.value) {
        filters += "&gender="+selectGender.value;
    }
    if (selectRace.value) {
        filters += "&race="+encoredRace;
    } 
    if (selectAffiliation.value) {
        filters += "&affiliation="+encoredAffiliation;
    }
    fetch("https://dragonball-api.com/api/characters?"+filters)
        .then(response => response.json())
        .then(data => {
            cajaLista.innerHTML = "";
            let personajes = [];
            if(data.items){
                personajes = data.items;
                nextButton.removeAttribute("disabled");
            } else {
                personajes = data;
                previousButton.setAttribute("disabled", "true");
                nextButton.setAttribute("disabled", "true");
            }
            personajes.forEach(data => {
                mostrarListaPersonajes(data);
            })
        })
        .catch(error => console.log("ERROR AL OBTENER PERSONAJES FILTRADOS",error))
}

//BÚSQUEDA
//MOSTRAMOS LA LISTA DE PERSONAJES SEGÚN LO INTRODUCIDO EN EL CUADRO DE BÚSQUEDA
function buscarPersonajes() {
    fetch(
        "https://dragonball-api.com/api/characters?name=" + inputBusqueda.value
    )
        .then(response => response.json())
        .then(data => {
            if (inputBusqueda.value != "") {
                previousButton.setAttribute("disabled", "true");
                nextButton.setAttribute("disabled", "true");
                cajaLista.innerHTML = "";
                data.forEach(data => {
                    mostrarListaPersonajes(data);
                });
            } else {
                cajaLista.innerHTML = "";
                previousButton.setAttribute("disabled", "true");
                nextButton.removeAttribute("disabled");
                mostrarPersonajesInicial();
            }
        })
        .catch(error => console.log("ERROR AL OBTENER LOS PERSONAJES FILTRADOS", error));
}

//PAGINACIÓN
//MOSTRAMOS LA LISTA CON LOS 10 PERSONAJES ANTERIORES
function paginaAnterior() {
    fetch(previousButton.getAttribute("href")) //SACAMOS EL VALOR 'href' DEL BOTÓN ANTERIOR Y LE HACEMOS PETICIÓN
        .then(response => response.json())
        .then(listaPersonajes => {
            if (listaPersonajes.meta.currentPage == 1) { //SI LA PÁGINA ACTUAL ES 1...
                previousButton.setAttribute("disabled", "true");    //...SE DESHABILITARÁ EL BOTÓN ANTERIOR
            }
            nextButton.removeAttribute("disabled"); //EL BOTÓN SIGUIENTE SE HABILITA

            //AÑADIMOS ENLACES CON LOS VALORES DE LAS URL ANTERIOR Y POSTERIOR
            previousButton.setAttribute("href", listaPersonajes.links.previous);
            nextButton.setAttribute("href", listaPersonajes.links.next);

            cajaLista.innerHTML = "";
            listaPersonajes.items.forEach(personaje => {
                mostrarListaPersonajes(personaje);
            });
        })
        .catch(error => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error));
}

//MOSTRAMOS LA LISTA CON LOS 10 PERSONAJES SIGUIENTES
function paginaSiguiente() {
    fetch(nextButton.getAttribute("href"))  //SACAMOS EL VALOR 'href' DEL BOTÓN SIGUIENTE Y LE HACEMOS PETICIÓN
        .then(response => response.json())
        .then(listaPersonajes => {

            if (listaPersonajes.meta.currentPage == 6) {    //SI LA PÁGINA ACTUAL ES 6...
                nextButton.setAttribute("disabled", "true");    //...SE DESHABILITARÁ EL BOTÓN SIGUIENTE
            }
            previousButton.removeAttribute("disabled"); //EL BOTÓN ANTERIOR SE HABILITA

            //AÑADIMOS ENLACES CON LOS VALORES DE LAS URL ANTERIOR Y POSTERIOR
            previousButton.setAttribute("href", listaPersonajes.links.previous);
            nextButton.setAttribute("href", listaPersonajes.links.next);

            cajaLista.innerHTML = "";
            listaPersonajes.items.forEach(personaje => {
                mostrarListaPersonajes(personaje);
            });
        })
        .catch(error => console.log("ERROR AL OBTENER LA LISTA DE PERSONAJES", error));
}

mostrarPersonajesInicial(); //LLAMAMOS A ESTA FUNCIÓN AL INICIAR LA PÁGINA WEB