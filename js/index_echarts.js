
function createXmlhttp() {
  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlhttp
}

// var xmlhttp = createXmlhttp();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     setLineData(this.responseText);
//   }
// }
// xmlhttp.open("GET", "https://edu.telking.com/api/?type=month", true);
// xmlhttp.send();

// xmlhttp = createXmlhttp();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     setPieData(this.responseText);
//   }
// }
// xmlhttp.open("GET", "https://edu.telking.com/api/?type=week", true);
// xmlhttp.send();

// 设置折线图数据
function setLineData(jsonData) {

  var json = JSON.parse(jsonData);

  if (json.code != 200) {
    alert("获取曲线图数据失败")
    return;
  }

  var data = [];
  var xAxis = json.data.xAxis;
  var series = json.data.series;
  for (var i = 0; i < xAxis.length; i++) {
    if (series.length > i) {
      var array = [];
      array.push(xAxis[i]);
      array.push(series[i]);
      data.push(array);
    }
  }

  var myChart = echarts.init(document.getElementById('echarts1'));
  var option;
  option = {
    title: {
      text: '曲线图数据展示',
      left: 'center'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        color: 'black'
      }
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color:'#c9cdd5'
        }
      },
      axisLabel: {
        formatter: '{value} 人',
        color: 'black'
      }
    },
    series: [
      {
        type: 'line',
        smooth: 0.4,
        lineStyle: {
          color: '#4687f0',
          width: 1
        },
        label: {
          show: true,
          position: 'top',
          color: '#4687f0',
          fontSize: 12
        },
        areaStyle: {
          color: 'rgb(243, 246, 254)'
        },
        data: data
      }
    ]
  };
  option && myChart.setOption(option);
}

// 设置饼状图数据
function setPieData(jsonData) {

  var json = JSON.parse(jsonData);

  if (json.code != 200) {
    alert("获取饼状图数据失败")
    return;
  }

  var colorArray = ['#bf3635', '#2f4653', '#63a0a7', '#d28168', '#93c7af', '#759e84', '#c8842f'];
  var data = [];
  var xAxis = json.data.xAxis;
  var series = json.data.series;
  for (var i = 0; i < xAxis.length; i++) {
    if (series.length > i) {
      var label = {};
      label["color"] = colorArray[i]
      var object = {};
      object["name"] = xAxis[i];
      object["value"] = series[i];
      object["label"] = label
      data.push(object);
    }
  }

  myChart = echarts.init(document.getElementById('echarts2'));
  option = {
    title: {
      text: '饼状图数据展示',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    color: colorArray,
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  option && myChart.setOption(option);
}

// 柱状图
myChart = echarts.init(document.getElementById('echarts3'));
option = {
  title: {
    text: '柱状图数据展示',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    },
    axisLabel: {
      color: 'black',
      fontWeight: '600'
    }
  },
  yAxis: {
    name: '商品数',
    nameTextStyle: {
        color: '#000000'
    },
    type: 'value',
    splitLine: {
      show: true,
      lineStyle: {
        type: 'dashed',
        color:'#c9cdd5'
      }
    },
    axisLabel: {
      color: 'black'
    }
  },
  series: [{
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      barWidth : 20,
      itemStyle: {
        color: '#4587ef'
      }
  }]
};
option && myChart.setOption(option);