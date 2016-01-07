//$(document).ready( function(){
    
    //creating sphere
    
    var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
    var ASPECT = WIDTH/HEIGHT, NEAR = 0.1, FAR =1000, VIEW_ANGLE = 45;
    var $container = $('#container');
    var renderer = new THREE.WebGLRenderer();
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var scene = new THREE.Scene();

    scene.add(camera);
    camera.position.z = 300;
    renderer.setSize(WIDTH, HEIGHT);
    $container.append(renderer.domElement);

    var radius = 40, segments = 50, rings = 50;
    var geometry = new THREE.SphereGeometry(radius,segments,rings);
    var material = new THREE.MeshPhongMaterial();
    var loader = new THREE.TextureLoader();
    loader.load('1.jpg',
        function ( texture ) {
            material.map = texture;
        },
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
        function ( xhr ) {
            console.log( 'An error happened' );
        }
    );
    var sphere = new THREE.Mesh( geometry, material);
    var a = new THREE.Vector3( 0, -1, 0 );
    sphere.translateOnAxis(a, 15);
    scene.add(sphere);

    window.addEventListener('resize', function() {
      WIDTH = window.innerWidth, HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
      renderer.render(scene,camera);
    });

    // create a point light
    var pointLight = new THREE.PointLight(0xFFFFFF);
    // set its position
    pointLight.position.x = 0;
    pointLight.position.y = 0;
    pointLight.position.z = 500;
    // add to the scene
    scene.add(pointLight);

/*    var render = function () {

        sphere.rotation.x += 0.1;
        sphere.rotation.y += 0.1;

        renderer.render(scene, camera);
    };
  */  
    $(window).load(function(){
        renderer.render(scene, camera);

    });
    
    //managing animations
    var x = [0,0.5,1,-0.3];
    var y = [0,0.1,-0.8,-0.4];
    var current=0;
    
    function animateSphere(a,b){
        console.log(a + " " + b);
        var count = 50;
        var xdist = x[b] - x[a], ydist = y[b] - y[a];
        var xdiff=xdist/count, ydiff=ydist/count;
        
        (function rotation(){
            count--;
            sphere.rotation.x += xdiff;
            sphere.rotation.y += ydiff;
            renderer.render(scene, camera);
            if(count!=0){
                requestAnimationFrame(rotation);   
            }
        })();
        
        current = b;
    }
    
    $('#p0').click(function(){
       animateSphere(current,0); 
    });

    $('#p1').click(function(){
       animateSphere(current,1); 
    });

    $('#p2').click(function(){
       animateSphere(current,2); 
    });

    $('#p3').click(function(){
       animateSphere(current,3); 
    });

//});