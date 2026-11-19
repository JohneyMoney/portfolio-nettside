

// ---------- Spilltilstand ----------

let liv = 3;
let poeng = 0;
let harNokkel = false;
let harKode = false;      
let harRomt = false;


// ---------- Hjelpefunksjoner ----------

async function sporValg(sporsmaal, antallValg) {
    let svar = Number(await prompt(sporsmaal));
    while (svar  % 1 !== 0 || svar < 1 || svar > antallValg) {
        console.log(`Ugyldig valg. Skriv et helt tall fra 1 til ${antallValg}.`);

        svar = Number(await prompt(sporsmaal))
    }

    return svar;
}

function kastTerning() {
    const terning = Math.floor(Math.random() * 6) + 1;
   
    return terning;  
}


function visStatus() {
    console.log(`\n[ Liv: ${liv} | Poeng: ${poeng} | Nøkkel: ${harNokkel} | Kode: ${harKode} ]`);
}


// ---------- Hovedprogram ----------
console.log("=== RØMNINGSROMMET ===");

let naaverendeRom = "kjeller";


let valg = 0;

while (naaverendeRom !== "slutt" && liv > 0) {
    visStatus();

    switch (naaverendeRom) {

     
        case "kjeller":
            console.log("\nDu våkner i et kaldt kjellerrom. Det lukter fuktig. Det er mørkt, men du ser en kiste og en trapp.");
            console.log("1. Åpne den rustne kisten");
            console.log("2. Gå opp trappa til gangen");

            valg = await sporValg("Hva gjør du? ", 2);

            if (valg === 1) {
                if (harNokkel) {
                    console.log("\nKisten er tom nå. Du har allerede tatt nøkkelen.");
                    await prompt("Trykk enter for å fortsette")
                } else {
                    console.log("\nI kisten ligger en gammel nøkkel! Du stapper den i lomma.");
                    harNokkel = true;
                    poeng += 10;
                    await prompt("Trykk enter for å fortsette")
                }
           
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

            
            valg = await sporValg("Hva gjør du? ", 4);
           
            if (valg === 1){
                naaverendeRom = "laboratorium"
            }   else if (valg === 2){
                naaverendeRom = "bibliotek"
            }   else if (valg === 3){
                naaverendeRom = "utgang"
            }   else if (valg === 4){
                naaverendeRom = "kjeller"
            }

            break;

        case "laboratorium":

            console.log("\nDu står i et mørkt og mystisk laboratorium. Det står noen glass med noen mystiske væsker i seg på et bord på høyre siden din, og et mistenksomt skap på venstre siden din.");
  
            console.log("1. Sjekk ut glassene med de mystiske væskene i seg")
            console.log("2. Sjekk ut det mistenksomme skapet")
            console.log("3. Gå tilbake til gangen")

            valg = await sporValg("Hva gjør du? ", 3);

            if (valg === 1){
                
                console.log("\nDu går bort til glassene og plukker opp glasset med en væske som ser ut som eplejuice. Ønsker du å drikke den mystiske drikken?")
                console.log("1. Ta en slurk av drikken")
                console.log("2. Legg fra deg drikken å gå tilbake")

                valg = await sporValg("Hva gjør du? ", 2);

                if (valg === 1){
                    let terning = kastTerning();
                    if (terning === 1 || terning === 2){
                        console.log("\nDet smakte som muggen hostesaft, men du føler at det ikke gjorde noen skade")
                        await prompt("Trykk enter for å fortsette")
                    } else if (terning === 3 || terning === 4){
                        console.log("\nDet smakte som muggen hostesaft, synet ditt begynner å bli blurry, og du besvimer. Når du våkner igjen føler du deg veldig dårlig. (-1 liv)")
                        liv -= 1
                        await prompt("Trykk enter for å fortsette")
                    } else if (terning === 5 || terning === 6){
                        console.log("\nDet smakte som eplejuice og du føler deg fantastisk etter å ha drukket den! (+50 poeng)")
                        poeng += 50
                        await prompt("Trykk enter for å fortsette")
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
                await prompt("Trykk enter for å fortsette")
            }
         
            if (valg === 3){
                naaverendeRom = "gang"
            }

            break;

        case "bibliotek":
            
            console.log("\nDu gikk inn i bibloteket, du ser spindelvev overalt og en gammel og skummel biblotekar som sitter i enden")
            await prompt("trykk enter for å fortsette")
            if (harKode){
                console.log("\nDu har allerede koden din tulling, det er ikke noe mer å gjøre her")
                naaverendeRom = "gang"
            } else {
                console.log("\ndu gå bort til biblotekaren, og den begynner å si en gåte")
            console.log("Biblotekar: Jeg har taster, men ingen låser. Hva er jeg?")
            let gjett = await prompt("\nSkriv svaret ditt her: ") 
            let gjettetord = gjett.toLowerCase()
            let riktigsvar = "tastatur"
            if (gjettetord === riktigsvar){
                console.log("\nGratulerer! Svaret er riktig (nå har du koden) (+30 poeng)")
                poeng += 30
                harKode = true
                await prompt(`\nTrykk enter for å fortsette`)
            } else{
                console.log("\nFeil svar!")
            }
            }
           
            naaverendeRom = "gang";   
            break;

        case "utgang":
    
            console.log("Du står foran en stor utgangsdør med kodelås og en diger hengelås.")
            console.log("1. Forsøk å åpne døren")
            console.log("2. Gå tilbake til gangen")
            valg = await sporValg("Hva gjør du? ", 2)

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
