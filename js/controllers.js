//-----------------------------------------------------------------------------
angular.module('starter.controllers', [])
//-----------------------------------------------------------------------------
.controller('mainCtrl', function($scope) {
  var cubeJS, cubeGL, cubeContainer
  init = () => {
    cubeJS = new Cube()
    var useLockedControls = true, controls = useLockedControls ? ERNO.Locked : ERNO.Freeform
    cubeGL = new ERNO.Cube({
      controls: controls,
      keyboardControlsEnabled: true,
      mouseControlsEnabled: true
    })
    cubeContainer = document.getElementById('container')
    cubeContainer.appendChild(cubeGL.domElement)
  }
  init()
  $scope.shuffle = () => {
    cubeGL.shuffle(10)
  }
  $scope.solve = () => {
    console.log("solve")
  }
})
//-----------------------------------------------------------------------------
