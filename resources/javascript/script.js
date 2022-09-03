// Initialize default values
const DEFAULT_BACKGROUND_COLOR = '#ffffff';
const DEFAULT_PAINT_COLOR = '#000000'
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
const rainbow_btn = document.getElementById('rainbow-brush');
const eraser_btn = document.getElementById('eraser');
const clear_btn = document.getElementById('clear');

const scale = document.getElementById('pixel_count');
const sizeDiv = document.getElementById('sizeValue');

checkers.forEach(checker => checker.addEventListener('click', e => setChosen(e)));

color_picker.addEventListener('input', e => now_paint_color = e.target.value);

brush_btn.addEventListener('click', e => setMode(e));
rainbow_btn.addEventListener('click', e => setMode(e));
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

// Return string hex
function toNorm(string) {
    const array = string.replace(/[^\d,]/g, '').split(',');
    const hex_array = array.map(el => {
        let hex = Number(el).toString(16);
        if (hex.length != 2) return `0${hex}`
        else return hex
    });
    return `#${hex_array[0]}${hex_array[1]}${hex_array[2]}`;
}

// Return the darker hex value
function getNewHex(number) {
    let hex = Math.floor(number * 7.5 / 10);
    if (hex < 16) return '00';
    else return hex.toString(16);
}

function getRandomHex(number) {
    return Math.floor(Math.random()*number).toString(16);
}

// Return actual color for rainbow brush
function getColor(e) {
    if (e.target.style.backgroundColor && toNorm(e.target.style.backgroundColor) !== DEFAULT_BACKGROUND_COLOR) {
        console.log(toNorm(e.target.style.backgroundColor), ' 1')
        const backgroundColor = toNorm(e.target.style.backgroundColor);
        const red = parseInt(backgroundColor.slice(1, 3), 16);
        const green = parseInt(backgroundColor.slice(3, 5), 16);
        const blue = parseInt(backgroundColor.slice(5), 16);
        let new_backgroundColor = 
            `#${getNewHex(red)}${getNewHex(green)}${getNewHex(blue)}`;
        console.log(new_backgroundColor, ' 2');
        return new_backgroundColor;
    }
    else {
        return `#${getRandomHex(255)}${getRandomHex(255)}${getRandomHex(255)}`
    }
}

function changePixelColor(e, color) {
    switch (now_mode){
        case 'brush':
            e.target.style.backgroundColor = color;
            break;
        case 'eraser':
            e.target.style.backgroundColor = '#fff';
            break;
        case 'rainbow-brush':
            e.target.style.backgroundColor = getColor(e);
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