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
      positionTooltip();
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
        
        $(".myTooltip").fadeOut()
    }

    document.getElementById('#home').addEventListener('click',getLanding);
    document.getElementById('#oat').addEventListener('click',getOAT);
    document.getElementById('#audi').addEventListener('click',getAudi);
    document.getElementById('#stage').addEventListener('click',getStage);

    $('#pin-audi').click(function(){getAudi();});
    $('#pin-oat').click(function(){getOAT();});
    $('#pin-stage').click(function(){getStage();});
    $('#pin-landing').click(function(){getLanding();});

    $('#tooltip-audi').click(function(){getAudi();});
    $('#tooltip-oat').click(function(){getOAT();});
    $('#tooltip-stage').click(function(){getStage();});
    $('#tooltip-gate').click(function(){getLanding();});

    document.getElementById('pin-audi').addEventListener("mouseenter",function(){
        $('#tooltip-audi').toggleClass("myTooltip-hover");
    });
    document.getElementById('pin-audi').addEventListener("mouseleave",function(){
        $('#tooltip-audi').toggleClass("myTooltip-hover");
    });

    document.getElementById('pin-oat').addEventListener("mouseenter",function(){
        $('#tooltip-oat').toggleClass("myTooltip-hover");
    });
    document.getElementById('pin-oat').addEventListener("mouseleave",function(){
        $('#tooltip-oat').toggleClass("myTooltip-hover");
    });

    document.getElementById('pin-stage').addEventListener("mouseenter",function(){
        $('#tooltip-stage').toggleClass("myTooltip-hover");
    });
    document.getElementById('pin-stage').addEventListener("mouseleave",function(){
        $('#tooltip-stage').toggleClass("myTooltip-hover");
    });

    document.getElementById('pin-landing').addEventListener("mouseenter",function(){
        $('#tooltip-gate').toggleClass("myTooltip-hover");
    });
    document.getElementById('pin-landing').addEventListener("mouseleave",function(){
        $('#tooltip-gate').toggleClass("myTooltip-hover");
    });

    function getLanding(){
        updatePins("landing");
        removeImages();
        setTimeout(function(){
            animateSphere(current,0);
            setTimeout(function(){
                
                //handling images
                $('.overlay.landing').css("animation-duration","0.8s");
                $('#landing-i1').css("animation-name","popout-landing-1");
                $('.overlay.landing').fadeIn();
            },1000);
        },500);
    }

    function getStage(){
        updatePins("stage");
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
                    $("#timeline-stage").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-stage")[0]);
                }, 1500);
            },1000);
        },500);        
    }

    function getOAT(){
        removeImages();
        updatePins("oat");
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
                    $("#timeline-oat").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-oat")[0]);
                }, 1500);
            },1000);
        },500);        
    }

    function getAudi(){
        removeImages();
        updatePins("audi");
        setTimeout(function(){
            animateSphere(current,3);
            setTimeout(function(){
                //handling the buildings
                $('.overlay.audi').css("animation-duration","1.5s");
                $('#audi-i1').css("animation-name","popout-audi-1");
                $('#audi-i2').css("animation-name","popout-audi-2");
                $('#audi-i3').css("animation-name","popout-audi-3");
                $('#audi-i4').css("animation-name","popout-audi-4");
                $('.overlay.audi').fadeIn();
                setTimeout(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-audi").show();
                    $("#timeline-audi").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-audi")[0]);
                }, 1500);
            },1000);
        },500);        
    }

    $("#audi-i1").click(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-audi").show();
                    $("#timeline-audi").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-audi")[0]);
    });
    $("#stage-i4").click(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-stage").show();
                    $("#timeline-stage").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-stage")[0]);
    });
    $("#oat-i1").click(function(){
                    $("#event-list-overlay").fadeIn();
                    $("#timeline-oat").show();
                    $("#timeline-oat").find(".timeline .bg").addClass("timeline-popin");
                    eventAnimate($("#timeline-oat")[0]);
    });

