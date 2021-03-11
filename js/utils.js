
// 获取指定元素的css属性值
var getStyle = function(dom, attr) {
  return dom.currentStyle ? dom.currentStyle[attr] : getComputedStyle(dom, false)[attr];
}