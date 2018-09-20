$(window).on('load', function(){
  $('.preloader').delay(2000).fadeOut('slow');
  $('.preloader2').delay(2000).fadeOut('slow');
  $('.preloader3').delay(2000).fadeOut('slow');
});
/*
*    main.js
*    Mastering Data Visualization with D3.js
*    10.5 - Handling events across objects
*/
// ********** Colours *********
let ONWAcolours = []
let black = ['#808080']
let default1 =  [
  'rgba(255, 99, 132, 0.9)',
            'rgba(54, 162, 235, 0.9)',
            'rgba(255, 206, 86, 0.9)',
            'rgba(75, 192, 192, 0.9)',
            'rgba(153, 102, 255, 0.9)',
            'rgba(255, 159, 64, 0.9)'
]
let medicineWheel = [
            '#D8D4D3',
            '#C70039',
            '#FFC300',
            '#17202A'
]
let default2 = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']

// Global variables
let lineChart,
    donutChart1,
    donutChart2,
    kobodata;

let statusLabels = []
let statusValues = []
let statusData = []

let reserveValues = []
let reserveData = []
let reserveLabels = []

let urbanValues = []
let urbanData = []
let urbanLabels = []

let regionValues = []
let regionData = []
let regionLabels = []

let programmeValues = []
let programmeData = []
let programmeLabels = []

let cleanData = []

let siteLabels = []
let siteValues = []
let siteData = []

let cleanDataSites = []
let sitesSiteNames = []
let siteDifference = ''


let reset = false

let dropdownIndicator = $("#indicator_select").val()
let dropdownRegion = $("#region_select").val()
let dropdownSite = $("#site_select").val()


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ***********  Get data from Kobo ************
var auth = btoa('lavellonwa:Bangkok69!');
// // token 9237e038cfc26bc5c9637ba7f7e8bd6d8f3a0964
  $.ajax
  ({
    type: "GET",
    url: 'https://cors-anywhere.herokuapp.com/https://kc.kobotoolbox.org/api/v1/data/193726',
    dataType: 'json',
    crossDomain:false,
    async: false,
    headers: {
         "Authorization": "Basic " + auth
     }
  }).done(function(data){
    kobodata = data
  });

// ******************** cleaning data *************

// **** intialization of objects **********
let stringtoInt =(data)=> {
  cleanData.push(Trimmed_ObjectKeys)
    cleanData.forEach(data=>{
      for (var key in data) {
        if (key != 'Region' && key !='Site_Type' && key !='Office_Type' && key !='Report_Type' &&
        key != 'image_office' && key != 'image_members' && key != '_attachments') {
          data[key] = +data[key]
      }
    }
  })
}

let mappedData =(data) => {
  Trimmed_ObjectKeys = _.mapKeys(data, function(value, key){
    let keyIndex = key.indexOf('/')
    if (keyIndex != -1) {
      return key.slice(keyIndex + 1)
    }
    return key;
  })
  return Trimmed_ObjectKeys
}

let processSite =(data)=> {
  if(dropdownSite === data.Site_Type  && dropdownIndicator === data.Report_Type) {
    mappedData(data)
    stringtoInt(data)
  } else if(dropdownSite === data.Site_Type  && dropdownIndicator === 'all') {
    mappedData(data)
    stringtoInt(data)
  }
}
let processRegion =(data)=> {
  if(dropdownRegion === 'Ontario' && dropdownIndicator === 'all') {
    mappedData(data)
    stringtoInt(data)
  } else if (dropdownRegion === 'Ontario' && dropdownIndicator === data.Report_Type){
    mappedData(data)
    stringtoInt(data)
  } else if (data.Region === dropdownRegion && dropdownIndicator === 'all'){
    mappedData(data)
    stringtoInt(data)
  } else if (data.Region === dropdownRegion && data.Report_Type === dropdownIndicator){
      mappedData(data)
      stringtoInt(data)
  }
}

let pageReset =()=> {
  cleanData = []
  kobodata.forEach(data => {
    mappedData(data)
    stringtoInt(data)
  })
}

let processData =() =>{
  cleanData = []
  kobodata.forEach(data => {
    if (dropdownSite != 'All Sites') {
      processSite(data)
    } else {
      processRegion(data)
    }
  })
}

// ************ function to update objects **************
class IdentityObject {
    constructor(region, programme, status_val, inuit_val, non_val, metis_val){
      this.region = region;
      this.programmeType = programme;
      this.status = status_val;
      this.inuit = inuit_val;
      this.nonStatus = non_val;
      this.metis = metis_val;
    }
  }

