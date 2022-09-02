// Initialize default values
const DEFAULT_COLOR = '#fff';
const DEFAULT_PAINT_COLOR = '#000'
const SIZE = 580;
const DEFAULT_COUNT = 16;

// Actual values
let now_count = DEFAULT_COUNT;
let now_color = DEFAULT_COLOR;
let now_paint_color = DEFAULT_PAINT_COLOR;
let now_mode = "brush";

// Html elements
const canvas = document.querySelector('.canvas');

const eraser_btn = document.getElementById('eraser');
const brush_btn = document.getElementById('brush');
const clear_btn = document.getElementById('clear');

const scale = document.getElementById('pixel_count');
const sizeDiv = document.getElementById('sizeValue');

// AddEventListener for tools
scale.addEventListener('input', (e) => {
    changeCanvas(e);
    changeSizeDiv();
});

eraser_btn.addEventListener('click', e => setMode(e));
brush_btn.addEventListener('click', e => setMode(e));
clear_btn.addEventListener('click', e => clearCanvas(e))

// Creates a canvas with the actual number of squares
function setCanvas() {
    canvas.textContent = '';
    for (let i = 0; i < now_count*now_count; i++) {
        const square = createSquare((i+1).toString(), 'square');
        canvas.appendChild(square);
    }
}

// Create one square
function createSquare(id, squareClass){
    const square = document.createElement('div');
    square.classList.add(squareClass);
    square.id = `pixel-${id}`;
    square.style.cssText = `background-color: ${DEFAULT_COLOR}; 
                            height: ${SIZE / now_count}px; 
                            width: ${SIZE / now_count}px;`;
    square.addEventListener('mouseenter', (e) => changeColor(e, now_paint_color));
    return square;
}

function changeColor(e, color) {
    switch (now_mode){
        case 'brush':
            e.target.style.backgroundColor = color;
            break;
        case 'eraser':
            e.target.style.backgroundColor = '#fff';
            break;
    }
}

// Change the number of squares
function changeCount(e) {
    now_count = e.target.value;
}

function changeCanvas(e) {
    changeCount(e);
    setCanvas();
}

function changeSizeDiv() {
    sizeDiv.textContent = `${now_count} x ${now_count}`;
}

function setActive(e) {
    const previous_active = document.querySelector('.active');
    previous_active.classList.remove('active');
    e.target.classList.add('active');
}

function setMode(e) {
    setActive(e);
    now_mode = e.target.id;
}

function animateButton(e) {
    e.target.classList.add('active');
    setTimeout(() => e.target.classList.remove('active'), 500);
}

function clearCanvas(e) {
    setCanvas();
    animateButton(e);
}

setCanvas();