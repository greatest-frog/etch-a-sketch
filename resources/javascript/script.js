const DEFAULT_COLOR = '#fff';
const DEFAULT_PAINT_COLOR = '#000'
const SIZE = 580;
const DEFAULT_COUNT = 16;

let now_count = DEFAULT_COUNT;
let now_color = DEFAULT_COLOR;
let now_paint_color = DEFAULT_PAINT_COLOR;

function createSquare(id, squareClass){
    const square = document.createElement('div');
    square.classList.add(squareClass);
    square.id = id;
    square.style.cssText =
     `background-color: ${DEFAULT_COLOR}; height: ${SIZE / now_count}px; width: ${SIZE / now_count}px;`;
    return square;
}


const field = document.querySelector('.field');

for (let i = 0; i < 16*16; i++) {
    const square = createSquare((i+1).toString(), 'square');
    field.appendChild(square);
}