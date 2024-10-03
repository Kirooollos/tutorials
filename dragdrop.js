let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = innerWidth - 30;
canvas.height = innerHeight -10;

canvas.style.border = '5px solid red';

let canvas_width = canvas.width;
let canvas_height = canvas.height;
let offset_x, offset_y;


let get_offset = function () {
    // function to get the offsets of the canva
    let canvas_offsets = canvas.getBoundingClientRect();
    offset_x = canvas_offsets.left;
    offset_y = canvas_offsets.top;
}
get_offset();
window.onscroll = function () { get_offset(); }
window.onresize = function () { get_offset(); }
canvas.onresize = function () { get_offset(); }

// drawing a rectangle

let shapes = [];
let current_shape_index = null;
let is_dragging = false;
let startX, startY;




// shapes.push({
//     x: 0,
//     y: 0,
//     width: 200,
//     height: 200,
//     color: 'red'
// });

// shapes.push({
//     x: 0,
//     y: 0,
//     width: 100,
//     height: 100,
//     color: 'black'
// });

// let draw_shapes = function () {
//     context.clearRect(0, 0, canvas_width, canvas_height);
//     for (let shape of shapes) {
//         context.fillStyle = shape.color;
//         context.fillRect(shape.x, shape.y, shape.width, shape.height);
//     }
// }
// draw_shapes();


// using the create class method to draw
// crating a rectangle class
//co

class rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    draw(context) {
        
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
      
    }
}

let rect1 = new rectangle(200, 500, 200, 200, 'red');
let rect2 = new rectangle(50, 50, 100, 100, 'blue');


shapes.push(rect1);
shapes.push(rect2);


let is_mouse_in_shape = function (x, y, shape) {
    let shape_left = shape.x;
    let shape_right = shape.x + shape.width;
    let shape_top = shape.y;
    let shape_bottom = shape.y + shape.height;
    if (x > shape_left && x < shape_right && y > shape_top && y < shape_bottom)
    {
        return true;
    }
    return false;
}





let mouse_down = function (event) {
    event.preventDefault();
    console.log(event);

    // methods related to the event
    //les coordonnes de la cilck
    //parseInt to convert a string into a number
    startX = parseInt(event.clientX - offset_x);
    startY = parseInt(event.clientY - offset_y);

   let index = 0;

    for (let shape of shapes) {
        if (is_mouse_in_shape(startX, startY, shape)) {
            current_shape_index = index;
            is_dragging = true;
            return;
        
        }
        index++;

    }
}



let mouse_up = function (event) {
    if (!is_dragging) {
        return;
    }

    event.preventDefault();
    is_dragging = false;
}

let mouse_out = function (event) {
    if (!is_dragging) {
        return;
    }

    event.preventDefault();
    is_dragging = false;
}


let mouse_move = function (event) {
    if (!is_dragging) {
        return;
    } else {
        event.preventDefault();
        let mouseX = parseInt(event.clientX - offset_x);
        let mouseY = parseInt(event.clientY- offset_y);

        let dx = mouseX - startX;
        let dy = mouseY - startY;

        let current_shape = shapes[current_shape_index];
        current_shape.x += dx;
        current_shape.y += dy;

       

        startX = mouseX;
        startY = mouseY;

        drawAllShapes();

   }
}


canvas.onmousedown = mouse_down;
canvas.onmouseup = mouse_up;
canvas.onmouseout  = mouse_out;
canvas.onmousemove = mouse_move;

function drawAllShapes() {
    // Clear the canvas once, before drawing all shapes
    context.clearRect(0, 0, canvas_width, canvas_height);

    // Draw each shape in the shapes array
    for (let shape of shapes) {
        shape.draw(context);
    }
}
drawAllShapes();