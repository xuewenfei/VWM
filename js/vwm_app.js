// DESCRIPT: all functionality related to the app base here:

$(document).ready(function(){
	initApp();
	initScene();
	animate();
	loadScene();
});

var clock;


function initApp(){
	clock = new THREE.Clock();

	var optionButtons = document.getElementsByClassName('option-button');
	for(var i = 0; i < optionButtons.length; i++ ){
		optionButtons[i].addEventListener("click", loadScene);
	}
	var continueButton = document.getElementById('continue-button');
		continueButton.addEventListener("click", loadScene);
	
}

function animate() {
	requestAnimationFrame(animate);
	TWEEN.update();
	render();
}

function render(){

	var delta = clock.getDelta();
	renderer.render(scene, camera);
}


