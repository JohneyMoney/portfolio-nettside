const billettpris = 129;
const popcornpris = 59;
const brusPris = 39;
const aldersgrense = 15;
console.log("=== Velkommen til Kinokiosken ===");
const navn = await prompt("Hva heter du? ");
const alder = Number(await prompt("Hvor gammel er du? "));
let antallBilletter = Number(await prompt("Hvor mange billetter onsker du aa kjope? "));
let antallPopcorn = Number(await prompt("Hvor mange bokser Popcorn onsker du aa kjope? "));
let antallBrus = Number(await prompt("Hvor mange brus onsker du aa kjope? "));
let betalt = Number(await prompt("Hvor mye betaler du med? "));
let sumBilletter = antallBilletter * billettpris;
let sumPopcorn = antallPopcorn * popcornpris
let sumBrus = antallBrus * brusPris
let total = sumBilletter + sumPopcorn + sumBrus
let faartilbake = betalt - total
console.log("\n=== KVITTERING ===");
console.log(`Kunde: ${navn}`);
console.log(`Billetter: ${antallBilletter} x ${billettpris} kr = ${sumBilletter} kr`);
console.log(`Popcorn: ${antallPopcorn} x ${popcornpris} kr = ${sumPopcorn} kr`)
console.log(`Brus: ${antallBrus} x ${brusPris} kr = ${sumBrus} kr`)
console.log("--------------------------");
console.log(`Totalpris: ${total}`);
console.log(`Faar tilbake ${faartilbake} kr`)
console.log("--------------------------");
let kanSeFilmen = alder >= aldersgrense;
let faarHonnorbillett = alder <= 12 || alder >= 67;
let harNokPenger = betalt >= total;
let kanSeFilmenOgBetale = kanSeFilmen && harNokPenger;
console.log(`\n=== SJEKKER ===`);
console.log(`Kan se filmen (aldersgrense ${aldersgrense}): ${kanSeFilmen}`);
console.log(`Får personen honnorbillett (alder under 12 eller over 67): ${faarHonnorbillett}`);
console.log(`Har personen nok penger (${total}): ${harNokPenger}`);
console.log(`Kan personen se filmer og betale (aldersgrense ${aldersgrense} og har nok penger): ${kanSeFilmenOgBetale}`);
let biter = 23
let venner = 4
console.log(`=== Godteripose ting ===`)
console.log(`Godteriposen har ${biter} biter`)
console.log(`Det er ${venner} venner`)
console.log(`Det blir ${Math.floor(biter/venner)} biter til hver person. Det er ${biter % venner} biter til overs`) //her brukte jeg math.floor for å runde ned, kunne eventuellt brukt math.trunc