class LocationObject {
    constructor(region, programme, on_val, off_val){
      this.region = region;
      this.programmeType = programme;
      this.On_reserve = on_val;
      this.Off_reserve = off_val;
    }
  }

class UrbanObject {
    constructor(region, programme, urban_val, rural_val){
      this.region = region;
      this.programmeType = programme;
      this.urban = urban_val;
      this.rural = rural_val;
    }
  }

class RegionObject {
    constructor(region, programme, north_val, south_val, east_val, west_val){
      this.region = region;
      this.programmeType = programme;
      this.north = north_val;
      this.south = south_val;
      this.east = east_val;
      this.west = west_val;
    }
  }

class SiteObject {
    constructor(region, programme, totals){
      this.region = region;
      this.programmeType = programme;
      this.programmeTotal = totals;
    }
  }

class ProgrammeObject {
    constructor(region, programme, member_values, human_values , healthy__babies_values, missing_values, diabetes_values, gambling_values,sexual_assualt_values, skills_employment_values, victom_liason_values, leadership_values, circle_care_values,community_health_values,wellness_values,mental_health_values,my_house_values,youth_worker_values){
      this.region = region;
      this.membership = member_values;
      this.human_traffick = human_values;
      this.missing_and_mu = missing_values;
      this.healthy_babies = healthy__babies_values;
      this.diabetes = diabetes_values;
      this.gambling = gambling_values;
      this.sexual = sexual_assualt_values;
      this.skills = skills_employment_values;
      this.victim = victom_liason_values;
      this.leadership = leadership_values;
      this.circle_care = circle_care_values;
      this.community = community_health_values;
      this.wellness = wellness_values;
      this.mental_health = mental_health_values;
      this.my_house = my_house_values;
      this.youth_worker = youth_worker_values;
    }
  }


// ************* Function to set regions and programme type based on user ****************

let checkDropDowns =(chart, data) => {
  if(dropdownRegion === 'Ontario' && dropdownIndicator === 'all') {
    chart.region = 'Ontario'
    chart.programmeType = 'All'
  } else {
    chart.region = dropdownRegion;
    chart.programmeType = dropdownIndicator;
  }
}
// ************* populate objects ****************

let programme_totals = new ProgrammeObject('',' ', 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)

let populateArrayProgramme=(chart, values_array, data_array, labels_array) =>{
    for ( let key in chart) {
      if(key !=='region'){
        values_array.push(chart[key])
        data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
        labels_array.push(capitalizeFirstLetter(key))
      }
    }
}

let checkvalues =(array, indicator) => {
  if (array.Report_Type !== undefined && array.Report_Type === indicator){
    if (array.Total_members !== undefined && array.Total_members != 0) {
    }
    return true
  }
}

let createprogrammeTotals =() => {
  cleanData.forEach(data => {
    programme_totals.region = data.Region;
      if (checkvalues(data,'membership') === true) {
        programme_totals.membership += data.Total_members;
      } else if  (checkvalues(data,'human_traffick') === true) {
        programme_totals.human_traffick += data.Total_members;
      } else if  (checkvalues(data,'missing_and_mu') === true) {
        programme_totals.missing_and_mu += data.Total_members;
      } else if  (checkvalues(data,'healthy_babies') === true) {
        programme_totals.healthy_babies += data.Total_members;
      } else if  (checkvalues(data,'diabetes') === true) {
        programme_totals.diabetes += data.Total_members;
      } else if  (checkvalues(data,'gambling') === true) {
        programme_totals.gambling += data.Total_members;
      } else if  (checkvalues(data,'sexual') === true) {
        programme_totals.sexual += data.Total_members;
      } else if  (checkvalues(data,'skills') === true) {
        programme_totals.skills += data.Total_members;
      } else if  (checkvalues(data,'victim') === true) {
        programme_totals.victim += data.Total_members;
      } else if  (checkvalues(data,'leadership') === true) {
        programme_totals.leadership += data.Total_members;
      } else if  (checkvalues(data,'circle_care') === true) {
        programme_totals.circle_care += data.Total_members;
      } else if  (checkvalues(data,'community') === true) {
        programme_totals.community += data.Total_members;
      } else if  (checkvalues(data,'wellness') === true) {
        programme_totals.wellness += data.Total_members;
      } else if  (checkvalues(data,'mental_health') === true) {
        programme_totals.mental_health += data.Total_members;
      } else if  (checkvalues(data,'my_house') === true) {
        programme_totals.my_house += data.Total_members;
      } else if  (checkvalues(data,'youth_worker') === true) {
        programme_totals.youth_worker += data.Total_members;
      }
  })
  populateArrayProgramme(programme_totals, programmeValues, programmeData, programmeLabels)
}

