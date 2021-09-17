const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const w = canvas.width;
const h = canvas.height;

const blockWidth = ~~(w / 3);
const blockHeight = ~~(h / 3);

const grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

window.onload = drawBorder();

function drawBorder() {
    ctx.strokeStyle = 'salmon';
    ctx.lineWidth = 4;

    // Vertical
    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, (blockHeight * i) - 2);
        ctx.lineTo(w, (blockHeight * i) - 2);
        ctx.stroke();
    }

    // Horizontal
    for (let i = 1; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo((blockHeight * i) - 2, 0);
        ctx.lineTo((blockHeight * i) - 2, h);
        ctx.stroke();
    }
}

canvas.addEventListener('click', drawPlayer);

function drawPlayer(e) {
    if (checkTie()) {
        setTimeout(() => {
            alert('Tie!');
            location.reload();
            return;
        }, 100);
    } else {
        let coord = {
            x: ~~(e.offsetX / blockWidth),
            y: ~~(e.offsetY / blockHeight)
        };

        if (grid[coord.y][coord.x] != '') return;
        grid[coord.y][coord.x] = 'p';

        let image = new Image();
        image.src = 'image/x.png';

        image.onload = () => ctx.drawImage(image, (coord.x * blockWidth) + 25, (coord.y * blockHeight) + 25, blockWidth - 50, blockHeight - 50);

        if (checkWinner()) {
            setTimeout(() => {
                alert('You Win!');
                location.reload();
            }, 100);          
        } else {
            drawComputer();
        }
    }
}

function drawComputer() {
    if (checkTie()) {
        setTimeout(() => {
            alert('Tie!');
            location.reload();
            return;
        }, 100);
    } else {
        let coord = {
            x: ~~(Math.random() * 3),
            y: ~~(Math.random() * 3)
        };

        while (grid[coord.y][coord.x] != '') {
            coord.x = ~~(Math.random() * 3);
            coord.y = ~~(Math.random() * 3);
        }
        grid[coord.y][coord.x] = 'c';

        let image = new Image();
        image.src = 'image/o.png';

        image.onload = () => ctx.drawImage(image, (coord.x * blockWidth) + 25, (coord.y * blockHeight) + 25, blockWidth - 50, blockHeight - 50);
        
        if (checkWinner() == 'c') {
            setTimeout(() => {
                alert('Computer Win!');
                location.reload();
            }, 100);
        }
    }
}

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        // Vertical
        if (equal(grid[0][i], grid[1][i], grid[2][i])) {
            if (grid[0][i] == 'p') {
                return true;
            } else {
                return 'c';
            }
        }

        // Horizontal
        if (equal(grid[i][0], grid[i][1], grid[i][2])) {
            if (grid[i][0] == 'p') {
                return true;
            } else {
                return 'c';
            }
        }
    }

    // Diagonal
    if (equal(grid[0][0], grid[1][1], grid[2][2])) {
        if (grid[0][0] == 'p') {
            return true;
        } else {
            return 'c';
        }
    }

    if (equal(grid[0][2], grid[1][1], grid[2][0])) {
        if (grid[0][2] == 'p') {
            return true;
        } else {
            return 'c';
        }
    }
}

function equal(a, b, c) {
    return (a != '' && a == b && b == c && c == a);
}

function checkTie() {
    let newArr = [];

    grid.forEach(row => {
        row.forEach(col => {
            newArr.push(col);
        });
    });

    if (!newArr.includes('')) {
        return true;
    }
}