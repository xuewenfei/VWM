// DESCRIPT: all functionality related to the 3JS scene here:


var screenWidth, screenHeight,
	scene, camera,
	light, ambientLight,
	renderer;

var lissajousCurve;


function initScene() {

	calcCanvasSizes();

	initSceneRenderer();
	initCamera();
	initLight();
	initMesh();
}


function calcCanvasSizes(){
	screenWidth = $(window).outerWidth();
	console.log('screenWidth: ' + screenWidth);
	var navHeight = $('#top-nav').outerHeight();
	var optHeight = $('#options-panel').outerHeight();
	console.log('navHeight: ' + optHeight);
	console.log('optHeight: ' + optHeight);
	screenHeight = $(window).outerHeight() - (optHeight+navHeight);
}


window.addEventListener('resize', recalcCanvas, false);
function recalcCanvas(){
	calcCanvasSizes();

	// lissajousCurve.sizeX = lissajousCurve.sizeY = lissajousCurve.sizeZ = screenHeight/7;

	camera.aspect = screenWidth / screenHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( screenWidth, screenHeight);
}


function initSceneRenderer(){
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xCFECEC );
	if ( Detector.webgl )
		renderer = new THREE.WebGLRenderer( {antialias:true} );
	else
		console.log('WebGLRenderer not supported - please use another browser');
		//TODO - add proper feedback
	renderer.setSize(screenWidth, screenHeight);
	document.getElementById('view-container').appendChild(renderer.domElement);
}


function initCamera(){
	camera = new THREE.PerspectiveCamera(75, screenWidth / screenHeight, 0.1, 1000);
	camera.position.set(0,150,180);
	camera.lookAt(scene.position);
	scene.add(camera);
}


function initLight(){
	light = new THREE.PointLight(0xffffff);
	light.position.set(100,250,0);
	scene.add(light);

	ambientLight = new THREE.AmbientLight(0x444444);

	scene.add(ambientLight);
}


function initMesh(){
	lissajousCurve = new LissajousCurve();
	// lissajousCurve.sizeX = lissajousCurve.sizeY = lissajousCurve.sizeZ = 90;
	lissajousCurve.meshObject.name = "Lissa";
	lissajousCurve.createMesh();
	scene.add(lissajousCurve.meshObject);
}
