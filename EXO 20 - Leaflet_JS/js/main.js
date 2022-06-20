let monToken = 'pk.eyJ1IjoiZmxvcmlhbi1mbG9jb24iLCJhIjoiY2tldjJ1a3A5NDB1ZTJzcGNpOGJ1OTRxcSJ9.kFHGE_fRa8nxG2UN7DAaNA';
let mymap;
let markers;
let myPosition = {lat:45.753, lng:4.882 } //! Migeolocalisation => Latitude: 45.7539584, Longitude: 4.882432

let mapid = document.querySelector("#mapid")
let search = document.querySelector("#search")

let cords = document.querySelector("#cords")
//si mon navigateur supporte la géoloc?
if (navigator.geolocation) {
    //code pour récup la position (geoloc)
        //mapid.innerHTML = "<p>Geo Suported</p>"
        navigator.geolocation.getCurrentPosition((position) => {
               let lat = position.coords.latitude;
               let lng = position.coords.longitude;
               //console.log(lat, lng);
               cords.innerHTML = `Latitude: ${lat}, Longitude: ${lng}`
        })
//sinon
}else{
    //on informe que ton navigateur est bidon (IE de ses morts!)
        console.log("Geo non suported");
        mapid.innerHTML = "<p>Map not getting info.</p>"
}





// //fonction qui montre la position de l'utilisateur sur la map. (geoloc)
// function showMyMapWithMyPosition(position)  {
//     //on peut tester qu'on récup bien une position, la lat, la lng console.log()
//     let lat = position.coords.latitude;
//     let lng = position.coords.longitude;
//     //on initialise la map en lui passant notre position (appel fonction)
//     createMap(lat, lng)
//     //on fait apparaitre le formulaire qui est caché au départ
//     search.classList.remove('hide');
//     //lorsque l'on envoi une requète dans le formulaire (gestion d'event)
//     document.addEventListener('submit', (e)=>{
//         //on enlève le comportement du navigateur par défault.
//         e.preventDefault()
//         //récupération des boutiques en fonction de la position (appel de fonction)
//         getBusinessNearMyPosition(lat, lng)
//     })

// }    
    
    
// //fonction de récupération des boutiques
// function getBusinessNearMyPosition(lat, lng) {
//     //on récupère la valeur entrée dans le formulaire
//     let inputSearch = document.querySelector("#business").value;
//     //on efface les anciens markers (voir leaflet)
//     markers.clearLayers();
//     //requète API vers openstreetmap en lui passant la valeur rentrée ainsi que la position (voir API openstreetmap)
//     axios.get(`https://nominatim.openstreetmap.org/search?q=${inputSearch} ${lat},${lng}&format=geocodejson`)
//     .then((response) => {

//         let shopReturn = response.features
//         //on test qu'on récup bien les places dans la console
        
//         //on fait une boucle pour afficher toutes les places renvoyé en réponse (boucle .map ES6 ou forEach)

//         for(let i = 0; i < shopReturn.length; i++){
//             //création du marker en fonction des coordonnées de la boutique
//             let marker = L.marker([shopReturn[i].geometry.coordinates[1], shopReturn[i].geometry.coordinates[0]]).addTo(mymap);           

//             //on stock ce qu'on va afficher dans la popup
//             let myPopUp = `<h3>${place[i].properties.geocoding.name}</h3><p>${shopReturn[i].properties.geocoding.label}</p>`
//             //création de la popup sur le marker
//             marker.bindPopup(myPopUp)
//             //ajout du marker à la map
//             marker.addLayer(marker)
//         }
//     })
//     .catch(err=>console.log(err))
// }


// //fonction d'initialisation de la map et du marker de positionnement
// function createMap(lat, lng) {
//     //on définit le centre géographique et le zoom de la map.
//     mymap = L.map('mapid').setView([lat, lng], 13);
//     //regroupe les markers (calque) et en fait qu'un seul puis on ajoute à la map
//     markers = L.layerGroup().addTo(mymap);
//     //on charge la map et ses propriétés (ne pas oublier la clé d'accés) via l'api mapbox puis on ajoute à la map(voir tileLayer dans leaflet)
//     L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
//         attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
//         maxZoom: 18,
//         id: 'mapbox/streets-v11',
//         tileSize: 512,
//         zoomOffset: -1,
//         accessToken: monToken,
//     }).addTo(mymap);
//     //on initialise l'icon de notre position
//     let myIcon = L.icon({
//         iconUrl: 'img/bluecircle.png',
//         iconSize: [10, 10],
//     })
//     //on crée notre marker de position avec son icon et on ajoute à la map.
//     let marker = L.marker([lat, lng], {icon:myIcon}).addTo(mymap)
// }

