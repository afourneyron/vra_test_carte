// création de la carte web de base 

var map = L.map('map');
var osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib = 'Map data © OpenStreetMap Contributeur';
var osm = new L.TileLayer(osmUrl, {attribution: osmAttrib}).addTo(map);
var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: 'abcd',
  maxZoom: 19
});
var GeoportailFrance_orthos = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
  attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
  bounds: [[-75, -180], [81, 180]],
  minZoom: 2,
  maxZoom: 19,
  apikey: 'choisirgeoportail',
  format: 'image/jpeg',
  style: 'normal'
});

map.setView([44.858,5.00],12); // définir les paramètre de visualisation de la carte

//------------------------------------ AJOUT DES DONNEES ------------------------------------



// Carte des données hérisson et écureuille 
var heri = L.icon({
  iconUrl: 'images/heri.png',
  iconSize: [30,20],
  iconAnchor: [30,20],
  popupAnchor:  [-10, -20]
});

var ecu = L.icon({
  iconUrl: 'images/ecu.png',
  iconSize: [30,30],
  iconAnchor: [30,30],
  popupAnchor:  [-10, -20]
});

var ecu_data_map = L.geoJSON(data_ecu, {
  pointToLayer: function(feature, latlng) {

    if (feature.properties.nom_vern == 'Écureuil roux') {
      return L.marker(latlng, {icon:  ecu});
    } else {
      return L.marker(latlng, {icon: heri});
    }
        }
}).bindPopup(function(layer) { return (layer.feature.properties.nom_vern) })
.addTo(map);


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
})

// Carte des données papillons mailles

function resetHighlight2(e) {
  pap_data2_map.resetStyle(e.target);
}

function highlightFeature2(e) {
  e.target.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        e.target.bringToFront();
    }
    var text = '<br> Données : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
    L.DomUtil.get('info').innerHTML = text
} 

function onEachFeature(feature, layer) {
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
    fillOpacity: 0.8
},onEachFeature: onEachFeature
}).bindPopup(function(layer){
return(' Données : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
})


// carte hirondelle


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
  return ( '<b>'+ layer.feature.properties.nom_vern + '</b> <br> Année : '+ layer.feature.properties.annee +'<br> Observateur :'+layer.feature.properties.observers+'<br> Nombre de nid :' + nb_nid) });


  var hiron_fenetre_data_map = L.geoJSON(data_hiron_fenetre, {
    pointToLayer: function(feature, latlng) {
        return L.marker(latlng, {icon:  hiron2});
          }
  }).bindPopup(function(layer) { 
    var nb_nid = layer.feature.properties.nb_nid_detection
    if (nb_nid == null){
      nb_nid = layer.feature.properties.nombre_saisie
    } 
    return ( '<b>'+ layer.feature.properties.nom_vern + '</b> <br> Année : '+ layer.feature.properties.annee +'<br> Observateur :'+layer.feature.properties.observers+'<br> Nombre de nid :' + nb_nid) });
  

// var hiron_fenetre_data_map = new L.MarkerClusterGroup(hiron_fenetre_data_map, {
//   iconCreateFunction: function(cluster) {
//     return L.divIcon({ 
//         html: cluster.getChildCount(), 
//         className: 'mycluster', 
//         iconSize: null 
//     });}
// })


// Carte amphibien commune 

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
  scale: ['white', 'green'],
  steps: 8, // Nombre de classes
  mode: 'q',
  style: {
    color: '#fff',
    weight: 2,
    fillOpacity: 0.8
},onEachFeature: onEachFeature3
}).bindPopup(function(layer){
return('<b>' + layer.feature.properties.nom_com + ' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
})


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
  scale: ['white', 'green'],
  steps: 8, // Nombre de classes
  mode: 'q',
  style: {
    color: '#fff',
    weight: 2,
    fillOpacity: 0.8
},onEachFeature: onEachFeature4
}).bindPopup(function(layer){
return('<b> Type de zone humide : ' + layer.feature.properties.type +' <br> Zone prospecté : '+layer.feature.properties.prospecte +' <br> Nombre d\'espèces : '+layer.feature.properties.nb_espece);
})

// ------------------------------- Affichage des couches  -------------------------------
//Fond de plan : OSM
var baseLayers = {
  "OpenStreetMap": osm
};

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Ecureuil et hérisson": ecu_data_map,
  "Papillon commune":pap_data_map,
  "Papillon maille":pap_data2_map,
  "Hirondelle rustique" : hiron_rustique_data_map,
  "Hirondelle fenetre" : hiron_fenetre_data_map,
  "Amphibien commune" : amph_com_map,
  "Amphibien Zone Humide" : amph_zh_map
};
L.control.layers(baseLayers, overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

