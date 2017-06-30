//-----------------------------------------------------------------------------
angular.module('starter.controllers', [])
//-----------------------------------------------------------------------------
.controller('mainCtrl', function($scope) {
  var cubeGL, cubeContainer
  function init() {
    var useLockedControls = true, controls = useLockedControls ? ERNO.Locked : ERNO.Freeform
    cubeGL = new ERNO.Cube({
      controls: controls,
      keyboardControlsEnabled: true,
      mouseControlsEnabled: false
    })
    cubeContainer = document.getElementById('container')
    cubeContainer.appendChild(cubeGL.domElement)
  };
  init();
  $scope.shuffle = () => {
    console.log("shuffle");
  };
  $scope.solve = () => {
    console.log("solve");
  };
})
//-----------------------------------------------------------------------------
