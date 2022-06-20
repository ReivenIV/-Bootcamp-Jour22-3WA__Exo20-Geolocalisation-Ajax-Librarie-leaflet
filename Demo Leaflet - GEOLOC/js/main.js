let x = document.querySelector("#demo")

let myPosition = {lat: 51.505,lng: -0.09}
//navigator est un gros objet qui stock les propriétés du navigateur
console.log(navigator)
//si le navigateur supporte la géoloc 
if (navigator.geolocation) {
    //on récupère notre géolocalisation de notre position et on envoi la réponse dans fonction callback
    navigator.geolocation.getCurrentPosition(showPosition)
}else{
    x.innerHTML = "<p>Ton navigateur est bidon et ne supporte pas la geoloc... arrête internet explorer stp!</p>"
}

function showPosition(position){
    console.log(position)
    x.innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`
    myPosition = {lat: position.coords.latitude, lng: position.coords.longitude}
    createMap(myPosition)
}

function createMap(pos){
    //affichage map leaflet qui est centré sur ma position, le zoom est de 13
    let map = L.map('map').setView([pos.lat, pos.lng], 13);
    
    //titre de la map qu'on peut customiser
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);//addTo ajoute le titre sur la map comme tuile que l'on met par dessus
    
    L.marker([pos.lat, pos.lng]).addTo(map)
        .bindPopup("Adresse de livraison pour mon nouveau mac à 53000 euros! Merci seb!")
        .openPopup();
        
    //addTo ajoute le marker sur la map comme une tuile que l'on met par dessus
    //bindPopUp va ajouter une popup sur le marker et openPopup va nous permettre d'ouvrir et fermer la popup lorsque l'on clique sur le marker
}
