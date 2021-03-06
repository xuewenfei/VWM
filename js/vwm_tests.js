// DESCRIPT: all psych test controller functionality goes here:


var testPerStageCount = 24;
var curSceneIndex = null;
var curTestIndex = null;

var maxNback = 3;
var nback = null; //needs to be set to null at start for production

// var curLassijIndex; //Not sure if needed for grouped sets
var curLassijGroupIndex;
var lissagIndexArr; //array of lissaj indices used for option recollection and validation

var testStartTime;
var testEndTime;

var testProgressBar = document.getElementById('progressbar');
var trialCountText = document.getElementById('progress-trialcount');
var targetPanel = document.getElementById('target-panel');
var targetHeader = document.getElementById('target-header');
var targetHelperText = document.getElementById('target-helpertext');
var optionsHeader = document.getElementById('options-header');
var optionsHelperText = document.getElementById('options-helpertext');

var transitionPanel = document.getElementById('transition-panel');
var transitionHelperText = document.getElementById('transition-helpertext');
var transitionStageNum = document.getElementById('trans-header-stagenum');
var transitionDiagram = document.getElementById('nback-diagram');

var optionButtons = document.getElementsByClassName('option-button');

function loadScene(optionButtonID, optionImgIndex){
	if(nback !== null && optionButtonID !== 'continue-button'){ 
		//TODO: here is where the validation and data logging function will be executed from
		// console.log('Button pressed: ' + optionButtonID);
		
		testEndTime = performance.now();
		// console.log('testEndTime: ' + testEndTime);
		// console.log('testStartTime: ' + testStartTime);
		var ellapsedMillis = testEndTime - testStartTime;
		var ellapsedSeconds = (ellapsedMillis/1000).toFixed(3);

		var testResult;
		console.log('Test Index: ' + curTestIndex);
		console.log('Current Target: Group: ' + lissagIndexArr[0].groupIndex + ' Figure: ' + lissagIndexArr[0].lassigIndex);
		console.log('Figure pressed: ' + optionImgIndex);
		console.log('Time Taken: ' + ellapsedSeconds + 'sec');
		
		if(optionImgIndex == lissagIndexArr[0].lassigIndex) testResult = 'Pass'; //console.log('Test Result: PASS');
		else testResult = 'Fail'; //console.log('Test Result: FAIL');
		console.log('Test Result: ' + testResult);

		submitTestResult(nback, curTestIndex, lissagIndexArr[0], optionImgIndex, ellapsedSeconds, testResult);
	}
	console.log(' ');
	// console.log('curSceneIndex: '+ curSceneIndex);

	if(nback === null){
		console.log('sceneMode: transition to first stage');
		loadStageTransitionScene();
	}
	else if(curSceneIndex < nback){ //if the number of mem tests req hasn't been reached
		console.log('sceneMode: memoriseOnly');
		loadMemoriseOnlyScene();
		curSceneIndex++;
	}
	else if(curTestIndex+nback >= testPerStageCount //if we're on the last mem scene (accounts for n-back range)
			&& curTestIndex < testPerStageCount){  	// and not over test count (25)
		console.log('sceneMode: testOnly');
		loadTestOnlyScene();
		curSceneIndex++;
	} 
	else if (curTestIndex < testPerStageCount){
		console.log('sceneMode: testAndMemorise');
		loadTestMemoriseScene();
		curSceneIndex++; 
	}
	else if(curSceneIndex+nback > testPerStageCount){
		console.log('sceneMode: transition to next stage');
		loadStageTransitionScene();
	}
}


function loadTestMemoriseScene(){

	function initScene(){
		transitionPanel.style.display = 'none';
		targetHeader.style.display = 'block';
		optionsHeader.style.display = 'block';
		lissajousCurve.color = '#384040';
		var continueButton = document.getElementById('continue-button');
			continueButton.style.display = 'none';
		// var optionButtons = document.getElementsByClassName('option-button');
			for (var i = 0; i < optionButtons.length; i++) {
				optionButtons[i].style.display = 'inline-block';
			};
	}
	initScene();

	if(curTestIndex === null){
		curTestIndex = 0;
	}
	else{
		console.log('Test Number: ' + curTestIndex);
		
		curTestIndex++;
	}
	updateMemoriseFigure();
	updateProgressBar();
	updateHelperText('testMem');
}

