var t = 0;
var speed = 7.0;
var transforms = 1;

$(document).ready(function() {
  $('#confirm').on('click', make_change);
  init_three();
});

function init_three() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xffffff);
  document.body.appendChild(renderer.domElement);

  var geometry_cube = new THREE.BoxGeometry(1, 1, 1);
  var material_cube = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  var cube = new THREE.Mesh(geometry_cube, material_cube);
  cube.matrixAutoUpdate = false;
  scene.add(cube);

  var axes = new THREE.AxisHelper(10);
  scene.add(axes);

  camera.position.set(3, 3, 5);
  camera.lookAt(scene.position);

  var x = 0;

  var render = function() {
    requestAnimationFrame(render);

    var theta = t * speed;
    if (1 == transforms) {
      x = t*0.1*speed;
      cube.matrix.set(1, 0, 0, x,
                      0, 1, 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1);
    }
    if (2 == transforms)
      cube.matrix.set(Math.cos(theta), -Math.sin(theta), 0, 0,
                      Math.sin(theta), Math.cos(theta), 0, 0,
                      0, 0, 1, 0,
                      0, 0, 0, 1);

    t = t + 0.01;
    renderer.render(scene, camera);
  }

  render();
}

function make_change() {
  transforms = parseInt($('input:radio:checked').val());
  speed = parseFloat($('#speed').val());
  t = 0;
}
