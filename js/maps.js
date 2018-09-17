

let geog = $("#region_select").val();
let sitelayer = ''
let northLayer = ''
let southLayer = ''
let eastLayer = ''
let westLayer = ''

let regions = {
}

let map_white ={
  fillColor: "#D8D4D3",
  // weight: 1,
  // color: "#ADAAA9",
  // opacity: 1,
  // fillOpacity: 0.8
}

let map_transparent ={
  fillColor: "#ADAAA9",
  weight: 0.1,
  color: "#ADAAA9",
  opacity: 0.1,
  fillOpacity: 0.1
}

let map_red = {
  fillColor: '#C70039',
  // weight: 1,
  // color: "#ADAAA9",
  // opacity: 1,
  // fillOpacity: 0.8
}

let map_yellow = {
  fillColor: '#FFC300',
  // weight: 1,
  // color: "#ADAAA9",
  // opacity: 1,
  // fillOpacity: 0.8
}

let map_black = {
  fillColor: '#17202A',
  // weight: 1,
  // color: "#ADAAA9",
  // opacity: 1,
  // fillOpacity: 0.8
}
var Yellow = {
    fillColor: "#FFD27B",
    radius: 8,
    color: "#ff7800",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var Purple = {
    fillColor: "#7579A0",
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var lightPurple = {
    fillColor: "#D4D3E0",
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var lightYellow = {
    fillColor: "#FFEFD3",
    radius: 8,
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};


let yell_orange ={
  fillColor: "#FFEFD3",
  radius: 8,
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

let brown = {
  fillColor: "#AC6229",
  radius: 8,
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

let green = {
  fillColor: "#00AB4E",
  radius: 8,
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

let red = {
  fillColor: "#C44428",
  radius: 8,
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8
}

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

var map = L.map('map', {
        zoomSnap: 0.05,
        duration: 0.5,
        zoomControl: false
        });
// *******************************************  set windows based on media queries  ***********************************
            if (window.matchMedia("(min-width: 992px)").matches) {
                map.setView([49.95901374250066, -84.92799672316434], 5)

            } else if(window.matchMedia("(min-width: 768px)").matches) {
                map.setView([49.96476820929739, -85.21924120780686], 5.5)

            } else if (window.matchMedia("(min-width: 300px)").matches) {
                map.setView([49.014845091628885, -84.8537125219008], 4.6)
            } else {
            console.log ('ok')
            }

 // L.tileLayer(' https://api.mapbox.com/styles/v1/lavellgis/cjdk7huor5ia52sobkizesrgf/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF2ZWxsZ2lzIiwiYSI6ImNpeDZ3YnFvbzAxNHgyeXF5NDVob3VvanEifQ.2_vKfp2QtZlz70-C1Kkphw',{
 L.tileLayer('https://api.mapbox.com/styles/v1/lavellgis/cjdk7sipm3cez2rmk5v5tipfx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGF2ZWxsZ2lzIiwiYSI6ImNpeDZ3YnFvbzAxNHgyeXF5NDVob3VvanEifQ.2_vKfp2QtZlz70-C1Kkphw',{
    zoomSnap: 0.10,
    maxZoom: 18,
    // layers: [communities],
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

// ************************ function to get values from drop down ************
let region = ''
let foo = ''


// {lat: 55.05018018931494, lng: -71.61551428978369}_southWest: o.LatLng {lat: 44.27521955615456, lng: -98.22200242867075}__proto__: Object

 // map.fitBounds(e.target.getBounds());
// ************************ load Json ************
// this function below filters out the appropiate region from the main JSON. This then is used in the iteration
// below to be used in the map view
let loadIntial = ()=> {
  const North = ONWA_Regions.features.filter(region => {
     return region.properties.ON_Region === "Northern"
  })
  const South = ONWA_Regions.features.filter(region => {
     return region.properties.ON_Region === "Southern"
  })
  const East = ONWA_Regions.features.filter(region => {
     return region.properties.ON_Region === "Eastern"
  })
  const West = ONWA_Regions.features.filter(region => {
     return region.properties.ON_Region === "Western"
  })

ONWA_Regions.features.forEach(data => {
  region = data.properties.ON_Region
  if (region === "Northern") {
    northLayer = L.geoJSON(North, map_white)
  } else if ( region === 'Southern') {
    southLayer = L.geoJSON(South, map_red)
  } else if ( region === 'Eastern') {
    eastLayer = L.geoJSON(East, map_yellow)
  } else if ( region === 'Western') {
    westLayer = L.geoJSON(West, map_black)
  }
})

var geojson;

function getColor(d) {
  if ( d === 'Northern') {
    return "#D8D4D3"
  }
  if ( d === 'Southern') {
    return '#C70039'
  }
  if ( d === 'Eastern') {
    return '#FFC300'
  }
  if ( d === 'Western') {
    return '#17202A'
  }
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.ON_Region),
        weight: 2,
        opacity: 1,
        color: '#666',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: 'white',
        dashArray: '',
        fillOpacity: 0.7
    });
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

geojson = L.geoJson();

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

geojson = L.geoJson(ONWA_Regions, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);



ontarioLayer = L.geoJson(ONWA_Base, map_transparent)

regions.Northern = northLayer
regions.Southern = southLayer
regions.Eastern = eastLayer
regions.Western = westLayer
regions.Ontario = ontarioLayer
  sitelayer = L.geoJSON(ONWA_Sites, {
        pointToLayer: function (feature, latlng) {

            switch (feature.properties.Type)
             {
                case 'Council': return L.circleMarker(latlng, brown).bindPopup(`<p class="popUp">Name: </p> ${feature.properties.ONWA_Sites}<br /> <p class='popUp'>Location: </p> ${feature.properties.Location}`)
                case 'Chapter':  return L.circleMarker(latlng, yell_orange).bindPopup(feature.properties.ONWA_Sites)
                case 'Site':   return L.circleMarker(latlng, green).bindPopup(feature.properties.ONWA_Sites)
            }
          }
        }).addTo(map);
}
loadIntial()

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 10,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    // nodata()
}

function onEachFeature(feature, layer) {
layer.on({
        // click: zoomToFeature,
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

//******************************************************************************
 // map.on('click',function() {
 //     var center = map.getCenter()
 //     console.log(center)
 // });


 L.control.zoom({
      position:'bottomright'
 }).addTo(map);

 //********************************************change json on load**************

 //
 // let loadProvince = (geog)=> {
 //   if (geog === 'ON'){
 //     layer.remove()
 //     layer = L.geoJSON(ONWA_Base, {
 //             style: yellow
 //             }).addTo(map);
 //             layer.addTo(map)
 // } else if (geog === 'Region') {
 //   layer.remove()
 //   layer1 = L.geoJSON(ONWA_Regions, {
 //         }).bindPopup(function (layer) {
 //         }).addTo(map);
 //         layer.addTo(map)
 //   } else if (geog === 'Sites') {
 //   layer.remove()
 //     layer = L.geoJSON(ONWA_Sites, {
 //         pointToLayer: function (feature, latlng) {
 //             switch (feature.properties.Type)
 //              {
 //                 case 'Council': return L.circleMarker(latlng, brown)
 //                 case 'Chapter':  return L.circleMarker(latlng, yell_orange)
 //                 case 'Site':   return L.circleMarker(latlng, green)
 //             }
 //           }
 //         }).addTo(map);
 //     layer.addTo(map)
 //   }
 // }



 // let east = {lat: 46.60186445531054, lng: -78.4344247446958}
 // let Southern = {lat: 44.84592038220848, lng: -81.81439362160391}
 // let West = {lat: 51.49567730935694, lng: -88.82096414423653}
 // let North = {lat: 52.853132232207145, lng: -83.0178228146863}
