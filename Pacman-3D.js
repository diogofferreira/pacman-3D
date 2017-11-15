//----------------------------------------------------------------------------
//
// Global Variables
//

var gl = null; // WebGL context

var shaderProgram = null;

var triangleVertexPositionBuffer = null;
	
var triangleVertexColorBuffer = null;

var floorVertexPositionBuffer = null;
	
var floorVertexColorBuffer = null;

// Global transformations

globalTz = -30.0;

globalXX = 90.0;

globalYY = 0.0;

// The local transformation parameters

// The translation vector

var tx = 0.0;

var ty = 0.0;

var tz = 0.0;

// The rotation angles in degrees

var angleXX = 0.0;

var angleYY = 0.0;

var angleZZ = 0.0;

// The scaling factors

var sx = 0.5;

var sy = 0.5;

var sz = 0.5;

// For storing the vertices defining the triangles

var vertices = [

		// FRONT FACE
		 
		-1.00, -1.00,  1.00,
		 
		 1.00, -1.00,  1.00,
		 
		 1.00,  1.00,  1.00,

		 
		 1.00,  1.00,  1.00,
		 
		-1.00,  1.00,  1.00,
		 
		-1.00, -1.00,  1.00,
		
		// TOP FACE
		
		-1.00,  1.00,  1.00,
		 
		 1.00,  1.00,  1.00,
		 
		 1.00,  1.00, -1.00,

		 
		 1.00,  1.00, -1.00,
		 
		-1.00,  1.00, -1.00,
		 
		-1.00,  1.00,  1.00,
		
		// BOTTOM FACE 
		
		-1.00, -1.00, -1.00,
		 
		 1.00, -1.00, -1.00,
		 
		 1.00, -1.00,  1.00,

		 
		 1.00, -1.00,  1.00,
		 
		-1.00, -1.00,  1.00,
		 
		-1.00, -1.00, -1.00,
		
		// LEFT FACE 
		
		-1.00,  1.00,  1.00,
		 
		-1.00, -1.00, -1.00,

		-1.00, -1.00,  1.00,
		 
		 
		-1.00,  1.00,  1.00,
		 
		-1.00,  1.00, -1.00,
		 
		-1.00, -1.00, -1.00,
		
		// RIGHT FACE 
		
		 1.00,  1.00, -1.00,
		 
		 1.00, -1.00,  1.00,

		 1.00, -1.00, -1.00,
		 
		 
		 1.00,  1.00, -1.00,
		 
		 1.00,  1.00,  1.00,
		 
		 1.00, -1.00,  1.00,
		
		// BACK FACE 
		
		-1.00,  1.00, -1.00,
		 
		 1.00, -1.00, -1.00,

		-1.00, -1.00, -1.00,
		 
		 
		-1.00,  1.00, -1.00,
		 
		 1.00,  1.00, -1.00,
		 
		 1.00, -1.00, -1.00,			 
];

// And their colour

var colors = [

		 // FRONT FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 // TOP FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 			 
		 // BOTTOM FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 // LEFT FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 			 
		 // RIGHT FACE
		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,

		 	
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 
		 1.00,  0.00,  1.00,
		 			 
		 			 
		 // BACK FACE
		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,

		 	
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,
		 
		 1.00,  0.00,  0.00,			 			 
];

//----------------------------------------------------------------------------
//
// The WebGL code
//

//----------------------------------------------------------------------------
//
//  Rendering
//

// Handling the Vertex and the Color Buffers

function initCubeBuffer() {	
	
	// Coordinates
		
	triangleVertexPositionBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexPositionBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
	triangleVertexPositionBuffer.itemSize = 3;
	triangleVertexPositionBuffer.numItems = vertices.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 
			triangleVertexPositionBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
	
	// Colors
		
	triangleVertexColorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexColorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
	triangleVertexColorBuffer.itemSize = 3;
	triangleVertexColorBuffer.numItems = colors.length / 3;			

	// Associating to the vertex shader
	
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 
			triangleVertexColorBuffer.itemSize, 
			gl.FLOAT, false, 0, 0);
}

//----------------------------------------------------------------------------

//  Drawing the model

function drawModel( angleXX, angleYY, angleZZ, 
					sx, sy, sz,
					tx, ty, tz,
					mvMatrix,
					primitiveType,
					buffer ) {


    // Pay attention to transformation order !!
    
	mvMatrix = mult( mvMatrix, translationMatrix( tx, ty, tz ) );
						 
	mvMatrix = mult( mvMatrix, rotationZZMatrix( angleZZ ) );
	
	mvMatrix = mult( mvMatrix, rotationYYMatrix( angleYY ) );
	
	mvMatrix = mult( mvMatrix, rotationXXMatrix( angleXX ) );

	mvMatrix = mult( mvMatrix, scalingMatrix( sx, sy, sz ) );
						 
	// Passing the Model View Matrix to apply the current transformation
	
	var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
	
	gl.uniformMatrix4fv(mvUniform, false, new Float32Array(flatten(mvMatrix)));
	
	// Drawing the contents of the vertex buffer

	gl.drawArrays(primitiveType, 0, buffer.numItems);
}

