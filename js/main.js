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

let status_labels = []
let status_values = []
let status_data = []

let reserve_values = []
let reserve_data = []
let reserve_labels = []

let urban_values = []
let urban_data = []
let urban_labels = []

let region_values = []
let region_data = []
let region_labels = []

let programme_values = []
let programme_data = []
let programme_labels = []

let dropdown_indicator = $("#indicator_select").val()
let dropdown_region = $("#region_select").val()

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ***********  Get data from Kobo ************
var auth = btoa('lavellonwa:Bangkok69!');
// let getdata = (ajaxdata=> {
  $.ajax
  ({
    type: "GET",
    url: 'https://kc.kobotoolbox.org/api/v1/data/193726',
    dataType: 'json',
    crossDomain:false,
    async: false,
    headers: {
         "Authorization": "Basic " + auth
     }
  }).done(function(data){
    kobodata = data
  });
console.log(kobodata)

// ******************** cleaning data *************
let cleanData = []
let result3 =''
// **** intialization of objects **********
let stringtoInt =(data)=> {
  cleanData.push(Trimmed_ObjectKeys)
  cleanData.forEach(data=>{
    for (var key in data) {
      if (key != 'Region' && key !='Site_Type' && key !='Office_Type' && key !='Report_Type' && key != 'image_office' && key != 'image_members' ) {
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
}

let processData =() =>{
  cleanData = []
  kobodata.forEach(data => {
    if(dropdown_region === 'Ontario' && dropdown_indicator === 'all') {
      mappedData(data)
      stringtoInt(data)
    } else if (data.Region === dropdown_region && dropdown_indicator === 'all'){
      mappedData(data)
      stringtoInt(data)
    } else if (data.Region === dropdown_region && data.Report_Type === dropdown_indicator){
        mappedData(data)
        stringtoInt(data)
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

  class siteObject {
      constructor(region, programme, north_val, name, values){
        this.region = region;
        this.programmeType = programme;
        this.name = [];
        this.values = [];
      }
    }

    class programmeObject {
        constructor(region, programme, member_values, human_values , healthy__babies_values, missing_values, diabetes_values, gambling_values,sexual_assualt_values, skills_employment_values, victom_liason_values, leadership_values, circle_care_values,community_health_values,wellness_values,mental_health_values,my_house_values,youth_worker_values){
          this.region = region;
          this.membership = member_values;
          this.human_traffick = human_values;
          this.healthy_babies = healthy__babies_values;
          this.missing_and_mu = missing_values;
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

// ************* populate objects ****************
let programme_totals = new programmeObject('',' ', 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)

let populateArrayProgramme=(chart, values_array, data_array, labels_array) =>{
  for ( let key in chart) {
    if (key === 'membership' || key === 'human_traffick' || key === 'missing_and_mu' || key === 'healthy_babies' || key === 'diabetes' || key === 'gambling'
    || key === 'sexual' || key === 'skills' || key === 'victim' || key === 'leadership' || key === 'circle_care' || key === 'community' ||
     key === 'wellness' || key === 'mental_health' || key === 'my_house' || key === 'youth_worker'){
      values_array.push(chart[key])
      data_array.push({'value':chart[key], 'name':capitalizeFirstLetter(key)})
      labels_array.push(capitalizeFirstLetter(key))
    }
  }
}
let image_office = ''
let image_members = ''

let createprogrammeTotals =() => {
  cleanData.forEach(data => {
    programme_totals.region = data.Region;
    if (data.Report_Type === 'membership'){
      programme_totals.membership += data.Total_members;
    } else if (data.Report_Type === 'human_traffick') {
      programme_totals.human_traffick += data.Total_members ;
    } else if (data.Report_Type === 'missing_and_mu'){
      programme_totals.healthy_babies += data.Total_members;
    } else if (data.Report_Type === 'healthy_babies'){
      programme_totals.missing_and_mu += data.Total_members;
    } else if (data.Report_Type === 'diabetes'){
      programme_totals.diabetes += data.Total_members;
    } else if (data.Report_Type === 'gambling'){
      programme_totals.gambling += data.Total_members;
    } else if (data.Report_Type === 'sexual'){
      programme_totals.sexual_assualt += data.Total_members;
    } else if (data.Report_Type === 'skills'){
      programme_totals.skills_employment += data.Total_members;
    } else if (data.Report_Type === 'victim'){
      programme_totals.victim_liason += data.Total_members;
    } else if (data.Report_Type === 'leadership'){
      programme_totals.leadership += data.Total_members;
    } else if (data.Report_Type === 'circle_care'){
      programme_totals.circle_care += data.Total_members;
    } else if (data.Report_Type === 'community'){
      programme_totals.community_health += data.Total_members;
    } else if (data.Report_Type === 'wellness'){
      programme_totals.wellness += data.Total_members;
    } else if (data.Report_Type === 'mental_health'){
      programme_totals.mental_health += data.Total_members;
    } else if (data.Report_Type === 'my_house'){
      programme_totals.my_house += data.Total_members;
    } else if (data.Report_Type === 'youth_worker'){
      programme_totals.youth_worker += data.Total_members;
    }
    image_office = data.image_office
    image_members = data.image_members
  })
  populateArrayProgramme(programme_totals, programme_values, programme_data, programme_labels)

}
// $('').css('background-image', )

let updateProgrammeTotals =() => {
  cleanData =[]
  programme_values = []
  programme_data = []
  programme_labels =[]
  processData()
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
    if (data.Report_Type === 'membership'){
      programme_totals.membership += data.Total_members;
    } else if (data.Report_Type === 'human_traffick') {
      programme_totals.human_trafficking += data.Total_members ;
    } else if (data.Report_Type === 'missing_and_mu'){
      programme_totals.healthy_babies += data.Total_members;
    } else if (data.Report_Type === 'healthy_babies'){
      programme_totals.missing_and_mu += data.Total_members;
    } else if (data.Report_Type === 'diabetes'){
      programme_totals.diabetes += data.Total_members;
    } else if (data.Report_Type === 'gambling'){
      programme_totals.gambling += data.Total_members;
    } else if (data.Report_Type === 'sexual'){
      programme_totals.sexual_assualt += data.Total_members;
    } else if (data.Report_Type === 'skills'){
      programme_totals.skills_employment += data.Total_members;
    } else if (data.Report_Type === 'victim'){
      programme_totals.victim_liason += data.Total_members;
    } else if (data.Report_Type === 'leadership'){
      programme_totals.leadership += data.Total_members;
    } else if (data.Report_Type === 'circle_care'){
      programme_totals.circle_care += data.Total_members;
    } else if (data.Report_Type === 'community'){
      programme_totals.community_health += data.Total_members;
    } else if (data.Report_Type === 'wellness'){
      programme_totals.wellness += data.Total_members;
    } else if (data.Report_Type === 'mental_health'){
      programme_totals.mental_health += data.Total_members;
    } else if (data.Report_Type === 'my_house'){
      programme_totals.my_house += data.Total_members;
    } else if (data.Report_Type === 'youth_worker'){
      programme_totals.youth_worker += data.Total_members;
    }
    })
    populateArrayProgramme(programme_totals, programme_values, programme_data, programme_labels)
}

// ************* populate objects ****************
let populateArray=(chart, values_array, data_array, labels_array) =>{
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
    chart_status.region = data.Region;
    chart_status.programmeType = data.Report_Type;
    chart_status.status += data.Status;
    chart_status.nonStatus += data.Non_Status ;
    chart_status.metis += data.Metis;
    chart_status.inuit += data.Inuit;
  })
  populateArray(chart_status, status_values, status_data, status_labels)
}

let updateIdentity =() => {
  cleanData =[]
  status_values = []
  status_data = []
  status_labels =[]
  processData()
  chart_status.status = 0;
  chart_status.nonStatus = 0;
  chart_status.metis = 0;
  chart_status.inuit = 0;

  cleanData.forEach(data => {
      chart_status.status += data.Status;
      chart_status.nonStatus += data.Non_Status ;
      chart_status.metis += data.Metis ;
      chart_status.inuit += data.Inuit;
      chart_status.programmeType = data.Report_Type;
      chart_status.region = data.Region;
    })
    populateArray(chart_status, status_values, status_data, status_labels)
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
    chart_rez.region = data.Region;
    chart_rez.programmeType = data.Report_Type;
    chart_rez.On_reserve += data.On_reserve;
    chart_rez.Off_reserve += data.Off_reserve;
  })
  populateArraysReserve(chart_rez, reserve_values, reserve_data, reserve_labels)
}

let updateLocation =() => {
  cleanData =[]
  reserve_data = []
  reserve_labels = []
  processData()
  chart_rez.On_reserve = 0;
  chart_rez.Off_reserve = 0;
  cleanData.forEach(data => {
      chart_rez.On_reserve += data.On_reserve;
      chart_rez.Off_reserve += data.Off_reserve;
      chart_rez.region = data.Region;
      chart_rez.programmeType = data.Report_Type;
    })
    populateArraysReserve(chart_rez, reserve_values, reserve_data, reserve_labels)
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
      chart_urban.region = data.Region;
      chart_urban.programmeType = data.Report_Type;
      chart_urban.urban += data.Urban_areas;
      chart_urban.rural += data.Rural_areas;
    })
    populateArraysUrban(chart_urban, urban_values, urban_data, urban_labels)
}

  let updateUrban =() => {
    cleanData =[]
    urban_data = []
    urban_labels = []
    processData()
    chart_urban.urban = 0;
    chart_urban.rural = 0;
    cleanData.forEach(data => {
        chart_urban.urban += data.Urban_areas;
        chart_urban.rural += data.Rural_areas;
        chart_urban.region = data.Region;
        chart_urban.programmeType = data.Report_Type;
      })
      populateArraysUrban(chart_urban, urban_values, urban_data, urban_labels)
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
      chart_region.region = data.Region;
      chart_region.programmeType = data.Report_Type;
      if(data.Region ==='Northern') {
        chart_region.north += data.Total_members;
      } else if (data.Region ==='Southern') {
        chart_region.south += data.Total_members;
      } else if (data.Region ==='Eastern') {
        chart_region.east += data.Total_members;
      } else if (data.Region ==='Western') {
        chart_region.west += data.Total_members;
      } else {
      }
    })
    populateArraysRegion(chart_region, region_values, region_data, region_labels)
  }

  let updateRegion =() => {
    cleanData =[]
    region_data = []
    region_labels = []
    processData()
    chart_region.north = 0;
    chart_region.south = 0;
    chart_region.east  = 0;
    chart_region.west  = 0;
    cleanData.forEach(data => {
      if(data.Region ==='Northern') {
        chart_region.north += data.Total_members
      } else if (data.Region ==='Southern') {
        chart_region.south += data.Total_members
      } else if (data.Region ==='Eastern') {
        chart_region.east += data.Total_members
      } else if (data.Region ==='Western') {
        chart_region.west +=  data.Total_members
      }
        chart_region.region = data.Region;
        chart_region.programmeType = data.Report_Type;
      })
      populateArraysRegion(chart_region, region_values, region_data, region_labels)
  }
  // ************* Site *************************

