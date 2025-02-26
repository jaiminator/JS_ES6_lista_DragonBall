const cajaLista = document.getElementById("listaDragonBall");

fetch("https://dragonball-api.com/api/characters?limit=1000")
    .then((response) => response.json())
    .then((listaPersonajes) => {
        listaPersonajes.items.forEach((personaje) => {
            /* console.log(personaje); */
            const {
                name,
                description,
                image,
            } = personaje;
            cajaLista.innerHTML +=
                "<div class='cajaPersonaje'><h1>" +
                name +
                "</h1><img src=" +
                image +
                "><p><b>DESCRIPCIÓN:</b> " +
                description +
                "</p></div>";
        });
    });
