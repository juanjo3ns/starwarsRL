var renderer, scene, camera;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var gparent = new THREE.Object3D();
var gridSize = 10;
var intervalID;
gparent.name = "text_parent";

var terminalState = JSON.stringify([[4,0]]);

init();
animate();
runDefaultEpisode();

async function runDefaultEpisode(init = false) {
	scene.getObjectByName("text_parent").visible = false;
	await sleep(600);
	var csvfile = getURL(200);
	csvData = getData(csvfile);
	if (!init) {
		addStats(csvData);
	} else {
		updateStats(csvData);
	}
	intervalID = setInterval(runEvaluations, 200, csvData);
}


function changeCSV(epoch) {
	epoch = (parseInt(epoch) * 5 + 50).toString();
	clearInterval(intervalID);
	csvfile = getURL(epoch);
	csvData = getData(csvfile);
	updateStats(csvData);
	var counter = 1;
	intervalID = setInterval(runEvaluations, 200, csvData);

}

function getURL(epoch) {
	url = "src/csvdata/dueling-final3/coords_"
	return url.concat(epoch).concat('.csv');
}

function getData(csv_file) {
	var url = csv_file;
	var request = new XMLHttpRequest();
	request.open("GET", url, false);
	request.send(null);

	var csvData = new Array();
	var jsonObject = request.responseText.split(/\r?\n|\r/);
	for (var t = 0; t < jsonObject.length; t++) {
		csvData.push(jsonObject[t].split(','));
	}
	return csvData;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	var width = window.innerWidth;
	var height = window.innerHeight;

	renderer.setSize(width, height);
	renderer.setClearColor(0x140b33, 1);
	document.body.appendChild(renderer.domElement);

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(55, width / height, 1, 10000);
	camera.position.set(0, 0, 300);
	camera.name = "camera";
	scene.add(camera)

	// Lighting
	var spotLight = new THREE.SpotLight(0x666666, 0.5);
	spotLight.position.set(200, 250, 600);
	spotLight.target.position.set(100, -50, 0);
	spotLight.castShadow = true;
	scene.add(spotLight.target);
	scene.add(spotLight);
	spotLight.shadow.mapSize.width = 512; // default
	spotLight.shadow.mapSize.height = 512; // default
	spotLight.shadow.camera.near = 100; // default
	spotLight.shadow.camera.far = 200; // default
	var ambient_light = new THREE.AmbientLight(0x404040, 2.2); // soft white light
	scene.add(ambient_light);

	const loader = new THREE.TextureLoader();
	const bgTexture = loader.load('src/ui/stars.jpg');
	scene.background = bgTexture;

	pivot = new THREE.Object3D();
	pivot.rotation.z = 0;
	pivot.name = "pivot";

	showDeathStar();
	planet = showPlanet();
	planet_parent = new THREE.Object3D();
	planet_parent.rotation.z = 0;
	planet_parent.name = "planet_parent";
	planet_parent.add(planet);
	pivot.add(planet_parent);

	scene.add(pivot);

	addButtons();
	addEpochs();
	scene.add(gparent);
	counter = 1;
	showStats();


	document.addEventListener('click', onDocumentMouseDown, false);
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.updateProjectionMatrix();
};


function showDeathStar () {
  const objLoader = new THREE.OBJLoader2()
  objLoader.loadMtl('models/title_centre.mtl', null, (materials) => {
    objLoader.setMaterials(materials)
    objLoader.load('models/title_centre.obj', (event) => {
      const title3D = event.detail.loaderRootNode
      title3D.scale.set(3, 3, 3)
      title3D.name = 'title3d'

      scene.add(title3D)
    })
  })
  const objLoader1 = new THREE.OBJLoader2()
  objLoader1.loadMtl('models/deathstar.mtl', null, (materials) => {
    objLoader1.setMaterials(materials)
    objLoader1.load('models/deathstar.obj', (event) => {
      const root = event.detail.loaderRootNode
      root.scale.set(3, 3, 3)
      root.name = 'deathstar'
      var geometry = new THREE.CylinderGeometry(0.2, 0.2, 12.5, 32)
      var material = new THREE.MeshBasicMaterial({
        color: '#2bef42'
      })
      var cylinder = new THREE.Mesh(geometry, material)
      cylinder.name = 'laser'
      cylinder.position.y = 8
      root.add(cylinder)
      scene.getObjectByName('pivot').add(root)
    })
  })
}


function showPlanet() {
	var geometry = new THREE.SphereGeometry(5, 32, 32);
	var material = new THREE.MeshPhongMaterial({
		color: 0x00FF4D,
		shininess: 100
	});
	var planet = new THREE.Mesh(geometry, material);
	planet.name = 'planet';
	planet.position.y = 40;
	return planet;
}
function onDocumentMouseDown(event) {
	event.preventDefault();
	mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
	mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;

	raycaster.setFromCamera(mouse, camera);
	var intersects1 = raycaster.intersectObjects(scene.children);
	var intersects2 = raycaster.intersectObjects(scene.getObjectByName('text_parent').children);
	if (intersects2.length > 0) {
		intersects = raycaster.intersectObjects(scene.getObjectByName('text_parent').children);
		if (buttons.indexOf(intersects[0].object.name) != -1) {
			backtoGreen();
			intersects[0].object.material.color.set("red");
			changeCSV(intersects[0].object.name);
		}
	} else if (intersects1.length > 0) {
		if (intersects1[0].object.name == 'switch') {
			var current = scene.getObjectByName("text_parent").visible;
			scene.getObjectByName("text_parent").visible = !current;
			if (current) {
				intersects1[0].object.material.color.set('grey');
				clearInterval(intervalID);
				runDefaultEpisode(true);
				backtoGreen();
			} else {
				intersects1[0].object.material.color.set('white');
			}
		}
	}
}

function animate() {
	requestAnimationFrame(animate);
	controls.update();
	TWEEN.update();
	render();
}

function render() {
	renderer.render(scene, camera);

}
