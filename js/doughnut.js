
let status = document.getElementById('myChart1').getContext('2d');
let off_on = document.getElementById('myChart2').getContext('2d');
let urban_rural = document.getElementById('myChart3').getContext('2d');
let region_element = document.getElementById('myChart4').getContext('2d');
let piechart= ( element, data_values, data_labels, title, color) => {
  let chartName1 = new Chart(element,{
     type: 'doughnut',
     data: {
       datasets: [{
         data: data_values,
         backgroundColor:color,
         label: 'Dataset 1'
       }],
       labels: data_labels,
     },
     options: {
       responsive: true,
       legend: {
         position: 'top',
       },
       title: {
         display: true,
         text: title
       },
       animation: {
         animateScale: true,
         animateRotate: true
       }
     }
   });
   return chartName1
}
