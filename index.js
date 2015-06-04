var _ = require("lodash");
// var poly2tri = require("poly2tri");
var PNLTRI = require("pnltri");
var points3dto2d = require("points-3d-to-2d");

// TODO: Support holes
// https://github.com/r3mi/poly2tri.js#usage
// https://github.com/jahting/pnltri.js#usage

// Points: [[x,y,x], [...]]
var triangulatePnlTri = function(points) {
  var triangulator = new PNLTRI.Triangulator();

  var cPoints = _.clone(points);

  var contour2D = _.map(points3dto2d(cPoints).points, function(point) {
    var point2D = {
      x: point[0],
      y: point[1]
    };

    return point2D;
  });

  var faces = triangulator.triangulate_polygon([contour2D]);

  return faces;
};

// // Points: [[x,y,x], [...]]
// var triangulatePoly2Tri = function(points) {
//   var cPoints = _.clone(points);
//
//   // Remove last vertex if same as first as poly2tri doesn't like repeated vertices
//   if (_.isEqual(cPoints[0], cPoints[cPoints.length - 1])) {
//     cPoints.pop();
//   }
//
//   // Convert to 2D coordinates based on dominant axis
//   // Dominant axis is the one the points are least variable on (most flat)
//   // var contour2D = _.map(cPoints, function(point) {
//   //   var pointArr = _.filter(point, function(coord, index) {
//   //     return (index != dominantAxisIndex);
//   //   });
//   //
//   //   var point2D = {
//   //     x: pointArr[0],
//   //     y: pointArr[1]
//   //   };
//   //
//   //   return point2D;
//   // });
//
//   var contour2D = _.map(points3dto2d(cPoints).points, function(point) {
//     var point2D = {
//       x: point[0],
//       y: point[1]
//     };
//
//     return point2D;
//   });
//
//   var swctx = new poly2tri.SweepContext(_.flatten(contour2D));
//
//   swctx.triangulate();
//   var triangles = swctx.getTriangles();
//
//   var faces = [];
//
//   _.each(triangles, function(triangle) {
//     var faceIndexes = [];
//     var triPoints = triangle.getPoints();
//
//     _.each(triPoints, function(triPoint) {
//       faceIndexes.push(_.findIndex(contour2D, function(point) {
//         return (point.x === triPoint.x && point.y === triPoint.y);
//       }));
//     });
//
//     // TODO: Check face normal matches / is within tolerance of polygon normal
//     // - If not, reverse vertex order
//
//     faces.push(faceIndexes);
//   });
//
//   return faces;
// };

module.exports = triangulatePnlTri;