//----------------------------------------------------------------------------

// Field Handling


// w -> wall; f -> food; s -> super-food
var w = 'w';
var f = 'f';
var s = 's';
var field_structure = [
	[w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w],
	[w,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,f,w],
	[w,f,w,w,w,w,w,w,f,w,f,w,w,w,w,w,w,f,w], 
	[w,f,f,f,f,w,f,f,f,w,f,f,f,w,f,f,f,f,w], 
	[w,w,f,w,f,w,f,w,w,w,w,w,f,w,f,w,f,w,w], 
	[w,f,f,w,f,f,f,f,f,s,f,f,f,f,f,w,f,f,w], 
	[w,f,w,w,f,w,w,w,f,w,f,w,w,w,f,w,w,f,w], 
	[w,f,f,f,f,f,f,f,f,w,f,f,f,f,f,f,f,f,w], 
	[w,f,w,w,f,w,f,w,w,w,w,w,f,w,f,w,w,f,w], 
	[w,f,f,s,f,w,f,f,f,f,f,f,f,w,f,f,f,f,w], 
	[w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w,w]
];

var field = {
	structure: 	[],
	height: 	0,	
	width: 		0,
	xBlockSize: 1.0,
	zBlockSize: 1.0,
	speed:      0.05,
	init: function(structure, height, width){
		this.structure 	= structure;
		this.height = height;
		this.width 	= width;
	}
}

var score = 0;
var gameOver = false;

var pacman;
var ghosts = [];

function fieldBlock(type, xPos, yPos, zPos) {
	this.type = type;
	this.x = xPos;
	this.y = yPos;
	this.z = zPos;
	this.moves = [];   	    // Possible moves on that block
}

function character(id) {
	this.x = 0.0;
	this.z = 0.0;
	this.xDirection = 0.0;
	this.zDirection = 0.0;
	this.nextDirection = {};
	this.key = -1.0;
	this.currentBlock = {};	// Reference to the current block
	this.id = id;			// Character identificator

	//Initialize parameters for character
	this.init = function(x, z) {
		
		var i = parseInt(x + (field.width / 2));
		var j = parseInt(z + (field.height / 2));

		this.x = field.structure[j][i].x;
		this.z = field.structure[j][i].z;

		this.currentBlock = field.structure[j][i];
	};

	this.updateDirection = function(moveX, moveZ, key) {
		this.nextDirection['x'] = moveX;
		this.nextDirection['z'] = moveZ;
		this.nextDirection['key'] = key;
	};

	this.updatePosition = function() {
		this.currentBlock = field.structure[this.currentBlock.z + this.zDirection][this.currentBlock.x + this.xDirection];
	};
}

function randomCoordinates() {
	var x, z;

	do {
		x = Math.floor(Math.random() * field.width);
	    z = Math.floor(Math.random() * field.height);
	} while(field.structure[z][x].type == 'w')

	return {'x': x - (field.width / 2), 'z': z - (field.height / 2)}
}

function initField() {
	var createdField = createFieldStructure(field_structure);
	var height = createdField.length;
	var width = createdField[0].length;

	// Adjust field position (center in 0,0)
	tx = width / 2;
	tz = height / 2;

	field.init(createdField, height, width);
	
	// Compute all possible movements
	computeAllMoves(field_structure, field.structure);

	// Create pacman and render him in the center of the field
	pacman = new character('Pac');
	pacman.init(0.0, 0.0);
	// Eat the food under him
	pacman.currentBlock.type = '';

	// Create ghosts and render them in a random position
	ghosts.push(new character('G1'));
	ghosts.push(new character('G2'));
	ghosts.push(new character('G3'));

	for (var i=0; i<ghosts.length; i++){
		var coordinates = randomCoordinates();
		ghosts[i].init(coordinates['x'], coordinates['z']);
	}
}

function createFieldStructure(structure){	
	var width = structure[0].length;
	var height = structure.length;
	var newField = [];
	var line = [];

	for (var i = 0; i < height; i++) {        		
		for (var j = 0; j < width; j++) {
			line.push(new fieldBlock(structure[i][j], j, 0, i));
		}
		newField.push(line);
		line = [];
	}
	return newField;
}

