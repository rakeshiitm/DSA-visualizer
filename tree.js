const canvas = document.getElementById('bst-canvas');
const ctx = canvas.getContext('2d');

// Define what a single Node looks like in memory
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// Define the Tree structure and drawing logic
class BST {
    constructor() {
        this.root = null;
    }
    
    // Standard BST Insertion Logic
    insert(value) {
        const newNode = new Node(value);
        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertHelper(this.root, newNode);
        }
        this.draw(); // Redraw the whole tree after inserting
    }

    insertHelper(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) node.left = newNode;
            else this.insertHelper(node.left, newNode);
        } else if (newNode.value > node.value) {
            if (node.right === null) node.right = newNode;
            else this.insertHelper(node.right, newNode);
        }
    }

    // --- CANVAS DRAWING LOGIC ---
    draw() {
        // Clear the canvas completely
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (this.root !== null) {
            // Start drawing the root exactly in the top-middle of the canvas
            // The '200' is the horizontal space given to the child nodes
            this.drawNode(this.root, canvas.width / 2, 50, 200);
        }
    }

    drawNode(node, x, y, xOffset) {
        // Draw the LEFT line and child node
        if (node.left !== null) {
            ctx.beginPath();
            ctx.moveTo(x, y); // Start at current node
            ctx.lineTo(x - xOffset, y + 70); // Draw line down and to the left
            ctx.strokeStyle = "#888888";
            ctx.lineWidth = 2;
            ctx.stroke();
            // Recursively draw the left child, cutting the xOffset in half so nodes don't collide
            this.drawNode(node.left, x - xOffset, y + 70, xOffset / 2);
        }

        // Draw the RIGHT line and child node
        if (node.right !== null) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x + xOffset, y + 70);
            ctx.strokeStyle = "#888888";
            ctx.lineWidth = 2;
            ctx.stroke();
            this.drawNode(node.right, x + xOffset, y + 70, xOffset / 2);
        }

        // Draw the Circle for the current node
        ctx.beginPath();
        ctx.arc(x, y, 20, 0, 2 * Math.PI); // 20 is the radius
        ctx.fillStyle = "#4A90E2";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        // Draw the Text (Number) inside the circle
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.value, x, y);
    }
}

// Create the tree instance
const tree = new BST();

// Link the HTML button to the JS Logic
function insertNode() {
    const input = document.getElementById("bst-input");
    const val = parseInt(input.value);
    
    // Only insert if they actually typed a number
    if (!isNaN(val)) {
        tree.insert(val);
        input.value = ""; // Clear the input box automatically
        input.focus(); // Keep cursor in the box for fast typing
    }
}

function resetTree() {
    tree.root = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
