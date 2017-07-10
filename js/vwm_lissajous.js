// DESCRIPT: all functionality related to lissajous fig here:

var lissajousVariants = [];

var lissajVariant1 = {
	freqA 	: 3.0,
	freqB 	: 4.0,
	freqC 	: 2.0,
	phaseX 	: 0.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant1);

var lissajVariant2 = {
	freqA 	: 9.0,
	freqB 	: 10.0,
	freqC 	: 10.0,
	phaseX 	: 10.0,
	phaseY 	: 8.0,
	phaseZ	: 3.0
}
lissajousVariants.push(lissajVariant2);

var lissajVariant3 = {
	freqA 	: 1.0,
	freqB 	: 10.0,
	freqC 	: 10.0,
	phaseX 	: 6.0,
	phaseY 	: 4.0,
	phaseZ	: 3.0
}
lissajousVariants.push(lissajVariant3);

var lissajVariant4 = {
	freqA 	: 5.0,
	freqB 	: 10.0,
	freqC 	: 10.0,
	phaseX 	: 5.0,
	phaseY 	: 1.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant4);

var lissajVariant5 = {
	freqA 	: 5.0,
	freqB 	: 10.0,
	freqC 	: 6.0,
	phaseX 	: 5.0,
	phaseY 	: 1.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant5);

var lissajVariant6 = {
	freqA 	: 5.0,
	freqB 	: 2.0,
	freqC 	: 6.0,
	phaseX 	: 5.0,
	phaseY 	: 1.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant6);

var lissajVariant7 = {
	freqA 	: 5.0,
	freqB 	: 4.0,
	freqC 	: 6.0,
	phaseX 	: 5.0,
	phaseY 	: 1.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant7);

var lissajVariant8 = {
	freqA 	: 5.0,
	freqB 	: 4.0,
	freqC 	: 6.0,
	phaseX 	: 7.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant8);

var lissajVariant9 = {
	freqA 	: 5.0,
	freqB 	: 4.0,
	freqC 	: 6.0,
	phaseX 	: 6.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant9);

var lissajVariant10 = {
	freqA 	: 5.0,
	freqB 	: 4.0,
	freqC 	: 8.0,
	phaseX 	: 0.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant10);

var lissajVariant11 = {
	freqA 	: 5.0,
	freqB 	: 4.0,
	freqC 	: 6.0,
	phaseX 	: 0.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant11);

var lissajVariant12 = {
	freqA 	: 3.0,
	freqB 	: 6.0,
	freqC 	: 2.0,
	phaseX 	: 0.0,
	phaseY 	: 0.0,
	phaseZ	: 0.0
}
lissajousVariants.push(lissajVariant12);


function LissajousCurve(){
	// based on https://github.com/licaschiou/Lissajous3js
	this.sizeX = 80.0;
	this.sizeY = 80.0;
	this.sizeZ = 80.0;

	this.fa = 4.0; //freqA?
	this.fb = 3.0;
	this.fc = 2.0;

	this.phaseX = 0.0;
	this.phaseY = 0.0;
	this.phaseZ = 8.0;

	this.step = 0.02;
	
	this.curveVertices = []; //eg. uses new Array() - not recommended approach
	this.lines = [];
	
	this.numCurveVertices = 0.0;
	
	this.material = 'Basic';
	this.meshObject = new THREE.Object3D;
	this.color = '#384040';

	this.setParameters = function(parameters){
		this.material = parameters.material;
		this.color = parameters.color;

		this.sizeX = parameters.sizeX;
		this.sizeY = parameters.sizeY;
		this.sizeZ = parameters.sizeZ;

		this.fa = parameters.fa;
		this.fb = parameters.fb;
		this.fc = parameters.fc;

		this.phaseX = parameters.phaseX; 
		this.phaseY = parameters.phaseY;
		this.phaseZ = parameters.phaseZ;

		this.step = parameters.step;
		this.numCurveVertices = Math.floor((Math.PI * 2 + this.step) /this.step);
	};

	this.clearMesh = function(){
		var numChildren = this.meshObject.children.length;
		if(numChildren > 0){
			for (var i = numChildren -1; i >= 0; i--) {
				this.meshObject.remove(this.meshObject.children[i]);
			}
		}
	};

	this.createMesh = function(){
		this.numCurveVertices = Math.floor((Math.PI * 2 +4 *this.step) /this.step); //not sure of the role of +4 here (perhaps curve res?)

		for (var i = 0; i < this.numCurveVertices; i++) {
			this.curveVertices[i] = new THREE.Vector3();
		}

		var angle = this.step;
		for (var i = 0; i < this.numCurveVertices; i++) {
			this.curveVertices[i].x = this.sizeX*Math.sin(this.fa*angle + this.phaseX);
			this.curveVertices[i].y = this.sizeY*Math.sin(this.fb*angle + this.phaseY);
			this.curveVertices[i].z = this.sizeZ*Math.sin(this.fc*angle + this.phaseZ);
			angle += this.step;
		}

		var lissajousGeometry = new THREE.Geometry();
		var vertArray = lissajousGeometry.vertices;

		for(var i = 0; i < this.curveVertices.length - 1; i++) {
			vertArray.push( this.curveVertices[i], this.curveVertices[i+1]);
			lissajousGeometry.computeLineDistances();
		}

		var lineMaterial = new MeshLineMaterial({ 
			color : new THREE.Color().setHex(this.color.replace("#", "0x"))
		});
		var line = new MeshLine();
		var lineWidth = 2;
		line.setGeometry(lissajousGeometry, function(p){ return lineWidth; });
		var lineMesh = new THREE.Mesh(line.geometry, lineMaterial);
		this.meshObject.add(lineMesh);			
			
	};

	this.update = function(){
		this.clearMesh();
		this.createMesh();
	};
}

function tweenLissaj(newLissaj){

	//Tween resource: http://learningthreejs.com/data/tweenjs_for_smooth_animation/tweenjs_for_smooth_animation.js

	var update = function(){
		lissajousCurve.fa = current.freqA;
		lissajousCurve.fb = current.freqB;
		lissajousCurve.fc = current.freqC;
		lissajousCurve.phaseX = current.phaseX;
		lissajousCurve.phaseY = current.phaseY;
		lissajousCurve.phaseZ = current.phaseZ;
		lissajousCurve.update();
	};

	var current = { freqA: lissajousCurve.fa,
					freqB: lissajousCurve.fb,
					freqC: lissajousCurve.fc,
					phaseX: lissajousCurve.phaseX,
					phaseY: lissajousCurve.phaseY,
					phaseZ: lissajousCurve.phaseZ
				};

	var tweenTo = new TWEEN.Tween(current)
		.to({	freqA: newLissaj.freqA,
				freqB: newLissaj.freqB,
				freqC: newLissaj.freqC,
				phaseX: newLissaj.phaseX,
				phaseY: newLissaj.phaseY,
				phaseZ: newLissaj.phaseZ
		}, 5000)
		.onUpdate(update);

	tweenTo.start();

}