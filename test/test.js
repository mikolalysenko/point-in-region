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