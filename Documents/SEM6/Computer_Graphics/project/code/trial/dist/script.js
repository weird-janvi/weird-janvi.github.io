var renderer;
var scene;
var camera;
var mesh;
var cube;
init();
animate();

function animate() {
	
	requestAnimationFrame ( animate );
	window.addEventListener("keydown", function(eee){
		if(eee.keyCode==38)
		{
			cube.translateX(0.01);
			console.log("pos", cube.position);
		}
	});

	mesh.rotation.x += 0.00;
	mesh.rotation.y += 0.00;
	// cube.rotation.x += 0.00;
	// cube.rotation.y += 0.00;
	// cube.position.x = 300;
	// cube.position.y = 200;
	mesh.position.x = -100;
	mesh.position.y = 200;

	//Render the scene
	renderer.render(scene, camera);
}
function moveup(obj)
{
	obj.position.y += 100;
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
	scene.add(mesh);
	
	
	var geometry = new THREE.PlaneGeometry( 1000, 1000, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0xcdb0df } );
	var floor = new THREE.Mesh( geometry, material );
	floor.material.side = THREE.DoubleSide;
	floor.rotation.x = 90;
	scene.add( floor ); 
}