let updateProgrammeTotals =() => {

  cleanData =[]
  programmeValues = []
  programmeData = []
  programmeLabels =[]
  processData()
  programme_totals.membership = 0;
  programme_totals.human_traffick = 0;
  programme_totals.healthy_babies = 0;
  programme_totals.missing_and_mu = 0;
  programme_totals.diabetes = 0;
  programme_totals.gambling = 0;
  programme_totals.sexual = 0;
  programme_totals.skills = 0;
  programme_totals.victim = 0;
  programme_totals.leadership = 0;
  programme_totals.circle_care = 0;
  programme_totals.community = 0;
  programme_totals.wellness = 0;
  programme_totals.mental_health = 0;
  programme_totals.my_house = 0;
  programme_totals.youth_worker = 0;

  cleanData.forEach(data => {
    checkDropDowns(programme_totals, data)
    if (checkvalues(data,'membership') === true) {
      programme_totals.membership += data.Total_members;
    } else if  (checkvalues(data,'human_traffick') === true) {
      programme_totals.human_traffick += data.Total_members;
    } else if  (checkvalues(data,'missing_and_mu') === true) {
      programme_totals.missing_and_mu += data.Total_members;
    } else if  (checkvalues(data,'healthy_babies') === true) {
      programme_totals.healthy_babies += data.Total_members;
    } else if  (checkvalues(data,'diabetes') === true) {
      programme_totals.diabetes += data.Total_members;
    } else if  (checkvalues(data,'gambling') === true) {
      programme_totals.gambling += data.Total_members;
    } else if  (checkvalues(data,'sexual') === true) {
      programme_totals.sexual += data.Total_members;
    } else if  (checkvalues(data,'skills') === true) {
      programme_totals.skills += data.Total_members;
    } else if  (checkvalues(data,'victim') === true) {
      programme_totals.victim += data.Total_members;
    } else if  (checkvalues(data,'leadership') === true) {
      programme_totals.leadership += data.Total_members;
    } else if  (checkvalues(data,'circle_care') === true) {
      programme_totals.circle_care += data.Total_members;
    } else if  (checkvalues(data,'community') === true) {
      programme_totals.community += data.Total_members;
    } else if  (checkvalues(data,'wellness') === true) {
      programme_totals.wellness += data.Total_members;
    } else if  (checkvalues(data,'mental_health') === true) {
      programme_totals.mental_health += data.Total_members;
    } else if  (checkvalues(data,'my_house') === true) {
      programme_totals.my_house += data.Total_members;
    } else if  (checkvalues(data,'youth_worker') === true) {
      programme_totals.youth_worker += data.Total_members;
    }
    })
    populateArrayProgramme(programme_totals, programmeValues, programmeData, programmeLabels)
}

// ************* populate objects ****************
let populateArrayStatus=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if (key === 'status' || key === 'metis' || key === 'nonStatus' || key === 'inuit'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}

// ************ Identity ***************
let chart_status = new IdentityObject ('','',0,0,0,0)
let createIdentity =() => {
  cleanData.forEach(data => {
    checkDropDowns(chart_status, data)
    if (data.Status !== undefined && data.Status != 0) {
      chart_status.status += data.Status ;
    }
    if (data.Non_Status !== undefined && data.Non_Status != 0) {
      chart_status.nonStatus += data.Non_Status ;
    }
    if (data.Metis !== undefined && data.Metis != 0) {
      chart_status.metis += data.Metis;
    }
    if (data.Inuit !== undefined && data.Inuit != 0) {
      chart_status.inuit += data.Inuit;
    }
  })
  populateArrayStatus(chart_status, statusValues, statusData, statusLabels)
}

let updateIdentity =() => {
  cleanData =[]
  statusValues = []
  statusData = []
  statusLabels =[]
  processData()
  chart_status.status = 0;
  chart_status.nonStatus =0;
  chart_status.metis = 0;
  chart_status.inuit = 0;
  cleanData.forEach(data => {
    checkDropDowns(chart_status, data)
    if (data.Status !== undefined && data.Status != 0) {
      chart_status.status += data.Status ;
    }
    if (data.Non_Status !== undefined && data.Non_Status != 0) {
      chart_status.nonStatus += data.Non_Status ;
    }
    if (data.Metis !== undefined && data.Metis != 0) {
      chart_status.metis += data.Metis;
    }
    if (data.Inuit !== undefined && data.Inuit != 0) {
      chart_status.inuit += data.Inuit;
    }
    })
    populateArrayStatus(chart_status, statusValues, statusData, statusLabels)
}

