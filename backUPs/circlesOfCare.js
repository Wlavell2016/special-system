//******************************************************************************
// var Union = L.layerGroup().addTo(map);
//
// var Allied = L.layerGroup().addTo(map);
// var Rama = L.layerGroup().addTo(map);
// var Treaty3 = L.layerGroup().addTo(map);
// var Independent = L.layerGroup().addTo(map);
// var Tung_inuit = L.layerGroup().addTo(map);
// var All = L.layerGroup().addTo(map);


// make array to story color values
// var color = [union, allied, rama, treaty3, independant, metis, sauga, mohawk ,aski ,friendship, onwa, inuit, six, tung_inuit]
//
// var legend = L.control({position: 'topright'});
//
// legend.onAdd = function (map) {
//     	var div = L.DomUtil.create('div', 'info legend');
//     	// loop through the status values and generate a label with a coloured square for each value
// color.forEach(function(item){
//     console.log(item.color)
//     		div.innerHTML +=
//     			// <i class="circle" style="background:" +  + item.color + ></i>  + (item.radius ? item.radius + '<br>' : '+');
//                 `<i class="circle" style="background:${item.backgroundColor}"></i> ${item.name} <br>`
//     	})
//     	return div;
//     }
//     if (window.matchMedia("(min-width: 768px)").matches) {
//         legend.addTo(map);
// } else {
// console.log ('too small')
// }

 // var communities = {
 //   'Union of Ontario Indians': Union,
 //   'Association of Iroquois and Allied Indians': Allied,
 //   'Rama First Nation': Rama,
 //   'All': All,
 // };


// L.control.layers(communities,).addTo(map);
// layerControl = L.control.layers(null, communities, {position: 'topleft'});
// layerControl.addTo(map);

 // ***************************************************************************//
// working loading of data

// var fwblayer = L.geoJSON(data3, {
//     pointToLayer: function(feature, latlng) {
//         if (feature.properties.PartnerID === 1) {
//             var image2 = 'images/icons/union.png'
//             var circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(union)}).addTo(map)
//             Union.addLayer(circle).addTo(map);
//             All.addLayer(circle).addTo(map);
//
//         } else if (feature.properties.PartnerID === 2) {
//             var image2 = 'images/icons/AIAI.png'
//             var circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(allied)}).addTo(map)
//             Allied.addLayer(circle).addTo(map);
//             All.addLayer(circle).addTo(map);
//
//         //
//         } else if (feature.properties.PartnerID === 13) {
//             var image2 = 'images/icons/6nations.png'
//             var circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(six)}).addTo(map)
//             Six.addLayer(circle).addTo(map);
//             All.addLayer(circle).addTo(map);
//
//         //
//         } else if (feature.properties.PartnerID === 14) {
//             var image2 = 'images/icons/tungInuit.jpg'
//             var circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(tung_inuit)}).addTo(map)
//             Tung_inuit.addLayer(circle).addTo(map);
//             All.addLayer(circle).addTo(map);
//
//
//         } else {
//             var circle = L.marker(latlng, {icon: L.BeautifyIcon.icon(other)}).addTo(map)
//             All.addLayer(circle).addTo(map);
//
//         }
//             globalY =
//             circle.on('click', function() {
//                 // console.log(marker.title)
//                 if (window.matchMedia("(min-width: 992px)").matches) {
//                     map.flyTo(latlng, 10)
//                 } else if(window.matchMedia("(min-width: 768px)").matches) {
//                     var mapoffsetY = feature.properties.Y - -0.09
//                     var mapoffsetX = feature.properties.X - 0.25
//                     map.flyTo([mapoffsetY, mapoffsetX],10)
//                 } else if (window.matchMedia("(min-width: 300px)").matches) {
//                     var mapoffsetY = feature.properties.Y - 0.14
//                     var mapoffsetX = feature.properties.X - 0
//                     map.flyTo([mapoffsetY, mapoffsetX],10)
//                 } else {
//                 console.log ('ok')
//                 }
//                 $('#data img').attr('src',image2);
//                 $('#data .organization').text(feature.properties.Partner)
//                 $('#data .website').text(feature.properties.Website)
//                 $('#data .email').text(feature.properties.Email)
//                 $('#data .contact').text(feature.properties.Contact)
//                 $('#data .phone').text(feature.properties.Phone)
//                 $('#data .description_text').text(feature.properties.Description)
//                 if (checkclick === false) {
//                     sidebar.open('#sidebar');
//                     $('#data').addClass('active');
//                     checkclick = true;
//                 } else {
//                     sidebar.close('#sidebar');
//                     checkclick = false;
//                 }
//             })
//             return circle.bindPopup(feature.properties.Name)
//     },
//     onEachFeature: function (feature, layer) {
//        feature.layer = layer;
// }
// });
// map.addLayer(fwblayer);


//  ***************************************************************************//
    // var searchCtrl = L.control.fuseSearch()
    // searchCtrl.addTo(map);
    // searchCtrl.indexFeatures(data3, ['Name', 'Partner']);

    //******************************************************************************
    /* styles for the markers*/
    // var union = {
    //     iconSize:[16,16],
    //     iconShape:'circle-dot',
    //     backgroundColor:'rgb(136, 14, 79)',
    //     borderColor: '#BEBEBE',
    //     borderWidth: '1.5',
    //     borderStyle: 'solid',
    //     name: 'Union of Ontario Indians'
    // }
    //
    // var allied = {
    //     iconSize:[16,16],
    //     iconShape:'circle-dot',
    //     backgroundColor:'rgb(230, 81, 0)',
    //     borderColor: '#BEBEBE',
    //     borderWidth: '1.5',
    //     borderStyle: 'solid',
    //     name: 'Association  of Iroquois and Allied Indians'
    // }
    //
    // var other = {
    //     iconSize:[16,16],
    //     iconShape:'circle-dot',
    //     backgroundColor:'#45e8a1',
    //     borderColor: '#BEBEBE',
    //     borderWidth: '1.5',
    //     borderStyle: 'solid',
    //     name: "Tungasuvvingat Inuit"
    // }


    //  ***************************************************************************//
//     var customControl =  L.Control.extend({options: {position: 'topright'},
//
//       onAdd: function (map) {
//         var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control homebutton leaflet-control-custom');
//
//         container.style.backgroundColor = 'white';
//         container.style.backgroundImage = "url(images/home.png)";
//         container.style.backgroundSize = "22px 22px";
//         container.style.width = '44px';
//         container.style.height = '44px';
// container.style.align='center';
//         container.onclick = function(){
//             map.flyTo(center, 5.5)
//             sidebar.close('#sidebar');
//             checkclick = false;
//         }
//         return container;
//       }
//     });
//     var map;
//       map.addControl(new customControl());
    // }

  // });
