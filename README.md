point-in-region
===============
Locates a point in a collection of regions.  Point location is exact, takes O(log(n)) time, and the data structure has a space requirement of O(n log(n)).

# Example

```javascript
var preprocessRegions = require("point-in-region")

//TODO: Finish mocking up example
```

# Install

```
npm install point-in-region
```

# API

### `var classify = require("point-in-region")(positions, regions)`
Preprocesses a collection of regions to answer point location queries efficiently.

* `positions` is a list of vertex positions for each of the regions
* `regions` is a list of regions encoded as lists of clockwise oriented loops of indices

**Returns** A point membership classification function for the region set

**Note** The regions must obey certain topological and geometric properties for this classification to be correct.  Specifically:

* Any two edges are either disjoint, identical, or meet at exactly one common end point
* The interior of each edge touches at most two regions

### `classify(point)`
Returns the index of the region containing `point`

* `point` is a 2D point encoded as a length 2 array

**Returns** The index of the region containing `point` or `-1` if it is not in any region.

# Credits
(c) 2014 Mikola Lysenko. MIT License