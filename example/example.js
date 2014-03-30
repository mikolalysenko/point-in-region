"use strict"

var shell = require("game-shell")()
var triangulate = require("delaunay-triangulate")
var dup = require("dup")
var processRegions = require("../region")

var numPoints = 1000

var points = dup(numPoints).map(function() { return [Math.random(), Math.random()] })
var triangles = triangulate(points)
var classifyPoint = processRegions(points, triangles.map(function(c) { return [c] }))

var canvas
var context

shell.on("init", function() {
  canvas = document.createElement("canvas")
  canvas.width = shell.width
  canvas.height = shell.height
  context = canvas.getContext("2d")
  shell.element.appendChild(canvas)
})

shell.on("resize", function(w, h) {
  canvas.width = w
  canvas.height = h
})

shell.on("render", function() {
  var w = canvas.width
  var h = canvas.height
  var mouse = [shell.mouseX/w, shell.mouseY/h]
  var mouseCell = classifyPoint(mouse)
  context.setTransform(
    w, 0, 
    0, h,
    0, 0)
  context.fillStyle = "#fff"
  context.fillRect(0,0,w,h)
  context.strokeStyle = "#000"
  context.lineWidth = Math.min(1.0/w, 1.0/h)
  for(var i=0; i<triangles.length; ++i) {
    var cell = triangles[i]
    context.beginPath()
    context.moveTo(points[cell[0]][0], points[cell[0]][1])
    for(var j=1; j<cell.length; ++j) {
      context.lineTo(points[cell[j]][0], points[cell[j]][1])
    }
    context.closePath()
    context.stroke()
    if(i === mouseCell) {
      context.fillStyle = "#eb6"
      context.fill()
    }
  }
  context.fillStyle = "#f00"
  context.beginPath()
  context.arc(mouse[0], mouse[1], 5.0/w, 0, 2*Math.PI)
  context.closePath()
  context.fill()

})