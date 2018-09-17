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
      piechart1(regionLabels, 'Region', regionData, default2)
      myChart1.setOption(option);

      piechart1(urbanLabels, 'Urban', urbanData, default2)
      myChart2.setOption(option);

      piechart1(statusLabels, 'Identity', statusData, default2)
      myChart3.setOption(option);
      piechart1(reserveLabels, 'Off On', reserveData, default2)
      myChart4.setOption(option);
