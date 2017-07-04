//-----------------------------------------------------------------------------
angular.module('starter.controllers', [])
//-----------------------------------------------------------------------------
.controller('mainCtrl', function($scope, $timeout, $ionicModal, $ionicLoading) {
  $scope.Global = new Object()
  $scope.Global.cubeSpeed = 150
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
    cubeGL.addEventListener("onTwistComplete", () => {
      updateCubeJS()
    })
  }
  init()
  $scope.shuffle = () => {
    $scope.solutionJS = ""
    cubeGL.shuffle(10)
  }
  $scope.solve = () => {
    if (!cubeGL.isSolved()) {
      var solutionJS = cubeJS.solve()
      $scope.solutionJS = solutionJS
      solutionJS = solutionJS.split(" ")
      var solutionGL = ""
      for (i = 0; i < solutionJS.length; i++) {
        solutionGL += equivalentMovement(solutionJS[i])
      }
      $scope.solutionGL = solutionGL
      cubeGL.twist(solutionGL)
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
    var cubeStringColor = ""
    var cubeStringFaces = ""
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.up.cubelets[read[i]].up.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.right.cubelets[read[i]].right.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.front.cubelets[read[i]].front.color.initial
    }
    read = [2, 5, 8, 1, 4, 7, 0, 3, 6]
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.down.cubelets[read[i]].down.color.initial
    }
    read = [6, 3, 0, 7, 4, 1, 8, 5, 2]
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.left.cubelets[read[i]].left.color.initial
    }
    for (var i = 0; i <= 8; i++) {
      cubeStringColor += cubeGL.back.cubelets[read[i]].back.color.initial
    }
    var cubeOriginColors = [
      {pos: "U", color: cubeGL.up.cubelets[4].up.color.initial},
      {pos: "R", color: cubeGL.right.cubelets[4].right.color.initial},
      {pos: "F", color: cubeGL.front.cubelets[4].front.color.initial},
      {pos: "D", color: cubeGL.down.cubelets[4].down.color.initial},
      {pos: "L", color: cubeGL.left.cubelets[4].left.color.initial},
      {pos: "B", color: cubeGL.back.cubelets[4].back.color.initial}
    ]
    for (var i = 0; i < cubeStringColor.length; i++) {
      for (var j = 0; j < cubeOriginColors.length; j++) {
        if(cubeStringColor[i] == cubeOriginColors[j].color) {
          cubeStringFaces += cubeOriginColors[j].pos
          break
        }
      }
    }
    cubeJS = Cube.fromString(cubeStringFaces)
  }
  equivalentMovement = movement => {
    var returnValue = ""
    switch (movement) {
      case "U":
      returnValue = "U"
      break
      case "U2":
      returnValue = "UU"
      break
      case "U'":
      returnValue = "u"
      break
      case "R":
      returnValue = "R"
      break
      case "R2":
      returnValue = "RR"
      break
      case "R'":
      returnValue = "r"
      break
      case "B":
      returnValue = "B"
      break
      case "B2":
      returnValue = "BB"
      break
      case "B'":
      returnValue = "b"
      break
      case "D":
      returnValue = "D"
      break
      case "D2":
      returnValue = "DD"
      break
      case "D'":
      returnValue = "d"
      break
      case "L":
      returnValue = "L"
      break
      case "L2":
      returnValue = "LL"
      break
      case "L'":
      returnValue = "l"
      break
      case "F":
      returnValue = "F"
      break
      case "F2":
      returnValue = "FF"
      break
      case "F'":
      returnValue = "f"
    }
    return returnValue
  }
  $scope.$watch('Global.cubeSpeed', () => {
    cubeGL.twistDuration = $scope.Global.cubeSpeed
  }, true)
})
//-----------------------------------------------------------------------------
