let currentArray = [];
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        // Helper function to calculate delay based on speed slider
        function getDelay() {
            let speed = document.getElementById("speed-slider").value;
            // Math trick: Higher speed value = lower millisecond delay
            return 1000 / speed; 
        }

        function generateArray() {
            currentArray = [];
            const container = document.getElementById("bar-container");
            container.innerHTML = ""; 
            
            // Read the current value of the size slider
            let numBars = document.getElementById("size-slider").value;
            
            // Calculate a dynamic width so bars always fit on screen
            let dynamicWidth = (800 / numBars) - 2; 
            
            for(let i = 0; i < numBars; i++) {
                let randomValue = Math.floor(Math.random() * 330) + 20;
                currentArray.push(randomValue);
                
                let bar = document.createElement("div");
                bar.classList.add("bar");
                bar.style.height = randomValue + "px";
                bar.style.width = dynamicWidth + "px"; // Apply dynamic width
                bar.id = "bar-" + i;
                container.appendChild(bar);
            }
        }

        // Listen for changes on the size slider and redraw immediately
        document.getElementById("size-slider").addEventListener("input", generateArray);

        async function bubbleSort() {
            disableControls();
            let bars = document.getElementsByClassName("bar");
            let n = currentArray.length;

            for(let i = 0; i < n; i++) {
                for(let j = 0; j < n - i - 1; j++) {
                    bars[j].style.backgroundColor = "#E24A4A";
                    bars[j + 1].style.backgroundColor = "#E24A4A";
                    
                    // Use our new dynamic delay
                    await sleep(getDelay());
                    
                    if(currentArray[j] > currentArray[j + 1]) {
                        let temp = currentArray[j];
                        currentArray[j] = currentArray[j + 1];
                        currentArray[j + 1] = temp;
                        
                        bars[j].style.height = currentArray[j] + "px";
                        bars[j + 1].style.height = currentArray[j + 1] + "px";
                    }
                    
                    bars[j].style.backgroundColor = "#4A90E2";
                    bars[j + 1].style.backgroundColor = "#4A90E2";
                }
                bars[n - i - 1].style.backgroundColor = "#50E3C2";
            }
            enableControls();
        }

        async function insertionSort() {
            disableControls();
            let bars = document.getElementsByClassName("bar");
            let n = currentArray.length;

            for (let i = 1; i < n; i++) {
                let key = currentArray[i];
                let j = i - 1;

                bars[i].style.backgroundColor = "#E24A4A";
                await sleep(getDelay());

                while (j >= 0 && currentArray[j] > key) {
                    bars[j].style.backgroundColor = "#F5A623";
                    await sleep(getDelay());

                    currentArray[j + 1] = currentArray[j];
                    bars[j + 1].style.height = currentArray[j] + "px";

                    bars[j].style.backgroundColor = "#4A90E2";
                    j = j - 1;
                }
                
                currentArray[j + 1] = key;
                bars[j + 1].style.height = key + "px";
                bars[j + 1].style.backgroundColor = "#4A90E2";
            }
            
            for(let k = 0; k < n; k++) {
                bars[k].style.backgroundColor = "#50E3C2";
                await sleep(getDelay() / 3); 
            }
            enableControls();
        }
        function disableControls() {
            document.getElementById("size-slider").disabled = true;
            document.getElementById("speed-slider").disabled = true;
            
            // Grab all buttons on the page and disable them
            let buttons = document.querySelectorAll("button");
            buttons.forEach(btn => btn.disabled = true);
        }

        function enableControls() {
            document.getElementById("size-slider").disabled = false;
            document.getElementById("speed-slider").disabled = false;
            
            // Grab all buttons and enable them again
            let buttons = document.querySelectorAll("button");
            buttons.forEach(btn => btn.disabled = false);
        }
