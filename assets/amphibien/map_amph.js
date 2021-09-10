// création de la carte web de base 

var map = L.map('map');
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap Contributeur';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);

map.setView([44.858,5.00],12); // définir les paramètre de visualisation de la carte

//------------------------------------ AJOUT DES DONNEES ------------------------------------

function resetHighlight3(e) {
  amph_com_map.resetStyle(e.target);
}

function highlightFeature3(e) {
  e.target.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        e.target.bringToFront();
    }
    var text = '<b>' +  e.target.feature.properties.nom_com + ' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
    L.DomUtil.get('info').innerHTML = text
} 

function onEachFeature3(feature, layer) {
  layer.on({
      mouseover: highlightFeature3,
      mouseout: resetHighlight3
      //click: onclickcom
  });
}

var amph_com_map =L.choropleth(data_amph_com, {
  valueProperty: 'nb_espece',
  scale: ['white', '#4c9ebf'],
  steps: 8, // Nombre de classes
  mode: 'q',
  style: {
    color: '#fff',
    weight: 2,
    fillOpacity: 0.8
},onEachFeature: onEachFeature3
}).bindPopup(function(layer){
return('<b>' + layer.feature.properties.nom_com + ' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
}).addTo(map);


// Carte amphibien zh 

function resetHighlight4(e) {
  amph_zh_map.resetStyle(e.target);
}

function highlightFeature4(e) {
  e.target.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        e.target.bringToFront();
    }
    var text = '<b> Type de zone humide : ' + e.target.feature.properties.type +' <br> Zone prospecté : '+e.target.feature.properties.prospecte +' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
    L.DomUtil.get('info').innerHTML = text
} 

function onEachFeature4(feature, layer) {
  layer.on({
      mouseover: highlightFeature4,
      mouseout: resetHighlight4
      //click: onclickcom
  });
}

var amph_zh_map =L.choropleth(data_amph_zh, {
  valueProperty: 'nb_espece',
  scale: ['white', '#4c9ebf'],
  steps: 8, // Nombre de classes
  mode: 'q',
  style: {
    color: '#4c9ebf',
    weight: 2,
    fillOpacity: 0.8
},onEachFeature: onEachFeature4
}).bindPopup(function(layer){
return('<b> Type de zone humide : ' + layer.feature.properties.type +' <br> Zone prospecté : '+layer.feature.properties.prospecte +' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
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
  "Amphibien commune": amph_com_map,
  "Amphibien Zone Humide": amph_zh_map,
  "Limite commune":commune_map
};
L.control.layers(baseLayers, overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

