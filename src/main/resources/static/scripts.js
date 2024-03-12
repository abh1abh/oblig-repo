let kinobilleter = [];

function visError(id, message) {
    const element = document.getElementById(id);
    element.innerHTML = message;
    element.style.color = "red";
}

function kjopBillett(){
    const film = document.getElementById("film");
    const antall = document.getElementById("antallBilleter");
    const fornavn = document.getElementById("fornavn");
    const etternavn = document.getElementById("etternavn");
    const telefonnr = document.getElementById("telefonnr");
    const epost = document.getElementById("epost");

    let error = false;
    if(film.value === ""){
        visError("errorFilm", "Ikke valgt film")
        error = true;
    }

    const antallTest = Number(antall.value)
    if(isNaN(antallTest) || antallTest < 1 ) {
        visError("errorAntall", "Ikke tastet inn riktig")
        error = true;
    }

    if( fornavn.value === "" ) {
        visError("errorFornavn", "Ikke tastet inn fornavn")
        error = true;
    }

    if( etternavn.value === "" ) {
        visError("errorEtternavn", "Ikke tastet inn etternavn")
        error = true;
    }

    const resultTelefonnr = /^\d+$/.test(telefonnr.value);
    if (!resultTelefonnr) {
        visError("errorTelefonnr", "Ikke tastet inn gyldig telefonnummer (kun tall)");
        error = true;
    }

    const resultEpost = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost.value);
    if (epost.value === "" || !resultEpost) {
        visError("errorEpost", "Ikke tastet inn gyldig epostadresse");
        error = true;
    }

    if (error){
        return;
    }

    const nyBillet = {
        film: film.value,
        antall: antall.value,
        fornavn: fornavn.value,
        etternavn: etternavn.value,
        telefonnr: telefonnr.value,
        epost: epost.value
    };

    kinobilleter.push(nyBillet);

    visBilleter();

    film.value = "";
    antall.value = "";
    fornavn.value = "";
    etternavn.value = "";
    telefonnr.value = "";
    epost.value = "";
    document.getElementById("errorAntall").innerHTML="";
    document.getElementById("errorFilm").innerHTML="";
    document.getElementById("errorFornavn").innerHTML="";
    document.getElementById("errorEtternavn").innerHTML="";
    document.getElementById("errorTelefonnr").innerHTML="";
    document.getElementById("errorEpost").innerHTML="";
}

function visBilleter(){
    let ut = "<table><tr><th>Film</th><th>Antall Billeter</th><th>Navn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (let person of kinobilleter){
        ut += "<tr>" +
            "<td>" + person.film + "</td>" +
            "<td>" + person.antall + "</td>" +
            "<td>" + person.fornavn + " " + person.etternavn + "</td>" +
            "<td>" + person.telefonnr + "</td>" +
            "<td>" + person.epost + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    document.getElementById("output").innerHTML=ut;
}

function slettKinobillettListe(){
    kinobilleter=[];
    document.getElementById("output").innerHTML="";

}