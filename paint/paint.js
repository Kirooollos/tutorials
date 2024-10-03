const canvas = document.querySelector("canvas");
toolBtns = document.querySelectorAll(".tool")  // return an array of all the elements with class tool
fillcolor = document.querySelector("#fill-color");
sizeSlider = document.querySelector("#size-slider");

colorBtns = document.querySelectorAll(".colors .option");
colorPicker = document.querySelector("#color-picker")


clearcanvas = document.querySelector(".clear-canvas");
undoBtn = document.querySelector(".undo");

ctx = canvas.getContext("2d");

let preMouseX, preMouseY, snapshot;
let is_drawing = false;
selectedTool = "brush";
brushWidth = 5;
selectedColor = "#000";


let restore_array = [];
let index = -1;
start_bg_color = "#fff";




window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
})

const drawRect = (e) => {
    if (!fillcolor.checked) {
       return  ctx.strokeRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY);
    }
        return ctx.fillRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY);
}
    
const drawCercle = (e) => {
    ctx.beginPath();
    //getting radius for the circle from the mouse pointer
    let radius =Math.sqrt(Math.pow((preMouseX -e.offsetX),2)+ Math.pow((preMouseY -e.offsetY),2))
    ctx.arc(preMouseX, preMouseY, radius, 0, 2 * Math.PI)
    fillcolor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);  
    ctx.lineTo(preMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    ctx.stroke();
    fillcolor.checked ? ctx.fill() : ctx.stroke();

}

const startDraw = (e) => {
    is_drawing = true;
    preMouseX = e.offsetX;
    preMouseY = e.offsetY;

    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;
    //copying canvas data and passing as snapshot value ... this avoid dragging the image
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}


const drawing = (e) => {
    if (!is_drawing) return;  // if isDrawing  ==  false
    ctx.putImageData(snapshot, 0, 0); // adding copied canvas data on this canvas
    if (selectedTool == "brush") {
        ctx.lineTo(e.offsetX, e.offsetY);  // creating line according to the mouse pointer
        ctx.stroke();           // filling line with color
    } else if (selectedTool == "eraser") {
        ctx.lineTo(e.offsetX, e.offsetY);  
        ctx.stroke(); 
        ctx.strokeStyle = "#fff";

            
    } else if (selectedTool == "rectangle") {
        drawRect(e);
    } else if (selectedTool == "cercle") {
        drawCercle(e);
    } else if (selectedTool == "triangle") {
        drawTriangle(e);
    }
}

toolBtns.forEach(element => {
    element.addEventListener("click", () => {
        // removing active class from the previous option and adding 
        document.querySelector(".options .active").classList.remove("active");
        element.classList.add("active");
        selectedTool = element.id;

    })
});




sizeSlider.addEventListener("change", () => {
    brushWidth = sizeSlider.value;
})

colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        // console.log(window.getComputedStyle(btn).getPropertyValue("background"));
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    })
})

colorPicker.addEventListener("change", () => {
    selectedColor = colorPicker.value;
    colorPicker.parentElement.style.background = colorPicker.value;

})

clearcanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

})


// function clear_canvas() {
//     ctx.fillStyle = start_bg_color;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     coctxntext.fillRect(0, 0, canvas.width, canvas.height);
//     restore_array = [];
//     index = -1;

// }

// undoBtn.addEventListener("click", () => {
//       if (index <= 0) {
//         clear_canvas();
//     } else {
//         index -= 1;
//         restore_array.pop();
//         ctx.putImageData(restore_array[index], 0, 0);
//     }
// })





// console.log(document.querySelector(".options .selected"))

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup", () => {
    is_drawing =false;
} );