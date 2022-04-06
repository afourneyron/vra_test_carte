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
      // gestion des colonne des espèces       "": null, "": null, "": null, "": "2019-04-05T00:00:00", "": null
      var list_esp = '' 
      if(layer.feature.properties['Triton crêté']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Triton crêté </b>  : <span style="font-size: 14px;">' + layer.feature.properties['Triton crêté'].substr(0, 4) + '</span>  <em style="color:#FCBD00; font-size: 13px;"> (EN)</em> <br> '
      }
      if(layer.feature.properties['Sonneur à ventre jaune']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Sonneur à ventre jaune </b> : <span style="font-size: 14px;">' + layer.feature.properties['Sonneur à ventre jaune'].substr(0, 4) + '</span> <em style="color:#FFED00; font-size: 14px;"> (VU)</em> <br> '
      }
      if(layer.feature.properties['Crapaud calamite']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud calamite </b> : <span style="font-size: 14px;">' + layer.feature.properties['Crapaud calamite'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br> '
      }
      if(layer.feature.properties['Grenouille rousse']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille rousse </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille rousse'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br> '
      }
      if(layer.feature.properties['Pélodyte ponctué']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Pélodyte ponctué </b> : <span style="font-size: 14px;">' + layer.feature.properties['Pélodyte ponctué'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br> '
      }
      if(layer.feature.properties['Alyte accoucheur, Crapaud accoucheur']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud accoucheur </b> : <span style="font-size: 14px;">' + layer.feature.properties['Alyte accoucheur, Crapaud accoucheur'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br> '
      }
      if(layer.feature.properties['Crapaud épineux']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud épineux </b> : <span style="font-size: 14px;">' + layer.feature.properties['Crapaud épineux'].substr(0, 4) + '</span><em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br> '
      }
      if(layer.feature.properties['Grenouille agile']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille agile </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille agile'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br> '
      }
      if(layer.feature.properties['Salamandre tachetée']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Salamandre tachetée </b> : <span style="font-size: 14px;">' + layer.feature.properties['Salamandre tachetée'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br> '
      }
      if(layer.feature.properties['Triton palmé']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Triton palmé </b> : <span style="font-size: 14px;">' + layer.feature.properties['Triton palmé'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br> '
      }
      if(layer.feature.properties['Grenouille rieuse']  !== null ){
        list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille rieuse </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille rieuse'].substr(0, 4) + '</span> <em style="color:grey; font-size: 14px;"> (NA) </em> <br> '
      }
return('<b>' + layer.feature.properties.nom_com + '</b> <br> Nombre d\'espèces </b> : '+layer.feature.properties.nb_espece +' <hr> '+list_esp);
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
    var text = 'Type de zone humide test : ' + e.target.feature.properties.type +' <br> Zone prospectée : '+e.target.feature.properties.prospecte +' <br> Nombre d\'espèces : '+e.target.feature.properties.nb_espece;
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
    color: '#045cc7',
    weight: 5,
    fillOpacity: 1
},onEachFeature: onEachFeature4
}).bindPopup(function(layer){


   var list_esp = ' '
   nb_esp = 0
   if(layer.feature.properties.nb_espece > 0){
    
  if(layer.feature.properties['Triton crêté']  !== null ){
    list_esp = list_esp + ' <b style="font-size: 16px;"> Triton crêté </b>  : <span style="font-size: 14px;">' + layer.feature.properties['Triton crêté'].substr(0, 4) + '</span>  <em style="color:#FCBD00; font-size: 13px;"> (EN)</em> <br>'
    nb_esp= nb_esp+1
  }
  // if(layer.feature.properties['Sonneur à ventre jaune']  !== null ){
  //   list_esp = list_esp + '<br> <b style="font-size: 16px;"> Sonneur à ventre jaune </b> : <span style="font-size: 14px;">' + layer.feature.properties['Sonneur à ventre jaune'].substr(0, 4) + '</span> <em style="color:#FFED00; font-size: 14px;"> (VU)</em>'
  // }
  if(layer.feature.properties['Crapaud calamite']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud calamite </b> : <span style="font-size: 14px;">' + layer.feature.properties['Crapaud calamite'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Grenouille rousse']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille rousse </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille rousse'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Pélodyte ponctué']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Pélodyte ponctué </b> : <span style="font-size: 14px;">' + layer.feature.properties['Pélodyte ponctué'].substr(0, 4) + '</span> <em style="color:#23221C; font-size: 14px;"> (NT)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Alyte accoucheur, Crapaud accoucheur']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud accoucheur </b> : <span style="font-size: 14px;">' + layer.feature.properties['Alyte accoucheur, Crapaud accoucheur'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Crapaud épineux']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Crapaud épineux </b> : <span style="font-size: 14px;">' + layer.feature.properties['Crapaud épineux'].substr(0, 4) + '</span><em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Grenouille agile']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille agile </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille agile'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Salamandre tachetée']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Salamandre tachetée </b> : <span style="font-size: 14px;">' + layer.feature.properties['Salamandre tachetée'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Triton palmé']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Triton palmé </b> : <span style="font-size: 14px;">' + layer.feature.properties['Triton palmé'].substr(0, 4) + '</span> <em style="color:#74B94C; font-size: 14px;"> (LC)</em> <br>'
    nb_esp= nb_esp+1
  }
  if(layer.feature.properties['Grenouille rieuse']  !== null ){
    list_esp = list_esp + '<b style="font-size: 16px;"> Grenouille rieuse </b> : <span style="font-size: 14px;">' + layer.feature.properties['Grenouille rieuse'].substr(0, 4) + '</span> <em style="color:grey; font-size: 14px;"> (NA) </em> <br>'
    nb_esp= nb_esp+1
  }
  return('Type de zone humide : ' + layer.feature.properties.type +' <br> Zone prospectée : '+layer.feature.properties.prospecte +' <br> Nombre d\'espèces : '+nb_esp + '<hr>' +list_esp );
} else {
  return('Type de zone humide : ' + layer.feature.properties.type +' <br> Zone prospectée : '+layer.feature.properties.prospecte +' <br> Nombre d\'espèces : '+nb_esp );
}

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

    div.innerHTML += '<b> Nombre d\'espèces </b> <br> <br>';
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
  div.innerHTML =  '<i style="background: #045cc7"></i> ' + ' Zone humide'
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
  "Synthèse : Commune": amph_com_map,
  "Synthèse : Zone Humide": amph_zh_map
  // "Limite commune":commune_map
};
L.control.layers( overlays, null, {collapsed: false}  ).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

