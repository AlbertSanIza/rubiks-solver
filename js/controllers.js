//-----------------------------------------------------------------------------
angular.module('starter.controllers', [])
//-----------------------------------------------------------------------------
.controller('mainCtrl', function($scope, $timeout, $ionicModal, $ionicLoading) {
  $scope.Global = new Object()
  $scope.Global.cubeSpeed = 90
  var cubeJS, cubeGL, cubeContainer
  $ionicLoading.show({template: 'Loading...', duration: 6000}).then(() => {
    $timeout(() => {
      Cube.initSolver()
    }, 1000)
  })
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
    if (!cubeGL.isSolved()) {
      updateCubeJS()
    }
  }
  $ionicModal.fromTemplateUrl('modal/settings.html', {scope: $scope, animation: 'slide-in-up'}).then(modal => {
    $scope.settingsModal = modal
  })
  $scope.openSettingsModal = () => {
    $scope.settingsModal.show()
  }
  $scope.closeSettingsModal = () => {
    $scope.settingsModal.hide()
  }
  updateCubeJS = () => {
    var read = [8, 7, 6, 5, 4, 3, 2, 1, 0]
    var cube_string_color = ""
    var cube_string_faces = ""
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.up.cubelets[read[i]].up.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.right.cubelets[read[i]].right.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.front.cubelets[read[i]].front.color.initial
    }
    read = [2, 5, 8, 1, 4, 7, 0, 3, 6]
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.down.cubelets[read[i]].down.color.initial
    }
    read = [6, 3, 0, 7, 4, 1, 8, 5, 2]
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.left.cubelets[read[i]].left.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cube_string_color += cubeGL.back.cubelets[read[i]].back.color.initial
    }
    var cube_origin_colors = [
      {pos: "U", color: cubeGL.up.cubelets[4].up.color.initial},
      {pos: "R", color: cubeGL.right.cubelets[4].right.color.initial},
      {pos: "F", color: cubeGL.front.cubelets[4].front.color.initial},
      {pos: "D", color: cubeGL.down.cubelets[4].down.color.initial},
      {pos: "L", color: cubeGL.left.cubelets[4].left.color.initial},
      {pos: "B", color: cubeGL.back.cubelets[4].back.color.initial}
    ]
    for (var i = 0; i < cube_string_color.length; i++) {
      for (var j = 0; j < cube_origin_colors.length; j++) {
        if(cube_string_color[i] == cube_origin_colors[j].color) {
          cube_string_faces += cube_origin_colors[j].pos
          break
        }
      }
    }
    cubeJS = Cube.fromString(cube_string_faces)
  }
  $scope.$watch('Global.cubeSpeed', function() {
    cubeGL.twistDuration = $scope.Global.cubeSpeed
  }, true)
})
//-----------------------------------------------------------------------------