// ************ on off reserve ***************
let populateArraysReserve=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if (key === 'On_reserve' || key === 'Off_reserve'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}

let chart_rez = new LocationObject ('','',0,0)
let createLocation =() => {
  cleanData.forEach(data => {
    checkDropDowns(chart_rez, data)
    if (data.On_reserve !== undefined && data.On_reserve != 0) {
      chart_rez.On_reserve += data.On_reserve ;
    }
    if (data.Off_reserve !== undefined && data.Off_reserve != 0) {
      chart_rez.Off_reserve += data.Off_reserve ;
    }
  })
  populateArraysReserve(chart_rez, reserveValues, reserveData, reserveLabels)
}

let updateLocation =() => {
  cleanData =[]
  reserveData = []
  reserveLabels = []
  processData()
  chart_rez.On_reserve = 0;
  chart_rez.Off_reserve = 0;
  cleanData.forEach(data => {
    checkDropDowns(chart_rez, data)
      if (data.On_reserve !== undefined && data.On_reserve != 0) {
        chart_rez.On_reserve += data.On_reserve ;
      }
      if (data.Off_reserve !== undefined && data.Off_reserve != 0) {
        chart_rez.Off_reserve += data.Off_reserve ;
      }
    })
    populateArraysReserve(chart_rez, reserveValues, reserveData, reserveLabels)
}

// ************* Rural urban*************
let populateArraysUrban=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if (key === 'urban' || key === 'rural'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}

let chart_urban = new UrbanObject ('','',0,0)
  let createUrban =() => {
    cleanData.forEach(data => {
      checkDropDowns(chart_urban, data)
          if (data.Urban_areas !== undefined && data.Urban_areas != 0) {
            chart_urban.urban += data.Urban_areas ;
          }
          if (data.Rural_areas !== undefined && data.Rural_areas != 0) {
            chart_urban.rural += data.Rural_areas ;
          }
      })
    populateArraysUrban(chart_urban, urbanValues, urbanData, urbanLabels)
  }

let updateUrban =() => {
    cleanData =[]
    urbanData = []
    urbanLabels = []
    processData()
    chart_urban.urban = 0;
    chart_urban.rural = 0;
    cleanData.forEach(data => {
      checkDropDowns(chart_urban, data)
          if (data.Urban_areas !== undefined && data.Urban_areas != 0) {
            chart_urban.urban += data.Urban_areas ;
          }
          if (data.Rural_areas !== undefined && data.Rural_areas != 0) {
            chart_urban.rural += data.Rural_areas ;
          }
      })
  populateArraysUrban(chart_urban, urbanValues, urbanData, urbanLabels)
}

  // ************* Region*************
let populateArraysRegion=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if (key === 'north' || key === 'south' || key === 'east' || key === 'west'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}

let chart_region = new RegionObject ('','',0,0,0,0)

let createRegion =() => {
  cleanData.forEach(data => {
    checkDropDowns(chart_region, data)
      if (data.Region !== undefined && data.Region != 0) {
        if (data.Region ==='Northern'){
          chart_region.north += data.Total_members;
        } else if (data.Region ==='Southern' ){
          chart_region.south += data.Total_members;
        } else if (data.Region ==='Eastern'){
          chart_region.east += data.Total_members;
        } else if (data.Region ==='Western') {
          chart_region.west += data.Total_members;
        }
      }
  })
  populateArraysRegion(chart_region, regionValues, regionData, regionLabels)
}

let updateRegion =() => {
  cleanData =[]
  regionData = []
  regionLabels = []
  processData()
    chart_region.north = 0;
    chart_region.south = 0;
    chart_region.east  = 0;
    chart_region.west  = 0;
    cleanData.forEach(data => {
    checkDropDowns(chart_region, data)
      if (data.Region !== undefined && data.Region != 0) {
        if (data.Region ==='Northern'){
          chart_region.north += data.Total_members;
        } else if (data.Region ==='Southern' ){
          chart_region.south += data.Total_members;
        } else if (data.Region ==='Eastern'){
          chart_region.east += data.Total_members;
        } else if (data.Region ==='Western') {
          chart_region.west += data.Total_members;
        }
      }
    })
  populateArraysRegion(chart_region, regionValues, regionData, regionLabels)
}
  // ************* Site *************************

let populateArraySites=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if(key !=='region' && key !=='programmeType' && key !=='programmeTotal'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}

let sites = new SiteObject('', '',0)

