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
  


  var pap_data_map =L.geoJson(data_papi_com, {
    style: style,
    onEachFeature: onEachFeature
  }).bindPopup(function(layer){

    var_list_esp = ''
    if(layer.feature.properties.list_espece_pro != null){
      var_list_esp = var_list_esp+' <br> Liste d\'espèce(s) protégée(s): <span style="font-size: 12px;">'+layer.feature.properties.list_espece_pro+'</span>' 
    }
    if(layer.feature.properties.list_espece_non_pro != null){
      var_list_esp = var_list_esp+' <br> Liste d\'espèce(s) non protégée(s): <span style="font-size: 12px;">'+layer.feature.properties.list_espece_non_pro+'</span>' 
    }
  return('<b>' + layer.feature.properties.nom_com + '</b> <br> Donnée(s) : ' + layer.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+layer.feature.properties.nb_espece + var_list_esp); //+  ' <br> Liste d\'espèce(s) : '+layer.feature.properties.list_espece );
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
      var text = '<br> Donnée(s) : ' + e.target.feature.properties.nb_data + ' <br> Nombre d\'espèce(s) : '+e.target.feature.properties.nb_espece+ ' <br> Liste d\'espèce(s) : <span style="font-size: 12px;">'+layer.feature.properties.list_espece+'</span>'; 
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
  //   valueProperty: 'nb_espece',
  //   scale: ['white', 'mediumorchid'],
  //   steps: 4, // Nombre de classes
  //   mode: 'q',
  //   style: {
  //     color: '#fff',
  //     weight: 2,
  //     fillOpacity: 0.6
  // }
  style : style2
  ,onEachFeature: onEachFeature2
  }).bindPopup(function(layer){
    if(layer.feature.properties.nb_data != null){
      nb_data = layer.feature.properties.nb_data
    } else {
      nb_data = 0
    }
    var_list_esp = ''
    if(layer.feature.properties.nb_espece > 0){
      var_list_esp = var_list_esp+' <br> Liste d\'espèce(s) : <hr>' 
    }
    if(layer.feature.properties.list_espece_pro != null){
      var_list_esp = var_list_esp+' <span style="color:#FCBD00; font-size: 14px;"> Protégée(s): </span>  <span style="font-size: 12px;">'+layer.feature.properties.list_espece_pro+'</span><br> ' 
    }
    if(layer.feature.properties.list_espece_non_pro != null){
      var_list_esp = var_list_esp+'  <span style="color:#74B94C; font-size: 14px;"> Non protégée(s): </span>  <span style="font-size: 12px;">'+layer.feature.properties.list_espece_non_pro+'</span><br>' 
    }
  return(' Donnée(s) : ' + nb_data + ' <br> Nombre d\'espèce(s) : '+layer.feature.properties.nb_espece + var_list_esp); 
  })
  




// LEGEND 
function style(feature) {
  return {
      fillColor: getColor(feature.properties.nb_espece),
      weight: 2,
      fillOpacity: 0.8,
      color: 'white'
  };
}

  function getColor(d) {
    return  d >= 80 ? '#ba55d3' :
            d >= 67 ? '#ce86e0' :
            d >= 50 ? '#ddaae9' :
            d > 0   ? '#e8c6f0' :
            '#ffffff';
  }

  function style2(feature) {
    if(feature.properties.nb_espece > 0){
      return {
          fillColor: getColor2(feature.properties.nb_espece),
          weight: 2,
          fillOpacity: 0.8,
          color: 'white'
      };
    } else {
      return {
        fillColor: getColor2(feature.properties.nb_espece),
        weight: 2,
        fillOpacity: 0.01,
        color: 'white'
    };
    }
  }
  function getColor2(d) {
    return  d >= 20 ? '#ba55d3' :
            d >= 10 ? '#ce86e0' :
            d >= 5 ? '#ddaae9' :
            d > 0   ? '#e8c6f0' :
            '#ffffff';
  }

  var legend_com = L.control({position: 'topleft'});
  legend_com.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [1, 50, 68, 80];
  
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
          grades = [0,1, 5, 10, 20];
  
      div.innerHTML += '<b> Nombre d\'espèces <br> par maille 500x500m </b> <br>  <br> ';
      for (var i = 0; i < grades.length; i++) {

        if(i == 0){
          div.innerHTML +=
          '<i style="background:' + getColor2(grades[i]) + '"></i> ' + //'   color   ' + getColor(grades[i]) + '  grade  '+ grades[i] + '  -----------  '+ // PARTIE DEBUG
           '0 <br>' ;
        } else {
          div.innerHTML +=
          '<i style="background:' + getColor2(grades[i]) + '"></i> ' + //'   color   ' + getColor(grades[i]) + '  grade  '+ grades[i] + '  -----------  '+ // PARTIE DEBUG
          grades[i] + (grades[i+1] ? ' – ' + grades[i+1] + '<br>' : '+');
        }

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
  "Synthèse : Commune": pap_data_map,
  "Synthèse : Maille": pap_data2_map,
  // "Limite commune":commune_map
};


// L.control.layers(baseLayers, overlays).addTo(map);
L.control.layers(overlays,null, {collapsed: false} ).addTo(map);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

