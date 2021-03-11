
var footTextList = [["NEWS", "CHANNELS", "OVERVIEW", "TIMELINE"],
                    ["SPORT", "CULTURE", "NATURE", "MUSIC"],
                    ["WEATHER", "AUTOS", "LOCAL", "SHOP"],
                    ["FUTURE", "FOOD", "EARTH", "TV"],
                    ["TRAVEL", "RADIO"]];
var listData = [{"time": "9:45pm", "name": "info@design.com"}, {"time": "9:45pm", "name": "info@design.com"}];

var indicator = document.getElementById("navigation_indicator");
var navigationUl = document.getElementById("ul_navigation");
var tabs = navigationUl.children
var timeUl = document.getElementById("ul_time");
var nameUl = document.getElementById("ul_name");
var stateUl = document.getElementById("ul_state");
var footConstraint = document.getElementById("constraint_foot_inner");

var tabWidth = 0;         //导航栏tab的宽度
var offset = 0;           //指示器位置的偏移量
var tabScrolId = null;    //移动循环的id
var currentTabIndex = 0;  //当前选中的导航栏tab索引值

// 设置导航栏tab的事件
var tab;
for (var i = 0; i < tabs.length; i++) {
  tab = tabs[i];
  tab.index = i;
  tab.onclick = function() {
    scroll(this.index);
    currentTabIndex = this.index;
  }
  tab.onmouseover = function() {
    scroll(this.index);
  }
  tab.onmouseout = function() {
    scroll(currentTabIndex);
  }
}

tabWidth = tab.clientWidth;
offset = (tabWidth - indicator.clientWidth) / 2;

// 开始滚动到指定位置
function scroll(index) {

  if (tabScrolId != null) {
    clearInterval(tabScrolId);
  }
  
  // 获取最终的目标位置
  var target = index * tabWidth + offset;
  var left = getIndicatorLeft();
  // 距离越远则速度倍数越高
  var times = Math.abs(target - left) / tabWidth;
  var rate = 5 * times;
  // 获取每一次移动的距离
  var distance = left < target ? rate : -rate;

  // 设置定时器，每隔一段时间改变指示器的位置，以实现移动的动画效果
  tabScrolId = setInterval(function() {
    var left = getIndicatorLeft();
    // 距离目标位置剩余的px值
    var delta = target - left;
    // 当剩余距离小于等于每次移动距离，直接移动到目标位置，以防出现显示偏移
    if (Math.abs(delta) <= Math.abs(distance)) {
      clearInterval(tabScrolId);
      indicator.style.left = target + "px";
    } else {
      indicator.style.left = left + distance + "px";
    }
  }, 10);
}

// 获取指示器当前left的值
function getIndicatorLeft() {
  var left = indicator.style.left;
  var left_num;
  if (left == null || left.length == 0) {
    left_num = offset;
  } else {
    left_num = Number(left.replace("px", ""));
  }
  return left_num;
}

// 添加列表数据
for (var i = 0; i < listData.length; i++) {

  var item = listData[i];

  var li = document.createElement("li");
  li.innerHTML = item.time;
  li.className = "li_time";
  timeUl.append(li);

  li = document.createElement("li");
  li.innerHTML = item.name;
  li.className = "li_name";
  nameUl.append(li);

  li = document.createElement("li");
  var button = document.createElement("button");
  button.innerHTML = "Solved";
  button.className = "button_solved";
  li.append(button);
  stateUl.append(li);
}

// 添加底部链接元素
for (var i = 0; i < footTextList.length; i++) {

  var ul = document.createElement("ul");
  var liText = footTextList[i];

  for (var j = 0; j < liText.length; j++) {

    var a = document.createElement("a");
    a.innerHTML = liText[j];
    a.setAttribute("href", "./index.html");

    var li = document.createElement("li");
    li.append(a);
    
    ul.append(li);
  }

  footConstraint.append(ul);
}
