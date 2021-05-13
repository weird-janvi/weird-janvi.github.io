import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';




function main()
{
	const canvas = document.querySelector('#c');
	const renderer = new THREE.WebGLRenderer({canvas});

	const fov = 50;
	const aspect = 2;  // the canvas default
	const near = 0.1;
	const far = 1000;
	const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(300, 0, 450);
	camera.up.set(0, 0, 1);
	camera.lookAt(0, 0, 0);

	const scene = new THREE.Scene();
	const objects = [];

	// Ground
	var plane_geometry = new THREE.PlaneGeometry( 400, 800, 1, 1 );
	var ground_material = new THREE.MeshBasicMaterial( { color: 0x00f2ff } );
	var ground_mesh = new THREE.Mesh( plane_geometry, ground_material );
	ground_mesh.material.side = THREE.DoubleSide;
	// ground_mesh.rotation.x = 90;
	scene.add( ground_mesh ); 
	objects.push(ground_mesh);




	function resizeRendererToDisplaySize(renderer) {
		const canvas = renderer.domElement;
		const width = canvas.clientWidth;
		const height = canvas.clientHeight;
		const needResize = canvas.width !== width || canvas.height !== height;
		if (needResize) {
		  renderer.setSize(width, height, false);
		}
		return needResize;
	  }


	function render(time) {
	
		if (resizeRendererToDisplaySize(renderer)) {
		  const canvas = renderer.domElement;
		  camera.aspect = canvas.clientWidth / canvas.clientHeight;
		  camera.updateProjectionMatrix();
		}
	
		renderer.render(scene, camera);
	
		requestAnimationFrame(render);
	  }
	
	  requestAnimationFrame(render);
}

main();