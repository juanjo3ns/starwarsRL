// function moveAgent(x,y,z, time, delay){
// 	new TWEEN.Tween(scene.getObjectByName("agent").position)
// 	.to(scene.getObjectByName("agent").position.clone().set(x,y,z), time)
// 	.delay(delay)
// 	.easing(TWEEN.Easing.Quadratic.Out)
// 	.start();
//
// }
function moveCamera(x,y,z, time){
	new TWEEN.Tween(scene.getObjectByName("camera").position)
	.to(scene.getObjectByName("camera").position.clone().set(x,y,z), time)
	.easing(TWEEN.Easing.Quadratic.Out)
	.start();

}
function rotateAgent(x,y,z,time){

	new TWEEN.Tween(scene.getObjectByName("pivot").getObjectByName("deathstar").rotation)
	.to({x:x, z:z}, time)
	.easing(TWEEN.Easing.Quadratic.Out)
	.start();

}
