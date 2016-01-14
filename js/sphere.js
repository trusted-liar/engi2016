//$(document).ready( function(){
    
    //sidebar    

        
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
    loader.load('assets/main/map.png',
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
    //sphere.translateOnAxis(a, 15);
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
    var x = [0,0,0.1,-1];
    var y = [0,-3.1,-1.7,3.6];
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
        var x = $('.over-image .overlay');
        for(var i=0; i<x.length; i++){
                if($(x[i]).css("display")==="block"){
                $(x[i]).css("animation-duration", "0.5s");
                $(x[i]).css("animation-name", "popin-building");
                $(x[i]).fadeOut();
            }
        }
    }


    $('#landing').click(function(){
        removeImages();
        setTimeout(function(){
            animateSphere(current,0);
            setTimeout(function(){
                $('.overlay.landing').css("animation-duration","0.8s");
                $('#landing-i1').css("animation-name","popout-landing-1");
                $('.overlay.landing').fadeIn();
            },1000);
        },500);
    });

    $('#stage').click(function(){
        removeImages();
        setTimeout(function(){
            animateSphere(current,1);
            setTimeout(function(){
                $('.overlay.stage').css("animation-duration","1.5s");
                $('#stage-i1').css("animation-name","popout-stage-1");
                $('#stage-i2').css("animation-name","popout-stage-2");
                $('#stage-i3').css("animation-name","popout-stage-3");
                $('#stage-i4').css("animation-name","popout-stage-4");
                $('.overlay.stage').fadeIn();
                setTimeout(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-stage").show();
                    $(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-stage")[0]);
                }, 1500);
            },1000);
        },500);
    });

    $('#oat').click(function(){
        removeImages();
        setTimeout(function(){
            animateSphere(current,2);
            setTimeout(function(){
                $('.overlay.oat').css("animation-duration","1s");
                $('#oat-i1').css("animation-name","popout-oat-1");
                $('#oat-i2').css("animation-name","popout-oat-2");
                $('#oat-i3').css("animation-name","popout-oat-3");
                $('#oat-i4').css("animation-name","popout-oat-4");
                $('.overlay.oat').fadeIn();
                setTimeout(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-oat").show();
                    $(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-oat")[0]);
                }, 1500);
            },1000);
        },500);
    });

    $('#audi').click(function(){
        removeImages();
        setTimeout(function(){
            animateSphere(current,3);
            setTimeout(function(){
                $('.overlay.audi').css("animation-duration","1.5s");
                $('#audi-i1').css("animation-name","popou");
                $('.overlay.audi').fadeIn();
/*                setTimeout(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-audi").show();
                    $(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-audi")[0]);
                }, 1500);*/
            },1000);
        },500);
    });

//});