function computeAllMoves(structure, field) {
	var width = structure[0].length;
	var height = structure.length;

	for (var i = 0; i < height; i++) {        		
		for (var j = 0; j < width; j++) {
			// Up block
			if (i-1 >= 0) {
				var up = field[i-1][j];
				//Check if the block is food
				if (up.type == 'f' || up.type == 's')
					field[i][j].moves[38] = up;
			}
			// Down block
			if (i+1 < height) {
				var down = field[i+1][j];
				//Check if the block is food
				if (down.type == 'f' || down.type == 's')
					field[i][j].moves[40] = down;
			}
			// Left block
			if (j-1 >= 0) {
				var left = field[i][j-1];
				//Check if the block is food
				if (left.type == 'f' || left.type == 's')
					field[i][j].moves[37] = left;
			}
			// Right block
			if (j+1 < width){
				var right = field[i][j+1];
				//Check if the block is food
				if (right.type == 'f' || right.type == 's')
					field[i][j].moves[39] = right;
			}  			
		}
	}
}

function endGame() {
	gameOver = true;

	// Disable movements
	pacman.updateDirection(0, 0, pacman.key);
	for(var i = 0; i < ghosts.length; i++)
		ghosts[i].updateDirection(0, 0, ghosts[i].key);

	document.getElementById('score').innerHTML = "";
	document.getElementById('game-over').innerHTML = "GAME OVER.\n Score : " + score;
}

function movePacman() {

	// Walk while not crashing
	if (pacman.currentBlock.moves[pacman.key] != undefined) {
		pacman.x += pacman.xDirection * field.speed;
		pacman.z += pacman.zDirection * field.speed;
	}

	// Update current position, if possible
	if (parseFloat(pacman.x.toFixed(2)) % 1.0 == 0 && parseFloat(pacman.z.toFixed(2)) % 1.0 == 0) {
		
		// Only update the position if it is a valid move
		if (pacman.currentBlock.moves[pacman.key] != undefined)
			pacman.updatePosition();
		
		// Change to next direction, if possible
		if (Object.keys(pacman.nextDirection).length !== 0 && pacman.currentBlock.moves[pacman.nextDirection['key']] != undefined) {
			pacman.xDirection = pacman.nextDirection['x'];
			pacman.zDirection = pacman.nextDirection['z'];
			pacman.key = pacman.nextDirection['key'];
			pacman.nextDirection = {}; 
		} 

		// Stop if it is an invalid move
		if (pacman.currentBlock.moves[pacman.key] == undefined)
			pacman.updateDirection(0, 0, pacman.key);
	}
	
	// Eat the food
	if (pacman.currentBlock.type == 'f') {
		pacman.currentBlock.type = '';
		score++;
	} else if (pacman.currentBlock.type == 's') {
		pacman.currentBlock.type = '';
		score += 10;
	}
}

function moveGhost(ghost) {

	var possibleMoves = [{
		'x' : 1,
		'z' : 0,
		'key': 39
	},{
		'x' : -1,
		'z' : 0,
		'key': 37
	},{
		'x' : 0,
		'z' : 1,
		'key': 40
	},{
		'x' : 0,
		'z' : -1,
		'key': 38
	}];

	// Walk while not crashing
	if (ghost.currentBlock.moves[ghost.key] != undefined) {
		ghost.x += ghost.xDirection * field.speed;
		ghost.z += ghost.zDirection * field.speed;
	}

	// Check collisions with pacman
	if (Math.abs(ghost.x.toFixed(1)-pacman.x.toFixed(1)) < field.xBlockSize && Math.abs(ghost.z.toFixed(1)-pacman.z.toFixed(1)) < field.zBlockSize)
		endGame();

	// Update current position, if possible
	if (parseFloat(ghost.x.toFixed(2)) % 1.0 == 0 && parseFloat(ghost.z.toFixed(2)) % 1.0 == 0) {
		
		// Only update the position if it is a valid move
		if (ghost.currentBlock.moves[ghost.key] != undefined)
			ghost.updatePosition();

		// Stop if it is an invalid move
		if (ghost.currentBlock.moves[ghost.key] == undefined) {
			var newDirection = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
			ghost.xDirection = newDirection['x'];
			ghost.zDirection = newDirection['z'];
			ghost.key = newDirection['key'];
		}
	}
}
//----------------------------------------------------------------------------

//  Drawing the 3D scene

function drawScene() {
	
	// Clear color buffer
	gl.clear(gl.COLOR_BUFFER_BIT);
	
	drawField();

	drawChar(pacman);

	for(var i = 0; i < ghosts.length; i++)
		drawChar(ghosts[i]);

	// Update page's score
	if (!gameOver)
		document.getElementById('score').innerHTML = "Score : " + score;
}