let SiteCreate =() => {
  cleanData.forEach(data => {
    checkDropDowns(sites, data)
    if (data.Site_Type !== undefined && data.Site_Type != 0) {
      officeLocation = data.Site_Type
    }
    if (data.Total_members !== undefined && data.Total_members != 0) {
      sites.programmeTotal += data.Total_members;
    if(sites.hasOwnProperty(officeLocation)=== false){
        sites[officeLocation] = 0;
        sites[officeLocation] += data.Total_members
      } else {
        sites[officeLocation] += data.Total_members
      }
    }
  })
  populateArraySites(sites, siteValues, siteData, siteLabels)
}

let updateSites =() => {
  cleanData =[]
  siteData = []
  siteLabels = []
  siteValues =[]
  processData()
  // remove old objects based on the difference between the filter.
  cleanData.forEach(data => {
        for (let key in sites) {
            if(key !=='region' && key !=='programmeType' && key !=='programmeTotal'  ) {
              delete sites[key]
            }
        }
    })
  cleanData.forEach(data => {
    checkDropDowns(sites, data)
    if (data.Site_Type !== undefined) {
        officeLocation = data.Site_Type
    }
    if(sites.hasOwnProperty(officeLocation)=== false){
      sites[officeLocation] = 0;
    }
    if (data.Total_members !== undefined) {
        sites.programmeTotal += data.Total_members;
        sites[officeLocation]  += data.Total_members;
    }
  })
  console.log(sites)
  populateArraySites(sites, siteValues, siteData, siteLabels)
}

// *************** create chart objects ********************
processData()
createIdentity()
createRegion()
createUrban()
createLocation()
createprogrammeTotals()
SiteCreate()

// *************** create chart objects ********************

let nodata =()=> {
    processData()
    if (cleanData.length === 0){
      console.log('foo')
      statusData = [1,1]
      statusLabels = ['No Data', 'No Data']
      regionData = [1,1]
      regionLabels =['No Data', 'No Data', 'No Data', 'No Data']
      reserveData = [1,1]
      reserveLabels = ['No Data', 'No Data']
      urbanData = [1,1]
      urbanLabels = ['No Data', 'No Data']
      siteValues = [1,1]
      siteLabels = ['No Data', 'No Data']

      piechart1(regionLabels, 'Region', regionData, black)
      myChart1.setOption(option);
      piechart1(statusLabels, 'Identity', statusData, black)
      myChart2.setOption(option);
      piechart1(reserveLabels, 'Off On', reserveData, black)
      myChart3.setOption(option);
      piechart1(urbanLabels, 'Urban', urbanData, black)
      myChart4.setOption(option);
      barchart(siteLabels, capitalizeFirstLetter(dropdownIndicator), siteValues, black)
      mybarChart.setOption(option);
      infochart(programmeLabels, programmeValues)
      Info_Chart.setOption(option);

    } else {
      updateIdentity()
      updateLocation()
      updateUrban()
      updateRegion()
      updateLocation()
      updateSites()
      updateProgrammeTotals()

      piechart1(regionLabels, 'Region', regionData, default2)
      myChart1.setOption(option);
      piechart1(statusLabels, 'Identity', statusData, default2)
      myChart2.setOption(option);
      piechart1(reserveLabels, 'Off On', reserveData, default2)
      myChart3.setOption(option);
      piechart1(urbanLabels, 'Urban', urbanData, default2)
      myChart4.setOption(option);
      barchart(siteLabels, capitalizeFirstLetter(dropdownIndicator), siteValues, default2)
      mybarChart.setOption(option);
      infochart(permLabels, programmeValues)
      Info_Chart.setOption(option);
    }
  }

// ******************** Drop downs *************
$("#region_select").on("change", function() {
    dropdownRegion = $("#region_select").val()
    geog = $("#region_select").val();
    nodata()
    map.fitBounds(regions[geog].getBounds());
})

$("#indicator_select").on("change", function() {
  dropdownIndicator = $("#indicator_select").val()
  nodata()
})

$("#site_select").on("change", function() {
  dropdownSite = $("#site_select").val()
  if (dropdownSite === 'All Sites'){
      map.flyTo(center, 5)
      resetColorFeature(geojson)
      nodata()
  } else {
  map.flyTo(siteID[dropdownSite] , 12)
  nodata()
  removeColorFeature(geojson)
  }
})

$('#icon_tip').tooltipster({
  animation: 'fade',
  delay: 200,
  theme: 'tooltipster-borderless',
  trigger: 'hover'
});

$('#icon_tip').on('click', function(){
  map.flyTo(center, 5)
  $("#region_select").val('Ontario')
  $("#site_select").val('All Sites')
  $("#indicator_select").val('all')
  dropdownRegion = "Ontario"
  dropdownIndicator = 'all'
  dropdownSite = 'All Sites'
  nodata()
  resetColorFeature(geojson)
});
