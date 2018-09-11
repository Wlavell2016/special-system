let piechart1 = (labels, title, data, color)=> {
  option = {
      tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
          orient: 'vertical',
          x: 'left',
          data:labels
      },
      series: [
          {
              name:title,
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              color: color,
              label: {
                  normal: {
                      show: false,
                      position: 'center'
                  },
                  emphasis: {
                      show: true,
                      textStyle: {
                          fontSize: '15',
                          fontWeight: 'bold'
                      }
                  }
              },
              labelLine: {
                  normal: {
                      show: false
                  }
              },
              data: data
          }
      ]
}   // specify chart configuration item and data
};

var myChart1 = echarts.init(document.getElementById('myChart1'));
var myChart2 = echarts.init(document.getElementById('myChart2'));
var myChart3 = echarts.init(document.getElementById('myChart3'));
var myChart4 = echarts.init(document.getElementById('myChart4'));

      // use configuration item and data specified to show chart
      piechart1(region_labels, 'Region', region_data, default2)
      myChart1.setOption(option);

      piechart1(urban_labels, 'Urban', urban_data, default2)
      myChart2.setOption(option);

      piechart1(status_labels, 'Identity', status_data, default2)
      myChart3.setOption(option);
      piechart1(reserve_labels, 'Off On', reserve_data, default2)
      myChart4.setOption(option);
