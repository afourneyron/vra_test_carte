// création de la carte web de base 

var map = L.map('map', {
  zoomDelta: 0.5,
  zoomSnap: 0,
  minZoom: 10,
  maxZoom: 22,
  zoomControl: true
});

var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap Contributeur';
var osm = new L.TileLayer(osmUrl, {
            attribution: osmAttrib,
            maxZoom: 22,
            maxNativeZoom: 19
}).addTo(map);

map.setView([44.8730682,5.0125748],12); // définir les paramètre de visualisation de la carte
map.setZoom(11.4)

//------------------------------------ AJOUT DES DONNEES ------------------------------------


// ICONE 
// définition de l'icone des hérissons
var heri = L.icon({
  iconUrl: 'assets/mammifere/heri.png',
  iconSize: [30,20],
  iconAnchor: [30,20],
  popupAnchor:  [-10, -20]
});
// définition de l'icone des écureuils
var ecu = L.icon({
  iconUrl: 'assets/mammifere/ecu.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [-10, -20]
});

var heri_symb = L.icon({
  iconUrl: 'assets/mammifere/heri.png',
  iconSize: [30,30],
  popupAnchor:  [0, 0]
});
// définition de l'icone des écureuils
var ecu_symb  = L.icon({
  iconUrl: 'assets/mammifere/ecu.png',
  iconSize: [30,30],
  popupAnchor:  [0, 0]
});

// limite communale zone d'étude
var commune_map =L.geoJSON(data_amph_com, {
  style: {
    color: '#202020',
    weight: 2.5,
    dashArray: '5, 10',
    fillOpacity: 0.01
}
}).addTo(map);

// FILTRE
// fonction pour filter les données ecureuils
// function ecuFilter(feature) {
//     if (feature.properties.nom_vern === "Écureuil roux") return true
// }
// // fonction pour filter les données hérissons
// function heriFilter(feature) {
//     if (feature.properties.nom_vern === "Hérisson d'Europe") return true
// }

// COUCHE 
// création de la couche de donnée des écureuils
var map_ecu = L.geoJson(data_ecu, {
    filter: function(feature) {
      if (feature.properties.nom_vern == "Écureuil roux") {
        return true;}},
    pointToLayer: function (feature, latlng) {
      return L.marker(latlng, {icon: ecu})  }    
})

// fonctio nde cluster 
var map_full_ecu = L.markerClusterGroup();
map_full_ecu.addLayer(map_ecu)
map_full_ecu.bindPopup(function(layer) { 
  return ( '<b>'+ layer.feature.properties.nom_vern +
      '</b> <br> Nombre d\'observation(s) : '+ layer.feature.properties.nb_ )}); 
map.addLayer(map_full_ecu);

// création de la couche de donnée des hérissons
var map_heri = L.geoJson(data_ecu, {
  filter: function(feature) {
    if (feature.properties.nom_vern == "Hérisson d'Europe") {
      return true;}},
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {icon: heri})  }    
})

// fonction de cluster
var map_full_heri = L.markerClusterGroup();
map_full_heri.addLayer(map_heri)
map_full_heri.bindPopup(function(layer) { 
  return ( '<b>'+ layer.feature.properties.nom_vern +
      '</b> <br> Nombre d\'observation(s) : '+ layer.feature.properties.nb_ )}); 
//map.addLayer(map_full_heri);


// limite communale zone d'étude
var commune_map =L.geoJSON(data_amph_com, {
  style: {
    color: '#202020',
    weight: 2.5,
    dashArray: '5, 10',
    fillOpacity: 0.01
}
})


// LEGENDE 

const ecu_symbole = L.marker([51.505, -0.115], { icon: ecu_symb });
const heri_symbole = L.marker([51.505, -0.115], { icon: heri_symb });

const items = {
  "Écureuil roux": ecu_symbole,
  "Hérisson d'Europe": heri_symbole
};

const legend = L.control.featureLegend(items, {
  position: "topleft",
  title: "Légende",
  symbolContainerSize: 24,
  // symbolScaling: "clamped",
  maxSymbolSize: 25,
  minSymbolSize: 2,
  // collapsed: true,
  // drawShadows: true,
}).addTo(map);

// ------------------------------- Affichage des couches  -------------------------------
//Fond de plan : OSM
// var baseLayers = {
//   "OpenStreetMap": osm
// };

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Ecureuil": map_full_ecu,
  "Hérisson": map_full_heri,
  // "Limite commune":commune_map
};
L.control.layers(overlays, null, {collapsed: false, } ).addTo(map);
// rajout de la couche de fond de carte
// L.control.layers(baseLayers, overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

