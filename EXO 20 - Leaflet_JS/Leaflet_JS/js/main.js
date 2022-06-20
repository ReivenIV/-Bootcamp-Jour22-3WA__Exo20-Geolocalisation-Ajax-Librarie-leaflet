let monToken = 'pk.eyJ1IjoiZmxvcmlhbi1mbG9jb24iLCJhIjoiY2tldjJ1a3A5NDB1ZTJzcGNpOGJ1OTRxcSJ9.kFHGE_fRa8nxG2UN7DAaNA';
let mymap;
let markers;

//si mon navigateur supporte la géoloc?
if(navigator.geolocation){
    //code pour récup la position (geoloc)
    navigator.geolocation.getCurrentPosition(showMyMapWithMyPosition)
//sinon
}else{
    //on informe que ton navigateur est bidon (IE de ses morts!)
    console.log("Mon navigateur est un IE tout pourri je peux pas avoir accès à ma géoloc");
    window.alert("METTEZ A JOUR VOTRE NAVIGATEUR !!!!!!!!!");
}    
    
//fonction qui montre la position de l'utilisateur sur la map. (geoloc)
function showMyMapWithMyPosition(position)  {
    //on peut tester qu'on récup bien une position, la lat, la lng console.log()
    console.log(position.coords)
    //on initialise la map en lui passant notre position (appel fonction)
    createMap(position.coords.latitude, position.coords.longitude)
    //on fait apparaitre le formulaire qui est caché au départ
    document.querySelector("#search").classList.remove("hide")
    //lorsque l'on envoi une requète dans le formulaire (gestion d'event)
    document.querySelector("#search").addEventListener("submit", function(e){
        //on enlève le comportement du navigateur par défault.
        e.preventDefault()
        //récupération des boutiques en fonction de la position (appel de fonction)
        getBusinessNearMyPosition(position.coords.latitude, position.coords.longitude)
    })
}    
    
    
//fonction de récupération des boutiques
function getBusinessNearMyPosition(lat, lng) {
    //on récupère la valeur entrée dans le formulaire
    let keyword = document.querySelector("#business").value
    //on efface les anciens markers (voir leaflet)
    markers.clearLayers()
    //requète API vers openstreetmap en lui passant la valeur rentrée ainsi que la position (voir API openstreetmap)
    fetch(`https://nominatim.openstreetmap.org/search?q=${keyword} ${lat},${lng}&format=geocodejson`)
    .then(response=>response.json())
    .then((response)=>{
        //on test qu'on récup bien les places dans la console
        let place = response.features
        //on fait une boucle pour afficher toutes les places renvoyé en réponse (boucle .map ES6 ou forEach)
        for(let i=0; i < place.length; i++){
            //création du marker en fonction des coordonnées de la boutique
            let marker = L.marker([place[i].geometry.coordinates[1], place[i].geometry.coordinates[0]]).addTo(mymap)
            //on stock ce qu'on va afficher dans la popup
            let myPopup = `<h3>${place[i].properties.geocoding.name}</h3><p>${place[i].properties.geocoding.label}</p>`
            //création de la popup sur le marker
            marker.bindPopup(myPopup)
            //ajout du marker à la map
            markers.addLayer(marker)
        }
    })
    .catch(err=>console.log(err))
}


//fonction d'initialisation de la map et du marker de positionnement
function createMap(lat, lng) {
    //on définit le centre géographique et le zoom de la map.
    mymap = L.map("mapid").setView([lat, lng], 13)
    //regroupe les markers (calque) et en fait qu'un seul puis on ajoute à la map
    markers = L.layerGroup().addTo(mymap)
    //on charge la map et ses propriétés (ne pas oublier la clé d'accés) via l'api mapbox puis on ajoute à la map(voir tileLayer dans leaflet)
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: monToken,
    }).addTo(mymap);
    //on initialise l'icon de notre position
    let myIcon = L.icon({
        iconUrl: 'img/bluecircle.png',
        iconSize: [15, 15]
    })
    //on crée notre marker de position avec son icon et on ajoute à la map.
    let marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap)
}

