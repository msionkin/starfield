function main() {
  var scene,
      camera,
      renderer,
      render,
      particles =[],
      totalPartCount = 1000,
      zPos = 1000;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  // move the camera backwards (because default position is 0,0,0)
  camera.position.z = zPos;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  function Particle(){
    var geometry = new THREE.CircleGeometry( 5, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var circle = new THREE.Mesh( geometry, material );
    return circle;
  }

  function initParticles() {
    var i,
        particle,
        step = Math.ceil(2 * zPos / totalPartCount);
    for (i = -zPos; i < zPos; i+=step) {
      particle = Particle();
      particle.position.x = Math.random() * 1000 - 500;
      particle.position.y = Math.random() * 1000 - 500;
      particle.position.z = i;
      //particle.scale.x = particle.scale.y = 10;
      scene.add(particle);
      particles.push(particle);
    }
  }

  function updateParticles() {
    
  }

  render = function () {
    requestAnimationFrame( render );

    updateParticles();
    
    renderer.render(scene, camera);
  };

  render();
}

main();