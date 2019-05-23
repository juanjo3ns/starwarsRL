		const objLoader = new THREE.OBJLoader2();
		objLoader.loadMtl('../../models/deathstar.mtl', null, (materials) => {
		  objLoader.setMaterials(materials);
		  objLoader.load('../../models/deathstar.obj', (event) => {
		    const root = event.detail.loaderRootNode;
		    root.scale.set(3, 3, 3);

		    var velocity = new THREE.Vector3();
		    var prevTime = performance.now();
		    init();
		    animate();

		    //3D title
		    var fontLoader = new THREE.FontLoader();

		    fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
		      var fontMaterial = new THREE.MeshPhongMaterial({
		        color: 'yellow',
		        specular: (20, 40, 80),
		        shininess: 30
		      });
		      var text3d = new THREE.TextGeometry('Star-Wars', {
		        font: font,
		        size: 10,
		        height: 1,
		        curveSegments: 2,
		        bevelEnabled: true,
		        bevelThickness: 1,
		        bevelSize: 1,
		        bevelSegments: 1
		      });
		      var title3D = new THREE.Mesh(text3d, fontMaterial);
		      title3D.position.x = -50;
		      title3D.position.y = 30;
		      title3D.position.z = -80;
		      scene.add(title3D);
		    });



		    // google-chrome --allow-file-access-from-files &

		    // Load CSV data
		    url = "/home/juanjo/Documents/starwars-RL/src/csvdata/dueling-final/coords_"
		    var csv_files = new Array();
		    var num_files = 20;
		    for (var i = 0; i < num_files; i++) {
		      csv_files.push(url.concat((i * 100).toString()).concat('.csv'));
		    }
		    // console.log(csv_files);



		    function addStats(csvData) {
		      var fontLoader = new THREE.FontLoader();
		      fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
		        var fontMaterial = new THREE.MeshPhongMaterial({
		          color: 'black'
		        });
		        var t1 = new THREE.TextGeometry('Stats', {
		          font: font,
		          size: 4,
		          height: 1,
		          curveSegments: 2
		        });
		        var t2 = new THREE.TextGeometry('Epoch-->'.concat(csvData[0][0]), {
		          font: font,
		          size: 3,
		          height: 1,
		          curveSegments: 2
		        });
		        var t3 = new THREE.TextGeometry('Accuracy-->'.concat(csvData[0][1]).concat('%'), {
		          font: font,
		          size: 3,
		          height: 1,
		          curveSegments: 2
		        });
		        var t4 = new THREE.TextGeometry('Average_steps-->'.concat(csvData[0][3]), {
		          font: font,
		          size: 3,
		          height: 1,
		          curveSegments: 2
		        });
		        var t5 = new THREE.TextGeometry('Average_reward-->'.concat(csvData[0][2]), {
		          font: font,
		          size: 3,
		          height: 1,
		          curveSegments: 2
		        });
		        var tm1 = new THREE.Mesh(t1, fontMaterial);
		        var tm2 = new THREE.Mesh(t2, fontMaterial);
		        var tm3 = new THREE.Mesh(t3, fontMaterial);
		        var tm4 = new THREE.Mesh(t4, fontMaterial);
		        var tm5 = new THREE.Mesh(t5, fontMaterial);
						tm1.name = 'tm1';
						tm2.name = 'tm2';
						tm3.name = 'tm3';
						tm4.name = 'tm4';
						tm5.name = 'tm5';
		        tm1.position.x = -50;
		        tm1.position.y = 20;
		        tm1.position.z = -80;
		        tm2.position.x = -50;
		        tm2.position.y = 15;
		        tm2.position.z = -80;
		        tm3.position.x = -50;
		        tm3.position.y = 10;
		        tm3.position.z = -80;
		        tm4.position.x = -50;
		        tm4.position.y = 5;
		        tm4.position.z = -80;
		        tm5.position.x = -50;
		        tm5.position.y = 0;
		        tm5.position.z = -80;
		        scene.add(tm1);
		        scene.add(tm2);
		        scene.add(tm3);
		        scene.add(tm4);
		        scene.add(tm5);
		      });
		    }
				function showStats(csvData){
					scene.remove(scene.getObjectByName('tm1'));
					scene.remove(scene.getObjectByName('tm2'));
					scene.remove(scene.getObjectByName('tm3'));
					scene.remove(scene.getObjectByName('tm4'));
					scene.remove(scene.getObjectByName('tm5'));
					addStats(csvData);
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
		    var geometry = new THREE.CylinderGeometry(0.2, 0.2, 11, 64);
		    var material = new THREE.MeshBasicMaterial({
		      color: 'red'
		    });
		    var cylinder = new THREE.Mesh(geometry, material);


		    cylinder.position.y = 9
		    scene.add(root);
		    root.add(cylinder);
		    root.name = "deathstar"


		    // parent
		    parent = new THREE.Object3D();
		    scene.add(parent);
				parent.name = "parent";

		    // pivots
		    var pivot = new THREE.Object3D();
		    pivot.rotation.z = 0;
		    parent.add(pivot);
				pivot.name = "pivot";

		    // planet
		    var geometry = new THREE.SphereGeometry(5, 32, 32);
		    var material = new THREE.MeshPhongMaterial({
		      color: 0x00FF4D,
		      shininess: 100
		    });
		    var planet = new THREE.Mesh(geometry, material);
				planet.name = 'planet';
		    planet.position.y = 40;
		    pivot.add(planet);

		    //GLOBAL PARENT
		    // parent
		    gparent = new THREE.Object3D();
		    scene.add(gparent);

		    // pivots
		    var gpivot = new THREE.Object3D();
		    gpivot.rotation.z = 0;
		    gparent.add(gpivot);

		    gpivot.add(parent);
		    gpivot.add(root);


				var csv = 0;
				var url = csv_files[csv];
				var request = new XMLHttpRequest();
				request.open("GET", url, false);
				request.send(null);

				var csvData = new Array();
				var jsonObject = request.responseText.split(/\r?\n|\r/);
				for (var i = 0; i < jsonObject.length; i++) {
					csvData.push(jsonObject[i].split(','));
				}
		    var rand_y_max = 100;
		    var grid_size = 9;
		    // Move planet depending on CSV
				addStats(csvData);
		    var init = false;
		    var i = 1;
				var colors = Array(0x00FF9A,0xFFCD00,0x3300FF,0xFFD2AB);
				console.log(colors);
		    var intervalID = setInterval(function() {


		      if ((csvData[i][0] == csvData[i][2]) && (csvData[i][1] == csvData[i][3])) {
		        planet.material.color.setHex(0xFF0000);
		        scene.getObjectByName("deathstar").children[1].visible = true;
		        init = true;
		      } else {

		        if (init == true) {
							planet.material.color.setHex(colors[i%3]);
		          init = false;
		          gparent.rotation.x = Math.PI * 2 * Math.random();
		          gparent.rotation.z = Math.PI * 2 * Math.random();
		        }
		        scene.getObjectByName("deathstar").children[1].visible = false;
		        // if (Math.random() > 0.7) {
		        // 	scene.getObjectByName("deathstar").children[1].visible=true;
		        // } else{
		        // 	scene.getObjectByName("deathstar").children[1].visible=false;
		        // }
		      }

		      agent_c = computeRotationXYZ(csvData[i][0], csvData[i][1]);
		      root.rotation.x = agent_c[0];
		      root.rotation.z = agent_c[1];

		      terminal_c = computeRotationXYZ(csvData[i][2], csvData[i][3]);
		      parent.rotation.x = terminal_c[0];
		      parent.rotation.z = terminal_c[1];


		      i += 1;
		      if (i >= 150) {
		        i = 1;
		        csv += 1;
						var url = csv_files[csv];
						var request = new XMLHttpRequest();
						request.open("GET", url, false);
						request.send(null);

						// var csvData = new Array();
						csvData = [];
						var jsonObject = request.responseText.split(/\r?\n|\r/);
						for (var t = 0; t < jsonObject.length; t++) {
							csvData.push(jsonObject[t].split(','));
						}
						showStats(csvData);

		      }
					if (csv >= 19){
						csv = 0;
					}



		    }, 100);
		    setTimeout(function() {
		      clearInterval(intervalID);
		    }, 1000000);


		    function getRandom(min, max) {
		      return Math.random() * (max - min) + min;
		    }

		    function computeRotationXYZ(sx, sz) {
		      x = (sx * 2 * Math.PI) / grid_size;
		      z = (sz * 2 * Math.PI) / grid_size;
		      return [x, z];
		    }


		    function init() {
		      renderer = new THREE.WebGLRenderer({
		        antialias: true
		      });
		      var width = window.innerWidth;
		      var height = window.innerHeight;

		      renderer.setSize(width, height);
		      document.body.appendChild(renderer.domElement);

		      scene = new THREE.Scene();
		      scene.background = new THREE.Color('white');

		      camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
		      camera.position.x = 0;
		      camera.position.y = 10;
		      camera.position.z = 400;
		      camera.lookAt(new THREE.Vector3(0, 0, 0));

		      controls = new THREE.OrbitControls(camera, renderer.domElement);
		    }

		    function render() {
		      renderer.render(scene, camera);
		      var time = performance.now();
		      var delta = 1 / (time - prevTime);
		      if (delta < 0.0006) {
		        delta = 0;
		      }
		      velocity.z = -2000 * delta;
		      velocity.x = -1000 * delta;
		      velocity.y = 500 * delta;
		      camera.translateZ(velocity.z);
		      camera.translateX(velocity.x);
		      camera.translateY(velocity.y);
		      // prevTime = time;
		    }



		    function animate() {
		      controls.update();
		      requestAnimationFrame(animate);
		      // TWEEN.update();
		      render();
		      // renderer.render(scene, camera);
		    }

		  });
		});
