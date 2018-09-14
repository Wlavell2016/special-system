
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

let cleanData = []
let result3 =''

let site_labels = ''
let site_values = ''

let dropdown_indicator = $("#indicator_select").val()
let dropdown_region = $("#region_select").val()

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ***********  Get data from Kobo ************
var auth = btoa('lavellonwa:Bangkok69!');
// // token 9237e038cfc26bc5c9637ba7f7e8bd6d8f3a0964
// let getdata = (ajaxdata=> {
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
console.log(kobodata)

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

let processData =() =>{
  cleanData = []
  kobodata.forEach(data => {
    if(dropdown_region === 'Ontario' && dropdown_indicator === 'all') {
      mappedData(data)
      stringtoInt(data)
    } else if (dropdown_region === 'Ontario' && dropdown_indicator === data.Report_Type){
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
  if(dropdown_region === 'Ontario' && dropdown_indicator === 'all') {
 chart.region = 'Ontario'
 chart.programmeType = 'All'
} else {
  chart.region = dropdown_region;
  chart.programmeType = dropdown_indicator;
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
  populateArrayProgramme(programme_totals, programme_values, programme_data, programme_labels)
}

let updateProgrammeTotals =() => {
  cleanData =[]
  programme_values = []
  programme_data = []
  programme_labels =[]
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
  populateArray(chart_status, status_values, status_data, status_labels)
}

let updateIdentity =() => {
  cleanData =[]
  status_values = []
  status_data = []
  status_labels =[]
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
    checkDropDowns(chart_rez, data)
    if (data.On_reserve !== undefined && data.On_reserve != 0) {
      chart_rez.On_reserve += data.On_reserve ;
    }
    if (data.Off_reserve !== undefined && data.Off_reserve != 0) {
      chart_rez.Off_reserve += data.Off_reserve ;
    }
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
    checkDropDowns(chart_rez, data)
      if (data.On_reserve !== undefined && data.On_reserve != 0) {
        chart_rez.On_reserve += data.On_reserve ;
      }
      if (data.Off_reserve !== undefined && data.Off_reserve != 0) {
        chart_rez.Off_reserve += data.Off_reserve ;
      }
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
      checkDropDowns(chart_urban, data)
          if (data.Urban_areas !== undefined && data.Urban_areas != 0) {
            chart_urban.urban += data.Urban_areas ;
          }
          if (data.Rural_areas !== undefined && data.Rural_areas != 0) {
            chart_urban.rural += data.Rural_areas ;
          }
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
      checkDropDowns(chart_urban, data)
          if (data.Urban_areas !== undefined && data.Urban_areas != 0) {
            chart_urban.urban += data.Urban_areas ;
          }
          if (data.Rural_areas !== undefined && data.Rural_areas != 0) {
            chart_urban.rural += data.Rural_areas ;
          }
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
      populateArraysRegion(chart_region, region_values, region_data, region_labels)
  }
  // ************* Site *************************

let sites = new siteObject('', '', [], [])

let SiteCreate =() => {
  cleanData.forEach(data => {
    checkDropDowns(sites, data)
    if (data.Site_Type !== undefined && data.Site_Type != 0) {
      sites.name.push(data.Site_Type)
    }
    if (data.Total_members !== undefined && data.Total_members != 0) {
      sites.values.push(data.Total_members)
    }
  })
  site_labels = sites.name
  sites_values = sites.values
}



let updateSites =() => {
  cleanData =[]
  site_data = []
  site_labels = []
  processData()
  sites.name = [];
  sites.values = [];
  cleanData.forEach(data => {
    checkDropDowns(sites, data)
          if (data.Site_Type !== undefined && data.Site_Type != 0) {
            sites.name.push(data.Site_Type)
          }
          if (data.Total_members !== undefined && data.Total_members != 0) {
            sites.values.push(data.Total_members)
          }
      })
      site_labels = sites.name
      sites_values = sites.values
    // populateArraysRegion(chart_region, region_values, region_data, region_labels)
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
    updateSites()
    updateProgrammeTotals()

    piechart1(region_labels, 'Region', region_data, default2)
    myChart1.setOption(option);
    piechart1(status_labels, 'Identity', status_data, default2)
    myChart2.setOption(option);
    piechart1(reserve_labels, 'Off On', reserve_data, default2)
    myChart3.setOption(option);
    piechart1(urban_labels, 'Urban', urban_data, default2)
    myChart4.setOption(option);
    barchart(site_labels, capitalizeFirstLetter(dropdown_indicator), sites_values, black)
    mybarChart.setOption(option);
    infochart(programme_labels, programme_values)
    Info_Chart.setOption(option);
  }
}

// ******************** Drop downs *************
// $("#ONWA_image").attr("src");
// $("#ONWA_image").css("background-image", "url(../img/dancing.jpeg");

let image_regions ={}
image_regions.Northern = "../img/dancing.jpeg"
image_regions.Southern = "../img/hugging.jpeg"
image_regions.Eastern =  "../img/smilingBaby.jpeg"
image_regions.Western =  "../img/teaching.jpeg"

$("#region_select").on("change", function() {
    dropdown_region = $("#region_select").val()
    geog = $("#region_select").val();
    nodata()
    map.fitBounds(regions[geog].getBounds());
    // console.log(cleanData.length)
    // console.log(dropdown_region)
})

$("#indicator_select").on("change", function() {
  dropdown_indicator = $("#indicator_select").val()
  nodata()
    // console.log(dropdown_indicator)
    // console.log(cleanData.length)
    // console.log(cleanData)
})
