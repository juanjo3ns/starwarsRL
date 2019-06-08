var num_files = 30;
var buttons = [...Array(num_files).keys()].toString().split(",");
var x=25; y=-85; z=-105;

function addButtons() {
  // Creation of #gridSize cubes and text to select which epoch to load
  var cube = new THREE.BoxGeometry(4, 4, 3);
  for (var j = 0; j < 3; j++) {
    for (var i = 0; i < (num_files / 3); i++) {
      var material = new THREE.MeshBasicMaterial({
        color: 'green'
      });
      var mesh = new THREE.Mesh(cube, material);
      gparent.add(mesh);
      mesh.position.x = x + j * 30;
      mesh.position.y = -i * 8 + y;
      mesh.position.z = z;
      mesh.name = (i + j * 10).toString();
    }
  }
}


function backtoGreen() {
  for (var i = 0; i < buttons.length; i++) {
    scene.getObjectByName("text_parent").getObjectByName(buttons[i]).material.color.set("green");
  }
}

function addEpochs() {
  var fontLoader = new THREE.FontLoader();
  fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
    var m = new THREE.MeshPhongMaterial({
      color: 'white'
    });
    var t = new THREE.TextGeometry("SELECT_EPOCH:", {
      font: font,
      size: 6,
      height: 1,
      curveSegments: 2
    });
    var select_mesh = new THREE.Mesh(t, m);
    gparent.add(select_mesh);
    select_mesh.position.x = x+3;
    select_mesh.position.y = y+10;
    select_mesh.position.z = z;
  });
  var material1 = new THREE.MeshPhongMaterial({
    color: 'green',
    specular: (20, 40, 80),
    shininess: 30
  });
  var fontLoader = new THREE.FontLoader();
  fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
    for (var j = 0; j < 3; j++) {
      for (var i = 0; i < num_files / 3; i++) {
        var text = new THREE.TextGeometry(((i + j * 10)*5+50).toString(), {
          font: font,
          size: 4,
          height: 1,
          curveSegments: 2
        });
        var mesh = new THREE.Mesh(text, material1);
        gparent.add(mesh);
        mesh.position.x = x+3 + j * 30;
        mesh.position.y = -i * 8 + y-2;
        mesh.position.z = z;

      }
    }
  });
}