// --- MERGE SORT ---

        async function mergeSort() {
            disableControls();
            let bars = document.getElementsByClassName("bar");
            
            // Start the recursive chopping process
            await mergeSortHelper(currentArray, 0, currentArray.length - 1, bars);
        
            // When all the recursion finishes, do the final green sweep
            for(let k = 0; k < currentArray.length; k++) {
                bars[k].style.backgroundColor = "#50E3C2";
                await sleep(getDelay() / 3); 
            }
            enableControls();
        }
        
        // The function that chops the array in half
        async function mergeSortHelper(arr, left, right, bars) {
            if (left >= right) {
                return;
            }
            
            let mid = left + Math.floor((right - left) / 2);
        
            // Chop and sort the left side
            await mergeSortHelper(arr, left, mid, bars);
            // Chop and sort the right side
            await mergeSortHelper(arr, mid + 1, right, bars);
        
            // Stitch them back together
            await merge(arr, left, mid, right, bars);
        }
        
        // The function that stitches two sections together and draws it
        async function merge(arr, left, mid, right, bars) {
            let n1 = mid - left + 1;
            let n2 = right - mid;
            
            // Create temporary arrays for the two halves
            let leftArr = new Array(n1);
            let rightArr = new Array(n2);
        
            for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i];
            for (let j = 0; j < n2; j++) rightArr[j] = arr[mid + 1 + j];
        
            let i = 0, j = 0, k = left;
        
            // Compare values from the two temporary arrays and overwrite the main array
            while (i < n1 && j < n2) {
                bars[k].style.backgroundColor = "#E24A4A"; // Color the bar RED while editing
                await sleep(getDelay());
                
                if (leftArr[i] <= rightArr[j]) {
                    arr[k] = leftArr[i];
                    i++;
                } else {
                    arr[k] = rightArr[j];
                    j++;
                }
                
                // Update the visual height
                bars[k].style.height = arr[k] + "px";
                bars[k].style.backgroundColor = "#4A90E2"; // Turn back to BLUE
                k++;
            }
        
            // Clean up any remaining elements in the left array
            while (i < n1) {
                bars[k].style.backgroundColor = "#E24A4A";
                await sleep(getDelay());
                arr[k] = leftArr[i];
                bars[k].style.height = arr[k] + "px";
                bars[k].style.backgroundColor = "#4A90E2";
                i++;
                k++;
            }
        
            // Clean up any remaining elements in the right array
            while (j < n2) {
                bars[k].style.backgroundColor = "#E24A4A";
                await sleep(getDelay());
                arr[k] = rightArr[j];
                bars[k].style.height = arr[k] + "px";
                bars[k].style.backgroundColor = "#4A90E2";
                j++;
                k++;
            }
        }
// --- QUICK SORT ---

async function quickSort() {
    disableControls();
    let bars = document.getElementsByClassName("bar");
    
    // Start the recursive sorting process
    await quickSortHelper(currentArray, 0, currentArray.length - 1, bars);

    // Final green sweep when completely finished
    for(let k = 0; k < currentArray.length; k++) {
        bars[k].style.backgroundColor = "#50E3C2";
        await sleep(getDelay() / 3); 
    }
    enableControls();
}

async function quickSortHelper(arr, low, high, bars) {
    if (low < high) {
        // Find the pivot index
        let pi = await partition(arr, low, high, bars);
        
        // Recursively sort the left side of the pivot
        await quickSortHelper(arr, low, pi - 1, bars);
        // Recursively sort the right side of the pivot
        await quickSortHelper(arr, pi + 1, high, bars);
    }
}

async function partition(arr, low, high, bars) {
    // We choose the last element in the section as our pivot
    let pivot = arr[high];
    let i = low - 1;

    // Color the pivot YELLOW so we can track it
    bars[high].style.backgroundColor = "#F5A623"; 
    
    for (let j = low; j < high; j++) {
        // Color the current element RED as we scan
        bars[j].style.backgroundColor = "#E24A4A"; 
        await sleep(getDelay());

        if (arr[j] < pivot) {
            i++;
            // Swap the actual numbers
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            // Swap the visual bar heights
            bars[i].style.height = arr[i] + "px";
            bars[j].style.height = arr[j] + "px";
        }
        
        // Revert the scanned bar back to BLUE
        bars[j].style.backgroundColor = "#4A90E2"; 
    }

    // Move the pivot to its final, correct position
    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    bars[i + 1].style.height = arr[i + 1] + "px";
    bars[high].style.height = arr[high] + "px";

    // Revert the pivot colors back to BLUE
    bars[high].style.backgroundColor = "#4A90E2"; 
    bars[i + 1].style.backgroundColor = "#4A90E2"; 

    // Return the final index of the pivot
    return i + 1;
}

        generateArray();
