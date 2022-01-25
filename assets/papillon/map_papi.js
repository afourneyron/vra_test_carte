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

// limite communale zone d'étude
var commune_map =L.geoJSON(data_amph_com, {
  style: {
    color: '#202020',
    weight: 2.5,
    dashArray: '5, 10',
    fillOpacity: 0.01
}
}).addTo(map);
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
      var text = '<b>' +  e.target.feature.properties.nom_com + '</b> <br> Donnée(s) : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+e.target.feature.properties.nb_espece;
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
    valueProperty: 'nb_espece',
    scale: ['white', 'mediumorchid'],
    steps: 5, // Nombre de classes
    mode: 'q',
    style: {
      color: '#fff',
      weight: 2,
      fillOpacity: 0.8
  },onEachFeature: onEachFeature
  }).bindPopup(function(layer){
  return('<b>' + layer.feature.properties.nom_com + '</b> <br> Donnée(s) : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+layer.feature.properties.nb_espece); //+  ' <br> Liste d\'espèce(s) : '+layer.feature.properties.list_espece );
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
      var text = '<br> Donnée(s) : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+e.target.feature.properties.nb_espece+ ' <br> Liste d\'espèce(s) : '+layer.feature.properties.list_espece; 
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
  return(' Donnée(s) : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+layer.feature.properties.nb_espece + ' <br> Liste d\'espèce(s) : '+layer.feature.properties.list_espece); 
  })
  




// LEGEND 

  function getColor(d) {
    return  d >= 80 ? '#ba55d3' :
            d >= 67 ? '#ce86e0' :
            d >= 50 ? '#ddaae9' :
            //d >= 4   ? '#e8c6f0' :
            '#ffffff';
  }

  function getColor2(d) {
    return  d >= 20 ? '#ba55d3' :
            d >= 10 ? '#ce86e0' :
            d >= 5 ? '#ddaae9' :
            //d >= 4   ? '#e8c6f0' :
            '#ffffff';
  }

  var legend_com = L.control({position: 'topleft'});
  legend_com.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 50, 68, 80];
  
      div.innerHTML += '<b> Nombre d\'espèces <br> par communes </b> <br>  <br> ';
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i]) + '"></i> ' +  //'   color   ' + getColor(grades[i]) + '  grade  '+ grades[i] + '  -----------  '+ // PARTIE DEBUG
              grades[i] + (grades[i + 1] ? ' – ' + grades[i+1] + '<br>' : '+');
      }
      return div;
  };
  legend_com.addTo(map);


  var legend_maille = L.control({position: 'topleft'});
  legend_maille.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 5, 10, 20];
  
      div.innerHTML += '<b> Nombre d\'espèces <br> par maille </b> <br>  <br> ';
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor2(grades[i]) + '"></i> ' + //'   color   ' + getColor(grades[i]) + '  grade  '+ grades[i] + '  -----------  '+ // PARTIE DEBUG
              grades[i] + (grades[i + 1] ? ' – ' + grades[i+1] + '<br>' : '+');
      }
      return div;
  };
  legend_maille.addTo(map);
  
  
  // var legend_zh = L.control({position: 'topleft'});
  // legend_zh.onAdd = function (map) {
  //   var div = L.DomUtil.create('div', 'info legend')
  //   div.innerHTML =  '<i style="background: #4c9ebf"></i> ' + ' Zone humide'
  //   return div;
  // };
  // legend_zh.addTo(map);

// ------------------------------- Affichage des couches  -------------------------------
//Fond de plan : OSM
// var baseLayers = {
//   "OpenStreetMap": osm
// };

// Overlays : Couches qui viennent se superposer au fond de plan 
var overlays = {
  "Papillon commune": pap_data_map,
  "Papillon maille": pap_data2_map,
  // "Limite commune":commune_map
};
// L.control.layers(baseLayers, overlays).addTo(map);
L.control.layers(overlays).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

