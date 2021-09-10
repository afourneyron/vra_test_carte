// création de la carte web de base 

var map = L.map('map');
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap Contributeur';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);

map.setView([44.858,5.00],12); // définir les paramètre de visualisation de la carte

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
// Carte des données papillons commune

function resetHighlight(e) {
    pap_data_map.resetStyle(e.target);
  }
  
  function highlightFeature(e) {
    e.target.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          e.target.bringToFront();
      }
      var text = '<b>' +  e.target.feature.properties.nom_com + '</b> <br> Données : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
      L.DomUtil.get('info').innerHTML = text
  } 
  
  function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight
        //click: onclickcom
    });
  }
  
  var pap_data_map =L.choropleth(data_papi_com, {
    valueProperty: 'nb_data',
    scale: ['white', 'mediumorchid'],
    steps: 8, // Nombre de classes
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
  },onEachFeature: onEachFeature
  }).bindPopup(function(layer){
  return('<b>' + layer.feature.properties.nom_com + '</b> <br> Données : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
  }).addTo(map);
  
  // Carte des données papillons mailles
  
  function resetHighlight2(e) {
    pap_data2_map.resetStyle(e.target);
  }
  
  function highlightFeature2(e) {
    e.target.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.6
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          e.target.bringToFront();
      }
      var text = '<br> Données : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
      L.DomUtil.get('info').innerHTML = text
  } 
  
  function onEachFeature2(feature, layer) {
    layer.on({
        mouseover: highlightFeature2,
        mouseout: resetHighlight2
        //click: onclickcom
    });
  }
  
  var pap_data2_map =L.choropleth(data_papi_maille, {
    valueProperty: 'nb_espece',
    scale: ['white', 'mediumorchid'],
    steps: 4, // Nombre de classes
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.6
  },onEachFeature: onEachFeature2
  }).bindPopup(function(layer){
  return(' Données : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
  })
  


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

// const ecu_symbole = L.marker([51.505, -0.115], { icon: ecu_symb });
// const heri_symbole = L.marker([51.505, -0.115], { icon: heri_symb });

// const items = {
//   "Écureuil roux": ecu_symbole,
//   "Hérisson d'Europe": heri_symbole
// };

// const legend = L.control.featureLegend(items, {
//   position: "bottomright",
//   title: "Légende",
//   symbolContainerSize: 24,
//   // symbolScaling: "clamped",
//   maxSymbolSize: 25,
//   minSymbolSize: 2,
//   // collapsed: true,
//   // drawShadows: true,
// }).addTo(map);

// ------------------------------- Affichage des couches  -------------------------------
//Fond de plan : OSM
var baseLayers = {
  "OpenStreetMap": osm
};

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Papillon commune": pap_data_map,
  "Papillon maille": pap_data2_map,
  "Limite commune":commune_map
};
L.control.layers(baseLayers, overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

