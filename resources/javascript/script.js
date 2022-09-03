// Initialize default values
const DEFAULT_BACKGROUND_COLOR = '#fff';
const DEFAULT_PAINT_COLOR = '#000'
const SIZE = 580;
const DEFAULT_COUNT = 16;
const DEFAULT_MODE = 'brush';
const DEFAULT_PAINT_TYPE = 'line';

// Actual values
let now_count = DEFAULT_COUNT;
let now_paint_color = DEFAULT_PAINT_COLOR;
let now_mode = DEFAULT_MODE;
let now_paint_type = DEFAULT_PAINT_TYPE;

// Html elements
const canvas = document.querySelector('.canvas');

const color_picker = document.getElementById('color_picker');

const checkers = document.querySelectorAll('.checker');

const brush_btn = document.getElementById('brush');
const eraser_btn = document.getElementById('eraser');
const clear_btn = document.getElementById('clear');

const scale = document.getElementById('pixel_count');
const sizeDiv = document.getElementById('sizeValue');

checkers.forEach(checker => checker.addEventListener('click', e => setChosen(e)));

color_picker.addEventListener('input', e => now_paint_color = e.target.value);

brush_btn.addEventListener('click', e => setMode(e));
eraser_btn.addEventListener('click', e => setMode(e));
clear_btn.addEventListener('click', e => clearCanvas(e))

// AddEventListener for tools
scale.addEventListener('input', (e) => {
    changeCanvas(e);
    changeSizeDiv();
});

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
    square.style.cssText = `background-color: ${DEFAULT_BACKGROUND_COLOR}; 
                            height: ${SIZE / now_count}px; 
                            width: ${SIZE / now_count}px;`;
    if (now_paint_type === 'line') {
        square.addEventListener('mouseenter', (e) => changePixelColor(e, now_paint_color));
    }
    else {
        square.addEventListener('click', (e) => changePixelColor(e, now_paint_color));
    }
    return square;
}

function changePixelColor(e, color) {
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

function setPaintType(e) {
    now_paint_type = e.target.id;
    setCanvas();
}

function setChosen(e) {
    const previous_chosen = document.querySelector('.chosen');
    previous_chosen.classList.remove('chosen');
    e.target.classList.add('chosen');
    setPaintType(e);
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