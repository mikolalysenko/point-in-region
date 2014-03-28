"use strict"

var shell = require("game-shell")()
var triangulate = require("delaunay")
var processRegions = require("../region")
var dup = require("dup")

var points = dup([100,2]).map(function() { return Math.random() })
var triangles = triangulate(points)
var classifyPoint = processRegions(points, triangles.map(function(c) { return [c] }))

var canvas
var context

shell.on("init", function() {
  var canvas = document.createElement("canvas")
  canvas.width = shell.width
  canvas.height = shell.height
  context = canvas.getContext("2d")
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

  context.fillStyle = "#fff"
  context.fillRect(0,0,w,h)
  for(var i=0; i<triangles.length; ++i) {
    
  }
})