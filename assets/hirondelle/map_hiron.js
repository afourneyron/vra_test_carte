// création de la carte web de base 

var map = L.map('map');
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap Contributeur';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);

map.setView([44.858,5.00],12); // définir les paramètre de visualisation de la carte

//------------------------------------ AJOUT DES DONNEES ------------------------------------


var hiron1 = L.icon({
  iconUrl: 'images/HIRON2.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [-10, -20]
});

var hiron2 = L.icon({
  iconUrl: 'images/HIRON1.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [-10, -20]
});

var sym_hir1 = L.icon({
  iconUrl: 'images/HIRON2.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [0, 0]
});

var sym_hir2 = L.icon({
  iconUrl: 'images/HIRON1.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [0, 0]
});





var hiron_rustique_data_map = L.geoJSON(data_hiron_rustique, {
  pointToLayer: function(feature, latlng) {
    var nb_nid = feature.properties.nb_nid_detection
    if (nb_nid == null){
      nb_nid = feature.properties.nombre_saisie
    } 
    size_nid = ((nb_nid+15)/45)*60
    size_nid_min = ((nb_nid+15)/50)*(-50)
    size_nid_max = ((nb_nid+15)/50)*(-40)

    return L.marker(latlng, {icon:  L.icon({
        iconUrl: 'images/HIRON2.png',
        iconSize: [size_nid,size_nid],
        iconAnchor: [size_nid,size_nid],
        popupAnchor:  [size_nid_max, size_nid_min]
      })
    });
  }
}).bindPopup(function(layer) { 
  var nb_nid = layer.feature.properties.nb_nid_detection
  if (nb_nid == null){
    nb_nid = layer.feature.properties.nombre_saisie
  } 
  return ( '<b>'+ layer.feature.properties.nom_vern + '</b> <br> Année : '+ layer.feature.properties.annee +'<br> Nombre de nid :' + nb_nid) });

// fonctio nde cluster 
var map_full_hironrus = L.markerClusterGroup();
map_full_hironrus.addLayer(hiron_rustique_data_map)
map.addLayer(map_full_hironrus);

  var hiron_fenetre_data_map = L.geoJSON(data_hiron_fenetre, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon:  hiron2});
          }
  }).bindPopup(function(layer) { 
    var nb_nid = layer.feature.properties.nb_nid_detection
    if (nb_nid == null){
      nb_nid = layer.feature.properties.nombre_saisie
    } 
    return ( '<b>'+ layer.feature.properties.nom_vern + '</b> <br> Année : '+ layer.feature.properties.annee +'<br> Nombre de nid :' + nb_nid) });
  

// fonctio nde cluster 
var map_full_hironfen = L.markerClusterGroup();
map_full_hironfen.addLayer(hiron_fenetre_data_map)
//map.addLayer(map_full_hironfen);

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

const symb_hiron1 = L.marker([51.505, -0.115], { icon: sym_hir1 });
const symb_hiron2 = L.marker([51.505, -0.115], { icon: sym_hir2 });

const items = {
  "Hirondelle Rustique": symb_hiron1,
  "Hirondelle de Fenêtre": symb_hiron2
};

const legend = L.control.featureLegend(items, {
  position: "bottomright",
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
var baseLayers = {
  "OpenStreetMap": osm
};

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Hirondelle Rustique": map_full_hironrus,
  "Hirondelle de Fenêtre": map_full_hironfen,
  "Limite commune":commune_map
};
L.control.layers(baseLayers, overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

