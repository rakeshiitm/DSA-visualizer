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

        generateArray();