function loadMemoriseOnlyScene(){

	function initScene(){
		transitionPanel.style.display = 'none';
		targetHeader.style.display = 'block';
		optionsHeader.style.display = 'block';
		lissajousCurve.color = '#384040';
		var continueButton = document.getElementById('continue-button');
			continueButton.style.display = 'block';
		// var optionButtons = document.getElementsByClassName('option-button');
			for (var i = 0; i < optionButtons.length; i++) {
				optionButtons[i].style.display = 'none';
			};
	}
	initScene();
	updateHelperText('mem');
	updateMemoriseFigure();
}

function loadTestOnlyScene(){

	function initScene(){
		lissajousCurve.color = '#CFECEC'; //FIXME: seems kind of buggy - not best approach
		lissajousCurve.update();
	}
	initScene();

	// console.log('curTestIndex: ' + curTestIndex);
	curTestIndex++;

	updateProgressBar();
	updateMemoriseFigure();
	updateHelperText('test');
}

function loadStageTransitionScene(){

	if(nback === null){
		nback = 0;	
	}else{
		nback++;
	}
	if(nback > maxNback){ //if nback is above max redirect to results
		console.log('nback > 3: load results scene');
		window.location.href = 'userresults.html';
		return;
	}
	console.log(' ');
	console.log('N-Back Stage: ' + nback);

	function initScene(){
		lissajousCurve.color = '#CFECEC';
		lissajousCurve.update();

		var continueButton = document.getElementById('continue-button');
				continueButton.style.display = 'block';
		// var optionButtons = document.getElementsByClassName('option-button');
			for (var i = 0; i < optionButtons.length; i++) {
				optionButtons[i].style.display = 'none';
			}

		targetHeader.style.display = 'none';
		optionsHeader.style.display = 'none';

		transitionPanel.style.display = 'block';
		transitionStageNum.innerText = nback + '-Back';

		var diagramPath = 'img/VWM_NbackDiagrams/VWM_Diagram_';
		switch(nback){
			case 0:
				transitionDiagram.src = diagramPath + '0Back.svg';
				break;
			case 1:
				transitionDiagram.src = diagramPath + '1Back.svg';
				break;
			case 2:
				transitionDiagram.src = diagramPath + '2Back.svg';
				break;
			case 3:
				transitionDiagram.src = diagramPath + '3Back.svg';
				break;
			default:
				transitionDiagram.src = 'img/VWM_NbackDiagrams/VWM_Diagram_0Back.svg';
		}
	}
	initScene();
	updateHelperText('trans');

	console.log('curTestIndex: ' + curTestIndex);
	curTestIndex = null;
	curSceneIndex = 0;
	lissagIndexArr = [];

	updateProgressBar();
}


function updateMemoriseFigure(){
		var newLassigGroupIndex = Math.floor(Math.random()*lissajousGroups.length);
		var groupExistsInNback = false;

		for (var i = 0; i < lissagIndexArr.length; i++) {
			if( lissagIndexArr[i].groupIndex === newLassigGroupIndex){
				groupExistsInNback = true;
				// console.log('groupExistsInNback');
			}
		};
		
		if(newLassigGroupIndex !== curLassijGroupIndex && !groupExistsInNback){ // && 
			var newLassijIndex = Math.floor(Math.random()*lissajousGroups[newLassigGroupIndex].length);
			tweenLissaj(lissajousGroups[newLassigGroupIndex][newLassijIndex]);
			
			$('.option-button').prop('disabled', true); //FIXME: below
			$('.option-button').toggleClass('disabled', true); //FIXME: wrong context to add this functionalty
			var animationDelay = setTimeout(function(){
				$('.option-button').prop('disabled', false); //FIXME: below
				$('.option-button').toggleClass('disabled', false); //FIXME: wrong context to add this functionalty
				testStartTime = performance.now();
			}, 2000); //needs to matched to tween animation period

			if(lissagIndexArr.length > nback)
				lissagIndexArr.shift();	
			lissagIndexArr.push({
				groupIndex: newLassigGroupIndex,
				lassigIndex: newLassijIndex 	
			});

			curLassijGroupIndex = newLassigGroupIndex;
			updateOptionImages();
		}
		else{
			updateMemoriseFigure();
		}
}

