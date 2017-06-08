//------------------------------------------------------------------------------
angular.module('starter.controllers', [])
//------------------------------------------------------------------------------
.controller('MainCtrl', function($scope, $element, $ionicModal) {
  $scope.Global = new Object();
  $scope.Global.cubeSpeed = 90;
  $scope.Global.Camera = false;
  $ionicModal.fromTemplateUrl('templates/settings.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.settingsModal = modal;
  });
  $scope.openSettingsModal = function() {
    $scope.settingsModal.show();
  };
  $scope.closeSettingsModal = function() {
    $scope.settingsModal.hide();
  };
  var cubeJS, cubeGL, main_container, cubeGL_container, cubeGL_string_container;
  main_container = $element[0];
  function init() {
    cubeJS = new Cube();
    cubeGL_container = main_container.querySelector('.r-cube');
    cubeGL_string_container = main_container.querySelector('.r-string');
    var useLockedControls = true, controls = useLockedControls ? ERNO.Locked : ERNO.Freeform;
    cubeGL = new ERNO.Cube({
      controls: controls,
      keyboardControlsEnabled: true,
      mouseControlsEnabled: true
    });
    Array.observe(cubeGL.cubelets, function(changes) {
      update_cubeJS();
    });
    cubeGL_container.appendChild(cubeGL.domElement);
    update_cubeJS();
  };
  init();
  $scope.test = function() {
  };
  $scope.showCamera = function() {
    $scope.Global.Camera = !$scope.Global.Camera;
  };
  $scope.undo = function() {
    cubeGL.undo();
  };
  $scope.shuffle = function() {
    cubeGL.shuffle(10);
  };
  $scope.solve = function() {
    if(cubeGL.isSolved()) {
      console.log("The Cube is already solved...");
    } else {
      var solutionJS = cubeJS.solve();
      console.log(solutionJS);
      solutionJS = solutionJS.split(" ");
      /*
      print_str("cubeJS", cubeJS.asString());
      for (var i = 0; i < solutionJS.length; i++) {
        cubeJS.move(solutionJS[i]);
        print_str("cubeJS", cubeJS.asString());
      };
      */
      var solutionGL = "";
      for (var i = 0; i < solutionJS.length; i++) {
        solutionGL = solutionGL + equivalent_movement(solutionJS[i]);
      };
      cubeGL.twist(solutionGL);
    }
  };
  function update_cubeJS() {
    var read = [8, 7, 6, 5, 4, 3, 2, 1, 0];
    var cube_string_color = "";
    var cube_string_faces = "";
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.up.cubelets[read[i]].up.color.initial;
    };
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.right.cubelets[read[i]].right.color.initial;
    };
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.front.cubelets[read[i]].front.color.initial;
    };
    read = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.down.cubelets[read[i]].down.color.initial;
    };
    read = [6, 3, 0, 7, 4, 1, 8, 5, 2];
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.left.cubelets[read[i]].left.color.initial;
    };
    for (var i = 0; i <= 8; i++) {
      cube_string_color = cube_string_color + cubeGL.back.cubelets[read[i]].back.color.initial;
    };
    var cube_origin_colors = [
      {pos: "U", color: cubeGL.up.cubelets[4].up.color.initial},
      {pos: "R", color: cubeGL.right.cubelets[4].right.color.initial},
      {pos: "F", color: cubeGL.front.cubelets[4].front.color.initial},
      {pos: "D", color: cubeGL.down.cubelets[4].down.color.initial},
      {pos: "L", color: cubeGL.left.cubelets[4].left.color.initial},
      {pos: "B", color: cubeGL.back.cubelets[4].back.color.initial}
    ];
    for (var i = 0; i < cube_string_color.length; i++) {
      for (var j = 0; j < cube_origin_colors.length; j++) {
        if(cube_string_color[i] == cube_origin_colors[j].color) {
          cube_string_faces = cube_string_faces + cube_origin_colors[j].pos;
          break;
        }
      };
    };
    cubeJS = Cube.fromString(cube_string_faces);
    print_str_view(cube_string_color);
    //print_str("cubeJS", cube_string_faces);
    //print_str("cubeJS", cubeJS.asString());
  };
  function equivalent_movement(movement) {
    var returnValue;
    switch (movement) {
      case "U":
      returnValue = "U";
      break;
      case "U2":
      returnValue = "UU";
      break;
      case "U'":
      returnValue = "u";
      break;
      case "R":
      returnValue = "B";
      break;
      case "R2":
      returnValue = "BB";
      break;
      case "R'":
      returnValue = "b";
      break;
      case "B":
      returnValue = "L";
      break;
      case "B2":
      returnValue = "LL";
      break;
      case "B'":
      returnValue = "l";
      break;
      case "D":
      returnValue = "D";
      break;
      case "D2":
      returnValue = "DD";
      break;
      case "D'":
      returnValue = "d";
      break;
      case "L":
      returnValue = "F";
      break;
      case "L2":
      returnValue = "FF";
      break;
      case "L'":
      returnValue = "f";
      break;
      case "F":
      returnValue = "R";
      break;
      case "F2":
      returnValue = "RR";
      break;
      case "F'":
      returnValue = "r";
      break;
      default:
      returnValue = "";
      break;
    };
    return returnValue;
  };
  function print_str_view(str) {
    var toPrint = str.substring(0, 9) + " " + str.substring(9, 18) + " " + str.substring(18, 27) + " " + str.substring(27, 36) + " " + str.substring(36, 45) + " " + str.substring(45, 54);
    cubeGL_string_container.innerHTML = toPrint;
    var bloq = main_container.querySelector('.r-piece.r-up');
    for (var i = 0; i <= 8; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
    bloq = main_container.querySelector('.r-piece.r-right');
    for (var i = 9; i <= 17; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
    bloq = main_container.querySelector('.r-piece.r-front');
    for (var i = 18; i <= 26; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
    bloq = main_container.querySelector('.r-piece.r-down');
    for (var i = 27; i <= 35; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
    bloq = main_container.querySelector('.r-piece.r-left');
    for (var i = 36; i <= 44; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
    bloq = main_container.querySelector('.r-piece.r-back');
    for (var i = 45; i <= 53; i++) {
      var inner = bloq.querySelector('#r-' + i);
      inner.className = 'r-sticker ' + str[i];
    };
  };
  function print_str_console(type, str) {
    var toPrint = str.substring(0, 9) + " " + str.substring(9, 18) + " " + str.substring(18, 27) + " " + str.substring(27, 36) + " " + str.substring(36, 45) + " " + str.substring(45, 54);
    switch (type) {
      case "cubeJS":
      console.log("%c" + toPrint, "color: green");
      break;
      case "cubeGL":
      console.log("%c" + toPrint, "color: blue");
      break;
    };
  };
  ionic.Platform.ready(function() {
    $ionicModal.fromTemplateUrl('templates/loading.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.loadingModal = modal;
      $scope.loadingModal.show();
      setTimeout(function() {
        Cube.initSolver();
        $scope.loadingModal.hide();
      }, 450);
    });
  });
  $scope.$watch('Global.cubeSpeed', function() {
    cubeGL.twistDuration = $scope.Global.cubeSpeed;
  }, true);
})
//------------------------------------------------------------------------------
