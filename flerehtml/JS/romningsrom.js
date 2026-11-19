// Oppgave 2 – Rømningsrommet
// Kjør filen med: node 2_Romningsrommet/spill.js   (stå i sluttprosjekt-mappen)
//
// Slik fungerer spillet:
//  - Variabelen naaverendeRom sier hvor spilleren er akkurat nå.
//  - Hovedløkken nederst går rundt og rundt så lenge spillet ikke er slutt.
//  - I hver runde bruker en switch til å finne ut hvilket rom spilleren er i.
//  - Inni hvert rom skriver du ut hva som skjer, spør spilleren om et valg og bruker
//    if / else if / else til å bestemme hva valget fører til.
//  - Til slutt i rommet setter du naaverendeRom til rommet spilleren skal til videre.
//    Setter du ikke noe nytt, blir spilleren værende i samme rom.
//  - Funksjonene øverst er hjelpere som rommene bruker.
//
// Linjer som starter med TODO er det DU skal gjøre.
// Programmet kjører også før du er ferdig, men avsluttes da tidlig.

import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });


// ---------- Spilltilstand ----------
// Disse endrer seg underveis, derfor let.
let liv = 3;
let poeng = 0;
let harNokkel = false;
let harKode = false;      // Koden til utgangsdøren. Spilleren får den i biblioteket.
let harRomt = false;


// ---------- Hjelpefunksjoner ----------

// Stiller et spørsmål og spør på nytt helt til svaret er et heltall fra 1 til antallValg.
// Returnerer valget som et tall.
// Du kan se hvordan funksjonen brukes i rommet «kjeller» i hovedløkken.
// Funksjonen skal brukes i hvert rom hvor spilleren blir spurt om å ta et valg.
function sporValg(sporsmaal, antallValg) {
    // Spør første gang og gjør svaret om til tall.
    let svar = Number(prompt(sporsmaal));

    // Løkka skal gå så lenge svaret er UGYLDIG. Svaret er ugyldig hvis ett av disse er sant:
    //   - svaret er ikke et heltall      (tips: svar % 1 !== 0, dette fanger også tekst)
    //     Et heltall delt på 1 gir rest 0. Tekst blir NaN med Number(), og NaN % 1 er også NaN,
    //     så betingelsen blir true for både desimaltall og tekst. Se README, delmål 1.
    //   - svaret er mindre enn 1
    //   - svaret er større enn antallValg
    // TODO: Bytt ut false med en betingelse som setter sammen de tre over med || (eller).
    while (svar  % 1 !== 0 || svar < 1 || svar > antallValg) {
        console.log(`Ugyldig valg. Skriv et helt tall fra 1 til ${antallValg}.`);

        // TODO: Spør på nytt og lagre det nye svaret i svar.
        svar = Number(prompt(sporsmaal))
        //       Gjør du ikke det, blir svaret aldri endret og løkka stopper aldri.
    }

    return svar;
}

// Kaster en terning. Skal returnere et tilfeldig heltall fra 1 til 6.
function kastTerning() {
    const terning = Math.floor(Math.random() * 6) + 1;
    // TODO: Se i tema 6, «Tilfeldige tall».
    return terning;   // Midlertidig.
}

// Skriver ut hvor mye liv og poeng spilleren har. Denne er ferdig.
function visStatus() {
    console.log(`\n[ Liv: ${liv} | Poeng: ${poeng} | Nøkkel: ${harNokkel} | Kode: ${harKode} ]`);
}


// ---------- Hovedprogram ----------
console.log("=== RØMNINGSROMMET ===");

let naaverendeRom = "kjeller";

// Her lagrer vi spillerens valg. Den lages utenfor løkken slik at alle rommene kan bruke den.
let valg = 0;

