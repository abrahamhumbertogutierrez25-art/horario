const diaActual = document.getElementById("diaActual");
const horarioHoy = document.getElementById("horarioHoy");
const estado = document.getElementById("estado");
const estadoGrande = document.getElementById("estadoGrande");
const horaActualTexto = document.getElementById("horaActual");
const proximoDia = document.getElementById("proximoDia");
const botonModo = document.getElementById("botonModo");

const dias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
];

const horarios = {

    Lunes: {
        despertar: "09:00",
        clases: [
            "10:00 - Itinerari personal",
            "11:30 - Itinerari personal",
            "12:30 - Aplicacions web",
            "13:30 - Aplicacions web"
        ]
    },

    Martes: {
        despertar: "08:00",
        clases: [
            "09:00 - Sistemes operatius",
            "10:00 - Sistemes operatius",
            "11:30 - Serveis de xarxes",
            "12:30 - Serveis de xarxes"
        ]
    },

    Miércoles: {
        despertar: "08:00",
        clases: [
            "09:00 - Projecte intermodular",
            "10:00 - Projecte intermodular",
            "11:30 - Tutoria"
        ]
    },

    Jueves: {
        despertar: "07:00",
        clases: [
            "08:00 - Seguretat informàtica",
            "09:00 - Seguretat informàtica",
            "10:00 - Seguretat informàtica",
            "11:30 - Projecte intermodular",
            "12:30 - Projecte intermodular"
        ]
    },

    Viernes: {
        despertar: "07:00",
        clases: [
            "08:00 - Projecte intermodular",
            "09:00 - Projecte intermodular",
            "10:00 - Serveis de xarxes",
            "11:30 - Serveis de xarxes",
            "12:30 - Sistemes operatius",
            "13:30 - Sistemes operatius"
        ]
    }

};

function actualizarDia() {

    const hoy = new Date();
    const nombreDia = dias[hoy.getDay()];

    diaActual.textContent =
        "Hoy es " + nombreDia;
}

function mostrarHora() {

    const ahora = new Date();

    const horas =
        String(ahora.getHours()).padStart(2, "0");

    const minutos =
        String(ahora.getMinutes()).padStart(2, "0");

    horaActualTexto.textContent =
        `🕒 ${horas}:${minutos}`;
}

function mostrarHorario() {

    const hoy = new Date();
    const nombreDia = dias[hoy.getDay()];

    if (!horarios[nombreDia]) {

        horarioHoy.innerHTML =
            "<p>Hoy no hay clases. 🎉</p>";

        return;
    }

    let html = "";

    const horaActual =
        hoy.getHours() * 60 +
        hoy.getMinutes();

    horarios[nombreDia].clases.forEach(clase => {

        const partes = clase.split(" - ");

        const horaClase = partes[0];

        const tiempo = horaClase.split(":");

        const inicioClase =
            Number(tiempo[0]) * 60 +
            Number(tiempo[1]);

        const finClase =
            inicioClase + 60;

        if (horaActual >= finClase) {

            html += `
                <div class="clase terminada">
                    ✅ ${clase}
                </div>
            `;

        }

        else if (
            horaActual >= inicioClase &&
            horaActual < finClase
        ) {

            html += `
                <div class="clase actual">
                    🟢 ${clase}
                    <div class="etiqueta">
                        CLASE ACTUAL
                    </div>
                </div>
            `;

        }

        else {

            html += `
                <div class="clase futura">
                    ⏳ ${clase}
                </div>
            `;

        }

    });

    horarioHoy.innerHTML = html;
}

function obtenerEstado() {

    const hoy = new Date();
    const nombreDia = dias[hoy.getDay()];

    if (!horarios[nombreDia]) {

        estadoGrande.innerHTML =
            "🎉 Día libre";

        estado.innerHTML =
            "<h3>Disfrutando del día libre</h3>";

        return;
    }

    const horaEnMinutos =
        hoy.getHours() * 60 +
        hoy.getMinutes();

    const despertar =
        horarios[nombreDia].despertar;

    const partes =
        despertar.split(":");

    const horaDespertar =
        Number(partes[0]) * 60 +
        Number(partes[1]);

    const horaSalida =
        14 * 60 + 30;

    if (horaEnMinutos < horaDespertar) {

        estado.innerHTML = `
            <h3>😴 No despertar a Abraham</h3>
            <p>Todavía está descansando.</p>
            <p>⏰ Despertar: ${despertar}</p>
        `;

        estado.className = "durmiendo";

        estadoGrande.innerHTML =
            "😴 Durmiendo";

        estadoGrande.className =
            "estado-durmiendo";

    }

    else if (horaEnMinutos < horaDespertar + 60) {

        estado.innerHTML = `
            <h3>☀️ ¡Hora de levantar a Abraham!</h3>
            <p>Es momento de empezar el día.</p>
        `;

        estado.className = "despertar";

        estadoGrande.innerHTML =
            "☀️ Levantar a Abraham";

        estadoGrande.className =
            "estado-despertar";

    }

    else if (horaEnMinutos < horaSalida) {

        estado.innerHTML = `
            <h3>📚 Abraham está en clase</h3>
            <p>Actualmente debería estar estudiando.</p>
        `;

        estado.className = "enClase";

        estadoGrande.innerHTML =
            "📚 En clase";

        estadoGrande.className =
            "estado-en-clase";

    }

    else {

        estado.innerHTML = `
            <h3>✅ Abraham ha terminado las clases</h3>
            <p>Ya ha salido del instituto.</p>
        `;

        estado.className = "terminado";

        estadoGrande.innerHTML =
            "✅ Fuera del instituto";

        estadoGrande.className =
            "estado-terminado";

    }

}

function mostrarProximoDia() {

    const hoy = new Date();
    const nombreDia = dias[hoy.getDay()];

    const ordenDias = [
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes"
    ];

    let posicionActual =
        ordenDias.indexOf(nombreDia);

    let siguiente;

    if (posicionActual === 4) {

        siguiente = "Lunes";

    } else {

        siguiente =
            ordenDias[posicionActual + 1];

    }

    const despertar =
        horarios[siguiente].despertar;

    const primeraClase =
        horarios[siguiente].clases[0]
        .split(" - ")[0];

    proximoDia.innerHTML = `
        <p>📅 ${siguiente}</p>
        <p>⏰ Despertar: ${despertar}</p>
        <p>📚 Primera clase: ${primeraClase}</p>
    `;
}
if (localStorage.getItem("modo") === "oscuro") {

    document.body.classList.add("dark-mode");

    botonModo.textContent =
        "☀️ Modo claro";

}

botonModo.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        botonModo.textContent =
            "☀️ Modo claro";

        localStorage.setItem(
            "modo",
            "oscuro"
        );

    } else {

        botonModo.textContent =
            "🌙 Modo oscuro";

        localStorage.setItem(
            "modo",
            "claro"
        );

    }

});
actualizarDia();
mostrarHora();
mostrarHorario();
mostrarProximoDia();
obtenerEstado();

setInterval(() => {

    actualizarDia();
    mostrarHora();
    mostrarHorario();
    mostrarProximoDia();
    obtenerEstado();

}, 1000);

