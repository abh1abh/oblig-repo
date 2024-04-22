function visError(id, message) {
    $("#" + id).html(message).css("color", "red");
}
function kjopBillett(){
    const film = $("#film").val();
    let antall = $("#antallBilleter").val();
    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    const telefonNr = $("#telefonnr").val();
    const epost = $("#epost").val();

    let error = false;

    if(film === "" || film===null ){
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

    function capitalizeFirstLetter(string) { // Got function from: https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
        return string[0].toUpperCase() + string.slice(1);
    }
    fornavn = capitalizeFirstLetter(fornavn);
    etternavn =capitalizeFirstLetter(etternavn)

    const nyBillet = {
        film: film,
        antall: antall,
        fornavn: fornavn,
        etternavn: etternavn,
        telefonNr: telefonNr,
        epost: epost
    };

    $.post("/PostTickets", nyBillet, function (data){
        if(data){
            hentBilletter();
        } else{
            alert("Ops! Billett ikke lagt til")
        }
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
        if(data.length > 0){
            formaterData(data)
        } else{
            console.log("Ops! Ingen billeter å hente")
            $("#output").html("")
        }
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
            "<td><button class=\"btn btn-danger\" onclick='deleteById(" + billet.ticketId + ")'> Slett </button></td>" +
            "</tr>";
    }
    ut += "</table>";
    $("#output").html(ut);
}

function deleteById(ticketId){
    $.ajax({
        url:`/DeleteById?ticketId=${ticketId}`,
        type: 'DELETE',
        success: function (data) {
            if (!data) {
                console.log("Ops! Får ikke slettet billetten")
            } else {
                hentBilletter();
            }
        }
    })
}
function slettKinobillettListe(){
    $.ajax({
        url: "/DeleteAll",
        type: 'DELETE',
        success: function (data) {
            if (!data) {
                console.log("Ops! Får ikke slettet alle billetter")
            } else {
                $("#output").html("");
            }
        }
    })

}