// Løkka kjører så lenge spillet ikke er slutt og spilleren fortsatt har liv.
while (naaverendeRom !== "slutt" && liv > 0) {
    visStatus();

    switch (naaverendeRom) {

        // FERDIG ROM – bruk dette som mal for de andre.
        case "kjeller":
            console.log("\nDu våkner i et kaldt kjellerrom. Det lukter fuktig. Det er mørkt, men du ser en kiste og en trapp.");
            console.log("1. Åpne den rustne kisten");
            console.log("2. Gå opp trappa til gangen");

            valg = sporValg("Hva gjør du? ", 2);

            if (valg === 1) {
                if (harNokkel) {
                    console.log("\nKisten er tom nå. Du har allerede tatt nøkkelen.");
                    prompt("Trykk enter for å fortsette")
                } else {
                    console.log("\nI kisten ligger en gammel nøkkel! Du stapper den i lomma.");
                    harNokkel = true;
                    poeng += 10;
                    prompt("Trykk enter for å fortsette")
                }
                // Vi endrer ikke naaverendeRom, så spilleren blir værende i kjelleren.
            } else if (valg === 2) {
                naaverendeRom = "gang";
            }
            break;

        case "gang":
            console.log("\nDu står i en lang, mørk gang. Det er dører i alle retninger.");
            console.log("1. Gå til laboratoriet");
            console.log("2. Gå til biblioteket");
            console.log("3. Gå til utgangsdøren");
            console.log("4. Gå tilbake til kjelleren");

            // TODO: Spør spilleren med sporValg(). Hvor mange valg er det?
            valg = sporValg("Hva gjør du? ", 4);
            // TODO: Bruk if / else if / else til å sette naaverendeRom til
            if (valg === 1){
                naaverendeRom = "laboratorium"
            }   else if (valg === 2){
                naaverendeRom = "bibliotek"
            }   else if (valg === 3){
                naaverendeRom = "utgang"
            }   else if (valg === 4){
                naaverendeRom = "kjeller"
            }
            //       "laboratorium", "bibliotek", "utgang" eller "kjeller".
            break;

        case "laboratorium":
            // TODO: Skriv en beskrivelse av rommet.
            console.log("\nDu står i et mørkt og mystisk laboratorium. Det står noen glass med noen mystiske væsker i seg på et bord på høyre siden din, og et mistenksomt skap på venstre siden din.");
            // TODO: Gi spilleren minst to valg, f.eks. «Åpne den mistenkelige skapdøra» og «Gå tilbake til gangen».
            console.log("1. Sjekk ut glassene med de mystiske væskene i seg")
            console.log("2. Sjekk ut det mistenksomme skapet")
            console.log("3. Gå tilbake til gangen")

            valg = sporValg("Hva gjør du? ", 3);

            if (valg === 1){
                
                console.log("\nDu går bort til glassene og plukker opp glasset med en væske som ser ut som eplejuice. Ønsker du å drikke den mystiske drikken?")
                console.log("1. Ta en slurk av drikken")
                console.log("2. Legg fra deg drikken å gå tilbake")

                valg = sporValg("Hva gjør du? ", 2);

                if (valg === 1){
                    let terning = kastTerning();
                    if (terning === 1 || terning === 2){
                        console.log("\nDet smakte som muggen hostesaft, men du føler at det ikke gjorde noen skade")
                        prompt("Trykk enter for å fortsette")
                    } else if (terning === 3 || terning === 4){
                        console.log("\nDet smakte som muggen hostesaft, synet ditt begynner å bli blurry, og du besvimer. Når du våkner igjen føler du deg veldig dårlig. (-1 liv)")
                        liv -= 1
                        prompt("Trykk enter for å fortsette")
                    } else if (terning === 5 || terning === 6){
                        console.log("\nDet smakte som eplejuice og du føler deg fantastisk etter å ha drukket den! (+50 poeng)")
                        poeng += 50
                        prompt("Trykk enter for å fortsette")
                    } else {
                        console.log("Noe gikk galt")
                    }
                } else if (valg === 2){
                    naaverendeRom = "laboratorium"
                } else {
                    console.log("Noe gikk galt")
                }
            }
            if (valg === 2){
                console.log("\nDu går bort til det mistenksomme skapet og åpner det, ut spretter det et skjellet, du stapper skjellettet inn igjen og lukker skapet.")
                prompt("Trykk enter for å fortsette")
            }
            // TODO: Ett av valgene skal være risikabelt. Kast terningen med kastTerning() og
            //       bruk if / else if / else til å bestemme hva som skjer. Eksempel:
            //         1–2: spilleren mister liv (liv -= 1) og får en melding om det
            //         3–5: spilleren finner noe og får poeng
            //         6:   spilleren får mye poeng
            // TODO: Sett naaverendeRom til rommet spilleren skal til etterpå.
            if (valg === 3){
                naaverendeRom = "gang"
            }

            break;

        case "bibliotek":
            // TODO: Skriv en beskrivelse av rommet.
            console.log("\nDu gikk inn i bibloteket, du ser spindelvev overalt og en gammel og skummel biblotekar som sitter i enden")
            prompt("trykk enter for å fortsette")
            if (harKode){
                console.log("\nDu har allerede koden din tulling, det er ikke noe mer å gjøre her")
                naaverendeRom = "gang"
            } else {
                console.log("\ndu gå bort til biblotekaren, og den begynner å si en gåte")
            console.log("Biblotekar: Jeg har taster, men ingen låser. Hva er jeg?")
            let gjett = prompt("\nSkriv svaret ditt her: ") //her skal du skrive inn det du gjetter
            let gjettetord = gjett.toLowerCase()
            let riktigsvar = "tastatur"
            if (gjettetord === riktigsvar){
                console.log("\nGratulerer! Svaret er riktig (nå har du koden) (+30 poeng)")
                poeng += 30
                harKode = true
                prompt(`\nTrykk enter for å fortsette`)
            } else{
                console.log("\nFeil svar!")
            }
            }
            // TODO: La en gammel bibliotekar stille en gåte. Spilleren skriver svaret som TEKST med prompt().
            //       Forslag til gåte: «Jeg har taster, men ingen låser. Hva er jeg?» (svar: tastatur)
            // TODO: Sammenlign svaret med riktig svar. Bruk toLowerCase() så store og små bokstaver ikke spiller noen rolle.
            // TODO: Hvis spilleren allerede har løst gåten (harKode er true): skriv at hun allerede har fått koden.
            //       Hvis svaret er riktig: skriv ut koden, sett harKode = true og gi poeng.
            //       Hvis svaret er feil: skriv en melding og la spilleren miste liv eller bare ikke få noe, du bestemmer.
            // TODO: Sett naaverendeRom til rommet spilleren skal til etterpå.
            naaverendeRom = "gang";   // Midlertidig.
            break;

        case "utgang":
            // TODO: Skriv en beskrivelse av døra.
            console.log("Du står foran en stor utgangsdør med kodelås og en diger hengelås.")
            console.log("1. Forsøk å åpne døren")
            console.log("2. Gå tilbake til gangen")
            valg = sporValg("Hva gjør du? ", 2)
            // TODO: Bruk if / else if / else:
            if (valg === 1){
                if (harNokkel && harKode){
                    console.log("\nGratulerer du har alt man trenger til å åpne døra, så du åpner døra")
                    naaverendeRom = "slutt"
                    harRomt = true
                } else if (harNokkel && !harKode){
                    console.log("\nDu har nøkkelen, men du mangler koden til kodelåsen")
                } else if (!harNokkel && harKode){
                    console.log("\nDu har koden, men du mangler nøkkelen til hengelåsen")
                } else if (!harNokkel && !harKode){
                    console.log("\nDoren trenger kode til kodelåsen og nokkel til hengelåsen, du kan komme tilbake når du har det.")
                } else {
                    console.log("\nNoe gikk galt...")
                }
            }else if (valg === 2){
                naaverendeRom = "gang"; 
          
            }
            break;

        default:
            console.log(`Feil i spillet: rommet «${naaverendeRom}» finnes ikke.`);
            naaverendeRom = "slutt";
    }
}


// ---------- Slutten på spillet ----------
console.log("\n=== SLUTT ===");

if (liv <= 0){
    console.log("\nDu kom deg til slutten, men du tapte. 0 liv igjen.")
} if  (harRomt){
    console.log("\nGratulerer, du vant, du greide å romme fra romningsrommet")
} else {
    console.log("Du tapte")
}
console.log(`Du endte opp med ${poeng} poeng.`);
if (poeng < 30){
    console.log("Du greide det ikke, du klarer bedre, jo flere poeng jo bedre!")
    console.log("Tittel: Taper")
} else if (poeng <=40 ){
    console.log("Du greide det, men du klarer bedre, jo flere poeng jo bedre!")
    console.log("Tittel: Nybegynner")
} else if (poeng <= 90){
    console.log("Bra poengsum, men du klarer bedre, jo flere poeng jo bedre!")
    console.log("Tittel: Romningskunstner")
} else if (poeng > 100){
    console.log("Du gjorde en kjempebra jobb, gratulerer, du er mester!")
    console.log("Tittel: Mesterdetektiv")
}