function drawChar(character) {

	initCubeBuffer();
	
	var pMatrix;
	
	var mvMatrix = mat4();
		
	// Computing the perspective matrix
	
	pMatrix = perspective( 45, 1, 0.05, 50 );
	
	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	mvMatrix = translationMatrix( 0, 0, globalTz );
	mvMatrix = mult( mvMatrix, rotationYYMatrix( globalYY ) );
	mvMatrix = mult( mvMatrix, rotationXXMatrix( globalXX ) );

	// Instantianting the current model
	drawModel( angleXX, angleYY, angleZZ, 
	           sx, sy, sz,
	           character.x - (field.width / 2), ty, character.z - (field.height / 2),
	           mvMatrix,
	           primitiveType,
	           triangleVertexPositionBuffer );
}

function drawField() {
	initCubeBuffer();

	var pMatrix;
			
	// Computing the perspective matrix
	
	pMatrix = perspective( 45, 1, 0.05, 50 );

	// Passing the Projection Matrix to apply the current projection
	
	var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
	
	gl.uniformMatrix4fv(pUniform, false, new Float32Array(flatten(pMatrix)));

	mvMatrix = translationMatrix( 0, 0, globalTz );
	mvMatrix = mult( mvMatrix, rotationYYMatrix( globalYY ) );
	mvMatrix = mult( mvMatrix, rotationXXMatrix( globalXX ) );
	
	for (var i = 0; i < field.height; i++) {
		for (var j = 0; j < field.width; j++) {
			if (field.structure[i][j].type == 'w') {
				drawModel( angleXX, angleYY, angleZZ, 
				           sx, sy, sz,
				           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
				           mvMatrix,
				           primitiveType,
				           triangleVertexPositionBuffer );
			} else if (field.structure[i][j].type == 'f') {
				scale = 0.4;
				drawModel( angleXX, angleYY, angleZZ, 
				           sx - scale, sy - scale, sz - scale,
				           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
				           mvMatrix,
				           primitiveType,
				           triangleVertexPositionBuffer );
			} else if (field.structure[i][j].type == 's') {
				scale = 0.3;
				drawModel( angleXX, angleYY, angleZZ, 
				           sx - scale, sy - scale, sz - scale,
				           (j * field.xBlockSize) - tx, 0, (i * field.xBlockSize * field.zBlockSize) - tz,
				           mvMatrix,
				           primitiveType,
				           triangleVertexPositionBuffer );
			}
		}
	}	
}

// Timer

function tick() {

	requestAnimFrame(tick);
	
	movePacman();

	for(var i = 0; i < ghosts.length; i++)
		moveGhost(ghosts[i]);

	// Render the viewport
	drawScene(); 
}

//----------------------------------------------------------------------------

function setEventListeners(){

	var moving = false;
	var xPos = 0;
	var yPos = 0;

	// Handle yys rotation with mouse movement
	document.addEventListener("mousedown", function(event) {
		xPos = event.pageX;
		yPos = event.pageY;
		moving = true;
	});

	document.addEventListener('mousemove', function(event){ 
		if(moving){
			globalYY += (xPos - event.pageX) * 0.05;
			globalXX += (yPos - event.pageY) * 0.05;
			drawScene(); 
		}
	});

	document.addEventListener('mouseup', function(event){ 
	  	moving = false; 
	});

	// Handle zoom with mouse scroll
	document.addEventListener('mousewheel',function(event){
		globalTz += event.deltaY > 0 ? 1 : -1;
		drawScene(); 
	});

	// Pacman Movement
	document.addEventListener("keydown", function(event){
		
		// Getting the pressed key 
		var key = event.keyCode;

		// Disable movements when game over
		if (gameOver)
			key = -1;

		switch(key){
			// Left
			case 37 :
				pacman.updateDirection(-1, 0, key);
				break;
			// Up
			case 38 :
				pacman.updateDirection(0, -1, key);
				break;
			// Right
			case 39 :
				pacman.updateDirection(1, 0, key);
				break;
			// Down
			case 40 : 
				pacman.updateDirection(0, 1, key);
				break;
		}
	});
}

//----------------------------------------------------------------------------
//
// WebGL Initialization
//

function initWebGL( canvas ) {
	try {
		
		// Create the WebGL context
		
		// Some browsers still need "experimental-webgl"
		
		gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
		
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

		// Enable face culling and depth test
		
		gl.enable( gl.CULL_FACE );
		gl.enable( gl.DEPTH_TEST );

		// Drawing the triangles defining the model
		
		primitiveType = gl.TRIANGLES;
			
	} catch (e) {
	}
	if (!gl) {
		alert("Could not initialise WebGL, sorry! :-(");
	}        
}

//----------------------------------------------------------------------------

function runWebGL() {
	
	var canvas = document.getElementById("my-canvas");
	
	initWebGL( canvas );

	shaderProgram = initShaders( gl );
	
	setEventListeners();
	
	// Transform cube into sphere

	/*centroidRefinement( vertices, colors, 6 );
    
 	moveToSphericalSurface( vertices );*/
	
    initField();
	
	drawScene();

	tick();   
}