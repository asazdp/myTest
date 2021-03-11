
var imageArray = ["../img/banner1.jpg", "../img/banner2.jpg", "../img/banner1.jpg", "../img/banner2.jpg", "../img/banner1.jpg"]

var banner = document.getElementById("constraint_banner");
var imageUl = document.getElementById("banner_image");
var lindicatorUl = document.getElementById("banner_indicator");
var indicatorList = lindicatorUl.children;
var lastButton = document.getElementById("banner_last");
var nextButton = document.getElementById("banner_next");

// 获取每张图片的显示宽度
var paddingLeft = getStyle(banner, "paddingLeft").replace("px", "");
var paddingRight = getStyle(banner, "paddingRight").replace("px", "");
var imageWidth = banner.clientWidth - paddingLeft - paddingRight;

var imageCount = imageArray.length;   //图片张数
var times = 1;                        //切换速度的倍数
var loopId = null;                    //轮播循环的id
var loopInterval = 2000;              //轮播循环的间隙（毫秒）
var scrolId = null;                   //图片滚动循环的id
var scrolInterval = 10;               //图片滚动的间隙（毫秒）
var curIndex = 0;                     //当前显示图片的索引值

// 设置显示图片的ul元素的宽度
imageUl.style.width = imageWidth * imageCount + "px";

// 设置鼠标在轮播图上则显示轮播并显示操作按钮，移开则隐藏
banner.onmouseover = function() {
  clearInterval(loopId);
};
banner.onmouseout = function() {
  startLoop();
};

// 设置上一张按钮的点击事件
lastButton.onclick = function() {
  setCurrentIndex(curIndex - 1);
};
// 设置下一张按钮的点击事件
nextButton.onclick = function() {
  setCurrentIndex(curIndex + 1);
};

for (var i = 0; i < imageCount; i++) {

  // 添加li和img元素，显示图片
  var img = document.createElement("img");
  img.setAttribute("src", imageArray[i]);
  var li = document.createElement("li");
  li.append(img);
  imageUl.append(li);

  // 添加指示器
  var li = document.createElement("li");
  li.index = i;
  li.onclick = function() {
    setCurrentIndex(this.index);
  }
  if (i == 0) {
    li.className = "indicator indicator_selected";
  } else {
    li.className = 'indicator';
  }
  lindicatorUl.append(li);
}

// 开始滚动到指定位置
function scrollTo(index) {

  if (scrolId != null) {
    clearInterval(scrolId);
  }

  var rate = 20 * times;
  // 获取最终的目标位置
  var target = -index * imageWidth
  // 获取每一次移动的距离
  var distance = imageUl.offsetLeft < target ? rate : -rate;

  // 设置定时器，每隔一段时间改变imageUl的位置，以实现移动的动画效果
  scrolId = setInterval(function() {
    // 距离目标位置剩余的px值
    var delta = target - imageUl.offsetLeft;
    // 当剩余距离小于等于每次移动距离，直接移动到目标位置，以防出现显示偏移
    if (Math.abs(delta) <= Math.abs(distance)) {
      clearInterval(scrolId);
      imageUl.style.left = target + "px";
    } else {
      imageUl.style.left = imageUl.offsetLeft + distance + "px";
    }
  }, scrolInterval);
}

// 设置当前显示第几张图片
function setCurrentIndex(index) {

  if (index < 0) {
    index = imageCount - 1;
  } else if (index >= imageCount) {
    index = 0;
  }

  // 两个位置相隔越远，则移动速度越高
  times = Math.abs(index - curIndex);
  curIndex = index;

  scrollTo(curIndex);

  // 设置指示器样式
  for (var i = 0; i < imageCount; i++) {
    if (i == curIndex) {
      indicatorList[i].className = "indicator indicator_selected";
    } else {
      indicatorList[i].className = "indicator";
    }
  }
}

// 开始轮播图循环
function startLoop() {
  if (loopId != null) {
    clearInterval(loopId)
  };
  loopId = setInterval(function() {
    setCurrentIndex(curIndex + 1);
  }, loopInterval);
}

startLoop();