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
                "<p>" +
                id +
                "</p><p>" +
                name +
                "</p><p>" +
                ki +
                "</p><p>" +
                maxKi +
                "</p><p>" +
                race +
                "</p><p>" +
                gender +
                "</p><p>" +
                description +
                "</p><img src=" +
                image +
                "></><p>" +
                affiliation +
                "</p><p>" +
                deletedAt +
                " </p>";
            ("</p><p>");
        });
    });
