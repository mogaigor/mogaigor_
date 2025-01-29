let mucca = { 
    specie: "mucca",
	razza: "chianina", 
	zampe: 4
}
let gallo = { 
    specie: "gallina",
	razza: "andalusa", 
	zampe: 2
}
let cane = { 
    specie: "cane",
	razza: "bassotto", 
	zampe: 4
}
function animale1() {
    let info = `Specie: ${gallo.specie}<br>Razza: ${gallo.razza}<br>Zampe: ${gallo.zampe}`;
    document.getElementById("d").innerHTML = info;
}
function animale2() {
    let info = `Specie: ${mucca.specie}<br>Razza: ${mucca.razza}<br>Zampe: ${mucca.zampe}`;
    document.getElementById("d").innerHTML = info;
}
function animale3() {
    let info = `Specie: ${cane.specie}<br>Razza: ${cane.razza}<br>Zampe: ${cane.zampe}`;
    document.getElementById("d").innerHTML = info;
}