function onClick() {
  var r = Math.random() * 255
  var g = Math.random() * 255
  var b = Math.random() * 255
  
  document
    .getElementById("background")
    .style
    .backgroundColor = `rgb(${r}, ${g}, ${b})`
}