function updateOptionImages(){
	
	var curOptionImages = []; //store cur option images in here to prevent duplicates
	
	var curOptionWithTargetImage; //stores index of option button with target image
		curOptionWithTargetImage = Math.floor(Math.random()*optionButtons.length);
		optionButtons[curOptionWithTargetImage].children[0].src = lissajousSvgs[lissagIndexArr[0].groupIndex][lissagIndexArr[0].lassigIndex]; 
		optionButtons[curOptionWithTargetImage].setAttribute('data-lissaj-index',lissagIndexArr[0].lassigIndex);
		curOptionImages.push(lissagIndexArr[0].lassigIndex);

	for (var i = 0; i < optionButtons.length; i++) {
		if(i !== curOptionWithTargetImage){
			var randImgIndex = randOptionImgIndex();
			curOptionImages.push(randImgIndex);
			optionButtons[i].children[0].src = lissajousSvgs[lissagIndexArr[0].groupIndex][randImgIndex];
			optionButtons[i].setAttribute('data-lissaj-index',randImgIndex);
		}
	};
	
	function randOptionImgIndex(){
		var tempRandIndex = Math.floor(Math.random()*lissajousSvgs[lissagIndexArr[0].groupIndex].length);
		while(curOptionImages.indexOf(tempRandIndex) !== -1){ //while temp index already in the cur set
			tempRandIndex = Math.floor(Math.random()*lissajousSvgs[lissagIndexArr[0].groupIndex].length);
		}
		return tempRandIndex;
	}
}

function updateProgressBar(){
	var curProgressPercent = curTestIndex * (100/testPerStageCount);	
	testProgressBar.style.width = curProgressPercent + '%';
	trialCountText.innerText = (testPerStageCount - curTestIndex)+1 + " trials"; //+1 added for label  to state max @ 25 and min @ 1
}

function updateHelperText(sceneMode){
	if(sceneMode === 'mem'){
		targetHelperText.style.display = 'block';
		optionsHelperText.style.display = 'block';
		targetHelperText.innerHTML = 'Find this image in <span id="target-scenecount">'+ nback +' scenes</span> from now';
		optionsHelperText.innerHTML = 'No options to select yet, just memorise the image above';
		targetPanel.style.width = '250px';

	}else if(sceneMode === 'test'){
		targetHelperText.innerHTML = 'Nothing to memorise here, just select the image from <span id="target-scenecount">'+ nback +' scenes</span> ago in the options below';
		optionsHelperText.innerHTML = 'Find the image from <span id="options-scenecount">'+ nback +' scenes</span> ago in the images to the right';
		targetPanel.style.width = '100%';

	}else if(sceneMode === 'trans'){
		targetHelperText.style.display = 'none';
		optionsHelperText.style.display = 'none';
		targetPanel.style.width = '250px';

		if(nback === 0){
			transitionHelperText.innerHTML = "Find the <strong>Memorise</strong> ('M') image amongst the <strong>Options</strong> ('O') images in the <em>same scene<em>";
		}else if(nback === 1){
			transitionHelperText.innerHTML = "Find the <strong>Memorise</strong> ('M') image from <strong>"+ nback +" scene ago</strong> amongst the <strong>Options</strong> ('O') images";
		}else{
			transitionHelperText.innerHTML = "Find the <strong>Memorise</strong> ('M') image from <strong>"+ nback +" scenes ago</strong> amongst the <strong>Options</strong> ('O') images";
		}
	}else{
		targetHelperText.style.display = 'block';
		optionsHelperText.style.display = 'block';
		targetHelperText.innerHTML = 'Find this image in <span id="target-scenecount">'+ nback +' scenes</span> from now';	
		optionsHelperText.innerHTML = 'Find the image from <span id="options-scenecount">'+ nback +' scenes</span> ago in the images to the right';
	}
}