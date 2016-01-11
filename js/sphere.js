$(document).ready( function(){
    
    //creating sphere
    
    var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
    var ASPECT = WIDTH/HEIGHT, NEAR = 0.1, FAR =1000, VIEW_ANGLE = 45;
    var $container = $('#container');
    var renderer = new THREE.WebGLRenderer({alpha: true});
    var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    var scene = new THREE.Scene();

    scene.add(camera);
    camera.position.z = 300;
    renderer.setSize(WIDTH, HEIGHT);
    $container.append(renderer.domElement);

    var radius = 60, segments = 100, rings = 100;
    var geometry = new THREE.SphereGeometry(radius,segments,rings);
    var material = new THREE.MeshPhongMaterial();
    var loader = new THREE.TextureLoader();
    loader.load('assets/1.jpg',
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

    $(window).load(function(){
        renderer.render(scene, camera);

    });
    
    //managing animations
    var x = [0,0.5,1,-0.3];
    var y = [0,0.1,-0.8,-0.4];
    var current=0;
    var time = 20;

    function CB(t){
        return Math.pow(1-t, 3) + Math.pow(1-t, 2)*t + (1-t)*Math.pow(t, 2) + Math.pow(t, 3);
    }
    
    function animateSphere(a,b){
        //console.log(a + " " + b);
        var t = 0.025;
        var count = 40;
        var xdist = x[b] - x[a], ydist = y[b] - y[a];
        var xdiff=xdist/count, ydiff=ydist/count;
        
        (function rotation(){
            count--;
            sphere.rotation.x += xdiff;
            sphere.rotation.y += ydiff;
            setTimeout(function(){
                renderer.render(scene, camera);
                if(count!=0){
                    requestAnimationFrame(rotation);
                t += 0.025;   
                }
            }, CB(t)*time);
        })();
        
        current = b;
    }
    
    function removeImages(){
        var x = $('img.overlay');
        for(var i=0; i<x.length; i++){
                if($(x[i]).css("display")==="block"){
                $(x[i]).css("animation-duration", "0.5s");
                $(x[i]).css("animation-name", "popin");
                $(x[i]).fadeOut();
            }
        }
    }
    
    $('#p0').click(function(){
        removeImages();
        animateSphere(current,0);
        setTimeout(function(){
            $('#i5').css("animation-duration","1.5s");
            $('#i5').css("animation-name","popout-1");
            $('#i5').fadeIn();
        },1000);
    });

    $('#p1').click(function(){
        removeImages();
        setTimeout(function(){
            animateSphere(current,1);
            setTimeout(function(){
                $('#i5').css("animation-duration","1.5s");
                $('#i5').css("animation-name","popout-1");
                $('#i5').fadeIn();
                setTimeout(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-1").show();
                    $(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-1")[0]);
                }, 1500);
            },1000);
        },500);
    });

    $('#p2').click(function(){
        removeImages();
        animateSphere(current,2); 
        setTimeout(function(){
            $("#event-list-overlay").fadeIn();
            $("#timeline-1").show();
            $(".timeline .bg").addClass("timeline-popin");
            eventAnimate($("#timeline-1")[0]);
        }, 1000);
    });

    $('#p3').click(function(){
        removeImages();
        animateSphere(current,3); 
        setTimeout(function(){
            $("#event-list-overlay").fadeIn();
            $("#timeline-1").show();
            $(".timeline .bg").addClass("timeline-popin");
            eventAnimate($("#timeline-1")[0]);
        }, 1000);
    });

});