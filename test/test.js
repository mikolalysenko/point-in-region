"use strict"

var preprocessRegions = require("../region.js")
var tape = require("tape")

tape("grid-test", function(t) {
  var M = 10
  var points = new Array(M*M)
  var cells = []
  for(var i=0; i<M; ++i) {
    for(var j=0; j<M; ++j) {
      points[M*i + j] = [i,j]
      if(i < (M-1) && j < (M-1)) {
        cells.push([[
            M*i + j,
            M*(i+1) + j,
            M*(i+1) + (j+1),
            M*i + (j+1)
          ]])
      }
    }
  }
  var classify = preprocessRegions(points, cells)
  for(var i=0; i<M-1; ++i) {
    for(var j=0; j<M-1; ++j) {
      t.equals(classify([i+0.5, j+0.5]), (M-1)*i + j)
    }
  }
  t.end()
})

tape("example-test", function(t) {
  //First create a list of vertices
  var vertices = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [2, 0],
    [3, 0],
    [3, 1],
    [2, 1],
    [2.25, 0.25],
    [2.75, 0.25],
    [2.75, 0.75],
    [2.25, 0.75]
  ]

  //Regions are defined by lists of loops of vertex indices
  var regions = [
    //First region, just a square, one loop
    [ 
      [0, 1, 2, 3]
    ],
    //Second region, square with a hole in the middle
    [
      [4, 5, 6, 7],
      [11, 10, 9, 8]    //Note inner loop has opposite orientation
    ]
  ]

  //Now we create the data structure
  var classifyPoint = preprocessRegions(vertices, regions)

  //And we can use it to classify which region contains a given point
  t.equals(classifyPoint([0.5, 0.5]), 0)
  t.equals(classifyPoint([2.1, 0.1]), 1)
  t.equals(classifyPoint([2.5, 0.5]), -1)
  t.equals(classifyPoint([100000, 10000]), -1)
  
  t.end()
})