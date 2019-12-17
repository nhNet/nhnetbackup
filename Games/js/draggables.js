// get canvas related references
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;
var WIDTH = canvas.width;
var HEIGHT = canvas.height;

// drag related variables
var dragok = false;
var startX;
var startY;

// an array of objects that define different rectangles
var rects = [];
rects.push({
    x: ((91/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((20/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#444444",
    isDragging: false,
    draggable:true
});
rects.push({
    x: ((96/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((20/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#ff550d",
    isDragging: false,
    draggable:true
});
rects.push({
    x: ((91/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((28/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#800080",
    isDragging: false,
    draggable:true
});
rects.push({
    x: ((96/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((28/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#0c64e8",
    isDragging: false,
    draggable:true
});
var origRects=[];
origRects.push({
    x: ((91/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((20/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#444444",
    isDragging: false,
    draggable:true
});
origRects.push({
    x: ((96/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((20/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#ff550d",
    isDragging: false,
    draggable:true
});
origRects.push({
    x: ((91/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((28/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#800080",
    isDragging: false,
    draggable:true
});
origRects.push({
    x: ((96/100)*window.innerWidth)-(((3/100)*window.innerWidth)/2),
    y: ((28/100)*window.innerHeight),
    width: (3.5/100)*window.innerWidth,
    height: (6/100)*window.innerHeight,
    fill: "#0c64e8",
    isDragging: false,
    draggable:true
});
// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;

// call to draw the scene
draw();

// draw a single rect
function rect(x, y, w, h) {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.closePath();
    ctx.fill();
}

// clear the canvas
function clear() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

// redraw the scene
function draw() {
    clear();
    ctx.fillStyle = "#000";
    rect(0, 0, WIDTH, HEIGHT);
    d(1,94,0,12,100);
    // redraw each rect in the rects[] array
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        ctx.fillStyle = r.fill;
        rect(r.x, r.y, r.width, r.height);
    }
    d(0,94,2,10,10);
}


// handle mousedown events
function myDown(e) {

    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // get the current mouse position
    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    // test each rect to see if mouse is inside
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
        var r = rects[i];
        if (mx > r.x && mx < r.x + r.width && my > r.y && my < r.y + r.height) {
            // if yes, set that rects isDragging=true
            dragok = true;
            r.isDragging = true;
        }
    }
    // save the current mouse position
    startX = mx;
    startY = my;
}


// handle mouseup events
function myUp(e) {  
  // alert('hi')
    // tell the browser we're handling this mouse event
    e.preventDefault();
    e.stopPropagation();

    // clear all the dragging flags
    dragok = false;
    for (var i = 0; i < rects.length; i++) {
      if(rects[i].isDragging){
        if (startX > (((94/100)*window.innerWidth)-(((15/100)*window.innerWidth)/2)) && startX < (((100/100)*window.innerWidth)) && startY > 0 && startY < ((100/100)*window.innerHeight)){
          rects.splice(i,1,origRects[i]);
          // if(rects[i]!=origRects[i]){
          //   alert('This is creating an error')
          //   rects=origRects;
          // }
          // alert('You can\'t place your tower here!');
          draw();
        }
      }
      rects[i].isDragging = false;
    }
}


// handle mouse moves
function myMove(e) {
    // if we're dragging anything...
    if (dragok) {

        // tell the browser we're handling this mouse event
        e.preventDefault();
        e.stopPropagation();

        // get the current mouse position
        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        // calculate the distance the mouse has moved
        // since the last mousemove
        var dx = mx - startX;
        var dy = my - startY;

        // move each rect that isDragging 
        // by the distance the mouse has moved
        // since the last mousemove
        for (var i = 0; i < rects.length; i++) {
            var r = rects[i];
            if (r.isDragging) {
                r.x += dx;
                r.y += dy;
            }
        }

        // redraw the scene with the new rect positions
        draw();

        // reset the starting mouse position for the next mousemove
        startX = mx;
        startY = my;

    }
}