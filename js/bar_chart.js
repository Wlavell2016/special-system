// app.title = '坐标轴刻度与标签对齐';


let barchart = (labels, title, data, color)=> {
option = {
    color: default2,
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : labels,
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:title,
            type:'bar',
            barWidth: '60%',
            data:data
        }
    ]
};
}

barchart(site_labels, capitalizeFirstLetter(dropdown_indicator), sites_values, default2)
var mybarChart = echarts.init(document.getElementById('myChart5'));
mybarChart.setOption(option);
