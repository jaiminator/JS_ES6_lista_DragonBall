const cajaLista = document.getElementById("listaDragonBall");
const inputBusqueda = document.getElementById("inputBusqueda".value);
const botonBusqueda = document.getElementById("botonBusqueda");
botonBusqueda.addEventListener("click", buscarPersonajes);

function mostrarPersonajes() {
    fetch("https://dragonball-api.com/api/characters?limit=1000")
        .then((response) => response.json())
        .then((listaPersonajes) => {
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

function buscarPersonajes() {
    fetch(
        "https://dragonball-api.com/api/characters?name=" + inputBusqueda
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

mostrarPersonajes();