let sites = new siteObject('', '', [], [])

let site_labels = ''
let site_values = ''
let SiteCreate =() => {
  cleanData.forEach(data => {
    sites.region = data.Region;
    sites.programmeType = data.Report_Type;
    sites.name.push(data.Site_Type)
    sites.values.push(data.Total_members)
    // sites.values.push({'value':data.Total_members, 'name':capitalizeFirstLetter(data.Site_Type)})
  })
}

site_labels = sites.name
sites_values = sites.values

// *************** create chart objects ********************
processData()
createIdentity()
createRegion()
createUrban()
createLocation()
createprogrammeTotals()
SiteCreate()

// *************** create chart objects ********************


let nodata =() => {
  processData()
  if (cleanData.length === 0){
    console.log('foo')
    status_data = [1,1]
    status_labels = ['No Data', 'No Data']
    region_data = [1,1]
    region_labels =['No Data', 'No Data', 'No Data', 'No Data']
    reserve_data = [1,1]
    reserve_labels = ['No Data', 'No Data']
    urban_data = [1,1]
    urban_labels = ['No Data', 'No Data']
    site_values = [1,1]
    site_labels = ['No Data', 'No Data']

    piechart1(region_labels, 'Region', region_data, black)
    myChart1.setOption(option);
    piechart1(status_labels, 'Identity', status_data, black)
    myChart2.setOption(option);
    piechart1(reserve_labels, 'Off On', reserve_data, black)
    myChart3.setOption(option);
    piechart1(urban_labels, 'Urban', urban_data, black)
    myChart4.setOption(option);
    barchart(site_labels, capitalizeFirstLetter(dropdown_indicator), sites_values, black)
    mybarChart.setOption(option);
    infochart(programme_labels, programme_values)
    Info_Chart.setOption(option);


  } else {
    console.log('else')
    updateIdentity()
    updateLocation()
    updateUrban()
    updateRegion()
    updateLocation()
    updateProgrammeTotals()

    piechart1(region_labels, 'Region', region_data, default2)
    myChart1.setOption(option);
    piechart1(status_labels, 'Identity', status_data, default2)
    myChart2.setOption(option);
    piechart1(reserve_labels, 'Off On', reserve_data, default2)
    myChart3.setOption(option);
    piechart1(urban_labels, 'Urban', urban_data, default2)
    myChart4.setOption(option);
    infochart(programme_labels, programme_values)
    Info_Chart.setOption(option);

  }
}

// ******************** Drop downs *************
$("#region_select").on("change", function() {
    dropdown_region = $("#region_select").val()
    geog = $("#region_select").val();
    nodata()

    map.fitBounds(regions[geog].getBounds());
    console.log(cleanData.length)
    console.log(dropdown_region)
})

$("#indicator_select").on("change", function() {
  dropdown_indicator = $("#indicator_select").val()
  nodata()
    console.log(dropdown_indicator)
    console.log(cleanData.length)
    console.log(cleanData)
})

$('.ONWA_image').attr('src',image_office);
