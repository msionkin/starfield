function main() {
  var scene,
      camera,
      renderer,
      render,
      particles = [],
      totalPartCount = 3000,
      zPos = 2000,
      speed = 5;

  function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 0.1, zPos );
    // move the camera backwards (because default position is 0,0,0)
    camera.position.z = zPos;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    initParticles();

    window.addEventListener( 'resize', onWindowResize, false );

    render();
  }
  

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function Particle(){
    var geometry = new THREE.CircleGeometry( 2, 16 );
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
      particle.position.x = Math.random() * 3000 - 1500;
      particle.position.y = Math.random() * 3000 - 1500;
      particle.position.z = i;
      scene.add(particle);
      particles.push(particle);
    }
  }

  function updateParticles() {
    var i,
        particle;
    for (i = 0; i < particles.length; ++i) {
      particle = particles[i];
      if (particle.position.z >= zPos) {
        particle.position.z = -zPos;
      } else {
        particle.position.z += speed;
      }
    }
  }

  function updateCameraPosition(){
    //TODO: cyclically change camera position from
    // left to right
  }

  render = function () {
    requestAnimationFrame( render );

    updateParticles();
    updateCameraPosition();

    renderer.render(scene, camera);
  };

  init();
}

main();