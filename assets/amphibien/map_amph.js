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


// limite communale zone d'étude
var commune_map =L.geoJSON(data_amph_com, {
  style: {
    color: '#202020',
    weight: 2.5,
    dashArray: '5, 10',
    fillOpacity: 0.01
}
}).addTo(map);



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
    var text = '<b>' +  e.target.feature.properties.nom_com + '</b> <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
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
return('<b>' + layer.feature.properties.nom_com + '</b> <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
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
    var text = 'Type de zone humide : ' + e.target.feature.properties.type +' <br> Zone prospecté : '+e.target.feature.properties.prospecte +' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
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
  // valueProperty: 'nb_espece',
  // scale: ['white', '#4c9ebf'],
  // steps: 8, // Nombre de classes
  // mode: 'q',
  style: {
    color: '#4c9ebf',
    weight: 2,
    fillOpacity: 1
},onEachFeature: onEachFeature4
}).bindPopup(function(layer){
return('Type de zone humide : ' + layer.feature.properties.type +' <br> Zone prospecté : '+layer.feature.properties.prospecte +' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
})
  



/// LEGEND 

function getColor(d) {
  return  d == 9 ? '#4c9ebf' :
          d == 8 ? '#7fbad1' :
          d == 7 ? '#b2d5e4' :
          d >= 4   ? '#e5f1f6' :
          '#ffffff';
}
var legend_com = L.control({position: 'topleft'});
legend_com.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 4, 7, 8, 9];

    div.innerHTML += '<b> Nombre d\espèces </b> <br> <br>';
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] ? ' – ' + grades[i+1] + '<br>' : '+');
    }
    return div;
};
legend_com.addTo(map);


var legend_zh = L.control({position: 'topleft'});
legend_zh.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend')
  div.innerHTML =  '<i style="background: #4c9ebf"></i> ' + ' Zone humide'
  return div;
};
legend_zh.addTo(map);

// ------------------------------- Affichage des couches  -------------------------------
//Fond de plan : OSM
// var baseLayers = {
//   "OpenStreetMap": osm
// };

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Amphibien commune": amph_com_map,
  "Amphibien Zone Humide": amph_zh_map
  // "Limite commune":commune_map
};
L.control.layers( overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

