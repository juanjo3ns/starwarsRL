function showStats() {
	var sw_b = new THREE.BoxGeometry(10, 2, 10);
	var material_b = new THREE.MeshPhongMaterial({
		color: 'grey',
		flatShading: THREE.FlatShading
	});
	var swch = new THREE.Mesh(sw_b, material_b);
	swch.name = 'switch';

	swch.position.x = -80;
	swch.position.y = -77;
	swch.position.z = -105;
	swch.rotation.x = Math.PI/2;

	scene.add(swch);
	var fontLoader = new THREE.FontLoader();
	fontLoader.load('https://cdn.rawgit.com/redwavedesign/ccb20f24e7399f3d741e49fbe23add84/raw/402bcf913c55ad6b12ecfdd20c52e3047ff26ace/bebas_regular.typeface.js', function(font) {
		var fontMaterial = new THREE.MeshPhongMaterial({
			color: 'white'
		});
		var textt = new THREE.TextGeometry("DEVELOPER_MODE", {
			font: font,
			size: 7,
			height: 1,
			curveSegments: 2
		});
		var sw = new THREE.Mesh(textt, fontMaterial);

		sw.position.x = -70;
		sw.position.y = -80;
		sw.position.z = -105;

		scene.add(sw);

	});
}