var pinCurrent = "landing";
function updatePins(pinNext){
    $(".pinup").css("transition-duration","0.5s");    
    if(pinCurrent === "landing"){
        $("#pin-oat").addClass("zoomout-landing-oat");
        $("#pin-stage").addClass("zoomout-landing-stage");
        $("#pin-audi").addClass("zoomout-landing-audi");
    }
    else if(pinCurrent === "oat"){
        $("#pin-landing").addClass("zoomout-oat-landing");
        $("#pin-stage").addClass("zoomout-oat-stage");
        $("#pin-audi").addClass("zoomout-oat-audi");        
    }
    else if(pinCurrent === "stage"){
        $("#pin-oat").addClass("zoomout-stage-oat");
        $("#pin-landing").addClass("zoomout-stage-landing");
        $("#pin-audi").addClass("zoomout-stage-audi");
    }
    else{
        $("#pin-oat").addClass("zoomout-audi-oat");
        $("#pin-stage").addClass("zoomout-audi-stage");
        $("#pin-landing").addClass("zoomout-audi-landing");
    }
    
    
    setTimeout(function(){
        setTimeout(positionTooltip,1500);
        
        $(".pinup").css("transition-duration","0s");    

        if(pinNext === "landing"){
            document.getElementById("pin-landing").className = "pinup out-of-box";
            document.getElementById("pin-oat").className = "pinup zoomout-landing-oat";
            document.getElementById("pin-audi").className = "pinup zoomout-landing-audi";
            document.getElementById("pin-stage").className = "pinup zoomout-landing-stage";

            setTimeout(function(){
                $(".pinup").css("transition-duration","0.5s");

                document.getElementById("pin-oat").className = "pinup pin-landing-oat";
                document.getElementById("pin-audi").className = "pinup pin-landing-audi";
                document.getElementById("pin-stage").className = "pinup pin-landing-stage";
                setTimeout(function(){$(".pinup").css("transition-duration","0s");},1000);
            },500);
        }
        else if(pinNext === "oat"){
            document.getElementById("pin-stage").className = "pinup zoomout-oat-stage";
            document.getElementById("pin-audi").className = "pinup zoomout-oat-audi";
            document.getElementById("pin-landing").className = "pinup zoomout-oat-landing";
            document.getElementById("pin-oat").className = "pinup out-of-box";

            setTimeout(function(){
                $(".pinup").css("transition-duration","0.5s");

                document.getElementById("pin-stage").className = "pinup pin-oat-stage";
                document.getElementById("pin-audi").className = "pinup pin-oat-audi";
                document.getElementById("pin-landing").className = "pinup pin-oat-landing";
            },500);
        }
        else if(pinNext === "stage"){
            document.getElementById("pin-oat").className = "pinup zoomout-stage-oat";
            document.getElementById("pin-audi").className = "pinup zoomout-stage-audi";
            document.getElementById("pin-landing").className = "pinup zoomout-stage-landing";
            document.getElementById("pin-stage").className = "pinup out-of-box";

            setTimeout(function(){
                $(".pinup").css("transition-duration","0.5s");

                document.getElementById("pin-oat").className = "pinup pin-stage-oat";
                document.getElementById("pin-audi").className = "pinup pin-stage-audi";
                document.getElementById("pin-landing").className = "pinup pin-stage-landing";
            },500);
        }
        else{
            document.getElementById("pin-oat").className = "pinup zoomout-audi-oat";
            document.getElementById("pin-stage").className = "pinup zoomout-audi-stage";
            document.getElementById("pin-landing").className = "pinup zoomout-audi-landing";
            document.getElementById("pin-audi").className = "pinup out-of-box";

            setTimeout(function(){
                $(".pinup").css("transition-duration","0.5s");

                document.getElementById("pin-oat").className = "pinup pin-audi-oat";
                document.getElementById("pin-stage").className = "pinup pin-audi-stage";
                document.getElementById("pin-landing").className = "pinup pin-audi-landing";
            },500);
        }

        pinCurrent = pinNext;
    }, 1000);
}

function positionTooltip(){
    var temp;
    if($("#pin-audi").hasClass("out-of-box") === false){
        $("#tooltip-audi").fadeIn();
        temp = $("#pin-audi")[0].getBoundingClientRect().top;
        $("#tooltip-audi").css("top",temp+40);
        temp = $("#pin-audi")[0].getBoundingClientRect().left;
        $("#tooltip-audi").css("left",temp-20);
        if(window.innerHeight - $("#pin-audi")[0].getBoundingClientRect().bottom < 40){
            $("#tooltip-audi").css("top",$("#tooltip-audi")[0].getBoundingClientRect().top-40);
            $("#tooltip-audi").css("left",$("#tooltip-audi")[0].getBoundingClientRect().left+70);
        }
    }
    
    if($("#pin-oat").hasClass("out-of-box") === false){
        $("#tooltip-oat").fadeIn();
        temp = $("#pin-oat")[0].getBoundingClientRect().top;
        $("#tooltip-oat").css("top",temp+40);
        temp = $("#pin-oat")[0].getBoundingClientRect().left;
        $("#tooltip-oat").css("left",temp-20);
        if(window.innerHeight - $("#pin-oat")[0].getBoundingClientRect().bottom < 40){
            $("#tooltip-oat").css("top",$("#tooltip-oat")[0].getBoundingClientRect().top-40);
            $("#tooltip-oat").css("left",$("#tooltip-oat")[0].getBoundingClientRect().left+70);
        }
    }
    
    if($("#pin-stage").hasClass("out-of-box") === false){
        $("#tooltip-stage").fadeIn();
        temp = $("#pin-stage")[0].getBoundingClientRect().top;
        $("#tooltip-stage").css("top",temp+40);
        temp = $("#pin-stage")[0].getBoundingClientRect().left;
        $("#tooltip-stage").css("left",temp-20);
        if(window.innerHeight - $("#pin-stage")[0].getBoundingClientRect().bottom < 40){
            $("#tooltip-stage").css("top",$("#tooltip-stage")[0].getBoundingClientRect().top-40);
            $("#tooltip-stage").css("left",$("#tooltip-stage")[0].getBoundingClientRect().left+70);
        }
    }

    if($("#pin-gate").hasClass("out-of-box") === false){
        $("#tooltip-gate").fadeIn();
        temp = $("#pin-landing")[0].getBoundingClientRect().top;
        $("#tooltip-gate").css("top",temp+40);
        temp = $("#pin-landing")[0].getBoundingClientRect().left;
        $("#tooltip-gate").css("left",temp-20);
        if(window.innerHeight - $("#pin-landing")[0].getBoundingClientRect().bottom < 40){
            $("#tooltip-gate").css("top",$("#tooltip-gate")[0].getBoundingClientRect().top-40);
            $("#tooltip-gate").css("left",$("#tooltip-gate")[0].getBoundingClientRect().left+70);
        }
    }
}

//});
