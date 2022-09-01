const DEFAULT_COLOR = '#fff';
const DEFAULT_PAINT_COLOR = '#000'
const SIZE = 580;
const DEFAULT_COUNT = 16;

let now_count = DEFAULT_COUNT;
let now_color = DEFAULT_COLOR;
let now_paint_color = DEFAULT_PAINT_COLOR;

const field = document.querySelector('.field');

const scale = document.querySelector('#pixel_count');
const sizeDiv = document.querySelector('.sizeValue');

scale.addEventListener('input', (e) => {
    changeField(e);
    changeSizeDiv();
});

// Creates a field with the actual number of squares
function makeField() {
    field.textContent = '';
    for (let i = 0; i < now_count*now_count; i++) {
        const square = createSquare((i+1).toString(), 'square');
        field.appendChild(square);
    }
}

// create one square
function createSquare(id, squareClass){
    const square = document.createElement('div');
    square.classList.add(squareClass);
    square.id = `pixel-${id}`;
    square.style.cssText =
        `background-color: ${DEFAULT_COLOR}; height: ${SIZE / now_count}px; width: ${SIZE / now_count}px;`;
    square.addEventListener('mouseenter', (e) => changeColor(e, now_paint_color));
    return square;
}

// change the color of paint
function changeColor(e, color) {
    e.target.style.backgroundColor = color;
}

// change the number of squares
function changeCount(e) {
    now_count = e.target.value;
}

// change the field
function changeField(e) {
    changeCount(e);
    makeField();
}

function changeSizeDiv() {
    sizeDiv.textContent = `${now_count} x ${now_count}`;
}

makeField();