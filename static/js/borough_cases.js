var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 10.5
});

// function getColorCaseRate(d) {
//     return d > 3.5   ? '#990000' :
//            d > 3     ? '#d7301f' :
//            d > 2.5   ? '#ef6548' :
//            d > 2     ? '#fc8d59' :
//            d > 1.5   ? '#fdbb84' :
//            d > 1     ? '#fdd49e' :
//                        '#fef0d9' ;
// };

// function getColorHospVsCase(d) {
//   return d > 23      ? '#990000' :
//          d > 22      ? '#d7301f' :
//          d > 21      ? '#ef6548' :
//          d > 20      ? '#fc8d59' :
//          d > 15      ? '#fdbb84' :
//          d > 10      ? '#fdd49e' :
//                        '#fef0d9' ;
// }; 

// function getColorDeathVsHosp(d) {
//   return d > 35     ? '#990000' :
//          d > 34     ? '#d7301f' :
//          d > 33     ? '#ef6548' :
//          d > 32     ? '#fc8d59' :
//          d > 31     ? '#fdbb84' :
//          d > 30     ? '#fdd49e' :
//                       '#fef0d9' ;
// };


function style(feature) {
    return {
        fillColor: getColorCaseRate(feature.properties.casesVsPop),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.6
    };
}

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: API_KEY
}).addTo(myMap);

var geoData = "static/data/boroughShapes2.geojson";
var geojson;

// Our style object
// var mapStyle = {
//     color: "white",
//     fillColor: "green",
//     fillOpacity: 0.5,
//     weight: 1.5
//   };

  d3.json(geoData, function(data) {

    // Create a new choropleth layer
    geojson = L.choropleth(data, {
  
      // Define what  property in the features to use
      valueProperty: "casesVsPop",
  
      // Set color scale
      scale: ["#FFFF00", "#FF0000"],
  
      // Number of breaks in step range
      steps: 6,
  
      // q for quartile, e for equidistant, k for k-means
      mode: "q",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      //Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Borough: " + feature.properties.boro_name + 
        "<br>Population: " + feature.properties.population + 
        "<br>Covid Cases / Population: " + feature.properties.casesVsPop +"%");
      }
    }).addTo(myMap);
  });

  // var info = L.control();

  // info.onAdd = function (map) {
  //     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  //     this.update();
  //     return this._div;
  // };

  // // method that we will use to update the control based on feature properties passed
  // info.update = function (props) {
  //     this._div.innerHTML = '<h4>Bourough Covid Cases<br>Versus Population</h4>' +  (props ?
  //         '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
  //         : 'Hover over a state');
  // };

  // info.addTo(map);
  
  // var legend = L.control({position: 'bottomright'});

  // legend.onAdd = function (map) {
  
  //     var div = L.DomUtil.create('div', 'info legend'),
  //         grades = [0, 10, 20, 50, 100, 200, 500, 1000],
  //         labels = [];
  
  //     // loop through our density intervals and generate a label with a colored square for each interval
  //     for (var i = 0; i < grades.length; i++) {
  //         div.innerHTML +=
  //             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
  //             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  //     }
  
  //     return div;
  // };
  
  // legend.addTo(map);

  // var legend = L.control({ position: "bottomright" });
  // legend.onAdd = function() {
  //   var div = L.DomUtil.create("div", "info legend");
  //   var limits = geojson.options.limits;
  //   var colors = geojson.options.colors;
  //   var labels = [];

  //   // Add min & max
  //   var legendInfo = "<h1>Covid Infection Rate<br>vs Population</h1>" +
  //     "<div class=\"labels\">" +
  //       "<div class=\"min\">" + limits[0] + "</div>" +
  //       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
  //     "</div>";

  //   div.innerHTML = legendInfo;

  //   limits.forEach(function(limit, index) {
  //     labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
  //   });

  //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
  //   return div;
  // };

  // Adding legend to the map
  //legend.addTo(myMap);
