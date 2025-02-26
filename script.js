const cajaLista = document.getElementById("listaDragonBall");

fetch("https://dragonball-api.com/api/characters?limit=1000")
    .then((response) => response.json())
    .then((data) => {
        data.items.forEach((item) => {
            console.log(item);
            const {
                id,
                name,
                ki,
                maxKi,
                race,
                gender,
                description,
                image,
                affiliation,
                deletedAt,
            } = item;
            cajaLista.innerHTML +=
                "<div class='cajaPersonaje'><h1>" +
                name +
                "</h1><img src=" +
                image +
                "><p><b>KI:</b> " +
                ki +
                "</p><p><b>MAX KI:</b> " +
                maxKi +
                "</p><p><b>RACE:</b> " +
                race +
                "</p><p><b>GENDER:</b> " +
                gender +
                "</p><p><b>DESCRIPTION:</b> " +
                description +
                "</p><p><b>AFFILIATION:</b> " +
                affiliation +
                "</p><p><b>DELETED AT:</b> " +
                deletedAt +
                "</p></div>";
        });
    });
