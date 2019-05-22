	//
	// const testFolder = '/home/juanjo/Documents/starwars-RL/src/csvdata/dqn1';
	// const fs = require('fs');
	//
	// fs.readdir(testFolder, (err, files) => {
	//   files.forEach(file => {
	//     console.log(file);
	//   });
	// });
		const objLoader = new THREE.OBJLoader2();
			objLoader.loadMtl('../../models/deathstar.mtl', null, (materials) => {
				objLoader.setMaterials(materials);
				objLoader.load('../../models/deathstar.obj', (event) => {
					const root = event.detail.loaderRootNode;
					root.scale.set(3, 3, 3);

		init();
		animate();

		//3D title
		var fontLoader = new THREE.FontLoader();

		fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function (font) {
			var fontMaterial = new THREE.MeshPhongMaterial({ color: (20, 40, 80), specular: (20, 40, 80), shininess: 30 });
			var fontMaterial1 = new THREE.MeshPhongMaterial({ color: 'green', specular: (20, 40, 80), shininess: 30 });
			var text3d = new THREE.TextGeometry('Training_the_Death_Star', {font: font,size: 6,height: 1,curveSegments: 2,bevelEnabled: true,bevelThickness: 1,bevelSize: 1,bevelSegments: 1});
			var epochs_text = new THREE.TextGeometry('Choose_evaluation:', {font: font,size: 4,height: 1,curveSegments: 2,bevelEnabled: true,bevelThickness: 1,bevelSize: 1,bevelSegments: 1});
			var title3D = new THREE.Mesh(text3d, fontMaterial);
			var epoch3D = new THREE.Mesh(epochs_text, fontMaterial1);
			title3D.position.x = -50;
			title3D.position.y = 30;
			title3D.position.z = 120;
			epoch3D.position.x = -50;
			epoch3D.position.y = 12;
			epoch3D.position.z = 120;
			scene.add(title3D);
			scene.add(epoch3D);
		});



		// google-chrome --allow-file-access-from-files &

		// Load CSV data
		url = "/home/juanjo/Documents/starwars-RL/src/csvdata/dqn1/coords_"
		var csv_files = new Array();
		var num_files = 20;
		for (var i = 0; i < num_files; i++) {
			csv_files.push(url.concat((i*100).toString()));
		}
		console.log(csv_files);


		// Creation of 20 cubes and text to select which epoch to load
		var meshes = new Array();
		var cube = new THREE.BoxGeometry( 3, 3, 3 );
		var materials = new THREE.MeshBasicMaterial({color: 0x00ff00});
		for (var i = 0; i < num_files; i++) {
			meshes.push(new THREE.Mesh( cube, materials));
			scene.add(meshes[i]);
			meshes[i].position.x = -50;
			meshes[i].position.y = -i* 5;
			meshes[i].position.z = 120;
			meshes[i].addEventListener( 'click', changeEpoch(i*100) , false );
		}
		function changeEpoch(i){
			console.log("Load " + i.toString() + " epoch");
		}

		var geometry_text = new Array();
		var meshes_text = new Array();

		var material1 = new THREE.MeshPhongMaterial({ color: 'green', specular: (20, 40, 80), shininess: 30 });
		var fontLoader = new THREE.FontLoader();
		fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function (font) {
			for(var i=0; i< num_files; i++) {
				geometry_text.push(new THREE.TextGeometry('Epoch--> '.concat((i*100).toString()), {font: font,size: 3,height: 1,curveSegments: 2,bevelEnabled: true,bevelThickness: 1,bevelSize: 1,bevelSegments: 1}));
				meshes_text.push(new THREE.Mesh(geometry_text[i], material1));
				scene.add(meshes_text[i]);
				meshes_text[i].position.x = -45;
				meshes_text[i].position.y = -i* 5 -1;
				meshes_text[i].position.z = 120;
		}
		});




		var url = "data.csv";
		var request = new XMLHttpRequest();
		request.open("GET", url, false);
		request.send(null);

		var csvData = new Array();
		var jsonObject = request.responseText.split(/\r?\n|\r/);
		for (var i = 0; i < jsonObject.length; i++) {
			csvData.push(jsonObject[i].split(','));
		}


		// Lighting
		var spotLight = new THREE.SpotLight(0xFFFFFF, 2);
		spotLight.position.set(200, 250, 600);
		spotLight.target.position.set(100, -50, 0);
		spotLight.castShadow = true;
		scene.add(spotLight.target);
		scene.add(spotLight);
		spotLight.shadow.mapSize.width = 512; // default
		spotLight.shadow.mapSize.height = 512; // default
		spotLight.shadow.camera.near = 0.5; // default
		spotLight.shadow.camera.far = 15000; // default


		//Sphere 1
		// var geometry = new THREE.SphereGeometry(15, 64, 64);
		// var material = new THREE.MeshPhongMaterial({ color: 0x0087E6, shininess: 100 });
		// var sphere = new THREE.Mesh(geometry, material);

		// Cylinder
		var geometry = new THREE.CylinderGeometry(0.1, 0.3, 50, 64);
		var material = new THREE.MeshBasicMaterial({ color: 'red' });
		var cylinder = new THREE.Mesh(geometry, material);


		cylinder.position.y = 25
		scene.add(root);
		root.add(cylinder);
		root.name = "deathstar"


		// parent
		parent = new THREE.Object3D();
		scene.add( parent );

		// pivots
		var pivot = new THREE.Object3D();
		pivot.rotation.z = 0;
		parent.add( pivot );

		// planet
		var geometry = new THREE.SphereGeometry(5, 32, 32);
		var material = new THREE.MeshPhongMaterial({ color: 0x00FF4D, shininess: 100 });
		var planet = new THREE.Mesh( geometry, material );
		planet.position.y = 40;
		pivot.add( planet );

		//GLOBAL PARENT
		// parent
		gparent = new THREE.Object3D();
		scene.add( gparent );

		// pivots
		var gpivot = new THREE.Object3D();
		gpivot.rotation.z = 0;
		gparent.add( gpivot );

		gpivot.add(parent);
		gpivot.add(root);



		var rand_y_max = 100;
		var grid_size = 9;

		// Move planet depending on CSV
		var i = 0;
		var init = false;
		$(function () {
			var intervalID = setInterval(function () {

				if ((csvData[i][0] == csvData[i][2]) && (csvData[i][1] == csvData[i][3])) {
					planet.material.color.setHex(0xFF0000);
					scene.getObjectByName("deathstar").children[1].visible=true;
					init = true;
				} else {
					planet.material.color.setHex(0x00FF4D);
					if(init==true){
						init = false;
						gparent.rotation.x = Math.PI*2*Math.random();
						gparent.rotation.z = Math.PI*2*Math.random();
					}

					if (Math.random() > 0.7) {
						scene.getObjectByName("deathstar").children[1].visible=true;
					} else{
						scene.getObjectByName("deathstar").children[1].visible=false;
					}
				}


				agent_c = computeRotationXYZ(csvData[i][0], csvData[i][1]);
				root.rotation.x = agent_c[0];
				root.rotation.z = agent_c[1];

				terminal_c = computeRotationXYZ(csvData[i][2], csvData[i][3]);
				parent.rotation.x = terminal_c[0];
				parent.rotation.z = terminal_c[1];


				i += 1;
				if (i >= csvData.length) { i = 1; }



			}, 300);
			setTimeout(function () {
				clearInterval(intervalID);
			}, 1000000);
		});

		function getRandom(min, max) {
			return Math.random() * (max - min) + min;
		}

		function computeRotationXYZ(sx, sz) {
			x = (sx * 2 * Math.PI) / grid_size;
			z = (sz * 2 * Math.PI) / grid_size;
			return [x, z];
		}


		function init() {
			renderer = new THREE.WebGLRenderer({ antialias: true });
			var width = window.innerWidth;
			var height = window.innerHeight;
			renderer.setSize(width, height);
			document.body.appendChild(renderer.domElement);

			scene = new THREE.Scene();
			scene.background = new THREE.Color('white');

			camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
			camera.position.x = 0;
			camera.position.y = 10;
			camera.position.z = 100;
			camera.lookAt(new THREE.Vector3(0, 0, 0));

			controls = new THREE.OrbitControls(camera, renderer.domElement);

			var gridXZ = new THREE.GridHelper(100, 10);
			scene.add(gridXZ);

		}

		function animate() {
			controls.update();
			requestAnimationFrame(animate);
			// TWEEN.update();
			renderer.render(scene, camera);
		}
	});
			});
