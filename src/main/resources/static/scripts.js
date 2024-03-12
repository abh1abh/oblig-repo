function visError(id, message) {
    $("#" + id).html(message).css("color", "red");
}

function kjopBillett(){
    const film = $("#film").val();
    let antall = $("#antallBilleter").val();
    const fornavn = $("#fornavn").val();
    const etternavn = $("#etternavn").val();
    const telefonNr = $("#telefonnr").val();
    const epost = $("#epost").val();

    let error = false;
    if(film === ""){
        visError("errorFilm", "Ikke valgt film")
        error = true;
    }else {
        $("#errorFilm").html("");
    }

    const antallTest = Number(antall)
    if(isNaN(antallTest) || antallTest < 1 ) {
        visError("errorAntall", "Ikke tastet inn riktig")
        error = true;
    }else {
        antall = Number(antall)
        $("#errorAntall").html("");
    }

    if( fornavn === "" ) {
        visError("errorFornavn", "Ikke tastet inn fornavn")
        error = true;
    }else {
        $("#errorFornavn").html("");
    }

    if( etternavn === "" ) {
        visError("errorEtternavn", "Ikke tastet inn etternavn")
        error = true;
    }else {
        $("#errorEtternavn").html("");
    }

    const resultTelefonnr = /^\d+$/.test(telefonNr);
    if (!resultTelefonnr) {
        visError("errorTelefonnr", "Ikke tastet inn gyldig telefonnummer (kun tall)");
        error = true;
    }else {
        $("#errorTelefonnr").html("");
    }

    const resultEpost = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(epost);
    if (epost === "" || !resultEpost) {
        visError("errorEpost", "Ikke tastet inn gyldig epostadresse");
        error = true;
    }else {
        $("#errorEpost").html("");
    }

    if (error){
        return;
    }

    const nyBillet = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonNr: telefonNr,
        epost: epost
    };

    $.post("http://localhost:8080/PostTickets", nyBillet, function (){
        hentBilletter();
    })



    $("#film").val("");
    $("#antallBilleter").val("");
    $("#fornavn").val("");
    $("#etternavn").val("");
    $("#telefonnr").val("");
    $("#epost").val("");
}

function hentBilletter(){
    $.get("/GetTickets", function (data){
        formaterData(data)
    })
}

function formaterData(billeter){
    let ut = "<table><tr><th>Film</th><th>Antall Billeter</th><th>Navn</th><th>Telefonnr</th><th>Epost</th></tr>";
    for (let billet of billeter){
        ut += "<tr>" +
            "<td>" + billet.film + "</td>" +
            "<td>" + billet.antall + "</td>" +
            "<td>" + billet.fornavn + " " + billet.etternavn + "</td>" +
            "<td>" + billet.telefonNr + "</td>" +
            "<td>" + billet.epost + "</td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#output").html(ut);
}

function slettKinobillettListe(){
    $.get("/DeleteAll", function (){
        hentBilletter()
    })

}