"use strict"

module.exports = preprocessRegions

var createSlabs = require("slab-decomposition")

function createRegionQuery(slabs, regionIds) {
  return function classifyPoint(point) {
    var idx = slabs.castUp(point)
    if(idx < 0) {
      return -1
    }
    return regionIds[idx]
  }
}

function preprocessRegions(positions, regions) {
  var segmentIndex = {}
  var segments = []
  var regionIds = []
  var numVertices = positions.length

  for(var i=0,numRegions=regions.length; i<numRegions; ++i) {
    var region = regions[i]
    for(var j=0,numLoops=region.length; j<numLoops; ++j) {
      var loop = region[j]
      var n = loop.length
      for(var k=0,a=loop[n-1],b=0,s=positions[a],t=s; k<n; ++k) {
        b = a
        t = s
        a = loop[k]
        s = positions[a]
        
        var x0 = s[0]
        var x1 = t[0]
        var idx = -1

        if(x0 < x1) {
          idx = i
        } else if(x0 === x1) {
          continue
        }



        var key = Math.min(a,b) + ":" + Math.max(a,b)
        if(key in segmentIndex) {
          if(idx >= 0) {
            regionIds[segmentIndex[key]] = idx
          }
        } else {
          segmentIndex[key] = segments.length
          segments.push([t, s])
          regionIds.push(idx)
        }
      }
    }
  }

  //Return new query object
  var slabs = createSlabs(segments)
  return createRegionQuery(slabs, regionIds)
}