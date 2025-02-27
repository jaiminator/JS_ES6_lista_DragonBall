const cajaLista = document.getElementById("listaDragonBall");
const inputBusqueda = document.getElementById("inputBusqueda");
/* const botonBusqueda = document.getElementById("botonBusqueda");
botonBusqueda.addEventListener("click", buscarPersonajes); */
const previousButton = document.getElementById("previousButton");
previousButton.addEventListener("click", paginaAnterior);
const nextButton = document.getElementById("nextButton");
nextButton.addEventListener("click", paginaSiguiente);

function mostrarPersonajes() {
    fetch("https://dragonball-api.com/api/characters?page=1&limit=10")
        .then((response) => response.json())
        .then((listaPersonajes) => {
            
            previousButton.setAttribute("href", listaPersonajes.links.previous);
            nextButton.setAttribute("href", listaPersonajes.links.next);
            
            listaPersonajes.items.forEach((personaje) => {
                /* console.log(personaje); */
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

function paginaAnterior() {
    fetch(previousButton.getAttribute("href"))
        .then((response) => response.json())
        .then((listaPersonajes) => {
            if (listaPersonajes.meta.currentPage == 1) {
                previousButton.setAttribute("disabled", "true");
            }

            previousButton.setAttribute("disabled", "false");

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

function paginaSiguiente() {
    fetch(nextButton.getAttribute("href"))
        .then((response) => response.json())
        .then((listaPersonajes) => {

            if (listaPersonajes.meta.currentPage == 6) {
                nextButton.setAttribute("disabled", "true");
            }
            nextButton.removeAttribute("disabled");

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

/* function buscarPersonajes() {
    fetch(
        "https://dragonball-api.com/api/characters?name=" + inputBusqueda.value
    )
        .then((response) => response.json())
        .then((personajesFilter) => {
            if (inputBusqueda.value != "") {
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
                mostrarPersonajes();
            }
        })
        .catch((error) => console.log("ERROR AL OBTENER PERSONAJES FILTRADOS", error));
}
 */

mostrarPersonajes();