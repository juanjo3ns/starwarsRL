var colors = Array(0x00FF9A, 0x3300FF, 0xFFD2AB);
var init = false;
function computeRotationXYZ(sx, sz) {
	x = (sx * 2 * Math.PI) / gridSize;
	z = (sz * 2 * Math.PI) / gridSize;
	return [x, z];
}

function runEvaluations(csvData){

	if (counter >= (csvData.length-1)){
		counter = 1;
	}
	state = [parseInt(csvData[counter][0]),parseInt(csvData[counter][1])];
	if ((state[0] == csvData[counter][2]) && (state[1] == csvData[counter][3])) {
		scene.getObjectByName("pivot").getObjectByName("planet_parent").getObjectByName("planet").material.color.setHex(0xFF0000);
		scene.getObjectByName("pivot").getObjectByName("deathstar").getObjectByName("laser").visible = true;
		init = true;
	} else {

		if (init) {
			scene.getObjectByName("pivot").getObjectByName("planet_parent").getObjectByName("planet").material.color.setHex(colors[counter % 3]);
			init = false;
			scene.getObjectByName("pivot").rotation.x = Math.PI * 2 * Math.random();
			scene.getObjectByName("pivot").rotation.z = Math.PI * 2 * Math.random();
		}
		scene.getObjectByName("pivot").getObjectByName("deathstar").getObjectByName("laser").visible = false;
	}
	agent_c = computeRotationXYZ(state[0],state[1]);
	rotateAgent(agent_c[0],0,agent_c[1],200);
	// scene.getObjectByName("pivot").getObjectByName("deathstar").rotation.x = agent_c[0];
	// scene.getObjectByName("pivot").getObjectByName("deathstar").rotation.z = agent_c[1];
	terminal_c = computeRotationXYZ(csvData[counter][2], csvData[counter][3]);
	scene.getObjectByName("pivot").getObjectByName("planet_parent").rotation.x = terminal_c[0];
	scene.getObjectByName("pivot").getObjectByName("planet_parent").rotation.z = terminal_c[1];
	counter += 1;
}
