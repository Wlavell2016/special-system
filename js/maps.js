let circle = L.marker();

let geog = $("#region_select").val();
let sitelayer = ''
let northLayer = ''
let southLayer = ''
let eastLayer = ''
let westLayer = ''

let regions = {
}

let chart_red = {
  backgroundColor: '#b2453e',
  iconSize:[16,16],
  iconShape:'circle-dot',
  borderColor: '#BEBEBE',
  borderWidth: '1.5',
  borderStyle: 'solid',
  name: 'Union of Ontario Indians'
}

let chart_blue = {
  backgroundColor: '#334553',
  iconSize:[16,16],
  iconShape:'circle-dot',
  borderColor: '#BEBEBE',
  borderWidth: '1.5',
  borderStyle: 'solid',
  name: 'Union of Ontario Indians'
}

let chart_greenblue = {
  backgroundColor: '#6f9ea6',
  iconSize:[16,16],
  iconShape:'circle-dot',
  borderColor: '#BEBEBE',
  borderWidth: '1.5',
  borderStyle: 'solid',
  name: 'Union of Ontario Indians'
}


let chart_beige = {
  backgroundColor: '#c9866b',
  iconSize:[16,16],
  iconShape:'circle-dot',
  borderColor: '#BEBEBE',
  borderWidth: '0.5',
  borderStyle: 'solid',
  opacity: 0,
  name: 'Union of Ontario Indians'
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

var Council = {
    iconSize:[16,16],
    iconShape:'circle-dot',
    backgroundColor:'rgb(136, 14, 79)',
    borderColor: '#BEBEBE',
    borderWidth: '1.5',
    borderStyle: 'solid',
    name: 'Union of Ontario Indians'
}

var Chapter = {
    iconSize:[16,16],
    iconShape:'circle-dot',
    backgroundColor:'rgb(230, 81, 0)',
    borderColor: '#BEBEBE',
    borderWidth: '1.5',
    borderStyle: 'solid',
    name: 'Association  of Iroquois and Allied Indians'
}

var Site = {
    iconSize:[16,16],
    iconShape:'circle-dot',
    backgroundColor:'rgb(129, 119, 23)',
    borderColor: '#BEBEBE',
    borderWidth: '1.5',
    borderStyle: 'solid',
    name: 'Chippewas of Rama First Nation'
}
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

let siteID = {
  'Aroland': {lat: 50.232409, lng:  -86.983563},
  'Baltimore': {lat: 44.023419, lng:  -78.147036},
  'Barrie': {lat:  44.380637, lng: -79.69435},
  'Rocky Bay': {lat: 49.436717, lng: -88.1302},
  'Blind River': {lat: 46.18805, lng: -82.955344},
  'Cochrane': {lat: 49.06312 , lng: -81.025152},
  'Constance Lake': {lat: 49.805058 , lng: -84.137481},
  'Dryden': {lat: 49.790597, lng: -92.844159},
  'Fort William': {lat: 48.33799, lng: -89.224147},
  'Garden River': {lat: 46.553347, lng: -84.178148},
  'Geraldton': {lat: 49.715374, lng: -86.952501},
  'Ginoogaming First Nation': {lat: 49.771013, lng: -86.541721},
  'Grassy Narrows': {lat: 50.149947, lng: -94.004238},
  'Hamilton': {lat: 43.230948, lng: -79.80677},
  'Heron Bay': {lat: 48.664124, lng: -86.281112},
  'Kapuskasing': {lat: 49.421084, lng: -82.42915},
  'Kenora': {lat: 49.76702, lng: -94.490783},
  'Kingston': {lat: 44.234247, lng: -76.489116},
  'Kirkland Lake': {lat: 48.156697, lng: -80.024607},
  'Lakefield': {lat: 44.42352, lng: -78.272491},
  'Little Current': {lat: 45.978517, lng: -81.927526},
  'London': {lat: 42.979574, lng: -81.249943},
  'Longlac': {lat: 49.77984, lng: -86.534424},
  'MacDiarmid': {lat: 49.434846, lng: -88.129744},
  'Manitowaning': {lat: 45.742981, lng: -81.80699},
  'Marathon': {lat: 48.713428, lng: -86.377636},
  'Midland': {lat: 44.741497, lng: -79.879257},
  'Moosonee': {lat: 51.274608, lng: -80.641154},
  'Napanee': {lat: 44.261782, lng: -76.95735},
  'Newmarket': {lat: 44.06665, lng: -79.430793},
  'Niagara': {lat: 42.905214, lng: -78.955774},
  'Nipigon': {lat: 49.014804, lng: -88.264952},
  'Orillia': {lat: 44.61322, lng: -79.418103},
  'Ottawa': {lat: 45.406432, lng: -75.720113},
  'Sault Ste.Marie': {lat: 46.508272, lng: -84.330382},
  'Shannonville': {lat: 44.195492, lng: -77.246871},
  'Sioux Lookout': {lat: 50.104023, lng: -91.91207},
  'St. Catherines': {lat: 43.17466, lng: -79.244753},
  'Sudbury': {lat: 46.49143, lng: -80.99028},
  'Thunder Bay': {lat: 48.412236, lng: -89.248608},
  'Timmins': {lat: 48.472678, lng: -81.329643},
  'Toronto': {lat: 43.660855, lng: -79.372528}
}


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
          if (feature.properties.Type === 'Council') {
               circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(chart_blue)}).addTo(map).bindPopup(`<p class="popUp">Name: </p> ${feature.properties.ONWA_Sites}<br /> <p class='popUp'>Location: </p> ${feature.properties.Location}`)
          } else if (feature.properties.Type === 'Chapter')  {
               circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(chart_greenblue)}).addTo(map).bindPopup(`<p class="popUp">Name: </p> ${feature.properties.ONWA_Sites}<br /> <p class='popUp'>Location: </p> ${feature.properties.Location}`)
          } else if (feature.properties.Type === 'Site')  {
               circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(chart_red)}).addTo(map).bindPopup(`<p class="popUp">Name: </p> ${feature.properties.ONWA_Sites}<br /> <p class='popUp'>Location: </p> ${feature.properties.Location}`)
          }
          circle.on('click', function() {
            console.log('foo')
              map.flyTo(latlng, 12)
          })
        }
      })
map.addLayer(sitelayer);
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

function onEachFeature(feature, Sitelayer) {
layer.on({
        click: zoomToFeature,
        mouseover: highlightFeature,
        mouseout: resetHighlight
    });
}

//******************************************************************************
 L.control.zoom({
      position:'bottomright'
 }).addTo(map);

 //********************************************change json on load**************

 // let east = {lat: 46.60186445531054, lng: -78.4344247446958}
 // let Southern = {lat: 44.84592038220848, lng: -81.81439362160391}
 // let West = {lat: 51.49567730935694, lng: -88.82096414423653}
 // let North = {lat: 52.853132232207145, lng: -83.0178228146863}
