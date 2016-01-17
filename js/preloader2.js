//array to store all DOM elements of svg preloader with paths
var groups = new Array;
var totalGroups = 0;
var pathsdrew = 0;

//loads the array with the DOM elements and setting up color fill and animation for the main image
function svg_loader(svg_to_load){
  svg = svg_to_load;
  $(svg).find('g').each(function(){
      totalGroups++;
      group = this;
      final_fill = 'none';
      if($(group).attr('fill') && $(group).attr('fill')!='none'){
        initial_fill = '#FFFFFF';
        final_fill = $(group).attr('fill');
        $(group).attr('fill', initial_fill);
      }
      $(group).children('path').each(function(){
        path = this;
        path.style.stroke = path.style.fill;
        if(path.style.strokeWidth > 0) path.style.strokeWidth = path.style.strokeWidth;
        else path.style.strokeWidth = '2px';
        path.style.fillOpacity = '0';
        length = path.getTotalLength();
        path.style.transition = path.style.WebkitTransition = 'none';
        path.style.strokeDasharray = length + ' ' + length;
        path.style.strokeDashoffset = length;
        path.getBoundingClientRect();
        path.style.transition = path.style.WebkitTransition = 'all 4.5s linear';
      });
      ele = [group, final_fill];
      groups.push(ele);
  });
  //console.log(totalGroups);
  groups.reverse();
}

//draws the paths of the number of groups given in the parameter and fades in the fill colour
function drawPath(paths){
  for(i=0; i<paths; i++){
    ele = groups.pop();
    group = ele[0];
    final_fill = ele[1];
    $(group).children('path').each(function(){
      path = this;
      path.style.strokeDashoffset = '0';
      path.style.fillOpacity = '1';
    });
    if($(group).attr('fill') && $(group).attr('fill')!='none'){
      group.style.transition = group.style.WebkitTransition = 'none';
      group.style.transition = group.style.WebkitTransition = 'fill 4.5s linear';
      group.style.fill = final_fill;
    }
  }
}

//function to load svg according to the number of images loaded in background
function preloadImages(srcs, callback) {
    var img;
    var totalImg = srcs.length;
    var remaining = srcs.length;
    var toDraw = totalGroups;
    var pathPerLoad = Math.floor(toDraw/totalImg);
    for (var i = 0; i < srcs.length; i++) {
        img = new Image();
        img.onload = function() {
            remaining--;
            toDraw = toDraw - pathPerLoad;
            drawPath(pathPerLoad);
            if (remaining <= 0) {
                drawPath(toDraw);
                setTimeout(callback, 5000);
            }
        };
        img.onerror = function() {
          //location.reload();
          console.log('Loading error!');
        }
        img.src = srcs[i];
    }
}

/*Include this file in html document. Pass the SVGcontent to svg_loader.
Call the preloader like this:
imageSrcs = ["src1", "src2", "src3", "src4"];
preloadImages(imageSrcs, callback);
*/
