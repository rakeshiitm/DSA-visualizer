const gridContainer = document.getElementById("grid-container");

// Grid dimensions
const ROWS = 20;
const COLS = 50;

// Set default start and end positions
const START_NODE_ROW = 10;
const START_NODE_COL = 10;
const END_NODE_ROW = 10;
const END_NODE_COL = 40;

// Track if the mouse is currently being dragged
let isMouseDown = false;

function createGrid() {
    gridContainer.innerHTML = ""; // Clear existing grid

    for (let r = 0; r < ROWS; r++) {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("grid-row");

        for (let c = 0; c < COLS; c++) {
            let node = document.createElement("div");
            node.classList.add("node");
            node.id = `node-${r}-${c}`; // Give every node coordinates

            // Mark the Start and End nodes
            if (r === START_NODE_ROW && c === START_NODE_COL) {
                node.classList.add("node-start");
            } else if (r === END_NODE_ROW && c === END_NODE_COL) {
                node.classList.add("node-end");
            }

            // MOUSE EVENT LISTENERS FOR DRAWING WALLS
            
            // When you click down on a square
            node.addEventListener("mousedown", () => {
                isMouseDown = true;
                toggleWall(node, r, c);
            });

            // When your mouse sweeps over a square while holding the click
            node.addEventListener("mouseenter", () => {
                if (isMouseDown) {
                    toggleWall(node, r, c);
                }
            });

            // When you let go of the click
            node.addEventListener("mouseup", () => {
                isMouseDown = false;
            });

            rowDiv.appendChild(node);
        }
        gridContainer.appendChild(rowDiv);
    }
}

// Function to turn a white square into a black wall (and back)
function toggleWall(node, r, c) {
    // Prevent drawing walls over the start or end points
    if ((r === START_NODE_ROW && c === START_NODE_COL) || 
        (r === END_NODE_ROW && c === END_NODE_COL)) {
        return;
    }
    node.classList.toggle("node-wall");
}

function clearWalls() {
    let nodes = document.getElementsByClassName("node");
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].classList.remove("node-wall");
        nodes[i].classList.remove("node-visited");
        nodes[i].classList.remove("node-path");
    }
}

// Generate the grid immediately when the page loads
createGrid();

// Ensure dragging stops if the mouse leaves the grid entirely
gridContainer.addEventListener("mouseleave", () => {
    isMouseDown = false;
});
