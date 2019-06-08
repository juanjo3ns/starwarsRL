var words = new Array("Epoch-->","Accuracy-->","Average_reward-->","Average_steps-->");
function addStats(csvData) {
	var fontLoader = new THREE.FontLoader();
	fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
		for (var i=0; i<words.length; i++){
			var fontMaterial = new THREE.MeshPhongMaterial({
				color: 'white'
			});
			if (i==1){
				var text = words[i].concat(parseFloat(csvData[0][1]).toFixed(2).toString()).concat('%');
			}else{
				var text = words[i].concat(csvData[0][i]);
			}
			var t = new THREE.TextGeometry(text, {
				font: font,
				size: 5,
				height: 1,
				curveSegments: 2
			});
			var tm = new THREE.Mesh(t, fontMaterial);
			tm.name = 'tm'.concat(i);

			tm.position.x = -75;
			tm.position.y = -100 -i*8;
			tm.position.z = -105;
			gparent.add(tm);
		}
	});
}

function updateStats(csvData) {
	gparent.remove(scene.getObjectByName('tm0'));
	gparent.remove(scene.getObjectByName('tm1'));
	gparent.remove(scene.getObjectByName('tm2'));
	gparent.remove(scene.getObjectByName('tm3'));
	addStats(csvData);
}
