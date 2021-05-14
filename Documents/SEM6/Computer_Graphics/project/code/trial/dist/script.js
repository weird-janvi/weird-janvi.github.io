var renderer;
var scene;
var camera;
var mesh;
var cube;
var collisions = [];
init();
pick();

animate();

function animate() {
	
	requestAnimationFrame ( animate );
	
	moveRight(mesh);
	moveLeft(cube);
	moveUp(cube);
	moveDown(cube);
	
	mesh.rotation.x += 0.00;
	mesh.rotation.y += 0.00;
	// cube.rotation.x += 0.00;
	// cube.rotation.y += 0.00;
	// cube.position.x = 300;
	// cube.position.y = 200;
	

	//Render the scene
	renderer.render(scene, camera);
}
function moveRight(obj)
{
	window.addEventListener("keydown", function(eee){
		if(eee.keyCode==39)
		{
			obj.translateX(0.01);
			console.log("pos", obj.position);
		}
	});
}
function moveLeft(obj)
{
	window.addEventListener("keydown", function(eee){
		if(eee.keyCode==37)
		{
			obj.translateX(-0.01);
			console.log("pos", obj.position);
		}
	});
}
function moveUp(obj)
{
	window.addEventListener("keydown", function(eee){
		if(eee.keyCode==38)
		{
			obj.translateY(0.01);
			console.log("pos", obj.position);
		}
	});
}
function moveDown(obj)
{
	window.addEventListener("keydown", function(eee){
		if(eee.keyCode==40)
		{
			obj.translateY(-0.01);
			console.log("pos", obj.position);
		}
	});
}

function init() {
	
	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(window.innerWidth, window.innerHeight);
	
	document.getElementById('container').appendChild(renderer.domElement);
	
	//Scene init
	scene = new THREE.Scene();
	
	//Camera init
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 0, 1000);
	scene.add(camera);
	
	//Create a sphere
	var geometry = new THREE.SphereGeometry( 200, 20, 20);
	var appearence = new THREE.MeshBasicMaterial ({
		color: 0xf2569a,
		wireframe: true
	});
	const boxWidth = 200;
	const boxHeight = 200;
	const boxDepth = 200;
	const geometry1 = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

	const material1 = new THREE.MeshBasicMaterial({color: 0x44aa88});  // greenish blue

	cube = new THREE.Mesh(geometry1, material1);
	cube.position.x = 300;
	cube.position.y = 200;
	scene.add(cube);
	//Add the sphere
	mesh = new THREE.Mesh(geometry, appearence);
	mesh.position.x = -100;
	mesh.position.y = 200;
	scene.add(mesh);
	
	
	var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xcdb0df } );
	var floor = new THREE.Mesh( geometry, material );
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 90;
	scene.add( floor ); 
}

function detectCollisions() {
	// Get the user's current collision area.
	var bounds = {
	  xMin: rotationPoint.position.x - box.geometry.parameters.width / 2,
	  xMax: rotationPoint.position.x + box.geometry.parameters.width / 2,
	  yMin: rotationPoint.position.y - box.geometry.parameters.height / 2,
	  yMax: rotationPoint.position.y + box.geometry.parameters.height / 2,
	  zMin: rotationPoint.position.z - box.geometry.parameters.width / 2,
	  zMax: rotationPoint.position.z + box.geometry.parameters.width / 2,
	};
	
	// Run through each object and detect if there is a collision.
	for ( var index = 0; index < collisions.length; index ++ ) {
  
	  if (collisions[ index ].type == 'collision' ) {
		if ( ( bounds.xMin <= collisions[ index ].xMax && bounds.xMax >= collisions[ index ].xMin ) &&
		   ( bounds.yMin <= collisions[ index ].yMax && bounds.yMax >= collisions[ index ].yMin) &&
		   ( bounds.zMin <= collisions[ index ].zMax && bounds.zMax >= collisions[ index ].zMin) ) {
		  // We hit a solid object! Stop all movements.
		  stopMovement();
  
		  // Move the object in the clear. Detect the best direction to move.
		  if ( bounds.xMin <= collisions[ index ].xMax && bounds.xMax >= collisions[ index ].xMin ) {
			// Determine center then push out accordingly.
			var objectCenterX = ((collisions[ index ].xMax - collisions[ index ].xMin) / 2) + collisions[ index ].xMin;
			var playerCenterX = ((bounds.xMax - bounds.xMin) / 2) + bounds.xMin;
			var objectCenterZ = ((collisions[ index ].zMax - collisions[ index ].zMin) / 2) + collisions[ index ].zMin;
			var playerCenterZ = ((bounds.zMax - bounds.zMin) / 2) + bounds.zMin;
  
			// Determine the X axis push.
			if (objectCenterX > playerCenterX) {
			  rotationPoint.position.x -= 1;
			} else {
			  rotationPoint.position.x += 1;
			}
		  }
		  if ( bounds.zMin <= collisions[ index ].zMax && bounds.zMax >= collisions[ index ].zMin ) {
			// Determine the Z axis push.
			if (objectCenterZ > playerCenterZ) {
			rotationPoint.position.z -= 1;
			} else {
			  rotationPoint.position.z += 1;
			}
		  }
		}
	  }
	}
  }
  
  /**
   * Calculates collision detection parameters.
   */
  function calculateCollisionPoints( mesh, scale, type = 'collision' ) { 
	// Compute the bounding box after scale, translation, etc.
	var bbox = new THREE.Box3().setFromObject(mesh);
   
	var bounds = {
	  type: type,
	  xMin: bbox.min.x,
	  xMax: bbox.max.x,
	  yMin: bbox.min.y,
	  yMax: bbox.max.y,
	  zMin: bbox.min.z,
	  zMax: bbox.max.z,
	};
	
	collisions.push( bounds );
  }