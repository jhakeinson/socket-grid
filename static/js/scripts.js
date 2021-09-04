const socket = io('http://localhost:3000');

const gridHistory = [];
let grid = new Array(4000);
grid.fill(0);

const drawGrid = (grid) => {
    grid.forEach((v, i) => {
        document.getElementById(i.toString()).className = v == 1? 'red':'green';;
    });
}

const cellClickHandler = (e) => {
    const targetId = parseInt(e.id);
    const targetClass = e.getAttribute('class');
    // const cellData = { id: targetId, class: targetClass };
    grid[targetId] = targetClass === 'red'? 0:1;

    // drawGrid(grid);
    socket.emit('message', { grid: grid} );
    
    gridHistory.push({id: targetId, class: targetClass});
    
    console.log(gridHistory);
}

const undoButtonHandler = () => {
    if(gridHistory.length == 0) {
        return;
    }

    const cell = gridHistory.pop();
    grid[cell.id] = cell.class === 'red'? 1:0;

    console.log(gridHistory);

    drawGrid(grid);
    socket.emit('message', { grid: grid} );
}

socket.on('message', (data) => {
    grid = data.grid;
    drawGrid(grid);
});

socket.on('connect', () => {
    socket.on('init', (data) => {
        grid = data.grid;
        drawGrid(grid);
    })
});
